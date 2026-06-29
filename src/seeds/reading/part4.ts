/** Reading Part 4 — Reading for Viewpoints (Set 1) */
export const READING_PART4 = {
  title: 'Part 4: Reading for Viewpoints',
  instructions:
    'Read the following article from a website. Answer the questions and complete the comment by choosing the best options from the drop-down menus.',
  timerSeconds: 720,
  layoutType: 'split' as const,
  leftPanel: {
    type: 'markdown' as const,
    contentBlocks: [
      `Smartphones and other technological paraphernalia have invaded our lives. We are now surrounded by people eschewing social etiquette by compulsively checking their phones, drawn automatically to the incessant "ding" of their notifications. The ubiquity and nature of this modern technology have made concentrating on anything for more than a moment feel like a Herculean task. Young children are particularly at risk, since their neurological development is not yet complete.

The impression that children are negatively affected by personal computing devices is reflected in anecdotal evidence from classrooms, where teachers increasingly report shortened attention spans in pupils. Lisa Cranberg, a veteran elementary school teacher, believes that "exposure to technology is rewiring our kids' brains." For her, "children spending extended periods of time interacting solely with their smartphones is showing diminished self-awareness, emotional intelligence, and focus." In essence, she believes that overstimulation is making it difficult for students to concentrate in a traditional lecture-centric classroom.

Not everyone is as anxious, however, about technological advances. Dr. Clara Hughes of the University of Waterloo agrees that shifts in stimuli are resulting in cerebral rewiring, with ramifications that might include shorter attention spans. However, she claims that developing these mechanisms that allow us to partake in rapid-fire attention shifting is actually "beneficial to creative types whose job is to amalgamate disparate ideas." She surmises that our brains are simply adapting to the level of stimulation inherent to our environment.

In fact, while technology can be harmful to concentration, a new wave of research is unearthing a whole slew of unforeseen beneficial effects. "Modern technology is bettering our ability to multitask and concentrate in short bursts," according to neuropsychologist Dr. Mark Levinson. This means that "we get a better sense of what deserves our attention, and there is an improved selection of the information we commit to memory."

Dr. Hughes is more moderate in her analysis, saying that "overexposure and gadget addiction do have a demonstrably negative effect on many cognitive behaviours." Nevertheless, she concurs with Dr. Levinson's overall beneficial assessment of the neurological side-effects of our interactions with digital technologies.`,
    ],
  },
  rightPanel: {
    sections: [
      {
        type: 'standalone_dropdown' as const,
        questions: [
          {
            id: 'rd-p4-q1',
            type: 'single_select' as const,
            label: '1. The intent of the first paragraph is to',
            options: [
              'complain about a technology-linked decline in social skills.',
              'describe recent advances in digital communication technology.',
              'criticize the detrimental overuse of communication devices.',
              'warn about how smartphones may impact children\'s brains.',
            ],
            correctAnswer: 3,
            order: 1,
          },
          {
            id: 'rd-p4-q2',
            type: 'single_select' as const,
            label: '2. Ms. Cranberg\'s opinion stems from her',
            options: [
              'experiences with her own children.',
              'observations over the years.',
              'research on emotional intelligence.',
              'use of traditional lectures.',
            ],
            correctAnswer: 1,
            order: 2,
          },
          {
            id: 'rd-p4-q3',
            type: 'single_select' as const,
            label: '3. Dr. Hughes\' main point is that our',
            options: [
              'behaviour indicates shortened attention spans.',
              'brains are benefiting by becoming more creative.',
              'behaviours are being negatively affected.',
              'brains are adapting to new technologies.',
            ],
            correctAnswer: 3,
            order: 3,
          },
          {
            id: 'rd-p4-q4',
            type: 'single_select' as const,
            label: '4. Dr. Hughes and Ms. Cranberg would agree that',
            options: [
              'communication technology overuse may lower emotional intelligence.',
              'smartphones may contribute to higher academic achievement.',
              'electronic devices can foster creativity in young people.',
              'children can better multitask thanks to electronic devices.',
            ],
            correctAnswer: 0,
            order: 4,
          },
          {
            id: 'rd-p4-q5',
            type: 'single_select' as const,
            label: '5. Dr. Levinson would likely agree that',
            options: [
              'children can benefit from using technological devices.',
              'the impacts of digital devices deserve more attention.',
              'our brains need stimulation from digital devices.',
              'technological devices can harm our memory processes.',
            ],
            correctAnswer: 0,
            order: 5,
          },
        ],
      },
      {
        type: 'inline_dropdown' as const,
        template: `I've never really thought about the effect of emerging technologies on neurological development, but as a parent of four youngsters, this piece certainly piqued my interest! After reading the various viewpoints, I felt that {{6}} neglected to mention the potentially negative consequences of diminishing attention spans. {{7}} numerous valuable effects of human-computer interactions, such as improvements in the ability to simultaneously execute multiple activities, assemble contrasting information, and sort out facts. Meanwhile, I was disappointed by the alarmist views on {{8}} expressed by Ms. Cranberg. {{9}} should be a blessing for teachers and classrooms. {{10}} traditional educational methods, as Ms. Cranberg insinuates, then these methods need to be adapted to the way children consume information in their daily lives.`,
        questions: [
          {
            id: 'rd-p4-q6',
            type: 'inline_select' as const,
            options: ['the author', 'Dr. Hughes', 'Ms. Cranberg', 'Dr. Levinson'],
            correctAnswer: 1,
            order: 6,
          },
          {
            id: 'rd-p4-q7',
            type: 'inline_select' as const,
            options: [
              'This article also disparages the',
              'Additionally, the stakeholders ignore',
              'But I agree that there are',
              'Only the teacher appreciates the',
            ],
            correctAnswer: 2,
            order: 7,
          },
          {
            id: 'rd-p4-q8',
            type: 'inline_select' as const,
            options: [
              'the declining quality of homework',
              'disorderly student behaviours',
              'teachers\' reporting practices',
              'students and electronic devices',
            ],
            correctAnswer: 3,
            order: 8,
          },
          {
            id: 'rd-p4-q9',
            type: 'inline_select' as const,
            options: [
              'New informational inputs',
              'Modified cognitive behaviours',
              'Children\'s improved curiosity',
              'Tried-and-true teaching methods',
            ],
            correctAnswer: 1,
            order: 9,
          },
          {
            id: 'rd-p4-q10',
            type: 'inline_select' as const,
            options: [
              'When teachers are tired of',
              'If children are not engaged by',
              'Since technology has improved',
              'Unless students prefer',
            ],
            correctAnswer: 1,
            order: 10,
          },
        ],
      },
    ],
  },
};
