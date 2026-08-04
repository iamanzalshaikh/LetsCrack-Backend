/** Test Set 4 — Part 1 Transit Lost and Found (distribution 3-3-2). Audio uploaded via admin. */

const SECTION1_SCRIPT = `Man: Hi. I think I left my backpack on the number twelve bus yesterday evening. Has anything like that been handed in?
Woman: Possibly. Let me take some details first. Which direction were you travelling, and where did you get off?
Man: Heading east, and I got off at Elm Street somewhere around six. I didn't notice it was missing until I was unlocking my front door.
Woman: That's useful. I should warn you, though. Anything a driver hands in goes to the depot first and only reaches this office a full day later, so something lost yesterday evening may not be on my shelves yet.
Man: I was afraid you'd say that. There are two textbooks in it, which I could replace, but my notebook is in there as well. That's a year of research notes and they exist nowhere else.
Woman: Then let's go through what I do have very carefully indeed.`;

const SECTION2_SCRIPT = `Woman: I've three bags in from that route this week. A navy one with a laptop inside, a grey one full of sports kit, and a child's bag with a lunch box in it.
Man: None of those, I'm afraid. Mine's plain black with a red zip pull, and there's certainly no laptop in it.
Woman: Then it hasn't come through yet. What I'll do is take a written description now, the colour, the zip, what's inside, and put it on our register. If it arrives over the next few days, whoever opens it will match it against your entry.
Man: And if nobody hands it in at all? How long do you keep looking?
Woman: We hold items for thirty days. After that anything unclaimed goes to a charity we work with. Nothing gets thrown away, but it does leave the building.
Man: A month. All right, that's something to work with.`;

const SECTION3_SCRIPT = `Man: Is there anything I can be doing at my end, other than sitting and waiting?
Woman: Yes. Look at the online property register each morning. Drivers photograph whatever they hand in at the end of a shift and the pictures go up overnight, so you'll often see something there before we've physically sorted it down here.
Man: And if I spot it, do I come straight down?
Woman: Only then. There's no point making the journey otherwise. If it reaches us first we'll telephone you, which is why I'd like your number on this form.
Man: Understood. I'll check first thing tomorrow.
Woman: That's great! For what it's worth, most of what comes through this office is back with its owner inside a week.`;

export const LISTENING_SET4_PART1_MCQS = [
  {
    questionText: 'What is this conversation about?',
    options: ['a damaged bag', 'a fare dispute', 'a lost item', 'a missed connection'],
    correctOption: 2,
    sectionAudioUrl: '',
    sectionIntroText:
      'You will hear a conversation between a man and a woman at a transit lost-and-found office. The woman works there and the man has lost something. You will hear the conversation only once.',
    sectionScript: SECTION1_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'When did the man realise his bag was gone?',
    options: [
      'the following morning',
      'after arriving at his home',
      'at the depot',
      'while still on the bus',
    ],
    correctOption: 1,
    questionAudioUrl: '',
  },
  {
    questionText: 'What is likely true about the man?',
    options: [
      'He has lost the bag before.',
      'He works for the transit service.',
      'He is engaged in study or research.',
      'He travels abroad frequently.',
    ],
    correctOption: 2,
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the woman conclude after checking?',
    options: [
      'His bag has not yet arrived.',
      'His bag was never handed in.',
      'His bag was taken by someone else.',
      'His bag is at another office.',
    ],
    correctOption: 0,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the second section of the conversation shortly.',
    sectionScript: SECTION2_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'What will the woman do next?',
    options: [
      'search the vehicle herself',
      'send him to another office',
      'telephone the bus depot',
      'enter his details on a register',
    ],
    correctOption: 3,
    questionAudioUrl: '',
  },
  {
    questionText: 'What is likely true about unclaimed property?',
    options: [
      'It is passed on rather than discarded.',
      'It is kept indefinitely after thirty days.',
      'It is sold for profit after thirty days.',
      'It is destroyed at once after thirty days.',
    ],
    correctOption: 0,
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the woman recommend he do each morning?',
    options: [
      'telephone the office',
      'look at pictures posted online',
      'speak to the driver',
      'visit the depot',
    ],
    correctOption: 1,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the third section of the conversation shortly.',
    sectionScript: SECTION3_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the woman suggest about lost property generally?',
    options: [
      'It is rarely handed in at all.',
      'Very little of it is ever found.',
      'It is usually damaged.',
      'Most of it reaches its owner before long.',
    ],
    correctOption: 3,
    questionAudioUrl: '',
  },
];
