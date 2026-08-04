/** Test Set 6 — Part 1 Farmers Market (distribution 3-3-2). Audio uploaded via admin. */

const SECTION1_SCRIPT = `Man: Morning. Do you still have any of the wild blueberry jam? I bought a jar from you a couple of weeks ago.
Woman: Oh, you've just missed it. The last two jars went about an hour ago, to a woman buying for a church breakfast.
Man: Typical. I told myself I'd come early and then I didn't.
Woman: The blueberry always goes first. If you can get here before nine you'll generally find everything still on the table, but by eleven it's mostly the chutneys left.
Man: I'll remember that. My mother is coming from Halifax next weekend, and she asks after that particular jam every single time she visits. I'd rather not turn up empty-handed again.
Woman: Well, we can't have that. Let me see what I can sort out for you.`;

const SECTION2_SCRIPT = `Woman: I'm boiling another batch on Thursday. I could put two jars by with your name on the lids and keep them under the table for you.
Man: Would you really? That would save me entirely. Should I pay you for them now?
Woman: No need at all. Settle up when you collect them, I'm not going to run off with your money.
Man: And if something comes up and I can't get here on Saturday?
Woman: Then I'd have to put them out and sell them, I'm afraid. I only have the one stall and I can't be carrying stock home week after week. So they're yours until the market closes, and after that they go back on the table.
Man: That's fair enough. I'll be here.`;

const SECTION3_SCRIPT = `Man: One last thing. Is it the same fruit as the batch I had before, or do you buy in from different growers?
Woman: Same patch, same bushes, picked by the same two people. But I'll be honest with you, this one is noticeably less sweet than the jars you had. We've had such a wet summer that the berries simply haven't built up the sugar they normally would by August.
Man: She'll notice, you know. My mother notices everything, she once told a baker his loaf had changed.
Woman: Then I'd better warn you properly rather than have her think I've cut corners.
Man: No, thinking about it, she's forever complaining that the jam in the shops is so sweet you can't taste the fruit underneath it at all.
Woman: Then I suspect this batch will suit her rather better than the last one. See you Saturday.`;

export const LISTENING_SET6_PART1_MCQS = [
  {
    questionText: 'What does the man want to buy?',
    options: [
      'fresh fruit for baking',
      'a product he saw advertised',
      'a gift he has never tried',
      'something he has bought there before',
    ],
    correctOption: 3,
    sectionAudioUrl: '',
    sectionIntroText:
      'You will hear a conversation between a man and a woman at a farmers market. The woman sells preserves at a stall and the man is a customer. You will hear the conversation only once.',
    sectionScript: SECTION1_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'Why can he not buy it today?',
    options: [
      'The stall has closed for the day.',
      'The stock sold out earlier that morning.',
      'The price has gone up.',
      'The recipe has changed.',
    ],
    correctOption: 1,
    questionAudioUrl: '',
  },
  {
    questionText: 'What is likely true about this stall?',
    options: [
      'It rarely has customers.',
      'It opens later than the others.',
      'Its most popular goods sell early.',
      'It sells only chutney.',
    ],
    correctOption: 2,
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the woman offer to do?',
    options: [
      'set some jars aside for him',
      'deliver them to his home',
      'refund his earlier purchase',
      'give him a different flavour',
    ],
    correctOption: 0,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the second section of the conversation shortly.',
    sectionScript: SECTION2_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: "What does the woman's response about payment suggest?",
    options: [
      'She expects a deposit.',
      'She is willing to trust him.',
      'She does not accept cash.',
      'She doubts he will return.',
    ],
    correctOption: 1,
    questionAudioUrl: '',
  },
  {
    questionText: 'Why can she not keep the jars longer?',
    options: [
      'They would spoil quickly.',
      'Another customer wants them.',
      'She has no way to store unsold stock.',
      'The market forbids it.',
    ],
    correctOption: 2,
    questionAudioUrl: '',
  },
  {
    questionText: 'Why is the new batch different?',
    options: [
      'The jars are a smaller size.',
      'She altered the recipe.',
      'She used a different berry.',
      'The weather affected the fruit.',
    ],
    correctOption: 3,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the third section of the conversation shortly.',
    sectionScript: SECTION3_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: "What is likely true about the man's mother?",
    options: [
      'She prefers preserves that are less sugary.',
      'She seldom eats jam.',
      'She lives near the market.',
      'She dislikes homemade food.',
    ],
    correctOption: 0,
    questionAudioUrl: '',
  },
];
