import { LISTENING_SET1_AUDIO as A } from '../audioUrlsSet1.js';

export const LISTENING_PART1_MCQS = [
  {
    questionText: 'Why is the man visiting the health club?',
    options: ['To get a membership', 'To receive a discount', 'To check his account', 'To take a cardio class'],
    correctOption: 2,
    sectionAudioUrl: A.part1Main,
    sectionIntroText: 'Listen to the conversation. You will hear the conversation only once. It is about 1 to 1.5 minutes long.',
    sectionScript:
      "Man: Hello, I'm here to check on my account. I noticed a double charge on my credit card this month for my membership fee.\nWoman: Oh, I am sorry to hear that. Let me look up your details. Can I have your name and membership number, please?\nMan: Sure, my name is John Miller, and the number is 4459.\nWoman: Thank you. Yes, I see here that there was a billing system glitch on Tuesday, and a few members were charged twice. I will process a refund for the second charge immediately. Also, as an apology, I can offer you a 10% discount on your next month's fee.\nMan: That's great, thank you so much.",
    sectionImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    questionAudioUrl: A.q1,
  },
  {
    questionText: 'What discount does the woman offer the man?',
    options: ['10%', '15%', '20%', '50%'],
    correctOption: 0,
    questionAudioUrl: A.q2,
  },
  {
    questionText: 'Why cannot the man get the discount?',
    options: ['He is not a student', 'He cannot combine it with his student discount', 'He wants a 10-class package', 'The promotion has expired'],
    correctOption: 1,
    sectionAudioUrl: A.part1Main,
    sectionIntroText: 'You will hear the second section of the conversation shortly.',
    sectionScript:
      "Man: Actually, I was wondering if I can apply that 10% discount to my student rate. I already get a 15% student discount on my monthly membership.\nWoman: Ah, unfortunately, you cannot combine the promotional discount with your student discount. You would have to choose either the student rate or the standard rate with the 10% discount, and the student discount is actually a better deal.\nMan: I see. That makes sense. I'll stick to the student discount then. Oh, by the way, I think I left my umbrella here yesterday. I was in the locker room after my cardio class, and when I got home, I realized I didn't have it.\nWoman: Let me check our lost and found bin. What does it look like?",
    sectionImage: '',
    questionAudioUrl: A.q3,
  },
  {
    questionText: 'Where does the man think he left his umbrella?',
    options: ['In the locker room', 'In the cardio room', 'At the front desk', 'On the bus'],
    correctOption: 0,
    questionAudioUrl: '',
  },
  {
    questionText: 'What class did the man attend at the health club?',
    options: ['A yoga class', 'A cardio class', 'A swimming class', 'A strength training class'],
    correctOption: 1,
    questionAudioUrl: '',
  },
  {
    questionText: "What brand is the man's umbrella?",
    options: ['The Bay', 'Rainstop', 'Totes', 'London Fog'],
    correctOption: 0,
    sectionAudioUrl: A.part1Main,
    sectionIntroText: 'You will hear the third section of the conversation shortly.',
    sectionScript:
      "Woman: What brand is your umbrella, and what does it look like?\nMan: It's from The Bay. It's a black, collapsible umbrella with a wooden handle.\nWoman: Let's see. I have a few black umbrellas here. Is this one yours? It has a wooden handle and is collapsible.\nMan: Oh, let me see. The brand is right, and it looks identical, but mine had a small rip at the very top along one of the seams. This one is in perfect condition, so it must belong to someone else.\nWoman: Ah, wait a minute. Let me check the back shelf. Yes, here is another one from The Bay, and... yes, there is a small rip at the top seam.\nMan: Yes, that's it! That is my umbrella. Thank you so much for finding it!\nWoman: You're welcome. Have a wonderful day!",
    sectionImage: '',
    questionAudioUrl: '',
  },
  {
    questionText: 'What is the description of the umbrella?',
    options: ['It is black and collapsible with a wooden handle', 'It is red and large with a plastic handle', 'It is black and long with a wooden handle', 'It is blue and small with a metal handle'],
    correctOption: 0,
    questionAudioUrl: '',
  },
  {
    questionText: 'Why did the man return the umbrella he found?',
    options: ['It was not his brand', 'It was in perfect condition but his had a rip at the top seam', 'It had a wooden handle but his had a plastic handle', 'It was red but his was black'],
    correctOption: 1,
    questionAudioUrl: '',
  },
];
