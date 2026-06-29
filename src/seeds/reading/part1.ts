/** Reading Part 1 — Reading Correspondence (Set 1) */
export const READING_PART1 = {
  title: 'Part 1: Reading Correspondence',
  instructions:
    'Read the following message. Answer the questions and complete the reply email below by choosing the best options from the dropdown menus.',
  timerSeconds: 600,
  layoutType: 'split' as const,
  leftPanel: {
    type: 'markdown' as const,
    contentBlocks: [
      `Dear Ara,

Thank you for submitting your insurance claim to our office. I have finished reviewing it, including your photos of the water-damaged items and the original purchase receipts for them. I appreciated the itemized spreadsheet you included.

You have claimed the cost of replacing your desktop computer, which was for personal use only and damaged in the flood. The computer cannot be repaired, so the cost of replacing it is approved. However, your spreadsheet also itemizes the cost of a 3-year extended warranty, purchased along with the computer. Since the computer is 7 years old, the warranty coverage has expired. We cannot pay for the expired warranty portion of your computer costs.

You have also claimed the cost of the goods and services tax (GST) on the original purchase price of items that were damaged. Unfortunately, we pay this cost only on items that have been purchased as replacements. Therefore, for any replacement item you purchase, please submit the receipt to us. Note that interest on credit card purchases is not covered.

Regarding the wool carpet samples, you indicated that these are the property of the flooring company you work for. Our policy covers only property owned and used by you personally, so I'm sorry, but we cannot cover the cost of the damaged carpet samples.

When it's time for you to renew your policy with us next spring, we recommend that you purchase additional insurance for items stored in your home but owned by or used in your business. This would protect you not only against the type of loss you recently experienced, but also against other risks such as fire.

Your adjusted total is $16,400. Our accounting department will issue you a cheque on the 15th of this month. If you would prefer to pick it up rather than receive it by mail, please let me know by this Wednesday at the latest.

As a valued long-time client, please accept warmest wishes from our family of companies. We wish you every success in recovering from your losses this past August, and we are pleased to have been able to assist you.

Regards,
Nelson Lowe`,
    ],
  },
  rightPanel: {
    sections: [
      {
        type: 'standalone_dropdown' as const,
        questions: [
          {
            id: 'rd-p1-q1',
            type: 'single_select' as const,
            label: '1. What caused Ara\'s situation?',
            options: [
              'an accident at home',
              'an error on a tax form',
              'an expired insurance policy',
              'an incorrect charge at a store',
            ],
            correctAnswer: 0,
            order: 1,
          },
          {
            id: 'rd-p1-q2',
            type: 'single_select' as const,
            label: '2. Nelson approved',
            options: [
              'interest fees on credit card purchases.',
              'the remaining warranty on the computer.',
              'replacement costs for the carpet samples.',
              'the cost of a new desktop computer.',
            ],
            correctAnswer: 3,
            order: 2,
          },
          {
            id: 'rd-p1-q3',
            type: 'single_select' as const,
            label: '3. What is Ara most likely to do next?',
            options: [
              'have her damaged personal computer repaired',
              'decide whether to call Nelson about the cheque',
              'use the gift card that Nelson enclosed',
              'send Nelson the full amount owing on the bill',
            ],
            correctAnswer: 1,
            order: 3,
          },
          {
            id: 'rd-p1-q4',
            type: 'single_select' as const,
            label: '4. Nelson wants Ara to',
            options: [
              'insure business items separately.',
              'purchase a longer computer warranty.',
              'eliminate household fire hazards.',
              'remove her water-damaged carpeting.',
            ],
            correctAnswer: 0,
            order: 4,
          },
          {
            id: 'rd-p1-q5',
            type: 'single_select' as const,
            label: '5. Nelson probably works',
            options: [
              'for a furniture repair shop.',
              'for a large corporation.',
              'as a small business owner.',
              'as Ara\'s business partner.',
            ],
            correctAnswer: 1,
            order: 5,
          },
          {
            id: 'rd-p1-q6',
            type: 'single_select' as const,
            label: '6. Nelson wrote this message mainly to',
            options: [
              'explain the outcome of her insurance claim.',
              'request additional photos of damaged items.',
              'offer a discount on car insurance.',
              'apologize for the flood damage to her home.',
            ],
            correctAnswer: 0,
            order: 6,
          },
        ],
      },
      {
        type: 'inline_dropdown' as const,
        template: `Dear Nelson,

Thank you for your message.

I'm glad to hear that you {{7}}. I didn't realize that the warranty on my computer had expired; {{8}} that in my claim.

I have two questions. First, before the flood happened, I brought the carpet samples home {{9}} because we're redecorating our living room and wanted to choose new carpeting. I'm not actually using the house for business purposes or to store business supplies. Regarding the samples, does this new information affect {{10}} ?

Second, would I get a discount on car insurance if I switched from my current company to you, since I already have house insurance with you? I realize this question is {{11}} the claim at hand, but I would appreciate your response when convenient.

Sincerely,
Ara`,
        questions: [
          {
            id: 'rd-p1-q7',
            type: 'inline_select' as const,
            options: [
              'aim to improve client service',
              'can make sense of what I owe',
              'found my spreadsheet helpful',
              'have put the cheque in the mail',
            ],
            correctAnswer: 2,
            order: 7,
          },
          {
            id: 'rd-p1-q8',
            type: 'inline_select' as const,
            options: [
              'my apologies for including',
              'thank you for including',
              'I was correct to include',
              'it was too late to include',
            ],
            correctAnswer: 0,
            order: 8,
          },
          {
            id: 'rd-p1-q9',
            type: 'inline_select' as const,
            options: ['secretly', 'temporarily', 'reluctantly', 'accidentally'],
            correctAnswer: 1,
            order: 9,
          },
          {
            id: 'rd-p1-q10',
            type: 'inline_select' as const,
            options: [
              'their goods and services tax rate for the year',
              'my household possessions insurance expiry date',
              'our costs for having them installed in our house',
              'your decision to classify them as business items',
            ],
            correctAnswer: 3,
            order: 10,
          },
          {
            id: 'rd-p1-q11',
            type: 'inline_select' as const,
            options: ['critical to', 'unrelated to', 'part of', 'complicating'],
            correctAnswer: 1,
            order: 11,
          },
        ],
      },
    ],
  },
};
