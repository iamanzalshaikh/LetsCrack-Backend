/** Reading Part 2 — Reading to Apply a Diagram (Set 1) */
export const READING_PART2 = {
  title: 'Part 2: Reading to Apply a Diagram',
  instructions:
    'Read the following email message about the diagram on the left. Complete the email by filling in the blanks. Select the best choice for each blank from the drop-down menu.',
  timerSeconds: 480,
  layoutType: 'split' as const,
  leftPanel: {
    type: 'image' as const,
    contentBlocks: [
      `**BURDY'S CHOCOLATES — Product Range Diagram**
      
      *Note: Upload the official diagram image in the admin panel to replace this text reference.*`,
    ],
    mediaUrl: '/video/image.png',
  },
  rightPanel: {
    sections: [
      {
        type: 'inline_dropdown' as const,
        template: `Subject: Chocolates
To: Roger Neufeld <rogerneufeld@burdys.com>
From: Vincent Mathijs <vmathijs@burdys.com>

Good morning Roger,

Hope you had a great weekend. As promised, here's my draft of the concept for our next product line. The concept is to simplify and logically group our range of chocolate confections. Customers still have plenty of options—but there won't be any {{1}}. Informal market research showed that the most popular item among the available options was the marzipan in the {{2}} shape.

One strategy behind the product range is to stand out from our competitors by {{3}}. Another strategy was to follow the consumer trend toward healthier options that limit the intake of particular ingredients. The {{4}} products are specifically designed to fill this need.

Well, those are my ponderings on this concept. What are yours? If I could have your feedback before next Friday, I'd really appreciate it.

Thanks in advance for your input.

Vincent Mathijs, {{5}}`,
        questions: [
          {
            id: 'rd-p2-q1',
            type: 'inline_select' as const,
            options: [
              'leaf-shaped marzipan',
              'praline rose blossoms',
              'globe-shaped truffles',
              'star-shaped fudge',
            ],
            correctAnswer: 2,
            order: 1,
          },
          {
            id: 'rd-p2-q2',
            type: 'inline_select' as const,
            options: ['long rectangle', 'swirling spiral', 'ringed planet', 'tulip blossom'],
            correctAnswer: 1,
            order: 2,
          },
          {
            id: 'rd-p2-q3',
            type: 'inline_select' as const,
            options: [
              'focusing just on rich dark chocolate',
              'having a clearly organized collection',
              'lightly dusting all the treats with sugar',
              'offering twenty different kinds of nuts',
            ],
            correctAnswer: 1,
            order: 3,
          },
          {
            id: 'rd-p2-q4',
            type: 'inline_select' as const,
            options: ['fudge', 'ganache', 'praline', 'truffle'],
            correctAnswer: 1,
            order: 4,
          },
          {
            id: 'rd-p2-q5',
            type: 'inline_select' as const,
            options: [
              'Accounts Receivable Officer',
              'Founder and International CEO',
              'Product Development Specialist',
              'Shipping and Receiving Manager',
            ],
            correctAnswer: 2,
            order: 5,
          },
        ],
      },
      {
        type: 'standalone_dropdown' as const,
        questions: [
          {
            id: 'rd-p2-q6',
            type: 'single_select' as const,
            label: '6. If you want to avoid almonds, what are your only options?',
            options: [
              'chocolates in geometric shapes',
              'dark milk chocolate products',
              'just the costliest products',
              'truffles, ganache, and fudge',
            ],
            correctAnswer: 3,
            order: 6,
          },
          {
            id: 'rd-p2-q7',
            type: 'single_select' as const,
            label: '7. What do we know for sure about Vincent and Roger?',
            options: [
              'Vincent and Roger work in the same department.',
              'Roger must receive the chocolates before Friday.',
              'Vincent is Roger\'s supervisor at a chocolate factory.',
              'Roger had been expecting Vincent\'s message.',
            ],
            correctAnswer: 3,
            order: 7,
          },
          {
            id: 'rd-p2-q8',
            type: 'single_select' as const,
            label: '8. What should Roger do after he reads the message?',
            options: [
              'acknowledge the merits and suggest improvements',
              'draft a proposal for a different chocolate collection',
              'send the requested market research results data',
              'taste and critique the various sample chocolates',
            ],
            correctAnswer: 0,
            order: 8,
          },
        ],
      },
    ],
  },
};
