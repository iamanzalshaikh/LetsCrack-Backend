/** Task 2 — Survey-Based Writing (26 min). One prompt per test set (1–25). */
export type WritingTask2Question = {
  title: string;
  surveyTopic: string;
  backgroundParagraph: string;
  optionA: string;
  optionB: string;
  theme: string;
};

export const WRITING_TASK2_QUESTIONS: WritingTask2Question[] = [
  {
    title: 'Employee Training Format Survey',
    surveyTopic: 'Employee Training Format Survey',
    backgroundParagraph:
      'Your company is planning to introduce a monthly skills training program for all employees. The management wants to gather employee preferences on how the training should be delivered before making a final decision.',
    optionA: 'Conduct the training sessions in person at the office during work hours.',
    optionB: 'Provide pre-recorded video modules that employees can complete at their own pace.',
    theme: 'Workplace',
  },
  {
    title: 'Visitor Parking Survey',
    surveyTopic: 'Visitor Parking Survey',
    backgroundParagraph:
      'Your apartment building has a limited number of parking spaces. The building management has noticed that visitor parking spots are frequently occupied by residents\' vehicles. To address this, the management is collecting residents\' opinions.',
    optionA:
      'Assign specific numbered parking spaces to each resident and keep visitor spots restricted.',
    optionB: 'Keep all parking spaces on a first-come, first-served basis for both residents and visitors.',
    theme: 'Apartment',
  },
  {
    title: 'Neighbourhood Development Survey',
    surveyTopic: 'Neighbourhood Development Survey',
    backgroundParagraph:
      'A vacant building in your neighbourhood is being demolished. The local council is considering two proposals for how the land should be used and is asking residents to share their views.',
    optionA: 'Build a community health and wellness centre on the land.',
    optionB: 'Convert the land into an urban garden and green space for residents.',
    theme: 'City Planning',
  },
  {
    title: 'School Communication Survey',
    surveyTopic: 'School Communication Survey',
    backgroundParagraph:
      'The school administration is reviewing how teachers share student progress updates with parents. Currently, report cards are sent home at the end of each term. The school wants to explore more frequent communication methods.',
    optionA: 'Send home brief weekly progress notes from each teacher.',
    optionB: 'Set up an online portal where parents can check grades and teacher comments at any time.',
    theme: 'Education',
  },
  {
    title: 'Community Health Services Survey',
    surveyTopic: 'Community Health Services Survey',
    backgroundParagraph:
      'Residents in your area have reported difficulty accessing basic health services, especially on weekends and evenings. The local health authority is exploring options to improve availability and is seeking community feedback.',
    optionA: 'Open a walk-in clinic that operates on evenings and weekends.',
    optionB: 'Launch a telephone-based health advice line staffed by doctors.',
    theme: 'Healthcare',
  },
  {
    title: 'Small Business Funding Survey',
    surveyTopic: 'Small Business Funding Survey',
    backgroundParagraph:
      'You and a colleague are planning to start a home-cleaning service. You need start-up funds to buy equipment and advertise. You are discussing how to finance the business.',
    optionA: 'Apply for a business loan from a bank with a larger operation.',
    optionB: 'Use your personal savings and start with a smaller operation.',
    theme: 'Business',
  },
  {
    title: 'City Festival Translation Survey',
    surveyTopic: 'City Festival Translation Survey',
    backgroundParagraph:
      'Your city is hosting a large annual food festival that attracts visitors from many countries. Organizers want to ensure that non-English-speaking visitors can enjoy the event. They are gathering opinions from residents.',
    optionA: 'Provide a free mobile app with translated menus, maps, and schedules.',
    optionB: 'Station volunteer translators at key locations throughout the festival grounds.',
    theme: 'Public Event / Tech',
  },
  {
    title: 'Employee Recognition Survey',
    surveyTopic: 'Employee Recognition Survey',
    backgroundParagraph:
      'Your company wants to introduce a quarterly recognition program to celebrate employees who have shown outstanding performance. The management is asking employees for their preference.',
    optionA: 'Give the recognized employee a bonus added to their salary.',
    optionB: 'Award the recognized employee an extra paid day off.',
    theme: 'Workplace',
  },
  {
    title: 'Community Park Improvement Survey',
    surveyTopic: 'Community Park Improvement Survey',
    backgroundParagraph:
      'Your neighbourhood park is popular with families, joggers, and seniors. However, many visitors have commented that the park lacks adequate resting spots, especially along the main trails. The city\'s parks department is seeking residents\' input on how to improve the space.',
    optionA: 'Add more benches and shaded seating areas along the walking trails.',
    optionB: 'Build a covered pavilion with picnic tables near the centre of the park.',
    theme: 'Parks',
  },
  {
    title: 'Commuter Safety Survey',
    surveyTopic: 'Commuter Safety Survey',
    backgroundParagraph:
      'The city\'s transportation department has received complaints about safety at bus stops, particularly during early morning and late evening hours. The department is considering two improvements and is seeking public input.',
    optionA: 'Install brighter lighting and emergency call buttons at all bus stops.',
    optionB: 'Provide enclosed shelters with security cameras at all bus stops.',
    theme: 'Transportation',
  },
  {
    title: 'Public Library Improvement Survey',
    surveyTopic: 'Public Library Improvement Survey',
    backgroundParagraph:
      'Your local public library has received a special grant and is deciding how to use the funds to better serve the community. The library is surveying its members for their opinions.',
    optionA: 'Use the funds to create a dedicated children\'s learning and activity room.',
    optionB: 'Use the funds to expand the digital collection, including e-books and audiobooks.',
    theme: 'Library',
  },
  {
    title: 'Office Layout Survey',
    surveyTopic: 'Office Layout Survey',
    backgroundParagraph:
      'Your company is redesigning the office floor plan to improve productivity. The management wants to know how employees feel about the workspace arrangement before making changes.',
    optionA: 'Create an open-concept office where all employees share a large, common workspace.',
    optionB: 'Provide individual enclosed offices or cubicles for each employee.',
    theme: 'Workplace',
  },
  {
    title: 'After-School Program Survey',
    surveyTopic: 'After-School Program Survey',
    backgroundParagraph:
      'The school board is planning to introduce a new after-school program for students in grades 6 to 8. They are seeking parents\' feedback on which type of program would be most valuable.',
    optionA: 'An academic tutoring program focused on math and reading skills.',
    optionB: 'A creative arts program offering classes in music, painting, and drama.',
    theme: 'Education',
  },
  {
    title: 'Museum Operating Hours Survey',
    surveyTopic: 'Museum Operating Hours Survey',
    backgroundParagraph:
      'Your local museum currently operates from 9:00 a.m. to 5:00 p.m. on all days, including weekends. Many working residents and students have expressed that they are unable to visit during these hours. The museum board is gathering public feedback to consider a schedule change.',
    optionA: 'Keep the current hours (9:00 a.m. to 5:00 p.m.) but offer free admission on weekends.',
    optionB: 'Extend hours to 9:00 p.m. on weekdays so residents can visit in the evening.',
    theme: 'Museum / Culture',
  },
  {
    title: 'Conference Accommodation Survey',
    surveyTopic: 'Conference Accommodation Survey',
    backgroundParagraph:
      'Your employer is sending a group of employees to a three-day professional conference in another city. The company is letting employees choose their preferred accommodation arrangement.',
    optionA: 'Stay at a hotel within walking distance of the conference venue, with shared rooms.',
    optionB: 'Stay at a more spacious hotel 20 minutes away by shuttle, with private rooms.',
    theme: 'Workplace',
  },
  {
    title: 'Traffic Safety Survey',
    surveyTopic: 'Traffic Safety Survey',
    backgroundParagraph:
      'Residents on Maple Street in your neighbourhood have raised concerns about heavy traffic and frequent speeding during school hours. The local traffic authority is considering ways to reduce accidents and improve safety in the area and is asking for residents\' opinions.',
    optionA: 'Install traffic signals and speed bumps along Maple Street.',
    optionB: 'Restrict vehicle access on Maple Street during school arrival and dismissal times.',
    theme: 'Traffic / Safety',
  },
  {
    title: 'Building Renovation Priority Survey',
    surveyTopic: 'Building Renovation Priority Survey',
    backgroundParagraph:
      'Your apartment building\'s management company has a renovation budget for the coming year. They can only afford one major improvement and are asking residents which upgrade is more important.',
    optionA: 'Renovate the building\'s lobby and main entrance to improve appearance and security.',
    optionB: 'Upgrade the elevator system to reduce breakdowns and wait times.',
    theme: 'Apartment',
  },
  {
    title: 'Grocery Delivery Service Survey',
    surveyTopic: 'Grocery Delivery Service Survey',
    backgroundParagraph:
      'A popular grocery chain in your area is considering adding a home delivery service. Before launching, the company is asking regular customers for their preference on how the service should work.',
    optionA: 'Offer same-day delivery with a small delivery fee for each order.',
    optionB: 'Offer a monthly subscription plan with unlimited free deliveries.',
    theme: 'Daily Life',
  },
  {
    title: 'Office Relocation Survey',
    surveyTopic: 'Office Relocation Survey',
    backgroundParagraph:
      'Your company is growing and needs more space. The management is considering two options for the new office and wants to gather employee opinions before making a decision.',
    optionA: 'Rent a large office in the downtown core but with limited parking.',
    optionB: 'Rent a large office in a suburban area with free parking.',
    theme: 'Workplace',
  },
  {
    title: 'Residential Safety Improvement Survey',
    surveyTopic: 'Residential Safety Improvement Survey',
    backgroundParagraph:
      'Residents in your community have expressed concerns about safety during the winter months when sidewalks become icy and poorly lit. The local government is asking for feedback on how to improve the situation.',
    optionA: 'Increase the frequency of snow removal and salting on residential sidewalks.',
    optionB: 'Install additional streetlights along all residential walkways and paths.',
    theme: 'Community',
  },
  {
    title: 'Classroom Technology Survey',
    surveyTopic: 'Classroom Technology Survey',
    backgroundParagraph:
      'The school board is deciding how to equip classrooms with technology for the upcoming academic year. Parents are being asked for their input on which approach would better support student learning.',
    optionA: 'Provide each student with a personal tablet for use in class and at home.',
    optionB: 'Set up shared computer stations in each classroom for group activities and research.',
    theme: 'Education / Tech',
  },
  {
    title: 'Workplace Lunch Break Survey',
    surveyTopic: 'Workplace Lunch Break Survey',
    backgroundParagraph:
      'Your company is reviewing its lunch break policy. Some employees have suggested changes to improve work-life balance during the workday. The management is asking employees for their preference.',
    optionA: 'Offer a longer 90-minute lunch break with a later end to the workday.',
    optionB: 'Keep the standard 30-minute lunch break and allow employees to leave earlier.',
    theme: 'Workplace',
  },
  {
    title: 'Restaurant Payment Survey',
    surveyTopic: 'Restaurant Payment Survey',
    backgroundParagraph:
      'A local restaurant where you are a regular customer is updating its payment system. The owner is surveying customers to decide which change to make.',
    optionA: 'Introduce a digital menu and ordering system using tablets at each table.',
    optionB: 'Keep traditional service but add mobile phone payment options.',
    theme: 'Business / Service',
  },
  {
    title: 'Summer Community Event Survey',
    surveyTopic: 'Summer Community Event Survey',
    backgroundParagraph:
      'Your community centre is planning a large event for the summer and can only organize one major activity due to budget constraints. The centre is surveying local residents to decide which event to hold.',
    optionA: 'Organize a weekend outdoor movie screening series in the local park.',
    optionB: 'Host a community talent show featuring local performers of all ages.',
    theme: 'Community',
  },
  {
    title: 'Office Sustainability Initiative Survey',
    surveyTopic: 'Office Sustainability Initiative Survey',
    backgroundParagraph:
      'Your company is committed to reducing its environmental impact and has asked employees to participate in a survey to choose the first green initiative to implement.',
    optionA:
      'Eliminate all single-use plastics from the office, including cups, cutlery, and packaging.',
    optionB: 'Install solar panels on the office building to reduce energy consumption and electricity costs.',
    theme: 'Workplace / Environment',
  },
];
