/** Test Set 5 — Part 1 Apartment Building (distribution 3-3-2). Audio uploaded via admin. */

const SECTION1_SCRIPT = `Woman: Sorry to knock unannounced, we haven't actually met. I'm in the unit directly below yours, and there's water coming through my ceiling.
Man: Water? I haven't noticed a thing up here. When did it start?
Woman: This morning, right above my kitchen counter. I put a bucket underneath before I left for work, and when I came back at lunchtime it was half full.
Man: My kitchen is directly above yours. I did run the dishwasher before I went out, and I've not been back since.
Woman: That may well be it. I didn't want to go straight to the building manager and make a formal complaint about someone I've never spoken to. It seemed only fair to knock first.
Man: I'm very glad you did. Come in and let's have a look at it together.`;

const SECTION2_SCRIPT = `Man: Well, there's your answer. The floor under the dishwasher is soaked, and look, the hose at the back has worked its way loose from the fitting.
Woman: Is that something that can just be tightened, or does the whole thing need replacing?
Man: I genuinely wouldn't want to guess, and I'd rather not make it worse by fiddling with it. What I can do right now is shut the valve off so nothing more goes through your ceiling.
Woman: Should I still let the manager know, then, or does that seem unnecessary now?
Man: No, please do tell him. Plumbing inside the walls is the building's responsibility, not ours, and they'll want it recorded properly before anyone repairs it. I'll ring him from my side as well, so he hears it from both of us.`;

const SECTION3_SCRIPT = `Woman: My ceiling has a great brown stain right across it now. Will that get put right, or is that something I'm stuck with?
Man: It should be covered, but do photograph it today, before the edges dry out and fade into the plaster. Once it's dried pale they'll tell you it's an old mark and argue about it.
Woman: How do you know all this?
Man: Because exactly the same thing happened to the unit on the third floor last winter, and the poor woman there had a fortnight of arguing because she cleaned it up first and had nothing to show anyone.
Woman: Then I'll go straight down and take pictures before I do anything else. That's genuinely useful, thank you so much!`;

export const LISTENING_SET5_PART1_MCQS = [
  {
    questionText: "Why does the woman knock on the man's door?",
    options: [
      'to collect a parcel',
      'to complain about noise',
      'to borrow a tool',
      'to report water entering her home',
    ],
    correctOption: 3,
    sectionAudioUrl: '',
    sectionIntroText:
      'You will hear a conversation between a woman and a man in an apartment building. They live in the same building. You will hear the conversation only once.',
    sectionScript: SECTION1_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'What is likely true about the two people?',
    options: [
      'They are related.',
      'They had not met before today.',
      'They share the same unit.',
      'They are old friends.',
    ],
    correctOption: 1,
    questionAudioUrl: '',
  },
  {
    questionText: 'What is likely true about the woman?',
    options: [
      'She complains to the manager often.',
      'She intends to move out.',
      'She would rather settle matters directly.',
      'She works in building maintenance.',
    ],
    correctOption: 2,
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the man find in his kitchen?',
    options: [
      'dampness beneath an appliance',
      'a blocked drain',
      'a cracked pipe under the sink',
      'an overflowing sink',
    ],
    correctOption: 0,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the second section of the conversation shortly.',
    sectionScript: SECTION2_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'Why does the man not attempt the repair himself?',
    options: [
      'He is late for work.',
      'He is afraid of making it worse.',
      'He expects the woman to pay.',
      'He does not own any tools.',
    ],
    correctOption: 1,
    questionAudioUrl: '',
  },
  {
    questionText: 'Why does the man want the manager informed?',
    options: [
      'The woman may be charged rent.',
      'The manager lives nearby.',
      'The appliance is under warranty.',
      'The building is responsible for such repairs.',
    ],
    correctOption: 3,
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the man advise the woman to do?',
    options: [
      'take pictures before the marks fade',
      'move her furniture out',
      'repaint the ceiling herself',
      'wait a few days',
    ],
    correctOption: 0,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the third section of the conversation shortly.',
    sectionScript: SECTION3_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'How does the man know what to advise?',
    options: [
      'The manager told him this morning.',
      'He read the tenancy agreement.',
      'A similar incident occurred in the building.',
      'He works for an insurer.',
    ],
    correctOption: 2,
    questionAudioUrl: '',
  },
];
