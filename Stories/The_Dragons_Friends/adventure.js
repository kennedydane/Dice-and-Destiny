const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType, LevelFormat, PageBreak } = require('docx');
const fs = require('fs');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "8B4513" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };
const dmBoxBorder = { style: BorderStyle.DOUBLE, size: 2, color: "2E5C8A" };
const dmBoxBorders = { top: dmBoxBorder, bottom: dmBoxBorder, left: dmBoxBorder, right: dmBoxBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: "8B0000", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 240 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: "8B0000", font: "Arial" },
        paragraph: { spacing: { before: 280, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, color: "B8860B", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 140 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: "654321", font: "Arial" },
        paragraph: { spacing: { before: 160, after: 100 }, outlineLevel: 2 } },
      { id: "Subtitle", name: "Subtitle", basedOn: "Normal",
        run: { size: 28, italics: true, color: "654321", font: "Arial" },
        paragraph: { spacing: { after: 240 }, alignment: AlignmentType.CENTER } },
      { id: "DMText", name: "DM Text", basedOn: "Normal",
        run: { size: 22, color: "2E5C8A", font: "Arial" },
        paragraph: { spacing: { after: 120 } } },
      { id: "ReadAloud", name: "Read Aloud", basedOn: "Normal",
        run: { size: 24, italics: true, color: "4B0082", font: "Arial" },
        paragraph: { spacing: { after: 120, before: 120 }, indent: { left: 360 } } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "number-list",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    children: [
      // Title Page
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("The Dragon's Friends")] }),
      new Paragraph({ style: "Subtitle", children: [new TextRun("A Beginner's D&D Adventure")] }),
      new Paragraph({ style: "Subtitle", children: [new TextRun("For Young Heroes Ages 5-8")] }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "A baby dragon is trapped! Only brave heroes can save it, find the magical Rainbow Gems, and stop the Grumpy Goblin King!", size: 26, italics: true })]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Adventure Length: 2 hours", bold: true, color: "8B0000" })]
      }),
      new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "For 2-5 Young Players", bold: true, color: "8B0000" })]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // DM Introduction
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Dungeon Master's Introduction")] }),
      
      new Paragraph({ children: [new TextRun({ text: "Welcome, Dungeon Master!", bold: true, size: 28, color: "2E5C8A" })] }),
      new Paragraph({ children: [new TextRun("Thank you for running this adventure! This guide will help you every step of the way. You'll find detailed descriptions, DM tips in blue boxes, and suggestions for handling different player actions.")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Adventure Overview")] }),
      new Paragraph({ children: [new TextRun({ text: "The Story:", bold: true }), new TextRun(" Sparkle, a baby dragon, is trapped in the old mill. The heroes must rescue Sparkle, then help find the Rainbow Gems that will restore magic to the forest. Finally, they'll face Grumbletooth, the Grumpy Goblin King, who's been causing all the trouble!")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Three Acts")] }),
      new Paragraph({ numbering: { reference: "number-list", level: 0 }, children: [new TextRun({ text: "Rescue Sparkle ", bold: true }), new TextRun("(30-40 minutes): Navigate the old mill, solve simple puzzles, defeat minor threats")] }),
      new Paragraph({ numbering: { reference: "number-list", level: 0 }, children: [new TextRun({ text: "Find the Rainbow Gems ", bold: true }), new TextRun("(40-50 minutes): Explore the Whispering Woods, meet magical creatures, collect gems")] }),
      new Paragraph({ numbering: { reference: "number-list", level: 0 }, children: [new TextRun({ text: "Defeat Grumbletooth ", bold: true }), new TextRun("(30-40 minutes): Storm the goblin fort, face the silly villain, save the day!")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("How to Use This Book")] }),
      
      new Paragraph({ children: [new TextRun({ text: "Read Aloud Text", bold: true, italics: true, color: "4B0082" })] }),
      new Paragraph({ children: [new TextRun("Purple italic text like this is meant to be read aloud to the players. This sets the scene!")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM TIPS AND GUIDANCE", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "Blue boxes like this contain tips, suggestions for handling player actions, and behind-the-scenes information just for you!", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Important Reminders")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Say YES more than NO - ", bold: true }), new TextRun("Let creative ideas work!")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Keep it moving - ", bold: true }), new TextRun("Give hints if kids get stuck")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Make it fun - ", bold: true }), new TextRun("Use silly voices and sound effects")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Let them win - ", bold: true }), new TextRun("They should feel like heroes!")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Take breaks - ", bold: true }), new TextRun("Halfway through, take a snack break")] }),

      new Paragraph({ children: [new PageBreak()] }),

      // NPC DESCRIPTIONS
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("NPC Descriptions")] }),
      new Paragraph({ children: [new TextRun("These characters appear throughout the adventure. Use these descriptions to keep their portrayal consistent!")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Sparkle - Baby Dragon")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Role: ", bold: true }), new TextRun("The heart of the adventure - the baby dragon everyone is trying to rescue")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Appearance: ", bold: true }), new TextRun("Smaller than a dog, purple and pink scales that shimmer, big hopeful eyes, cute and endearing")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Personality: ", bold: true }), new TextRun("Very friendly, loves flowers, grateful and encouraging. Has a cute voice! Stays with the party after rescue and provides hints when needed.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Scenes: ", bold: true }), new TextRun("Act 1 Scene 5 (rescue), Act 2 Scenes 6 and all gem quests, Act 3 Scenes 7-10")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Farmer Brown - Elderly Human")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Role: ", bold: true }), new TextRun("The quest-giver who introduces the adventure")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Appearance: ", bold: true }), new TextRun("Old, weathered face, kind eyes, humble farmer's clothes")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Personality: ", bold: true }), new TextRun("Friendly and desperate, cares deeply about Sparkle. Trusting in the heroes. Speaks plainly and directly.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Scenes: ", bold: true }), new TextRun("Act 1 Scene 1 (introduction and quest hook)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Reward Given: ", bold: true }), new TextRun("Small bag with 3 healing potions (heals 1d6 HP each)")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Goblins - Common Minions")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Role: ", bold: true }), new TextRun("Grumbletooth's servants and guards throughout the adventure")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Appearance: ", bold: true }), new TextRun("Mean-looking creatures carrying clubs, grumpy expressions. Standard goblins - not unique or distinctive")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Personality: ", bold: true }), new TextRun("Simple-minded, follow orders, can be talked to and reasoned with. Not inherently evil, just followers.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Combat Stats: ", bold: true }), new TextRun("HP 5, Attack needs 10+, Damage 1d4")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Scenes: ", bold: true }), new TextRun("Act 1 Scene 2 (3 guards), Act 3 Scene 8 (4 guards with Grumbletooth)")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("King Grumbletooth - Goblin King")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Role: ", bold: true }), new TextRun("The main antagonist - but more silly villain than truly evil")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Appearance: ", bold: true }), new TextRun("Bigger than other goblins, wears a crown made of twigs, carries a scepter with a fake gem on top, very grumpy expression")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Personality: ", bold: true }), new TextRun("Grumpy and childlike - having a tantrum because he feels unimportant. Lonely and misunderstood. Doesn't truly understand magic. Can be reasoned with or befriended.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Combat Stats: ", bold: true }), new TextRun("HP 15, Attack needs 12+, Damage 1d8. Gives up and cries after taking 7 damage.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Scenes: ", bold: true }), new TextRun("Act 3 Scene 8-9 (confrontation and resolution)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Key Point: ", bold: true }), new TextRun("If treated kindly, becomes a friend and ally! Teaches lesson about compassion.")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Water Spirit - Elemental")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Role: ", bold: true }), new TextRun("Guardian of the Sapphire of Water gem")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Appearance: ", bold: true }), new TextRun("Looks like a girl made of flowing water, feminine features, sitting on a rock in a musical stream")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Personality: ", bold: true }), new TextRun("Friendly and kind, but fearful. Worried about fish biting. Becomes happy and grateful when helped.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Scenes: ", bold: true }), new TextRun("Act 2 Scene 6 - Gem Quest 1 (The Singing Stream)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Reward Given: ", bold: true }), new TextRun("Each hero receives a water breathing bubble (one-time use: breathe underwater 10 minutes)")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Rock Elemental - Earth Guardian")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Role: ", bold: true }), new TextRun("Guardian of the Emerald of Earth gem")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Appearance: ", bold: true }), new TextRun("Massive boulder with the Emerald embedded in it. When awakened, sits up and reveals itself as a living elemental with a deep, rumbly voice")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Personality: ", bold: true }), new TextRun("Grumpy when awakened but not evil - just disturbed from sleep. Reasonable if approached with respect and kindness. Rewards friendly interactions.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Combat Stats: ", bold: true }), new TextRun("HP 12, Attack needs 12+, Damage 1d8. Prefers peace to combat.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Scenes: ", bold: true }), new TextRun("Act 2 Scene 6 - Gem Quest 2 (The Crystal Cave)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Reward Given: ", bold: true }), new TextRun("If treated kindly, becomes a friend and gives each hero a glowing crystal")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Phoenix - Fire Bird")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Role: ", bold: true }), new TextRun("Kind guide and helper for the Ruby of Fire gem quest")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Appearance: ", bold: true }), new TextRun("Bright orange and red plumage, beautiful and majestic, circles overhead before landing")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Personality: ", bold: true }), new TextRun("Kind and encouraging, speaks with a wise and gentle voice. Proud of the heroes' accomplishments. Speaks in friendly, formal manner.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Scenes: ", bold: true }), new TextRun("Act 2 Scene 6 - Gem Quest 3 (Sunset Grove)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Reward Given: ", bold: true }), new TextRun("Each hero receives a feather that keeps them warm forever")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Fire Salamander - Playful Elemental")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Role: ", bold: true }), new TextRun("Puzzle guardian for the Ruby of Fire gem - guards through games rather than combat")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Appearance: ", bold: true }), new TextRun("Small, bright orange lizard made of flames (but not burning!). Glowing and vibrant, cute and playful")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Personality: ", bold: true }), new TextRun("Playful, mischievous, giggly. Loves games and riddles. Kind-hearted, not threatening. Gives second chances if heroes fail.")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Games Offered: ", bold: true }), new TextRun("Riddles, Hide and Seek, or Dance Contest")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Scenes: ", bold: true }), new TextRun("Act 2 Scene 6 - Gem Quest 3 (Sunset Grove)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Key Point: ", bold: true }), new TextRun("This is a puzzle encounter, not combat - rewards creativity and fun")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ children: [new PageBreak()] }),

      // ACT 1 STARTS
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Act 1: Rescue Sparkle!")] }),
      new Paragraph({ children: [new TextRun({ text: "Estimated Time: 30-40 minutes", italics: true })] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scene 1: The Village Square")] }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("You are all in the village square on a sunny morning. Suddenly, you hear crying! Old Farmer Brown runs up to you. 'Please help!' he says. 'My friend Sparkle, a baby dragon, is trapped in the old windmill! Can you heroes save her?'")] }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE: Starting the Adventure", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "This is a straightforward hook. Let each player introduce their character! Ask: 'What does your hero look like?' and 'Why do you want to help?'", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "If they ask about Sparkle: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "She's a baby dragon - smaller than a dog, purple and pink scales, very friendly and loves flowers.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "If they ask why she's trapped: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Some mean goblins locked her in there yesterday!", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Once they agree to help: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Farmer Brown gives them a small bag with 3 healing potions (heals 1d6 HP each) and points toward the old windmill on the hill.", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scene 2: The Path to the Mill")] }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("You walk along a dirt path toward the old windmill. The path is lined with colorful flowers. As you get closer, you hear a sad little roar from inside the mill. Suddenly, three goblins jump out from behind a bush! They look mean and are carrying clubs!")] }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE: First Combat!", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "This is their first fight! Make it exciting but not too scary.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Goblin Stats: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "HP 5, Attack needs 10+, Damage 1d4. There are 3 goblins.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "If players want to talk instead of fight: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Great! The goblins say 'We work for King Grumbletooth! He said to guard this mill!' If players offer something nice (food, shiny things), the goblins might leave peacefully (DC 12 persuasion).", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Combat tips: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Describe their attacks vividly! 'The goblin swings its club at you!' Let kids use creative tactics - if they want to trip a goblin, let it work!", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "If fight goes badly: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "One goblin gets scared and runs away. The others follow!", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scene 3: Inside the Windmill - Ground Floor")] }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("You push open the creaky mill door. Inside, it's dusty and dark. Old sacks of grain are piled everywhere. You hear Sparkle crying from upstairs: 'Help! I'm stuck!' You also notice a locked wooden door on the far wall.")] }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE: Exploration and Choices", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "Let players explore! Here's what they can find:", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "If they search the grain sacks (DC 10): ", bold: true, color: "2E5C8A" }), new TextRun({ text: "They find a shiny silver key! This opens the locked door.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "If they try the locked door: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Need the key, OR a Rogue can pick the lock (DC 12), OR they can break it down together with strength (DC 15, everyone can help).", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Behind the locked door: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "A small storage room with a rope, a lantern, and a wooden shield (+1 to defense for whoever takes it).", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "The stairs to the second floor: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Are in the corner, slightly hidden. DC 8 to notice them (automatic for anyone who says they're looking for Sparkle).", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Don't rush them! ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Let them look around and find things. Reward creativity!", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scene 4: The Giant Spider!")] }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("As you climb the stairs, you see a HUGE spider web blocking the way! And in the middle of the web... is a giant spider! It's as big as a cat and has eight glowing eyes. It hisses at you!")] }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE: The Spider Encounter", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "Giant Spider Stats: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "HP 8, Attack needs 11+, Damage 1d6", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Creative Solutions:", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• If they have the lantern: Can use fire to scare it away (automatic)", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• If Druid talks to it: Spider is actually scared of goblins! Wants to leave. Will let them pass.", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Cut through web: DC 10 to carefully cut without alerting spider", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Offer food: If they have any food, spider takes it and leaves", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "If they fight: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Spider attacks but isn't very tough. After taking 4 damage, it runs away.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Reward creativity heavily here! ", bold: true, color: "2E5C8A" }), new TextRun({ text: "This teaches them there are always multiple solutions.", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scene 5: Rescuing Sparkle!")] }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("You reach the top floor of the mill! There, in a wooden cage, is Sparkle the baby dragon! She's purple and pink with shimmering scales. She looks at you with big, hopeful eyes. 'You came to save me!' she squeaks. 'Please get me out!' The cage has a big lock on it.")] }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE: Freeing Sparkle", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "Ways to free her:", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "• Rogue picks lock: DC 10", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Break cage bars: DC 13 (Barbarians get advantage)", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Look for key: DC 12 search finds it hidden under hay", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Magic solutions: Wizard can use Mage Hand to get key from inside cage", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "When freed: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Sparkle jumps out and does a happy little flip! She nuzzles each hero. 'Thank you! Thank you! But... something's wrong with the forest. All the magic is fading! We need the Rainbow Gems to bring it back! King Grumbletooth stole them!'", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "IMPORTANT: ", bold: true, color: "8B0000" }), new TextRun({ text: "Sparkle stays with the party for the rest of the adventure! She can't fight, but she's helpful and encouraging. Use her to give hints if players get stuck. She has a cute voice!", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Reward: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Everyone gets +1 to their next roll because they feel so proud!", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "End of Act 1", bold: true, size: 28, color: "8B0000" })] }),
      new Paragraph({ children: [new TextRun("The party has rescued Sparkle! They now know they must find the Rainbow Gems. This is a great time for a 5-minute break!")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // ACT 2 STARTS
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Act 2: The Rainbow Gems Quest")] }),
      new Paragraph({ children: [new TextRun({ text: "Estimated Time: 40-50 minutes", italics: true })] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scene 6: Into the Whispering Woods")] }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("Sparkle leads you into the Whispering Woods. The trees here are magical - their leaves shimmer with all the colors of the rainbow! But as you walk deeper, you notice the colors are fading. 'This is because of the stolen gems,' Sparkle explains sadly. 'We need to find all three Rainbow Gems: the Ruby of Fire, the Sapphire of Water, and the Emerald of Earth.'")] }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE: Act 2 Structure", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "This act has three mini-quests, one for each gem. Players can do them in any order! Let them choose which path to take first.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Present them with three paths:", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "1. Left path - leads to the Singing Stream (Sapphire)", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "2. Middle path - leads to the Crystal Cave (Emerald)", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "3. Right path - leads to the Sunset Grove (Ruby)", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Each gem takes about 10-15 minutes. You'll guide them back to this fork after each gem.", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Gem Quest 1: The Sapphire of Water")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Location: The Singing Stream")] }),
      
      new Paragraph({ style: "ReadAloud", children: [new TextRun("You follow the left path to a beautiful stream. The water makes a musical sound as it flows! Sitting on a rock in the middle of the stream is a friendly water spirit. She looks like a girl made of water, and she's crying. 'My Sapphire gem is stuck at the bottom of the deep pool!' she says. 'I'm too scared to dive down there - there might be fish that bite!'")] }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE: The Sapphire Quest", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "The Challenge: Get the Sapphire from the bottom of a 10-foot deep pool.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Solutions:", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Dive for it: DC 10 swimming check. Success = they get the gem!", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Use rope: If they have rope, can tie it around their waist and friends pull them back up (automatic success!)", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Wizard Mage Hand: Can float the gem up! (automatic success)", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Drain the pool: If they find a creative way to redirect water (DC 12), pool becomes shallow", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Talk to fish: Druid or Half-Elf can befriend the fish! Fish bring up the gem (automatic)", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "The fish aren't actually mean! ", bold: true, color: "2E5C8A" }), new TextRun({ text: "If they go down, describe colorful friendly fish that swim around them curiously.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Reward: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "The water spirit is so happy! She gives each hero a water breathing bubble (one-time use: can breathe underwater for 10 minutes). The Sapphire glows blue and warm!", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Gem Quest 2: The Emerald of Earth")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Location: The Crystal Cave")] }),
      
      new Paragraph({ style: "ReadAloud", children: [new TextRun("The middle path leads you to a cave entrance. Beautiful crystals grow on the walls, sparkling in the light! As you enter, you see small tunnels branching off in different directions. In the main chamber, there's a large boulder with the Emerald embedded in it! But wait... the boulder starts to shake! It's not a boulder - it's a Rock Elemental! It sits up and speaks in a deep, rumbly voice: 'Why do you disturb my sleep?'")] }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE: The Emerald Quest", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "The Rock Elemental isn't evil! It's just grumpy because it was sleeping. It can be reasoned with!", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Rock Elemental Stats (if they fight): ", bold: true, color: "2E5C8A" }), new TextRun({ text: "HP 12, Attack needs 12+, Damage 1d8", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Better Solutions:", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Explain situation: DC 10 persuasion. If they explain about the fading magic, it understands!", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Offer treasure: If they offer something shiny, it trades the Emerald", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Make it comfortable: If they offer to bring it pillows or soft moss, it's happy to help!", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Sing a lullaby: DC 10 performance check. It goes back to sleep and they can take the gem", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Cave exploration: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "If they explore side tunnels before talking to elemental, they find pretty crystals worth 10 gold pieces each (these can be used as gifts later).", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Reward: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "If they're nice to the Elemental, it becomes their friend! It gives each hero a crystal that glows in the dark. The Emerald pulses with green light!", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Gem Quest 3: The Ruby of Fire")] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Location: Sunset Grove")] }),
      
      new Paragraph({ style: "ReadAloud", children: [new TextRun("The right path takes you to a grove where the trees have golden-red leaves. In the center of the grove is a small volcano that bubbles with warm (not hot!) lava. A phoenix bird - bright orange and red - circles overhead. It lands near you. 'Greetings, young heroes!' it says in a kind voice. 'The Ruby of Fire rests at the top of this volcano. But beware - my mischievous friend, the Fire Salamander, guards it. He loves games and riddles!'")] }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE: The Ruby Quest", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "This is a puzzle/game encounter, not combat!", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "The Fire Salamander: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "A small, bright orange lizard made of flames (but not burning!). It's playful and giggly.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "The Challenge: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "The Salamander will give them the Ruby if they can win at one of its games:", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Game 1 - Riddle Me This:", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "Riddle: 'I can fly without wings. I can cry without eyes. Wherever I go, darkness follows me. What am I?'", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "Answer: A cloud! (Accept any reasonable answer from kids)", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Game 2 - Hide and Seek:", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "Salamander hides in the grove. DC 12 perception to find it (hidden in a glowing bush).", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Game 3 - Dance Contest:", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "DC 10 performance. Describe the silly dance they do! Salamander judges.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Let kids choose which game! ", bold: true, color: "2E5C8A" }), new TextRun({ text: "If they fail, Salamander gives them another chance or an easier challenge.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Reward: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Salamander happily gives them the Ruby! Phoenix is proud of them and gives each hero a feather that keeps them warm forever. The Ruby glows with red fire!", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "When All Gems Are Collected", bold: true, size: 26, color: "8B0000" })] }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("As soon as you collect the last gem, all three gems start to glow! Red, blue, and green light swirl together. Sparkle jumps up excitedly! 'You did it! You got all the Rainbow Gems! Now we just need to stop King Grumbletooth. He's hiding in his fort on the hill. Let's go teach that grumpy goblin a lesson!'")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "End of Act 2", bold: true, size: 28, color: "8B0000" })] }),
      new Paragraph({ children: [new TextRun("The party has all three gems! Time for a 10-minute break before the final confrontation!")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // ACT 3 STARTS
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Act 3: Defeat King Grumbletooth!")] }),
      new Paragraph({ children: [new TextRun({ text: "Estimated Time: 30-40 minutes", italics: true })] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scene 7: The Goblin Fort")] }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("You arrive at a small wooden fort on top of a hill. It has walls made of logs and a big wooden gate. You can hear goblins inside, laughing and playing around. There's a sign that says 'GRUMBLETOOTH'S FORT - NO HEROES ALLOWED!' Sparkle whispers, 'We need to get inside somehow!'")] }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE: Getting Inside the Fort", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "Let players come up with creative solutions! Here are some options:", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "• Knock on the door: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "A goblin guard peeks through. If they pretend to be pizza delivery or have a clever disguise (DC 10), he opens the gate!", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Climb the walls: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "DC 12 athletics check. Success = they get over the wall quietly", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Find secret entrance: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "DC 13 investigation. There's a small tunnel under the wall (perfect for small heroes!)", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Wizard magic: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Sleep spell can make gate guards sleep, or they float everyone over with magic", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Distraction: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Make loud noises on one side while others sneak in the other side", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "There are 3 goblin guards (HP 5 each) if they fight their way in. But try to encourage sneaky/creative solutions!", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scene 8: Inside the Fort")] }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("Once you're inside the fort, you see a courtyard with several goblins running around. In the center is a big throne made of sticks and stones. Sitting on the throne is King Grumbletooth! He's bigger than the other goblins, wears a crown made of twigs, and has a very grumpy face. He's holding a scepter with a fake gem on top. When he sees you, he stands up angrily. 'Who dares enter MY fort?!' he shouts.")] }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE: Confronting Grumbletooth", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "This is the big moment! Make Grumbletooth funny but not too scary. He's more silly than evil.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Grumbletooth's personality: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "He's like a grumpy kid having a tantrum. He wanted to be important and powerful, so he stole the gems and trapped Sparkle. But he doesn't really understand magic.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Non-combat solutions (encourage these!):", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Talk it out: DC 12 persuasion. 'Why did you steal the gems?' He admits he was lonely and wanted attention", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Offer friendship: If they invite him to be friends instead of a villain, he might agree (DC 10)", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Trade: Offer him something better than the fake gems - the crystals from the cave, or make him a real crown", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Make him laugh: Tell jokes or do funny things. DC 10 performance. If he laughs, he softens", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "If they must fight:", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "King Grumbletooth: HP 15, Attack needs 12+, Damage 1d8", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "4 Goblin Guards: HP 5 each, Attack needs 10+, Damage 1d4", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Combat tip: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "After Grumbletooth takes 7 damage, he starts to cry and gives up. The other goblins stop fighting too.", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scene 9: The Resolution")] }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("After you defeat or convince King Grumbletooth, he sits down on his throne and sighs. 'I just wanted to be special,' he says sadly. 'Nobody ever wants to play with me or be my friend. So I thought if I had magic gems, people would think I was important.' Sparkle looks at him with kind eyes. 'Being mean isn't the way to make friends, Grumbletooth. But maybe... we could help you find a better way?'")] }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE: The Redemption Scene", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "This is a teaching moment! Let the players decide what to do with Grumbletooth.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "If they're kind to him: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "He becomes their friend! He says he'll help protect the forest instead of causing trouble. His goblins cheer - they're happy their king is nice now!", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "If they're mean to him: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Gently guide them toward kindness. Have Sparkle say, 'Remember, even grumpy people deserve a second chance!' Let them reconsider.", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "The Ending: ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Once things are resolved, it's time to return the gems and restore the magic!", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scene 10: The Magic Returns!")] }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("You return to the Whispering Woods with the three Rainbow Gems. Sparkle asks you to place them on an ancient stone pedestal in the center of the forest. When you do, the gems start to glow brighter and brighter! Red, blue, and green light shoot up into the sky like fireworks! The trees start to shimmer with color again! Flowers bloom! The stream sings louder! Magic sparkles fill the air! You did it - you saved the forest!")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("All the creatures of the forest come out to celebrate! The water spirit, the Rock Elemental, the Phoenix, and the Fire Salamander all cheer for you! Even King Grumbletooth and his goblins come to the party! Sparkle gives each of you a special hug with her wings. 'Thank you, heroes!' she says. 'You saved me, saved the forest, and even helped Grumbletooth learn to be kind. You are TRUE heroes!'")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "THE END", bold: true, size: 36, color: "8B0000" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "...or is it just the beginning of more adventures?", size: 26, italics: true })] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Rewards and Closing
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Rewards and Closing")] }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: dmBoxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE: Ending the Session", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Rewards Each Hero Receives:", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• A small piece of one Rainbow Gem (glows with their favorite color)", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• A medal from the village elders saying 'Hero of the Forest'", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Friendship with Sparkle (she'll visit them often!)", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• All the magical items they collected during the adventure", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Celebration Time:", bold: true, color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "Take a few minutes to let each player talk about their favorite moment! Ask questions like:", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• What was the most fun part?", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• What was the scariest part?", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• What would you do differently next time?", color: "2E5C8A" })] }),
                  new Paragraph({ children: [new TextRun({ text: "• Do you want to go on another adventure?", color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Thank everyone for playing! ", bold: true, color: "2E5C8A" }), new TextRun({ text: "Congratulate them on being such brave and clever heroes!", color: "2E5C8A" })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Congratulations on completing", size: 28, bold: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "THE DRAGON'S FRIENDS!", size: 32, bold: true, color: "8B0000" })] }),
      new Paragraph({ text: "" }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "May your next adventure be even more magical!", size: 24, italics: true })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("./Adventure_The_Dragons_Friends.docx", buffer);
  console.log("Adventure book created successfully!");
});
