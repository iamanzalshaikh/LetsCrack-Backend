/** Task 1 — Email Writing (27 min). One prompt per test set (1–25). */
export type WritingTask1Question = {
  subheading: string;
  backgroundParagraph: string;
  taskInstructions: string[];
  tone: 'formal' | 'semi-formal' | 'informal';
  recipient: string;
  theme: string;
};

export const WRITING_TASK1_QUESTIONS: WritingTask1Question[] = [
  {
    subheading: 'Workspace Issues',
    backgroundParagraph:
      'You recently moved to a new department at your company. The workspace assigned to you has a broken desk lamp, a malfunctioning chair, and no access to the shared printer.',
    taskInstructions: [
      'Write an email to the office facilities coordinator in about 150–200 words. Your email should do the following things:',
      'Describe the problems with your new workspace',
      'Explain how these issues are affecting your daily work',
      'Request that the problems be resolved as soon as possible',
    ],
    tone: 'formal',
    recipient: 'Facilities Coordinator',
    theme: 'Workspace issues',
  },
  {
    subheading: 'Damaged Belongings',
    backgroundParagraph:
      'You hired a moving company to help you relocate to a new apartment last weekend. During the move, some of your belongings were damaged, and the movers arrived two hours late.',
    taskInstructions: [
      'Write an email to the manager of the moving company in about 150–200 words. Your email should do the following things:',
      'Describe what happened on the day of the move',
      'Explain which items were damaged',
      'Request compensation or a suitable resolution',
    ],
    tone: 'formal',
    recipient: 'Moving Company Manager',
    theme: 'Damaged belongings',
  },
  {
    subheading: 'Science Competition',
    backgroundParagraph:
      'Your child has been selected to participate in a regional science competition. The school requires a signed permission form and a small participation fee. You have some questions about the event.',
    taskInstructions: [
      'Write an email to your child\'s school principal in about 150–200 words. Your email should do the following things:',
      'Express your support for your child\'s participation',
      'Ask about the schedule, location, and supervision arrangements',
      'Inquire about the fee and how to submit the permission form',
    ],
    tone: 'formal',
    recipient: 'School Principal',
    theme: 'Science competition',
  },
  {
    subheading: 'Reservation Complaint',
    backgroundParagraph:
      'You made a reservation at a restaurant for your parents\' anniversary dinner. When you arrived, the table was not reserved, the waiting time was long, and the staff were unhelpful.',
    taskInstructions: [
      'Write an email to the restaurant manager in about 150–200 words. Your email should do the following things:',
      'Describe the occasion and the reservation you had made',
      'Explain the problems you experienced at the restaurant',
      'Suggest how the restaurant can prevent this from happening again',
    ],
    tone: 'formal',
    recipient: 'Restaurant Manager',
    theme: 'Reservation complaint',
  },
  {
    subheading: 'Heating Problem',
    backgroundParagraph:
      'You live in a rented apartment, and the heating system has not been working properly for the past two weeks. The temperature inside the apartment drops significantly at night.',
    taskInstructions: [
      'Write an email to your building\'s property management office in about 150–200 words. Your email should do the following things:',
      'Describe the heating problem in detail',
      'Explain how the issue is affecting your comfort and daily routine',
      'Request an urgent repair and a timeline for when it will be fixed',
    ],
    tone: 'formal',
    recipient: 'Property Management',
    theme: 'Heating problem',
  },
  {
    subheading: 'Library Hours',
    backgroundParagraph:
      'You are a regular visitor to your local public library. You have noticed that the library closes early on weekdays and does not offer evening study hours, which is inconvenient for working professionals.',
    taskInstructions: [
      'Write an email to the head librarian in about 150–200 words. Your email should do the following things:',
      'Explain why you value the library and how you use it',
      'Describe the difficulty you face with the current hours',
      'Suggest a change to the library\'s schedule and explain how it would benefit the community',
    ],
    tone: 'formal',
    recipient: 'Head Librarian',
    theme: 'Library hours',
  },
  {
    subheading: 'New Employee Orientation',
    backgroundParagraph:
      'You are a team lead, and your department is welcoming several new employees next month. You would like the human resources department to organize an orientation session for them.',
    taskInstructions: [
      'Write an email to the human resources department in about 150–200 words. Your email should do the following things:',
      'Explain why an orientation session is necessary for the new hires',
      'Suggest what topics should be covered, such as company policies and team structure',
      'Propose a suitable date, time, and location for the session',
    ],
    tone: 'formal',
    recipient: 'HR Department',
    theme: 'New employee orientation',
  },
  {
    subheading: 'Park Amenities',
    backgroundParagraph:
      'A new park was recently built in your neighbourhood. However, you have noticed that there are no benches, waste bins, or lighting along the main walking path.',
    taskInstructions: [
      'Write an email to the city parks department in about 150–200 words. Your email should do the following things:',
      'Express your appreciation for the new park',
      'Describe the missing amenities you have noticed',
      'Request that these improvements be made and explain why they are important',
    ],
    tone: 'formal',
    recipient: 'City Parks Department',
    theme: 'Park amenities',
  },
  {
    subheading: 'Shipment Errors',
    backgroundParagraph:
      'You own a small retail shop and recently received a shipment of goods from a supplier. Several items in the order were incorrect, and some were damaged during shipping.',
    taskInstructions: [
      'Write an email to the supplier\'s customer service department in about 150–200 words. Your email should do the following things:',
      'Provide your order details and describe the errors in the shipment',
      'Explain how this has affected your business',
      'Request a replacement for the incorrect and damaged items',
    ],
    tone: 'formal',
    recipient: 'Supplier Customer Service',
    theme: 'Shipment errors',
  },
  {
    subheading: 'Missing Package Items',
    backgroundParagraph:
      'You recently purchased a home appliance online. The product arrived on time, but the user manual was missing and one of the accessories was not included in the box.',
    taskInstructions: [
      'Write an email to the online retailer\'s customer support in about 150–200 words. Your email should do the following things:',
      'Provide your order number and describe the product you received',
      'Explain what was missing from the package',
      'Request that the missing items be sent to you as soon as possible',
    ],
    tone: 'formal',
    recipient: 'Online Retailer Support',
    theme: 'Missing package items',
  },
  {
    subheading: 'Team Celebration',
    backgroundParagraph:
      'Your team at work is celebrating its fifth anniversary, and you have been asked to help organize a small celebration. You need to book a meeting room and arrange refreshments.',
    taskInstructions: [
      'Write an email to the building\'s event coordinator in about 150–200 words. Your email should do the following things:',
      'Explain the purpose of the event and the expected number of attendees',
      'Ask about the availability of a suitable meeting room',
      'Inquire about catering options and any booking procedures',
    ],
    tone: 'semi-formal',
    recipient: 'Event Coordinator',
    theme: 'Team celebration',
  },
  {
    subheading: 'Project Collaboration',
    backgroundParagraph:
      'You are a project manager and your team has been asked to collaborate with another department on an upcoming project. You need to set up an introductory meeting.',
    taskInstructions: [
      'Write an email to the head of the other department in about 150–200 words. Your email should do the following things:',
      'Introduce yourself and explain the purpose of the collaboration',
      'Propose a few dates and times for an initial meeting',
      'Outline what you would like to discuss at the meeting',
    ],
    tone: 'semi-formal',
    recipient: 'Department Head',
    theme: 'Project collaboration',
  },
  {
    subheading: 'Course Complaint',
    backgroundParagraph:
      'You enrolled in an evening language course at a local community centre. After attending two classes, you are dissatisfied with the teaching quality and the class materials.',
    taskInstructions: [
      'Write an email to the community centre\'s program director in about 150–200 words. Your email should do the following things:',
      'Describe which course you enrolled in and when it started',
      'Explain the specific problems you have experienced',
      'Request a transfer to a different class or a refund',
    ],
    tone: 'semi-formal',
    recipient: 'Program Director',
    theme: 'Course complaint',
  },
  {
    subheading: 'Car Repair Follow-up',
    backgroundParagraph:
      'You recently had your car serviced at an auto repair shop. A few days after picking up the car, you noticed that the same problem has returned and a new warning light has appeared.',
    taskInstructions: [
      'Write an email to the auto repair shop manager in about 150–200 words. Your email should do the following things:',
      'Explain when you had the car serviced and what was repaired',
      'Describe the recurring problem and the new issue',
      'Ask for a follow-up appointment and clarify whether the repair is covered under warranty',
    ],
    tone: 'semi-formal',
    recipient: 'Auto Repair Manager',
    theme: 'Car repair follow-up',
  },
  {
    subheading: 'Noise Complaint',
    backgroundParagraph:
      'You live in an apartment building, and the tenant in the unit above yours frequently plays loud music late at night. This has been going on for several weeks and is disturbing your sleep.',
    taskInstructions: [
      'Write an email to your apartment building manager in about 150–200 words. Your email should do the following things:',
      'Describe the noise problem and how long it has been happening',
      'Explain how it is affecting you and your family',
      'Request that the manager take steps to resolve the situation',
    ],
    tone: 'semi-formal',
    recipient: 'Apartment Manager',
    theme: 'Noise complaint',
  },
  {
    subheading: 'Conference Approval',
    backgroundParagraph:
      'Your company offers an annual professional development fund for employees. You would like to use the fund to attend a conference related to your field.',
    taskInstructions: [
      'Write an email to your department manager in about 150–200 words. Your email should do the following things:',
      'Describe the conference and when it takes place',
      'Explain how attending will benefit your work and the team',
      'Request approval to use the professional development fund',
    ],
    tone: 'semi-formal',
    recipient: 'Department Manager',
    theme: 'Conference approval',
  },
  {
    subheading: 'Apartment Inquiry',
    backgroundParagraph:
      'You are planning to move to a new city for a job and need to find a rental apartment. You found a listing online that looks suitable, but you need more information.',
    taskInstructions: [
      'Write an email to the rental agency in about 150–200 words. Your email should do the following things:',
      'Explain your situation and when you need to move in',
      'Describe your requirements for the apartment, such as size and location preferences',
      'Ask about the monthly rent, lease terms, and the application process',
    ],
    tone: 'semi-formal',
    recipient: 'Rental Agency',
    theme: 'Apartment inquiry',
  },
  {
    subheading: 'Speeding Concern',
    backgroundParagraph:
      'Your neighbourhood recently experienced several instances of speeding vehicles on residential streets. You are concerned about the safety of children and elderly pedestrians.',
    taskInstructions: [
      'Write an email to your local city councillor in about 150–200 words. Your email should do the following things:',
      'Describe the speeding problem and the streets affected',
      'Explain why you are concerned about the safety of residents',
      'Suggest possible solutions, such as speed bumps or additional signage',
    ],
    tone: 'semi-formal',
    recipient: 'City Councillor',
    theme: 'Speeding concern',
  },
  {
    subheading: 'Menu Changes',
    backgroundParagraph:
      'You work in an office building where the cafeteria recently changed its menu. The new menu has limited options, higher prices, and no longer includes vegetarian meals.',
    taskInstructions: [
      'Write an email to the cafeteria management in about 150–200 words. Your email should do the following things:',
      'Describe the changes you have noticed in the cafeteria menu',
      'Explain how these changes are affecting you and other employees',
      'Request that the management reconsider the menu and include more variety',
      'Suggest specific improvements that would meet the needs of different dietary preferences',
    ],
    tone: 'semi-formal',
    recipient: 'Cafeteria Management',
    theme: 'Menu changes',
  },
  {
    subheading: 'Workshop Coordination',
    backgroundParagraph:
      'You are organizing a training workshop for your department and need to coordinate with an external trainer. The workshop is scheduled for next month, and you need to finalize the details.',
    taskInstructions: [
      'Write an email to the external trainer in about 150–200 words. Your email should do the following things:',
      'Introduce yourself and explain the purpose of the training workshop',
      'Provide details about the number of participants and the duration of the session',
      'Confirm the date, time, and location, and ask about any equipment the trainer may need',
    ],
    tone: 'semi-formal',
    recipient: 'External Trainer',
    theme: 'Workshop coordination',
  },
  {
    subheading: 'Bakery Feedback',
    backgroundParagraph:
      'A close friend recently started a small bakery business. You visited the bakery and tried some of the products. You want to share your honest feedback and offer your support.',
    taskInstructions: [
      'Write an email to your friend in about 150–200 words. Your email should do the following things:',
      'Congratulate your friend on opening the bakery',
      'Share your thoughts about the products you tried',
      'Offer a suggestion for how the business could attract more customers',
    ],
    tone: 'informal',
    recipient: 'Friend',
    theme: 'Bakery feedback',
  },
  {
    subheading: 'Trip Date Change',
    backgroundParagraph:
      'You and a friend had planned to take a short trip together next month. Due to a change in your work schedule, you can no longer travel on the originally planned dates.',
    taskInstructions: [
      'Write an email to your friend in about 150–200 words. Your email should do the following things:',
      'Apologize for the change in plans',
      'Explain the reason you can no longer travel on the original dates',
      'Suggest alternative dates and ask for your friend\'s availability',
    ],
    tone: 'informal',
    recipient: 'Friend',
    theme: 'Trip date change',
  },
  {
    subheading: 'Job Interview Thanks',
    backgroundParagraph:
      'A friend recently helped you prepare for a job interview by doing practice sessions with you. You got the job and would like to express your gratitude.',
    taskInstructions: [
      'Write an email to your friend in about 150–200 words. Your email should do the following things:',
      'Share the good news about getting the job',
      'Thank your friend for their help with the interview preparation',
      'Suggest a plan to celebrate together',
    ],
    tone: 'informal',
    recipient: 'Friend',
    theme: 'Job interview thanks',
  },
  {
    subheading: 'Settling in a New City',
    backgroundParagraph:
      'Your cousin recently moved to your city from another country. They are finding it difficult to adjust to the new environment and have asked you for advice.',
    taskInstructions: [
      'Write an email to your cousin in about 150–200 words. Your email should do the following things:',
      'Acknowledge how challenging it can be to settle in a new place',
      'Share some practical tips to help them adjust, such as places to visit or communities to join',
      'Offer to spend time together and suggest an activity you could do',
    ],
    tone: 'informal',
    recipient: 'Cousin',
    theme: 'Settling in a new city',
  },
  {
    subheading: 'Reconnecting',
    backgroundParagraph:
      'You and a friend from college have not been in touch for a long time. You recently found out that your friend has moved to a city near yours, and you would like to reconnect.',
    taskInstructions: [
      'Write an email to your friend in about 150–200 words. Your email should do the following things:',
      'Remind your friend of a shared memory from your college days',
      'Share a brief update about what you have been doing since then',
      'Suggest meeting up and propose a time and place',
    ],
    tone: 'informal',
    recipient: 'College Friend',
    theme: 'Reconnecting',
  },
];
