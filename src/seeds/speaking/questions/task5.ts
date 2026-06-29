/** Task 5 — Comparing and Persuading (60s prep Part A / 60s prep + 60s speak Part B). One scenario per test set (1–25). */

export type SpeakingTask5Option = {
  title: string;
  bullets: string[];
};

export type SpeakingTask5Set = {
  title: string;
  instruction: string;
  persuadeTarget: string;
  optionA: SpeakingTask5Option;
  optionB: SpeakingTask5Option;
  optionC: SpeakingTask5Option;
  /** Optional option images for Task 5A (paths under /test/). */
  optionImages?: {
    a: string;
    b: string;
    c: string;
  };
};

function formatOptionLabel(option: SpeakingTask5Option): string {
  const lines = option.bullets.map((b) => `- ${b}`);
  return `${option.title}\n${lines.join('\n')}`;
}

export function buildTask5APrompt(set: SpeakingTask5Set): string {
  return `Comparing and Persuading\n\n${set.instruction}`;
}

export function buildTask5BPrompt(set: SpeakingTask5Set): string {
  return `Comparing and Persuading\n\n${set.persuadeTarget} has chosen a different option (shown on the left). Persuade ${set.persuadeTarget} that your choice is the better option. Compare both options and give clear reasons.`;
}

export function getTask5Labels(set: SpeakingTask5Set) {
  return {
    optionALabel: formatOptionLabel(set.optionA),
    optionBLabel: formatOptionLabel(set.optionB),
    optionCLabel: formatOptionLabel(set.optionC),
  };
}

export function getTask5OptionImages(set: SpeakingTask5Set) {
  if (!set.optionImages) return {};
  return {
    imageUrlA: set.optionImages.a,
    imageUrlB: set.optionImages.b,
    imageUrlC: set.optionImages.c,
  };
}

