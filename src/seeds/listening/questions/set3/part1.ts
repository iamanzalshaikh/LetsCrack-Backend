/** Test Set 3 — Part 1 University Campus (distribution 3-2-3). Audio uploaded via admin. */

const SECTION1_SCRIPT = `Woman: Excuse me, I'm sorry to bother you. My lecture began ten minutes ago and I simply cannot find the building.
Man: You're not bothering me at all, that's what this desk is for. It's the first week, so half the campus is going round in circles. Which building do you need?
Woman: Kingsley Hall. My phone keeps bringing me back to this quad, but I've walked round it twice and there's nothing with that name on it.
Man: Ah, I know exactly what's happened. There are two of them. The one you're standing beside is Kingsley Annexe. The lecture theatres are in Kingsley Hall itself, over on north campus.
Woman: There's a north campus? I had no idea. I only arrived from Winnipeg last week and I've barely been further than the library.
Man: You're the fourth person to ask me that this morning, so please don't feel singled out.`;

const SECTION2_SCRIPT = `Man: Right, let's get you there. On foot it's over the footbridge behind this building, about ten minutes at a steady pace. Or there's the campus shuttle from the library stop, though it only runs every quarter of an hour.
Woman: Then I'll walk. If I stand waiting for a shuttle that doesn't come, I'll have missed the whole hour.
Man: Sensible. Nobody's going to stop you slipping in at the back in week one. There is one catch, though. The north campus doors are card-controlled, so you'll need to tap your student card to get through.
Woman: That's the other problem. Mine hasn't arrived. I registered on the Friday and they told me it would come by post.
Man: Then take one of these visitor passes. It opens any door on either campus, but only until five o'clock this afternoon. They expire at the end of each day.
Woman: That gets me through the door, which is all I need right now.`;

const SECTION3_SCRIPT = `Woman: And what do I do about getting the real card?
Man: The registrar's office, ground floor of this building, just past the noticeboards. Take photo identification with you and they'll print it while you wait. It's usually five minutes.
Woman: I'll come back once my lecture has finished. I've a two-hour gap this afternoon, so there's no great rush.
Man: Perfect. One last thing, install the university's own app before tomorrow. It maps both sites and it knows the difference between the two Kingsleys, which your phone's map plainly doesn't.
Woman: I've discovered that the hard way this morning.
Man: Everybody does, honestly. Give it a fortnight and you'll be the one standing here giving directions to somebody else.
Woman: I hope so. Thank you, you've rescued my morning.`;

export const LISTENING_SET3_PART1_MCQS = [
  {
    questionText: 'Why does the woman approach the man?',
    options: [
      'to report a lost phone',
      'to collect a printed map',
      'to enrol in a course',
      'to find where her class is held',
    ],
    correctOption: 3,
    sectionAudioUrl: '',
    sectionIntroText:
      'You will hear a conversation between a woman and a man on a university campus. The woman is a student and the man works at the information desk. You will hear the conversation only once.',
    sectionScript: SECTION1_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: "What caused the woman's difficulty?",
    options: [
      'Her lecture was moved at short notice.',
      'Two buildings have similar names.',
      'She misread her timetable.',
      'Her phone had no signal.',
    ],
    correctOption: 1,
    questionAudioUrl: '',
  },
  {
    questionText: 'What is likely true about the woman?',
    options: [
      'She teaches at the university.',
      'She lives on the north campus.',
      'She is new to the area.',
      'She has studied here before.',
    ],
    correctOption: 2,
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the woman decide to do?',
    options: [
      'travel there on foot',
      'postpone the lecture',
      'wait for the shuttle',
      'borrow a bicycle',
    ],
    correctOption: 0,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the second section of the conversation shortly.',
    sectionScript: SECTION2_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'What is true about the visitor pass?',
    options: [
      'It takes the place of a student card.',
      'It works on one campus only.',
      'It must be handed back tomorrow.',
      'It stops working later the same day.',
    ],
    correctOption: 3,
    questionAudioUrl: '',
  },
  {
    questionText: 'What will the woman most likely do next?',
    options: [
      'return to her residence',
      'attend her lecture',
      'catch the shuttle',
      'go and collect her card',
    ],
    correctOption: 1,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the third section of the conversation shortly.',
    sectionScript: SECTION3_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the man recommend?',
    options: [
      'using an application made for the university',
      'arriving an hour early',
      'printing a paper timetable',
      'asking a classmate for directions',
    ],
    correctOption: 0,
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the man suggest about her situation?',
    options: [
      'It will continue all term.',
      'It could have been avoided easily.',
      'Newcomers commonly experience it.',
      'It is unusual for a student.',
    ],
    correctOption: 2,
    questionAudioUrl: '',
  },
];
