/** Test Set 2 — Part 1 Movie Theatre (distribution 3-2-3). Audio uploaded via admin. */

const SECTION1_SCRIPT = `Man: Hi. I booked two tickets online this morning, but no confirmation ever arrived in my inbox.
Woman: That does happen when the site is under load. Have you checked whether the payment actually went through?
Man: I just did. It's there on my card statement, so the money's gone. And I've been standing in that queue for the best part of twenty minutes.
Woman: I'm sorry about the wait. There are only two of us on the desk today, and with the long weekend we've been swamped since Friday afternoon.
Man: I understand, but the film starts in ten minutes and my sister flew in from Calgary especially for this. She's holding a spot in the lobby for us.
Woman: Then let's not waste any more of it. Rather than searching for a confirmation number you never received, let me look you up by surname instead.`;

const SECTION2_SCRIPT = `Woman: Here we are, two adult seats under Whitfield. The booking exists, but it's been issued for our downtown location rather than this one.
Man: Downtown? That can't be right. I'm certain I picked this theatre. The address was displayed at the top of the page when I paid.
Woman: I don't doubt you for a moment. Our site holds on to whichever branch you visited last and applies it at checkout unless you change it by hand. It catches out several people every week, and it's easily the biggest complaint we get.
Man: So my ticket is for a cinema right across the city. There's no chance of getting there in time, is there?
Woman: Not in this traffic, no. But you won't have to. The same film starts here in twelve minutes and I can move your booking across. The only pairs left are in the last two rows.
Man: I'll take them gladly. At this point I'd happily sit on the steps.`;

const SECTION3_SCRIPT = `Woman: You're transferred, screen four. And I've put a credit on your account for the trouble, enough to cover two seats next time you come.
Man: That's more than I expected. Thank you. Do I need to print anything out?
Woman: No, the code on your phone will do at the door. Could I offer one piece of advice, though? Set up an account rather than paying as a guest. A guest order sends one email, and if that fails there's no record you can get at yourself.
Man: And with an account it's different?
Woman: Everything sits in your booking history, and you can see the branch and change it before you pay. It would have caught this in a second.
Man: I'll set one up tonight. My sister has already told me twice I should have telephoned.
Woman: Well, you've two minutes to spare. Enjoy the film.`;

export const LISTENING_SET2_PART1_MCQS = [
  {
    questionText: 'What is this conversation about?',
    options: ['choosing a film', 'a refund request', 'a missing reservation', 'a membership plan'],
    correctOption: 2,
    sectionAudioUrl: '',
    sectionIntroText:
      'You will hear a conversation between a man and a woman at a movie theatre. The woman works at the theatre and the man is a customer. You will hear the conversation only once.',
    sectionScript: SECTION1_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'What is likely true about the theatre today?',
    options: [
      'It is closing early.',
      'It is understaffed permanently.',
      'It has raised its prices.',
      'It is unusually busy.',
    ],
    correctOption: 3,
    questionAudioUrl: '',
  },
  {
    questionText: 'What problem does the man expect to have?',
    options: [
      'He may be unable to find his sister.',
      'He may lose the money he paid.',
      'He may not get in before the film begins.',
      'He may have to park elsewhere.',
    ],
    correctOption: 2,
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the woman believe caused the problem?',
    options: [
      'He selected the wrong screening time.',
      'The payment was declined.',
      'His email address was entered incorrectly.',
      'The site kept a location he had used before.',
    ],
    correctOption: 3,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the second section of the conversation shortly.',
    sectionScript: SECTION2_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'What is likely true about this kind of error?',
    options: [
      'It has never happened before.',
      'It affects customers regularly.',
      'It only occurs on holidays.',
      'It is caused by customer carelessness.',
    ],
    correctOption: 1,
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the woman give the man for the inconvenience?',
    options: [
      'credit toward a later visit',
      'free refreshments',
      'a cash refund',
      'a membership card',
    ],
    correctOption: 0,
    sectionAudioUrl: '',
    sectionIntroText: 'You will hear the third section of the conversation shortly.',
    sectionScript: SECTION3_SCRIPT,
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'What does the woman recommend?',
    options: [
      'printing every confirmation',
      'registering instead of buying as a guest',
      'booking over the telephone',
      'arriving much earlier',
    ],
    correctOption: 1,
    questionAudioUrl: '',
  },
  {
    questionText: 'What is likely true about the man?',
    options: [
      'He expects to book there again.',
      'He rarely visits the cinema.',
      'He distrusts online payment.',
      'He will ask for his money back.',
    ],
    correctOption: 0,
    questionAudioUrl: '',
  },
];
