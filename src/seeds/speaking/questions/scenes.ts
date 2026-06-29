/** Speaking Tasks 3 & 4 — shared scene images (30s prep / 60s recording). One image per test set (1–25). */

export const SPEAKING_SCENE_LABELS: string[] = [
  'Outdoor Street Scene',
  'City Intersection',
  'Shopping District',
  'Public Plaza',
  'Urban Park Path',
  'Town Square',
  'Furniture Showroom',
  'City Park Picnic',
  'Community Fair',
  'Busy Beach',
  'Supermarket',
  'Hospital Emergency Room',
  'Farm Picnic',
  'Rainy Bus Stop',
  'Theater Performance',
  'Outdoor Food Festival',
  'School Sports Day',
  'Museum Gallery',
  'Children\'s Birthday Party',
  'Lakeside Campsite',
  'Preschool Classroom',
  'Street Food Market',
  'Downtown Street',
  'Neighbourhood Park',
  'Community Centre',
];

export const SPEAKING_TASK3_QUESTION =
  'Describe some things that are happening in the picture below as well as you can. The person with whom you are speaking cannot see the picture.';

export const SPEAKING_TASK4_QUESTION =
  'In this picture, what do you think will most probably happen next?';

/** Varied prediction prompts per set (Task 4); Task 3 uses the standard CELPIP wording for all sets. */
export const SPEAKING_TASK4_PROMPTS: string[] = [
  'In this picture, what do you think will most probably happen next?',
  'Look at the scene again. What is the most likely thing to happen next?',
  'Based on what you see, what do you think will happen next in this picture?',
  'What do you think the people in this scene will most probably do next?',
  'In this picture, what do you predict will happen in the next few minutes?',
  'What do you think will most probably happen next in this street scene?',
  'In this furniture store, what do you think will most probably happen next?',
  'In this park scene, what do you think will most probably happen next?',
  'At this community fair, what do you think will most probably happen next?',
  'On this beach, what do you think will most probably happen next?',
  'In this supermarket, what do you think will most probably happen next?',
  'In this hospital waiting area, what do you think will most probably happen next?',
  'On this farm, what do you think will most probably happen next?',
  'At this rainy bus stop, what do you think will most probably happen next?',
  'During this theater performance, what do you think will most probably happen next?',
  'At this food festival, what do you think will most probably happen next?',
  'At this sports day, what do you think will most probably happen next?',
  'In this museum, what do you think will most probably happen next?',
  'At this birthday party, what do you think will most probably happen next?',
  'At this campsite, what do you think will most probably happen next?',
  'In this classroom, what do you think will most probably happen next?',
  'At this street food market, what do you think will most probably happen next?',
  'In this downtown scene, what do you think will most probably happen next?',
  'In this neighbourhood park, what do you think will most probably happen next?',
  'At this community centre, what do you think will most probably happen next?',
];

export function getSpeakingSceneImagePath(setNumber: number): string {
  const index = Math.min(Math.max(setNumber, 1), 25) - 1;
  return `/test/speaking-set-${String(index + 1).padStart(2, '0')}.png`;
}

export function buildTask3Prompt(): string {
  return `Describing a Scene\n\n${SPEAKING_TASK3_QUESTION}`;
}

export function buildTask4Prompt(setNumber: number): string {
  const prompt = SPEAKING_TASK4_PROMPTS[setNumber - 1] || SPEAKING_TASK4_QUESTION;
  return `Making Predictions\n\n${prompt}`;
}
