
const names = [
  'nasnosa',
  'basbosa', 
  '2at2ota',
  'nesreen',
  'nosnosty',
  'nesweety',
  'cutie',
  'wardity',
  "medo's eyes",
  'battotek eyes',
  'mama nsanosa'
];

const messageTemplates = [
  "Amazing work, {name}! ✨ You're absolutely crushing it today!",
  "Brilliant, {name}! 🌟 Your dedication is truly inspiring!",
  "Exceptional job, {name}! 💎 You're building something beautiful!",
  "Outstanding, {name}! 🎯 Your consistency is remarkable!",
  "Magnificent effort, {name}! 🌸 You're glowing with success!",
  "Wonderful, {name}! 💫 Each step forward is a victory!",
  "Incredible, {name}! 🦋 You're transforming into your best self!",
  "Superb work, {name}! 🌺 Your progress is absolutely stunning!",
  "Fantastic, {name}! ✨ You're radiating positive energy!",
  "Marvelous, {name}! 🎊 Your commitment is truly admirable!",
  "Perfect, {name}! 🌟 You're making every moment count!",
  "Splendid job, {name}! 💖 Your journey is so inspiring!",
  "Excellent work, {name}! 🌙 You're reaching for the stars!",
  "Beautiful effort, {name}! 🌷 Your dedication blooms daily!",
  "Phenomenal, {name}! ⭐ You're writing your success story!",
  "Graceful work, {name}! 🕊️ Your consistency is like poetry!",
  "Elegant progress, {name}! 💝 You're crafting excellence!",
  "Stunning achievement, {name}! 🌈 Your rainbow of success grows!",
  "Refined excellence, {name}! 👑 You're truly royalty in dedication!",
  "Sophisticated work, {name}! 🎭 Your performance is masterful!"
];

export const getRandomCompletionMessage = (): string => {
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomTemplate = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
  
  return randomTemplate.replace('{name}', randomName);
};
