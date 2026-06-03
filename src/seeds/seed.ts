import mongoose from 'mongoose';
import connectDB from '../config/database.js';
import QuestionBank from '../models/QuestionBank.js';
import ScoreMapping from '../models/ScoreMapping.js';
import logger from '../utils/logger.js';

const seedReadingData = async () => {
  try {
    logger.info('Connecting to MongoDB for seeding...');
    await connectDB();

    // 1. Clear previous reading tasks and score mappings for Test Set #1
    logger.info('Clearing old Reading Set #1 question bank and mapping documents...');
    await QuestionBank.deleteMany({ module: 'reading', testSetNumber: 1 });
    await ScoreMapping.deleteMany({ module: 'reading', testSetNumber: 1 });

    // 2. Insert Score Mapping configs
    logger.info('Inserting Score Mappings for CELPIP Reading...');
    const readingScoreMapping = new ScoreMapping({
      module: 'reading',
      testSetNumber: 1,
      mappings: [
        { minScore: 33, maxScore: 38, band: '10-12' },
        { minScore: 31, maxScore: 32, band: '9' },
        { minScore: 28, maxScore: 30, band: '7-8' },
        { minScore: 20, maxScore: 27, band: '5-6' },
        { minScore: 8,  maxScore: 19, band: '3-4' },
        { minScore: 0,  maxScore: 7,  band: 'M' }
      ]
    });
    await readingScoreMapping.save();

    // 3. Seed Reading Part 1: Reading Correspondence
    logger.info('Seeding Reading Part 1...');
    const part1 = new QuestionBank({
      module: 'reading',
      testSetNumber: 1,
      taskNumber: 1,
      title: 'Reading Correspondence',
      instructions: 'Read the following message. Answer the questions and complete the reply email below by choosing the correct options from the dropdown menus.',
      timerSeconds: 600, // 10 minutes
      layoutType: 'split',
      leftPanel: {
        type: 'markdown',
        contentBlocks: [
          `Dear Grandpa,

Thank you so much! I was surprised and delighted to receive your parcel and open your thoughtful present. A two-person camping tent is just what I needed. I've used it already; my friend Ryan and I spent a week camping in the Kootenay region of BC. We just got back. I was going to use our old family tent, but it's not only too big, it is also getting pretty worn out, so your gift was perfect.

We planned on camping at various locations in the Kootenay region, but we ended up staying at our first campsite for the whole trip. The campground, located on the east side of Arrow Lake, was called McDonald Creek Provincial Park. We were looking forward to the white sand beach, but when we arrived, the park ranger informed us that all the recent rainfall had caused the lake to flood a couple metres higher than normal. The beach was completely submerged. We still had a great time, though, hiking in the beautiful wilderness.

We drove a different route to get home so we could pass through the city of Nelson. It looks different from the last time I was there, but that's not too surprising; I was there just a couple times as a kid. Last time we were there, Dad showed me the house where he had been born, and also your old clothing store. I drove around and I couldn't find your old house, Grandpa; however, I did find your old store! It's a cafe now, but they kept your old shop sign as a decoration in the cafe. I got pretty emotional when I saw it. I felt really proud of our family history.

Now I'm back in Calgary, but the trip to Nelson made me realize how much I miss you. So, I was thinking that maybe I should fly over...`
        ]
      },
      rightPanel: {
        sections: [
          {
            type: 'standalone_dropdown',
            questions: [
              {
                id: 'rd-p1-q1',
                type: 'single_select',
                label: '1. Greg',
                options: ['is currently in Calgary.', 'is currently in Nelson.', 'is currently in Arrow Lake.', 'is currently in Vancouver.'],
                correctAnswer: 0,
                order: 1
              },
              {
                id: 'rd-p1-q2',
                type: 'single_select',
                label: '2. Greg and Ryan',
                options: ['spent a week camping.', 'visited Dad in Nelson.', 'went shopping for a tent.', 'stayed at Greg\'s old house.'],
                correctAnswer: 0,
                order: 2
              },
              {
                id: 'rd-p1-q3',
                type: 'single_select',
                label: '3. Greg took an alternative way back because',
                options: ['he wanted to visit Nelson.', 'the park ranger advised it.', 'the campground flooded.', 'the main road was closed.'],
                correctAnswer: 0,
                order: 3
              },
              {
                id: 'rd-p1-q4',
                type: 'single_select',
                label: '4. Greg became emotional when',
                options: ['he saw his old house.', 'he found his old family tent.', 'he saw his grandpa\'s old shop sign.', 'he couldn\'t find the beach.'],
                correctAnswer: 2,
                order: 4
              },
              {
                id: 'rd-p1-q5',
                type: 'single_select',
                label: '5. Greg is hoping to',
                options: ['visit Grandpa soon.', 'fly to Nelson for hiking.', 'go camping with Ryan again.', 'buy another new tent.'],
                correctAnswer: 0,
                order: 5
              },
              {
                id: 'rd-p1-q6',
                type: 'single_select',
                label: '6. Greg\'s grandpa',
                options: ['used to run a clothing store.', 'lives in Nelson now.', 'is a park ranger.', 'is currently in Calgary.'],
                correctAnswer: 0,
                order: 6
              }
            ]
          },
          {
            type: 'inline_dropdown',
            template: `Dear Greg,

It goes without saying that I'd love to {{7}}. Now with my old bones, I'm not so sure that {{8}} but your dad and I can certainly {{9}}. I remember the Kootenays well. Ryan is {{10}} who accompanied you. I'm glad my gift was useful, and I'm very touched you found my old shop sign. Let's stay in touch and make plans for {{11}}.

Love,
Grandpa`,
            questions: [
              {
                id: 'rd-p1-q7',
                type: 'inline_select',
                options: ['visit you in Calgary.', 'go camping with you.', 'drive around Nelson.', 'buy you a new tent.'],
                correctAnswer: 0,
                order: 7
              },
              {
                id: 'rd-p1-q8',
                type: 'inline_select',
                options: ['I can sleep in a tent', 'I can drive that far', 'I can find Nelson', 'I can fly to Calgary'],
                correctAnswer: 0,
                order: 8
              },
              {
                id: 'rd-p1-q9',
                type: 'inline_select',
                options: ['help you buy a tent.', 'show you Dad\'s childhood home.', 'come up for a short weekend visit.', 'mail you another parcel.'],
                correctAnswer: 2,
                order: 9
              },
              {
                id: 'rd-p1-q10',
                type: 'inline_select',
                options: ['the cousin', 'the friend', 'the park ranger', 'the shop owner'],
                correctAnswer: 1,
                order: 10
              },
              {
                id: 'rd-p1-q11',
                type: 'inline_select',
                options: ['your return next month.', 'our camping trip.', 'your flight.', 'another hiking adventure.'],
                correctAnswer: 2,
                order: 11
              }
            ]
          }
        ]
      },
      metadata: {
        difficulty: 'medium',
        tags: ['camping', 'family', 'letter'],
        source: 'celpip-general-practice-1',
        estimatedTime: 600
      }
    });
    await part1.save();

    // 4. Seed Reading Part 2: Reading to Apply a Diagram
    logger.info('Seeding Reading Part 2...');
    const part2 = new QuestionBank({
      module: 'reading',
      testSetNumber: 1,
      taskNumber: 2,
      title: 'Reading to Apply a Diagram',
      instructions: 'Look at the diagram on the left. Read the email message on the right and complete it by choosing the best options from the dropdown menus.',
      timerSeconds: 480, // 8 minutes
      layoutType: 'split',
      leftPanel: {
        type: 'image',
        contentBlocks: ['**KARATE — 30 Years In Burnaby**\nEdmonds Community Center / Bonsor Community Center. Contact David Lee: 604 433 3313\n\n**A1 Math and Chess**\nK-12 math tutoring & enrichment. Contact: Bob Chen 604 324 4111\n\n**Trimble Dance Studio**\nAfter school and weekends. Ages 5 to 12. Register online: www.trimbledance.ca\n\n**K12 Plus Learning**\nMath Science English French ESL. Call 604 565 MATH'],
        mediaUrl: 'https://res.cloudinary.com/lce-question-media/image/upload/v1716301290/lce-question-media/diagram_karate_chess.png'
      },
      rightPanel: {
        sections: [
          {
            type: 'inline_dropdown',
            template: `Subject: Kids Activities
To: Mary S. <m.smithers@frimpton.bc.ca>
From: Sandy Rockton <srockton@sterlings.ca>

Hi Mary,

It was a pleasure meeting you and the kids at the park on Sunday. I hope you're settling into our neighborhood. You said you were looking for {{1}}. I saw a few possibilities in the latest Burnaby Parks and Recreation brochure. I remember you saying that Alex is contemplative, so {{2}} seems a great choice for thinkers like Alex. He will get to think hard and learn some additional math skills. You said Melissa is quite scared of math, in which case you could check out {{3}} to help her feel better about her schoolwork. They offer science and math tutoring, and they are located nearby.

Speaking of Melissa, she may want to join my daughter Cindy at {{4}} which runs on weekends and after school, for children aged 5 to 12. Cindy absolutely loves it. Finally, if the kids want some physical training, there is {{5}} which has been operating for {{6}} in Burnaby. The contact person is {{7}}. Let me know if you want to call them; otherwise, you can register online at the website listed for Trimble. Let's catch up soon!

Best,
Sandy`,
            questions: [
              {
                id: 'rd-p2-q1',
                type: 'inline_select',
                options: ['activities for the kids.', 'a new home in the neighborhood.', 'a sports coach.', 'a nearby shopping center.'],
                correctAnswer: 0,
                order: 1
              },
              {
                id: 'rd-p2-q2',
                type: 'inline_select',
                options: ['A1 Math and Chess', 'Trimble Dance Studio', 'Eastburn Soccer', 'K12 Plus Learning'],
                correctAnswer: 0,
                order: 2
              },
              {
                id: 'rd-p2-q3',
                type: 'inline_select',
                options: ['K12 Plus Learning', 'Bonsor Community Center Karate', 'Trimble Dance Studio', 'A1 Math and Chess'],
                correctAnswer: 0,
                order: 3
              },
              {
                id: 'rd-p2-q4',
                type: 'inline_select',
                options: ['Trimble Dance Studio', 'Bonsor Karate Classes', 'Eastburn Soccer League', 'A1 Chess Club'],
                correctAnswer: 0,
                order: 4
              },
              {
                id: 'rd-p2-q5',
                type: 'inline_select',
                options: ['Karate classes', 'Soccer training', 'Dance lessons', 'Math lessons'],
                correctAnswer: 0,
                order: 5
              },
              {
                id: 'rd-p2-q6',
                type: 'inline_select',
                options: ['30 years', '10 years', '15 years', '5 years'],
                correctAnswer: 0,
                order: 6
              },
              {
                id: 'rd-p2-q7',
                type: 'inline_select',
                options: ['David Lee', 'Bob Chen', 'Sandy Rockton', 'Mary S.'],
                correctAnswer: 0,
                order: 7
              },
              {
                id: 'rd-p2-q8',
                type: 'inline_select',
                options: ['Saturday morning.', 'Sunday afternoon.', 'the weekend.', 'weekdays.'],
                correctAnswer: 2,
                order: 8
              }
            ]
          }
        ]
      },
      metadata: {
        difficulty: 'medium',
        tags: ['diagram', 'activities', 'email'],
        source: 'celpip-general-practice-1',
        estimatedTime: 480
      }
    });
    await part2.save();

    // 5. Seed Reading Part 3: Reading for Information
    logger.info('Seeding Reading Part 3...');
    const part3 = new QuestionBank({
      module: 'reading',
      testSetNumber: 1,
      taskNumber: 3,
      title: 'Reading for Information',
      instructions: 'Read the following passage. Decide which paragraph (A, B, C, D, or E) matches each statement, or choose "Not Given" (E) if no paragraph matches.',
      timerSeconds: 540, // 9 minutes
      layoutType: 'split',
      leftPanel: {
        type: 'markdown',
        contentBlocks: [
          `[A] The first record of chewing gum dates back to Finland, about 5,000 years ago. Neolithic-period chewing gum was made of bark tar and was widely utilized for its antiseptic and medicinal properties. In America, chewing gum was first introduced to settlers by the American Indians who chewed resin made from the sap of spruce trees. After World War II, chewing gum was made of a latex sap substance called chicle, which has been steadily engineered and replaced by synthetic rubbers and artificial sweeteners that allow for greater flavouring, colouring, and texture. Modern chewing gum hardly resembles its predecessors in appearance and flavour. It has also gained unprecedented popularity, becoming a 20-billion-dollar industry in North America.

[B] Over the past decades, the bad reputation chewing gum earned for causing cavities and gum disease has begun to dwindle. With the advent of sugarless chewing gum, most dentists today deem chewing gum in moderation to be harmless, or even potentially beneficial to oral hygiene. In addition, functional chewing gum, a special category of gum that imparts a practical function in addition to, or as a replacement for, the usual enjoyment provided by a confectionery gum, has become increasingly prescribed by dentists and doctors alike. Conditions such as bad breath and tobacco addictions are now commonly treated with functional gum. Surgeons also prescribe functional chewing gum for patients recovering from gastrointestinal surgeries.

[C] Recent research suggests the benefits of gum may not be limited to medicated gum. Chewing regular gum has been found to boost cognitive functions. In one study, participants who chewed gum performed significantly better on cognitive tasks, showing enhanced memory recall and quicker reaction times. Scientists believe the act of chewing increases heart rate and blood flow to the brain, supplying it with more oxygen and glucose. This physical stimulation activates the hippocampus, the area of the brain responsible for memory and learning, thereby improving concentration and alertness.

[D] However, critics point out that not all chewing gum is beneficial. There can be lifelong damage associated with regular intake of synthetic sugars, which are common in sugar-free gums. Artificial sweeteners like aspartame have been linked to headaches, digestive issues, and in some studies, long-term metabolic disruptions. Furthermore, chewing gum can curb some unhealthy dependence behaviours like smoking or snacking, but it does not resolve the underlying psychological causes of those habits, sometimes replacing one dependency with another.

[E] In addition, some dental researchers oppose the reported benefits of chewing gum. They argue that excessive chewing can lead to temporomandibular joint disorder (TMD), a painful condition affecting the jaw joints and muscles. Furthermore, they express concerns that patients who chew gum regularly tend to be more neglectful of their oral hygiene, believing that chewing gum replaces the need for brushing and flossing. They emphasize that while sugar-free gum can assist in cleaning teeth after meals, it is not a substitute for traditional dental care.`
        ]
      },
      rightPanel: {
        sections: [
          {
            type: 'paragraph_match',
            matchingQuestions: [
              {
                id: 'rd-p3-q1',
                statement: 'Evidence suggests gum chewing can enhance some brain functions.',
                correctParagraph: 'C',
                order: 1
              },
              {
                id: 'rd-p3-q2',
                statement: 'The chemical bases of chewing gum have been reformulated.',
                correctParagraph: 'A',
                order: 2
              },
              {
                id: 'rd-p3-q3',
                statement: 'Chewing gum is used post-operatively as a healing aid.',
                correctParagraph: 'B',
                order: 3
              },
              {
                id: 'rd-p3-q4',
                statement: 'There can be lifelong damage associated with regular intake of synthetic sugars.',
                correctParagraph: 'D',
                order: 4
              },
              {
                id: 'rd-p3-q5',
                statement: 'Chewing gum can curb some unhealthy dependence behaviours.',
                correctParagraph: 'D',
                order: 5
              },
              {
                id: 'rd-p3-q6',
                statement: 'Some researchers oppose the reported benefits of chewing gum.',
                correctParagraph: 'E',
                order: 6
              },
              {
                id: 'rd-p3-q7',
                statement: 'Patients who chew gum regularly tend to be more neglectful of their oral hygiene.',
                correctParagraph: 'E',
                order: 7
              },
              {
                id: 'rd-p3-q8',
                statement: 'Early chewing gum was entirely natural.',
                correctParagraph: 'A',
                order: 8
              },
              {
                id: 'rd-p3-q9',
                statement: 'The benefits of sugar-free gum are recognized.',
                correctParagraph: 'B',
                order: 9
              }
            ]
          }
        ]
      },
      metadata: {
        difficulty: 'hard',
        tags: ['history', 'science', 'health'],
        source: 'celpip-general-practice-1',
        estimatedTime: 540
      }
    });
    await part3.save();

    // 6. Seed Reading Part 4: Reading for Viewpoints
    logger.info('Seeding Reading Part 4...');
    const part4 = new QuestionBank({
      module: 'reading',
      testSetNumber: 1,
      taskNumber: 4,
      title: 'Reading for Viewpoints',
      instructions: 'Read the following article from a website. Answer the questions and complete the reader comment below by choosing the correct options from the dropdown menus.',
      timerSeconds: 720, // 12 minutes
      layoutType: 'split',
      leftPanel: {
        type: 'markdown',
        contentBlocks: [
          `Stephanie Lee is a science teacher at Ryerson Secondary who believes that real science should encourage critical thinking, even if it means challenging what's written in the textbook. Part of the curriculum involves learning about climate change, and Lee was dismayed to find the textbook material to be "little more than propaganda, which claims that global warming is chiefly a human-caused phenomenon."

Lee argues that education is supposed to teach students how to see objectively, yet textbooks often monopolize certain viewpoints and push them as the only truth. In the case of climate change, Lee was appalled to find that no alternative theories were presented. "The absence of other perspectives seems to indicate that the topic seeks to diminish the credibility of other points of view," Lee says. Lee taught her students additional perspectives. Not only did she teach the theory of anthropogenic global warming, that is, that global warming is caused by human consumption of fossil fuels and the release of carbon dioxide into the atmosphere, but also taught that throughout history, the earth's temperature has naturally risen and fallen.

Other science teachers at Lee's school have raised concerns that Lee's approach is only confusing students. Carol Harvey argues that the greenhouse gas effect and subsequent global warming is not a controversy in the scientific community. It has been proven that humans have increased the amount of greenhouse gases in the atmosphere by roughly 30% in the last 100 years. "Our textbooks are up to date, and Lee is only prompting students to dismiss established scientific consensus," Harvey contends. She believes that teaching unproven alternative theories does a disservice to science education...`
        ]
      },
      rightPanel: {
        sections: [
          {
            type: 'standalone_dropdown',
            questions: [
              {
                id: 'rd-p4-q1',
                type: 'single_select',
                label: '1. Stephanie Lee\'s main objective in teaching science is to',
                options: ['foster critical thinking.', 'challenge all school rules.', 'dismiss textbooks entirely.', 'prove global warming is a hoax.'],
                correctAnswer: 0,
                order: 1
              },
              {
                id: 'rd-p4-q2',
                type: 'single_select',
                label: '2. According to Lee, the main issue with textbooks is that',
                options: ['they monopolize certain viewpoints.', 'they are completely outdated.', 'they are too expensive for schools.', 'they are too difficult to read.'],
                correctAnswer: 0,
                order: 2
              },
              {
                id: 'rd-p4-q3',
                type: 'single_select',
                label: '3. Lee\'s opinion on climate change differs from science textbooks in that',
                options: ['she includes historical natural cycles.', 'she completely denies temperature rises.', 'she claims carbon dioxide is beneficial.', 'she focuses purely on human causes.'],
                correctAnswer: 0,
                order: 3
              },
              {
                id: 'rd-p4-q4',
                type: 'single_select',
                label: '4. The main criticism of Lee\'s teaching approach is that',
                options: ['it confuses students and dismisses consensus.', 'it does not match the exam syllabus.', 'it relies too heavily on old books.', 'it takes up too much class time.'],
                correctAnswer: 0,
                order: 4
              },
              {
                id: 'rd-p4-q5',
                type: 'single_select',
                label: '5. Carol Harvey responds to criticisms of textbooks by saying they',
                options: ['accurately reflect established consensus.', 'need to be revised next year.', 'present balanced points of view.', 'confuse students with too many details.'],
                correctAnswer: 0,
                order: 5
              }
            ]
          },
          {
            type: 'inline_dropdown',
            template: `I read this article about Stephanie Lee's science class. I think Lee is right that schools should {{6}}. The trouble is how to present climate change without {{7}}. Carol Harvey's comment that textbooks {{8}} shows she doesn't value independent thinking. If teachers only teach consensus, they risk {{9}}. I support teachers who {{10}} in the classroom.`,
            questions: [
              {
                id: 'rd-p4-q6',
                type: 'inline_select',
                options: ['encourage critical analysis.', 'buy newer textbooks.', 'follow the curriculum strictly.', 'ban debate on science.'],
                correctAnswer: 0,
                order: 6
              },
              {
                id: 'rd-p4-q7',
                type: 'inline_select',
                options: ['confusing young minds.', 'teaching any global warming.', 'limiting students\' perspectives.', 'debating science history.'],
                correctAnswer: 2,
                order: 7
              },
              {
                id: 'rd-p4-q8',
                type: 'inline_select',
                options: ['are accurate and sufficient', 'are biased and outdated', 'are too hard for students', 'should be replaced by articles'],
                correctAnswer: 0,
                order: 8
              },
              {
                id: 'rd-p4-q9',
                type: 'inline_select',
                options: ['indoctrinating students.', 'failing exams.', 'losing public funding.', 'boring the children.'],
                correctAnswer: 0,
                order: 9
              },
              {
                id: 'rd-p4-q10',
                type: 'inline_select',
                options: ['present alternative viewpoints', 'teach strictly from textbooks', 'avoid controversial topics', 'focus on math only'],
                correctAnswer: 0,
                order: 10
              }
            ]
          }
        ]
      },
      metadata: {
        difficulty: 'hard',
        tags: ['education', 'climate-change', 'debate'],
        source: 'celpip-general-practice-1',
        estimatedTime: 720
      }
    });
    await part4.save();

    logger.info('Reading Test Set #1 data and score mappings seeded successfully!');
  } catch (error) {
    logger.error('Error seeding reading database data:', error);
  } finally {
    logger.info('Closing database connection...');
    await mongoose.connection.close();
    logger.info('Seeding finished.');
  }
};

seedReadingData();
