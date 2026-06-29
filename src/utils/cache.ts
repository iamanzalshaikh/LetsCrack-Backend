import { redis } from '../config/redis.js';
import TestSet from '../models/TestSet.js';
import WritingQuestion from '../models/WritingQuestion.js';
import SpeakingQuestion from '../models/SpeakingQuestion.js';
import QuestionBank from '../models/QuestionBank.js';
import logger from './logger.js';

const CACHE_TTL = 3600 * 24; // 24 hours in seconds
const PUBLISHED_TESTS_KEY = 'testsets:published';

export interface TestSetCacheData {
  testSet: any;
  writing: any[];
  speaking: any[];
  reading: any[];
  listening: any[];
}

/**
 * Get or set cache for all questions and details in a test set.
 */
export const getOrSetTestSetCache = async (testSetNumber: number): Promise<TestSetCacheData> => {
  const key = `testset:${testSetNumber}:questions`;
  try {
    const cached = await redis.get(key);
    if (cached) {
      logger.info(`[Redis Cache] Hit for test set ${testSetNumber} questions`);
      return JSON.parse(cached);
    }
  } catch (error) {
    logger.error(`[Redis Cache] Error reading cache for test set ${testSetNumber}:`, error);
  }

  // Cache miss: query from database
  logger.info(`[Redis Cache] Miss for test set ${testSetNumber} questions. Querying MongoDB.`);
  const [testSet, writing, speaking, reading, listening] = await Promise.all([
    TestSet.findOne({ testSetNumber }).lean(),
    WritingQuestion.find({ testSetNumber }).lean(),
    SpeakingQuestion.find({ testSetNumber })
      .sort({ taskNumber: 1, subTask: 1 })
      .lean(),
    QuestionBank.find({ testSetNumber, module: 'reading' })
      .sort({ taskNumber: 1 })
      .lean(),
    QuestionBank.find({ testSetNumber, module: 'listening' })
      .sort({ taskNumber: 1 })
      .lean(),
  ]);

  const data: TestSetCacheData = {
    testSet,
    writing,
    speaking,
    reading,
    listening,
  };

  try {
    await redis.setex(key, CACHE_TTL, JSON.stringify(data));
    logger.info(`[Redis Cache] Cached questions for test set ${testSetNumber}`);
  } catch (error) {
    logger.error(`[Redis Cache] Error writing cache for test set ${testSetNumber}:`, error);
  }

  return data;
};

/**
 * Clear cache for a specific test set.
 */
export const clearCachedQuestions = async (testSetNumber: number): Promise<void> => {
  const key = `testset:${testSetNumber}:questions`;
  try {
    await redis.del(key);
    logger.info(`[Redis Cache] Invalidated cache for test set ${testSetNumber}`);
  } catch (error) {
    logger.error(`[Redis Cache] Error deleting cache for test set ${testSetNumber}:`, error);
  }
};

/**
 * Get or set cache for the published test sets list.
 */
export const getOrSetPublishedTestsCache = async (queryFn: () => Promise<any[]>): Promise<any[]> => {
  try {
    const cached = await redis.get(PUBLISHED_TESTS_KEY);
    if (cached) {
      logger.info(`[Redis Cache] Hit for published test sets list`);
      return JSON.parse(cached);
    }
  } catch (error) {
    logger.error(`[Redis Cache] Error reading published test sets cache:`, error);
  }

  logger.info(`[Redis Cache] Miss for published test sets list. Fetching from DB.`);
  const data = await queryFn();

  try {
    await redis.setex(PUBLISHED_TESTS_KEY, CACHE_TTL, JSON.stringify(data));
    logger.info(`[Redis Cache] Cached published test sets list`);
  } catch (error) {
    logger.error(`[Redis Cache] Error writing published test sets cache:`, error);
  }

  return data;
};

/**
 * Clear cache for the published test sets list.
 */
export const clearPublishedTestsCache = async (): Promise<void> => {
  try {
    await redis.del(PUBLISHED_TESTS_KEY);
    logger.info(`[Redis Cache] Invalidated published test sets list cache`);
  } catch (error) {
    logger.error(`[Redis Cache] Error deleting published test sets cache:`, error);
  }
};
