/** Task 8 — Describing an Unusual Situation (30s prep / 60s recording). One prompt per test set (1–25). */

export const SPEAKING_TASK8_PROMPTS: string[] = [
  'You are at an amusement park and notice something interesting. Call your friend, Jake. Describe what you see and explain why it caught your attention. Ask if he would like to visit this place with you.',
  'You are traveling and come across a place that immediately catches your attention. Call your sister, Megan. Provide a full and clear description of it and explain why you find it interesting. Ask if you should stay there.',
  'You enter a shop and notice something that stands out to you. Call your friend, Chris. Describe the shop in detail and explain what caught your attention. Ask if he would like you to buy something for him.',
  'You notice someone carrying something that looks quite interesting. Call your friend, Sophia. Describe it clearly and explain why it caught your attention. Ask if she has ever seen anything like this before.',
  'You see several children doing something that worries you. Call their parent. Describe the situation in detail and explain why you are concerned about their safety.',
  'You are visiting an aquarium and notice something that you didn\'t expect. Call your friend, Daniel. Describe what you see and explain why it looks different to you.',
  'You are visiting a park and notice a house that looks quite different. Call your friend, Olivia. Describe it clearly and explain what makes it stand out. Ask if she would like to visit it.',
  'You are shopping for furniture and notice something that catches your eye. Call your mother. Describe what you see and ask if you should buy it.',
  'You work at a lost and found office and notice a few items that may belong to someone who contacted you earlier. Call them. Describe the items clearly and ask which one belongs to them.',
  'You are visiting a garden and notice a place that looks very interesting. Call your friend, Lucas. Describe what you see and explain why it caught your attention. Ask if he would like to visit it.',
  'You are on the road and notice a vehicle that stands out. Call your friend, Ethan. Describe it clearly and explain why you think he might like it.',
  'You come across something that makes you smile. Call your friend, Bacca. Describe it and explain why you find it amusing.',
  'You are visiting your cousin\'s house and notice something interesting. Call your mom. Describe what you see and explain why it surprised you.',
  'You are visiting a friend\'s house and notice something that catches your attention. Call your colleague, Nathan. Describe it clearly and explain why it stands out.',
  'You are in an art gallery and notice something different from the other displays. Call your friend, Emma. Describe what you see and explain why it caught your attention.',
  'You are visiting a small town and notice a house that looks different from the others. Call your friend, Daniel. Describe the house and ask if he would like to visit it with you.',
  'You are spending the day at the beach and notice something happening on the water. Call your friend, Sophie. Describe what you see and explain why it caught your attention. Ask if she would like to try it with you.',
  'You are visiting your cousin\'s house and notice something in one of the rooms. Call your friend, Liam. Describe it in detail and explain why it surprised you.',
  'You are at an art studio and notice something that stands out to you. Call your friend, Emily. Describe what you see and explain why you find it interesting.',
  'You are walking through a tourist area and notice something happening nearby. Call your friend, Ryan. Describe the scene clearly and explain why it caught your attention.',
  'You are visiting your neighbor\'s house and notice something going on outside. Call your parent. Describe what is happening and explain why it caught your attention.',
  'You are shopping at a store and notice something on display that stands out. Call your friend, Olivia. Describe what you see and explain why it caught your attention. Ask if you should consider buying something similar.',
  'While driving, you notice a situation on the road that concerns you. You decide to call emergency services. Describe what is happening clearly and explain why it is unsafe.',
  'You are visiting a public place and notice something involving a group of people. Call your friend, Ava. Describe what you see and explain why it caught your attention.',
  'You are visiting a store and notice something that immediately stands out. Call your friend, Noah. Describe what you see and explain why you find it interesting.',
];

export function getSpeakingTask8ImagePath(setNumber: number): string {
  const index = Math.min(Math.max(setNumber, 1), 25);
  return `/test/speaking-task8-set-${String(index).padStart(2, '0')}.png`;
}

export function buildTask8Prompt(setNumber: number): string {
  const body = SPEAKING_TASK8_PROMPTS[setNumber - 1] || SPEAKING_TASK8_PROMPTS[0];
  return `Describing an Unusual Situation\n\n${body}`;
}
