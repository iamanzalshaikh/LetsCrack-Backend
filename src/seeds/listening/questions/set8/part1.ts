/** Test Set 8 — Part 1 Community Skating Rink (distribution 3-3-2). Audio uploaded via admin. */

const SECTION1_SCRIPT = `Man: Hi. I need to hire skates for my daughter. She's seven, and this is her first time on ice.
Woman: Lovely, we get a lot of first-timers on a Saturday. What size shoe does she take?
Man: A one, I think? Possibly a two by now, she seems to outgrow everything the moment I buy it.
Woman: Then bring her to the counter and I'll fit her myself rather than going by the number. A skate that's too big is far more dangerous than one that feels a bit firm, because her ankle rolls the moment she leans.
Man: That makes sense. Anything else I should know before we go out?
Woman: Helmets are compulsory for anyone under twelve on our ice. We do lend them, though there's a queue for the small sizes on a busy day.
Man: No need, she's got her bicycle helmet in the car.`;

const SECTION2_SCRIPT = `Woman: One more thing that helps enormously. Take one of those support frames out with her. She pushes it along in front and it takes the fear out of the first half hour.
Man: Is there a charge for those?
Woman: They're free, but we've only six of them, and on a weekend they're all gone within about twenty minutes of opening.
Man: Then I'll take one now while there's still one standing there. Should I be out on the ice with her, or is that just asking for trouble?
Woman: If you can skate, absolutely go with her. If you can't, stay by the boards where you can reach her, because a parent going down on the ice is behind more of our injuries than the children ever are.`;

const SECTION3_SCRIPT = `Man: I should say, I haven't been on a pair of skates since I was about fifteen, so I'll be keeping a firm hold of that barrier the entire time.
Woman: Very wise, and there's no shame in it. If she takes to it today, have a look at the beginners' session on Sunday mornings. There's an instructor actually on the ice with them, and there are far fewer people, so the little ones get a proper attention.
Man: Is that something you have to book, or do you just turn up?
Woman: Just turn up, though come a few minutes early for skates.
Man: She'll want to, I'm fairly sure. She's been on at me to bring her here ever since she sat and watched the winter games on television back in February.
Woman: Then she's halfway there already. Off you go, and enjoy it.`;

export const LISTENING_SET8_PART1_MCQS = [
  {
    questionText: 'Why has the man come to the rink?',
    options: [
      'to watch a competition',
      'to hire equipment for his child',
      'to return borrowed skates',
      'to book a private lesson',
    ],
    correctOption: 1,
    sectionAudioUrl: '',
    sectionIntroText:
      'You will hear a conversation between a man and a woman at a community skating rink. The woman works at the rental counter and the man is a visitor. You will hear the conversation only once.',
    sectionScript: SECTION1_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'Why does the woman want to fit the skates herself?',
    options: [
      'An oversized skate is unsafe.',
      'To match skates with helmet.',
      'The skates are expensive.',
      'The man does not know the size.',
    ],
    correctOption: 0,
    questionAudioUrl: '',
  },
  {
    questionText: 'What is likely true about the man?',
    options: [
      'He is buying, not renting.',
      'He skates regularly himself.',
      'He has been here before.',
      'He does not have to borrow a helmet.',
    ],
    correctOption: 3,
    questionAudioUrl: '',
  },
  {
    questionText: 'What is true about the support frames?',
    options: [
      'They are few and taken quickly.',
      'They are for adults only.',
      'They cost a small fee.',
      'They must be reserved.',
    ],
    correctOption: 0,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the second section of the conversation shortly.',
    sectionScript: SECTION2_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'Why does the man take a frame immediately?',
    options: [
      'They are cheaper early.',
      'His daughter asked for one.',
      'They may all be gone shortly.',
      'The woman insisted.',
    ],
    correctOption: 2,
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the woman warn about?',
    options: [
      'The ice is thin near the edge.',
      'Children may not skate alone.',
      'The session is ending soon.',
      'Falling adults cause many injuries.',
    ],
    correctOption: 3,
    questionAudioUrl: '',
  },
  {
    questionText: 'What is true about the Sunday session?',
    options: [
      'It is for advanced skaters.',
      'It costs extra.',
      'It is quieter and supervised.',
      'It runs in the evening.',
    ],
    correctOption: 2,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the third section of the conversation shortly.',
    sectionScript: SECTION3_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'What is likely true about the daughter?',
    options: [
      'She prefers other sports.',
      'She has wanted to skate for months.',
      'She is nervous about the ice.',
      'She has skated once before.',
    ],
    correctOption: 1,
    questionAudioUrl: '',
  },
];