export const SPEAKING_TASK5_SETS: SpeakingTask5Set[] = [
  {
    title: 'Vehicle for Daily Commute',
    instruction:
      'Your colleague has recently started a new job and is considering buying a vehicle for her daily commute. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your colleague that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your colleague',
    optionImages: {
      a: '/test/task5-set01-option-a.png',
      b: '/test/task5-set01-option-b.png',
      c: '/test/task5-set01-option-c.png',
    },
    optionA: {
      title: 'New Bicycle',
      bullets: [
        'Price: $500',
        'No fuel required; low maintenance cost',
        'Suitable for short distances',
        'Lightweight and easy to park anywhere',
      ],
    },
    optionB: {
      title: 'New Scooter',
      bullets: [
        'Price: $1,500 + fuel cost',
        'Best for medium distances',
        'Includes storage space under the seat',
        'Requires license and regular servicing',
      ],
    },
    optionC: {
      title: 'Second-hand Vintage Car',
      bullets: [
        'Price: $4,000 + fuel and maintenance cost',
        'Suitable for all weather conditions',
        'Comfortable seating for 4 passengers',
        'Requires parking space and higher upkeep',
      ],
    },
  },
  {
    title: 'Employee Anniversary Gift',
    instruction:
      'Your manager has asked you and your colleague for a gift idea to celebrate the company\'s 25th anniversary for all employees. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your colleague that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your colleague',
    optionImages: {
      a: '/test/task5-set02-option-a.png',
      b: '/test/task5-set02-option-b.png',
      c: '/test/task5-set02-option-c.png',
    },
    optionA: {
      title: 'Wrist Watch',
      bullets: [
        'Price: $150',
        'Durable stainless-steel material',
        'Can be worn daily in a professional setting',
        'Comes with a 2-year warranty',
      ],
    },
    optionB: {
      title: 'Team Dinner',
      bullets: [
        'Cost: $80 per employee',
        'Buffet with welcome drink and full-course meal',
        'Reserved seating',
        'Team interaction and celebration',
      ],
    },
    optionC: {
      title: 'Gift Card',
      bullets: [
        'Card value of $100',
        'Can be used across multiple stores',
        'Valid for 12 months',
        'Allows the recipient to choose their own item',
      ],
    },
  },
  {
    title: 'Community Weekend Camp',
    instruction:
      'You and your neighbour are organising a free weekend camp at the community hall for local residents. You are seeking suggestions from residents and found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your neighbour that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your neighbour',
    optionImages: {
      a: '/test/task5-set03-option-a.png',
      b: '/test/task5-set03-option-b.png',
      c: '/test/task5-set03-option-c.png',
    },
    optionA: {
      title: 'Blood Donation Camp',
      bullets: [
        'Conducted in partnership with a local hospital',
        'Organized at a nearby hospital facility',
        'Requires trained medical staff and equipment setup',
        'Can accommodate approximately 40–50 donors per day',
      ],
    },
    optionB: {
      title: 'Yoga and Fitness Camp',
      bullets: [
        'Led by a certified fitness instructor',
        'Conducted in a nearby park or open space',
        'Suitable for all age groups and fitness levels',
        'Duration: 1–2 hour guided sessions',
      ],
    },
    optionC: {
      title: 'Free Health Check-up Camp',
      bullets: [
        'Led by two junior doctors',
        'Conducted within the community hall',
        'Includes basic tests (blood pressure, sugar levels)',
        'Offers free consultation with general physicians',
      ],
    },
  },
  {
    title: 'Office Chairs',
    instruction:
      'You and your colleague are responsible for selecting chair options for your company office. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your colleague that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your colleague',
    optionImages: {
      a: '/test/task5-set04-option-a.png',
      b: '/test/task5-set04-option-b.png',
      c: '/test/task5-set04-option-c.png',
    },
    optionA: {
      title: 'Leather Executive Chair',
      bullets: [
        'Price: $250 per chair',
        'Adjustable height and reclining feature',
        'Cushioned seat for long sitting hours',
        'Requires regular cleaning and maintenance',
      ],
    },
    optionB: {
      title: 'Ergonomic Mesh Chair',
      bullets: [
        'Price: $180 per chair',
        'Breathable mesh back',
        'Provides lumbar support',
        'Lightweight and easy to move',
      ],
    },
    optionC: {
      title: 'Plastic Designer Chair',
      bullets: [
        'Price: $80 per chair',
        'Lightweight and stackable design',
        'Easy to clean and maintain',
        'Fixed structure with no adjustments',
      ],
    },
  },
  {
    title: 'Summer Activity for Staff',
    instruction:
      'Your company is planning a summer activity for staff members and has asked you and your colleague for suggestions. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your colleague that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your colleague',
    optionImages: {
      a: '/test/task5-set05-option-a.png',
      b: '/test/task5-set05-option-b.png',
      c: '/test/task5-set05-option-c.png',
    },
    optionA: {
      title: 'Live Music Concert',
      bullets: [
        'Ticket cost: $80 per person',
        'Duration: 3–4 hours',
        'Food not included; outside food not permitted',
        'Standing event with no fixed seating',
      ],
    },
    optionB: {
      title: 'Cruise Trip',
      bullets: [
        'Cost: $200 per person',
        'Includes buffet meals and beverages onboard',
        'Duration: Half-day experience',
        'Requires advance booking; limited seating capacity',
      ],
    },
    optionC: {
      title: 'Beach Party',
      bullets: [
        'Cost: $60 per person',
        'Open space with games and group activities',
        'Food stalls available; purchases required separately',
        'Flexible seating and movement area',
      ],
    },
  },
  {
    title: 'Bed for Your Kids Room',
    instruction:
      'You and your spouse are selecting a bed for your child\'s room. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your spouse that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your spouse',
    optionImages: {
      a: '/test/task5-set06-option-a.png',
      b: '/test/task5-set06-option-b.png',
      c: '/test/task5-set06-option-c.png',
    },
    optionA: {
      title: 'Twin Bed',
      bullets: [
        'Price: $400',
        'Compact size suitable for small rooms',
        'Easy to move and assemble',
        'Single sleeping space only',
      ],
    },
    optionB: {
      title: 'Bunk Bed',
      bullets: [
        'Price: $750',
        'Two-level design saves floor space significantly',
        'Slightly risky',
        'Includes ladder and safety rails',
      ],
    },
    optionC: {
      title: 'King-size Bed',
      bullets: [
        'Price: $650',
        'Large sleeping area',
        'Underbed storage',
        'Requires more room space',
      ],
    },
  },
  {
    title: 'Summer Camp for Ages 6–8',
    instruction:
      'You are planning a summer camp for children aged 6–8 and need to decide what to prioritize as the main activity focus. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your colleague that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your colleague',
    optionImages: {
      a: '/test/task5-set07-option-a.png',
      b: '/test/task5-set07-option-b.png',
      c: '/test/task5-set07-option-c.png',
    },
    optionA: {
      title: 'Physical Activities Program',
      bullets: [
        'Includes stretching, running, and group exercises',
        'Improves physical fitness and energy levels',
        'Restricted to 10 students per 45 minutes session',
        'Cost: $50 per child for 7 days',
      ],
    },
    optionB: {
      title: 'Keyboard Learning Classes',
      bullets: [
        'Basic keyboard lessons with instructor guidance',
        'Develops musical skills and concentration',
        'Individual and Private Classes available',
        'Cost: $80 for group and $140 for private lessons (1 hour per day)',
      ],
    },
    optionC: {
      title: 'Computer Learning Program',
      bullets: [
        'Basic computer skills and educational software',
        'Improves digital knowledge',
        'Not more than 5 students in a batch',
        'Cost: $90 per child for 15-day course (2 hours per day)',
      ],
    },
  },
  {
    title: 'Kitchen Design',
    instruction:
      'You and your family are planning to renovate your kitchen and need to choose a design style. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your family member that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your family member',
    optionImages: {
      a: '/test/task5-set08-option-a.png',
      b: '/test/task5-set08-option-b.png',
      c: '/test/task5-set08-option-c.png',
    },
    optionA: {
      title: 'Modern White Kitchen with Seating',
      bullets: [
        'Price: $8,000',
        'Includes built-in seating area within the kitchen',
        'Bright lighting and minimal design',
        'Requires regular cleaning to maintain appearance',
      ],
    },
    optionB: {
      title: 'Contemporary Modular Kitchen',
      bullets: [
        'Price: $12,000',
        'Built-in cabinets with smart storage solutions',
        'Efficient space utilization',
        'Includes modern appliances',
      ],
    },
    optionC: {
      title: 'Traditional Wooden Kitchen',
      bullets: [
        'Price: $7,000',
        'Durable wooden cabinets',
        'Wide storage',
        'Requires regular polishing and maintenance',
      ],
    },
  },
  {
    title: 'Work Desk Options',
    instruction:
      'You and your manager are selecting desks for a new office setup. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your manager that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your manager',
    optionImages: {
      a: '/test/task5-set09-option-a.png',
      b: '/test/task5-set09-option-b.png',
      c: '/test/task5-set09-option-c.png',
    },
    optionA: {
      title: 'Shared Partition Workstations',
      bullets: [
        'Large desk where 2–4 employees can sit together',
        'Includes divider panels for privacy',
        'Fixed seating setup',
      ],
    },
    optionB: {
      title: 'Adjustable Sit-Stand Desks',
      bullets: [
        'Allows both sitting and standing positions',
        'Promotes better posture and flexibility',
        'Modern collaborative workspace design',
      ],
    },
    optionC: {
      title: 'Private Cabin Offices',
      bullets: [
        'Separate enclosed space for each employee',
        'Provides full privacy and minimal distractions',
        'Includes adequate storage space but needs more office area',
      ],
    },
  },
  {
    title: 'Nephew\'s 10th Birthday Games',
    instruction:
      'Your family is planning your nephew\'s 10th birthday party and has asked for your suggestion on which games should be played. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your family member that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your family member',
    optionImages: {
      a: '/test/task5-set10-option-a.png',
      b: '/test/task5-set10-option-b.png',
      c: '/test/task5-set10-option-c.png',
    },
    optionA: {
      title: 'Musical Chairs',
      bullets: [
        'Requires minimal setup',
        'Suitable for indoor play',
        'Can include many participants',
        'Short duration rounds',
      ],
    },
    optionB: {
      title: 'Football Game',
      bullets: [
        'Outdoor activity requiring space',
        'Promotes teamwork and physical activity',
        'Limited number of players at a time',
        'Requires supervision',
      ],
    },
    optionC: {
      title: 'Video Games Setup',
      bullets: [
        'Indoor activity with gaming consoles',
        'Suitable for small groups',
        'Requires equipment and screen setup',
        'Limited physical movement',
      ],
    },
  },
  {
    title: 'Outlay for Office Sitting',
    instruction:
      'Your manager is planning the seating layout for a new office space and has asked for opinions from the employees. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your coworker that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your coworker',
    optionImages: {
      a: '/test/task5-set11-option-a.png',
      b: '/test/task5-set11-option-b.png',
      c: '/test/task5-set11-option-c.png',
    },
    optionA: {
      title: 'Four Chairs Setup',
      bullets: [
        'Seating for 4 employees with individual desks',
        'No window; fully enclosed workspace',
        'Includes small storage units for each desk',
        'Minimal distractions',
      ],
    },
    optionB: {
      title: 'Five Chairs with Sofa',
      bullets: [
        'Seating for 5 employees plus a shared sofa space',
        'Large window providing natural light',
        'Proper ventilation',
        'No dedicated storage space available',
      ],
    },
    optionC: {
      title: 'Large Desk with Eight Chairs',
      bullets: [
        'One large shared desk with seating for 8 employees',
        'Includes a small window for limited natural light',
        'Equipped with projector for presentations',
        'Includes shared storage space',
      ],
    },
  },
  {
    title: 'Teacher Uniform',
    instruction:
      'You work as a teacher, and your principal has asked for suggestions on what type of uniform teachers should wear. You discussed this with another teacher and found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your colleague that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your colleague',
    optionImages: {
      a: '/test/task5-set12-option-a.png',
      b: '/test/task5-set12-option-b.png',
      c: '/test/task5-set12-option-c.png',
    },
    optionA: {
      title: 'Shirt with Tie',
      bullets: [
        'Professional appearance',
        'Comfortable for daily teaching',
        'Easy to wash and cost-effective',
        'Suitable for both indoor and outdoor school activities',
      ],
    },
    optionB: {
      title: 'Coat and Shirt',
      bullets: [
        'Highly formal and polished look',
        'Requires monthly drycleaning',
        'Can feel uncomfortable during long teaching hours',
        'Expensive',
      ],
    },
    optionC: {
      title: 'Casual Wear',
      bullets: [
        'Comfortable and flexible clothing',
        'Suitable for long working hours',
        'Wide variety of styles available',
        'Less professional',
      ],
    },
  },
  {
    title: 'Field Trip — Local Elementary School',
    instruction:
      'You work as a teacher at a local elementary school and are planning a field trip for your students. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade another teacher that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'another teacher',
    optionImages: {
      a: '/test/task5-set13-option-a.png',
      b: '/test/task5-set13-option-b.png',
      c: '/test/task5-set13-option-c.png',
    },
    optionA: {
      title: 'Museum Visit',
      bullets: [
        'Nominal entry fee required per student',
        'Educational exhibits related to history and science',
        'Indoor environment with guided tours',
        'Fixed visiting hours',
      ],
    },
    optionB: {
      title: 'Organic Farm',
      bullets: [
        'No entry cost',
        'Hands-on learning about plants and farming',
        'Outdoor activity with open space',
        'Dependent on weather conditions',
      ],
    },
    optionC: {
      title: 'Paper Manufacturing Company',
      bullets: [
        'Requires advance booking and permission',
        'Demonstrates real-life production process',
        'Guided industrial tour',
        'Limited interaction for younger children',
      ],
    },
  },
  {
    title: 'Bag Gift for Sister\'s Anniversary',
    instruction:
      'Your friend Maria is visiting a bag shop to buy a gift for her sister\'s anniversary and has asked for your suggestion. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade Maria that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'Maria',
    optionImages: {
      a: '/test/task5-set14-option-a.png',
      b: '/test/task5-set14-option-b.png',
      c: '/test/task5-set14-option-c.png',
    },
    optionA: {
      title: 'Stylish Handbag',
      bullets: [
        'Price: $120',
        'Stylish and suitable for daily use',
        'Medium storage capacity',
        'Available in different colours',
      ],
    },
    optionB: {
      title: 'Laptop Bag',
      bullets: [
        'Price: $150',
        'Designed for carrying laptops and documents',
        'Durable and functional design',
        'Limited use for casual occasions',
      ],
    },
    optionC: {
      title: 'Hand-painted Tote Bag',
      bullets: [
        'Price: $50',
        'Unique handmade design',
        'Lightweight and eco-friendly',
        'Limited capacity',
      ],
    },
  },
  {
    title: 'Guitar Lessons for Your 8-Year-Old',
    instruction:
      'You and your spouse are looking for guitar lessons for your 8-year-old child and need to decide which option is most suitable. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your spouse that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your spouse',
    optionImages: {
      a: '/test/task5-set15-option-a.png',
      b: '/test/task5-set15-option-b.png',
      c: '/test/task5-set15-option-c.png',
    },
    optionA: {
      title: 'Private Home Tutor',
      bullets: [
        'One-on-one personalized attention',
        'Flexible timing at home',
        'Faster learning progress',
        'Cost per session: $25',
      ],
    },
    optionB: {
      title: 'Group Classes',
      bullets: [
        'Learning with other students',
        'Fixed schedule',
        'Less individual attention',
        'Cost per session: $15',
      ],
    },
    optionC: {
      title: 'Online Self-paced Course',
      bullets: [
        'Requires internet and computer',
        'Pre-recorded 20 lessons',
        'Limited direct interaction with instructor',
        'One-time cost: $65',
      ],
    },
  },
  {
    title: 'Nephew\'s 9th Birthday — Special Host',
    instruction:
      'Your nephew is turning 9, and your family has asked you to suggest whom to call to host the birthday party or perform as a special guest. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your family member that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your family member',
    optionImages: {
      a: '/test/task5-set16-option-a.png',
      b: '/test/task5-set16-option-b.png',
      c: '/test/task5-set16-option-c.png',
    },
    optionA: {
      title: 'Magician',
      bullets: [
        'Interactive magic tricks and kids\' participation',
        'Suitable for mixed age groups',
        'Duration: 60 minutes',
        'Requires stage setup',
      ],
    },
    optionB: {
      title: 'Puppet Show Artist',
      bullets: [
        'Story-based performance',
        'Engaging for younger children',
        'Duration: 30 minutes',
        'Requires minimal setup',
      ],
    },
    optionC: {
      title: 'Bubble Show Artist',
      bullets: [
        'Visual performance with large bubbles',
        'Unique and entertaining experience',
        'Best suited for outdoor space',
        'Shorter performance duration',
      ],
    },
  },
  {
    title: 'Mobility Aid for Elderly Relative',
    instruction:
      'You are shopping for an elderly relative who is having problems with walking and need to choose a suitable mobility aid. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your family member that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your family member',
    optionImages: {
      a: '/test/task5-set17-option-a.png',
      b: '/test/task5-set17-option-b.png',
      c: '/test/task5-set17-option-c.png',
    },
    optionA: {
      title: 'Wheelchair',
      bullets: [
        'Suitable for complete mobility support',
        'Requires assistance from another person',
        'Comfortable for long distances',
        'Expensive and storage space needed',
      ],
    },
    optionB: {
      title: 'Walker',
      bullets: [
        'Provides support while walking independently',
        'Stable and easy to use',
        'Requires physical effort',
        'Mid-priced',
      ],
    },
    optionC: {
      title: 'Walking Stick',
      bullets: [
        'Lightweight and portable',
        'Easy to use for short distances',
        'Minimal support compared to other options',
        'Affordable',
      ],
    },
  },
  {
    title: 'Tent Choice for Camping Trip with Friends',
    instruction:
      'You and your friends are planning a camping trip and need to choose a tent. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your friend that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your friend',
    optionImages: {
      a: '/test/task5-set18-option-a.png',
      b: '/test/task5-set18-option-b.png',
      c: '/test/task5-set18-option-c.png',
    },
    optionA: {
      title: 'Canvas Tent',
      bullets: [
        'Durable fabric without zip closure',
        'Suitable for 3-4 people',
        'Not fully waterproof',
        'Cost: $120',
      ],
    },
    optionB: {
      title: 'Dome Tent',
      bullets: [
        'Lightweight and easy to set up with zippered closure',
        'Suitable for 2 people and short trips',
        'Waterproof material',
        'Cost: $70',
      ],
    },
    optionC: {
      title: 'Marquee Tent',
      bullets: [
        'Large capacity; can accommodate 20–25 people',
        'Requires more time and effort to set up',
        'Needs additional transport due to size and weight',
        'Cost: $200',
      ],
    },
  },
  {
    title: 'Logo for Solar Panel Company',
    instruction:
      'You and your colleague are designing a logo for a company that specializes in selling solar panels. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your colleague that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your colleague',
    optionImages: {
      a: '/test/task5-set19-option-a.png',
      b: '/test/task5-set19-option-b.png',
      c: '/test/task5-set19-option-c.png',
    },
    optionA: {
      title: 'Eco-friendly Theme',
      bullets: [
        'Focus on green and sustainable elements',
        'Simple and clean design',
        'Easy to recognize',
        'Limited visual complexity',
      ],
    },
    optionB: {
      title: 'Basic Solar Theme',
      bullets: [
        'Includes solar panel imagery',
        'Clear representation of business',
        'Professional and straightforward design',
        'Less creative appearance',
      ],
    },
    optionC: {
      title: 'Complex Energy Design',
      bullets: [
        'Visually attractive',
        'Combines multiple energy elements',
        'Unique',
        'Complex to understand',
      ],
    },
  },
  {
    title: 'Weekend Trip — Mode of Travel',
    instruction:
      'You and your friend are planning a weekend trip and need to decide the mode of travel. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your friend that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your friend',
    optionImages: {
      a: '/test/task5-set20-option-a.png',
      b: '/test/task5-set20-option-b.png',
      c: '/test/task5-set20-option-c.png',
    },
    optionA: {
      title: 'Train',
      bullets: [
        'Cost: $50',
        'Comfortable seating with affordable meals',
        'Fixed schedule',
        'Travel time: 6–7 hours',
      ],
    },
    optionB: {
      title: 'Airplane',
      bullets: [
        'Cost: $150',
        '1 hour travel time',
        'Limited baggage; expensive onboard meals',
        'Requires early airport check-in',
      ],
    },
    optionC: {
      title: 'Bus',
      bullets: [
        'Cost: $30',
        'Most economical option',
        'Travel time: 10 hours',
        'Limited comfort; no onboard food or restroom',
      ],
    },
  },
  {
    title: 'Gift for Nephew\'s 10th Birthday',
    instruction:
      'You are giving your brother a gifting suggestion for his son\'s 10th birthday. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your brother that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your brother',
    optionImages: {
      a: '/test/task5-set21-option-a.png',
      b: '/test/task5-set21-option-b.png',
      c: '/test/task5-set21-option-c.png',
    },
    optionA: {
      title: 'Chess Board',
      bullets: [
        'Cost: $40',
        'Improves thinking and problem-solving skills',
        'Suitable for indoor play',
        'Requires at least two players',
      ],
    },
    optionB: {
      title: 'Gaming Console',
      bullets: [
        'Cost: $150',
        'Interactive and entertaining',
        'Can be played alone or with 2-3 friends',
        'Requires screen and electricity',
      ],
    },
    optionC: {
      title: 'T-shirt',
      bullets: [
        'Cost: $30',
        'Comfortable and easy to use',
        'Available in different sizes',
        'Various colour options',
      ],
    },
  },
  {
    title: 'Parents Adopting a Pet',
    instruction:
      'You and your sister are helping your parents choose a pet for your home. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your sister that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your sister',
    optionImages: {
      a: '/test/task5-set22-option-a.png',
      b: '/test/task5-set22-option-b.png',
      c: '/test/task5-set22-option-c.png',
    },
    optionA: {
      title: 'Dog',
      bullets: [
        'Cost: $300 (initial) + food expenses',
        'Active companion',
        'Requires daily exercise and training',
        'Needs more space and care',
      ],
    },
    optionB: {
      title: 'Cat',
      bullets: [
        'Cost: $150 (initial) + food expenses',
        'Independent and low maintenance',
        'Suitable for indoor living',
        'Less interactive than dogs',
      ],
    },
    optionC: {
      title: 'Macaw (Bird)',
      bullets: [
        'Cost: $500 (initial) + food expenses',
        'Colorful and unique pet',
        'Requires cage and proper care',
        'Can be noisy and needs attention',
      ],
    },
  },
  {
    title: 'Outdoor Seating Area Design',
    instruction:
      'You work at a community development office, and you are designing an outdoor seating area. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your co-worker that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your co-worker',
    optionImages: {
      a: '/test/task5-set23-option-a.png',
      b: '/test/task5-set23-option-b.png',
      c: '/test/task5-set23-option-c.png',
    },
    optionA: {
      title: 'Picnic Tables',
      bullets: [
        'Cost: $200 per unit',
        'Suitable for 4 people\'s sitting',
        'Durable wooden structure',
        'Requires more space',
      ],
    },
    optionB: {
      title: 'Individual Benches',
      bullets: [
        'Cost: $120 per unit',
        'Easy to clean',
        'Easy to place in different areas',
        'Limited seating capacity: 2-3 people',
      ],
    },
    optionC: {
      title: 'Plastic Chairs',
      bullets: [
        'Cost: $40 per chair',
        'Lightweight and easy to move',
        'Affordable option',
        'Less durable outdoors',
      ],
    },
  },
  {
    title: 'Headphones for Office Employees',
    instruction:
      'You work at an office, and you are in charge of purchasing headphones for employees. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade your co-worker that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'your co-worker',
    optionImages: {
      a: '/test/task5-set24-option-a.png',
      b: '/test/task5-set24-option-b.png',
      c: '/test/task5-set24-option-c.png',
    },
    optionA: {
      title: 'Wireless Headphones',
      bullets: [
        'Cost: $120',
        'No wires; easy to use',
        'Rechargeable battery',
        'Requires charging',
      ],
    },
    optionB: {
      title: 'Wired Headphones',
      bullets: [
        'Cost: $60',
        'Stable sound connection',
        'No need for charging',
        'Limited mobility',
      ],
    },
    optionC: {
      title: 'Wireless Earbuds',
      bullets: [
        'Cost: $100',
        'Compact and portable',
        'Easy to carry',
        'Shorter battery life',
      ],
    },
  },
  {
    title: 'Place to Sit and Enjoy Food',
    instruction:
      'You and your friend Richard are looking for a place to sit down and enjoy some food. You found two suitable options. Using the pictures and information below, choose the option that you prefer. In the next section, you will need to persuade Richard that your choice is the better option.\n\nIf you do not choose an option, the computer will choose one for you. You do not need to speak for this part.',
    persuadeTarget: 'Richard',
    optionImages: {
      a: '/test/task5-set25-option-a.png',
      b: '/test/task5-set25-option-b.png',
      c: '/test/task5-set25-option-c.png',
    },
    optionA: {
      title: 'Cafeteria',
      bullets: [
        'Cost: $10–$15 per meal',
        'Quick service',
        'Indoor seating',
        'Limited menu options',
      ],
    },
    optionB: {
      title: 'Beach-side Restaurant',
      bullets: [
        'Cost: $30–$50 per meal',
        'Scenic outdoor seating',
        'Wide variety of food options',
        'Higher cost',
      ],
    },
    optionC: {
      title: 'Food Truck',
      bullets: [
        'Cost: $8–$12 per meal',
        'Affordable and quick service',
        'Outdoor seating available',
        'Limited seating space',
      ],
    },
  },
];
