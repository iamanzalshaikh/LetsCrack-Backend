/** Test Set 7 — Part 1 Animal Shelter (distribution 2-3-3). Audio uploaded via admin. */

const SECTION1_SCRIPT = `Woman: Hi. There's a tabby cat on your website, Pepper I think she's called. Is she still here, or has she gone?
Man: Pepper's still with us, yes. Are you hoping to adopt, or would you be looking to foster?
Woman: Adopt. I've been turning it over for almost a year, and I've finally got a place with enough room and a job that keeps me local.
Man: That's good to hear. I should raise one thing early on, because it holds people up more than anything else. If you rent your home, we need written permission from your landlord before an adoption can go through. Not a phone call, something in writing.
Woman: I do rent. And I've never had to ask him for anything in three years, so I honestly don't know how he'll take being asked.
Man: In my experience most landlords are perfectly relaxed about a cat. It's worth the email.`;

const SECTION2_SCRIPT = `Man: While you're here, would you like to meet her? She's through in the quiet room. I'll warn you now, she won't come running.
Woman: Is she all right around children? My nephew stays with me some weekends.
Man: She's never once scratched anybody, and she's gentle when she's settled. But she deals with noise by disappearing, under a bed, behind a sofa, wherever she can get to. With a lively child in the house she'd need somewhere of her own to vanish to.
Woman: There's a spare room I hardly use. She could have that entirely to herself, and my nephew's only there two nights a month anyway.
Man: Then honestly, that's close to ideal for a cat like her.`;

const SECTION3_SCRIPT = `Woman: I'll email my landlord this afternoon. How long can you keep her for me while I wait?
Man: We don't formally hold animals, it wouldn't be fair on them. What I can do is put a note of your interest on her file for a week, so if somebody else enquires we'll ring you first.
Woman: A week should be more than enough. He answers quickly about anything to do with the apartment.
Man: And if the answer is no, do come back and see us anyway. We're permanently short of foster homes, and that doesn't need a landlord's letter for a short stay.
Woman: I hadn't thought of that at all. I might come back either way, actually.`;

export const LISTENING_SET7_PART1_MCQS = [
  {
    questionText: 'Why has the woman come to the shelter?',
    options: [
      'to take home an animal she saw online',
      'to donate supplies',
      'to report a stray',
      'to volunteer her time',
    ],
    correctOption: 0,
    sectionAudioUrl: '',
    sectionIntroText:
      'You will hear a conversation between a woman and a man at an animal shelter. The man works at the shelter and the woman is a visitor. You will hear the conversation only once.',
    sectionScript: SECTION1_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: "What is likely true about the woman's decision?",
    options: [
      'She is adopting for her nephew.',
      'She decided on impulse today.',
      'She has considered it for a long time.',
      'She was persuaded by a friend.',
    ],
    correctOption: 2,
    questionAudioUrl: '',
  },
  {
    questionText: 'Why does the woman ask about children?',
    options: [
      'A young relative stays with her.',
      'She has children of her own.',
      'She runs a daycare.',
      'The shelter requires it.',
    ],
    correctOption: 0,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the second section of the conversation shortly.',
    sectionScript: SECTION2_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'What is true about the cat?',
    options: [
      'She needs daily medication.',
      'She is aggressive when handled.',
      'She dislikes other animals.',
      'She retreats when things are noisy.',
    ],
    correctOption: 3,
    questionAudioUrl: '',
  },
  {
    questionText: 'Why does the man approve of the spare room?',
    options: [
      'It keeps her away from the kitchen.',
      'It offers the cat a place to escape to.',
      'It is a shelter requirement.',
      'It is warmer than the rest of the home.',
    ],
    correctOption: 1,
    questionAudioUrl: '',
  },
  {
    questionText: 'What will the shelter do for the woman?',
    options: [
      'reserve the cat indefinitely',
      'deliver the cat to her home',
      'contact her landlord directly',
      'note her interest for a limited period',
    ],
    correctOption: 3,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the third section of the conversation shortly.',
    sectionScript: SECTION3_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the man suggest if the adoption cannot proceed?',
    options: [
      'applying again next year',
      'choosing a different cat',
      'giving an animal a temporary home',
      'adopting with a friend',
    ],
    correctOption: 2,
    questionAudioUrl: '',
  },
  {
    questionText: 'What is likely true about the woman?',
    options: [
      'She plans to buy a home soon.',
      'She would consider helping in another way.',
      'She has owned cats before.',
      'She will give up on the idea.',
    ],
    correctOption: 1,
    questionAudioUrl: '',
  },
];
