/** Reading Part 3 — Reading for Information (Set 1) */
export const READING_PART3 = {
  title: 'Part 3: Reading for Information',
  instructions:
    'Read the following passage. Decide which paragraph, A to D, has the information given in each statement below. Select E if the information is not given in any of the paragraphs.',
  timerSeconds: 540,
  layoutType: 'split' as const,
  leftPanel: {
    type: 'markdown' as const,
    contentBlocks: [
      `[A] Photographs of spectacular rainbows are a dime a dozen, but a similar event seldom witnessed is the occurrence of moonbows. While rainbows are caused by beams of sunlight refracting through water droplets in the atmosphere, moonbows, as their name suggests, are created by beams of moonlight refracting through moisture in the air. However, this is where the similarity to rainbows ends. These nighttime bows, also referred to as lunar rainbows, are a much rarer phenomenon, occurring only at particular times of the year and limited by geographic requirements.

[B] A distinct combination of astronomical and meteorological conditions is required in order for a moonbow to occur. For one, the moon must be bright, such as during a full or nearly full moon. Moreover, the moon must be low in the sky, no more than 42 degrees above the horizon. The lower the elevation of the moon, the fuller the lunar rainbow. Finally, there must be water droplets present in the atmosphere. The optimal conditions occur on nights during which there are rain showers falling opposite the moon and the sky is clear. Mist from waterfalls can also create the appropriate amount of moisture in the atmosphere. Under these precise conditions, a viewer standing with his or her back to the moon could potentially observe a moonbow.

[C] Although multicoloured, the bands of the arc of a moonbow appear as various shades of grey to the naked eye. This can be attributed to physiological factors. Because it is difficult for the human eye to discern colours at low levels of illumination, such as in the darkness of night, the multihued bow appears white or grey. Nonetheless, the magnificent colours of lunar bows can be picked up in long-exposure photographs, even though the arc appears monochrome to the photographer.

[D] Because of the specific combination of conditions required, moonbows are more prevalent in certain locations around the world, particularly those that have waterfalls. Such moonbows form fairly regularly at Yosemite Falls in California, Cumberland Falls in Kentucky, and Victoria Falls on the border of Zambia and Zimbabwe in Africa. In fact, moonbow predictions at some of these locations can be found on various websites. The appearance of lunar rainbows is also common in the cloud forests of Costa Rica and in certain areas of Hawaii. If you are fortunate enough to be at the right place at the right time, you may be able to catch a glimpse of this magnificent phenomenon.

[E] Not given in any of the above paragraphs.`,
    ],
  },
  rightPanel: {
    sections: [
      {
        type: 'paragraph_match' as const,
        matchingQuestions: [
          {
            id: 'rd-p3-q1',
            statement:
              'The orientation of the moon in relation to the earth impacts the intensity of the bow.',
            correctParagraph: 'B',
            order: 1,
          },
          {
            id: 'rd-p3-q2',
            statement: 'Moonbows occur less frequently than their daytime counterparts.',
            correctParagraph: 'A',
            order: 2,
          },
          {
            id: 'rd-p3-q3',
            statement: 'Specific circumstances must occur simultaneously in order to create a moonbow.',
            correctParagraph: 'B',
            order: 3,
          },
          {
            id: 'rd-p3-q4',
            statement: 'Images of rainbows are much more common than images of moonbows.',
            correctParagraph: 'A',
            order: 4,
          },
          {
            id: 'rd-p3-q5',
            statement: 'Moonbows are often seen on nights when the moon is high in the sky.',
            correctParagraph: 'E',
            order: 5,
          },
          {
            id: 'rd-p3-q6',
            statement: 'Specific geographical sites are more suitable for lunar rainbows.',
            correctParagraph: 'D',
            order: 6,
          },
          {
            id: 'rd-p3-q7',
            statement: 'It is possible to obtain forecasts for some moonbow occurrences.',
            correctParagraph: 'D',
            order: 7,
          },
          {
            id: 'rd-p3-q8',
            statement: 'Perception of moonbow colours is hindered by lack of light.',
            correctParagraph: 'C',
            order: 8,
          },
          {
            id: 'rd-p3-q9',
            statement: 'Observers have claimed to see moonbows during crescent moon phases.',
            correctParagraph: 'E',
            order: 9,
          },
        ],
      },
    ],
  },
};
