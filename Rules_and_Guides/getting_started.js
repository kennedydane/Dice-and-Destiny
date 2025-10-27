const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType, LevelFormat, PageBreak } = require('docx');
const fs = require('fs');

const boxBorder = { style: BorderStyle.DOUBLE, size: 2, color: "2E5C8A" };
const boxBorders = { top: boxBorder, bottom: boxBorder, left: boxBorder, right: boxBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: "8B0000", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 240 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: "8B0000", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "654321", font: "Arial" },
        paragraph: { spacing: { before: 180, after: 120 }, outlineLevel: 1 } },
      { id: "Subtitle", name: "Subtitle", basedOn: "Normal",
        run: { size: 28, italics: true, color: "654321", font: "Arial" },
        paragraph: { spacing: { after: 240 }, alignment: AlignmentType.CENTER } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "number-list",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "checklist",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "☐", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    children: [
      // Title Page
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Getting Started")] }),
      new Paragraph({ style: "Subtitle", children: [new TextRun("Your Complete Setup Guide")] }),
      new Paragraph({ style: "Subtitle", children: [new TextRun("For Running The Dragon's Friends")] }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Everything you need to know to run an amazing first D&D game for kids ages 5-8!", size: 26 })]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // What's Included
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("What's Included in This Game")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: boxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "📚 YOUR GAME PACKAGE INCLUDES:", bold: true, size: 28, color: "2E5C8A" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: " Beginner's Rulebook", bold: true }), new TextRun(" - Simplified D&D rules for young players")] }),
                  new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: " Adventure Storybook", bold: true }), new TextRun(" - The Dragon's Friends complete adventure")] }),
                  new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: " Character Sheets", bold: true }), new TextRun(" - Templates for all 8 classes")] }),
                  new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: " Game Maps", bold: true }), new TextRun(" - 8 illustrated maps for all locations")] }),
                  new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: " Character Art Guide", bold: true }), new TextRun(" - Visual descriptions for drawing heroes")] }),
                  new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun({ text: " This Getting Started Guide", bold: true }), new TextRun(" - Setup and preparation help")] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Before You Start
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Before You Start")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("What You'll Need")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Essential Materials:", bold: true, size: 26 })] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun(" A full set of polyhedral dice (d4, d6, d8, d10, d12, d20) - one set for the group is fine")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun(" Pencils with erasers (one per player)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun(" Printed character sheets (one per player)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun(" Printed game maps (recommended)")] }),
      new Paragraph({ numbering: { reference: "checklist", level: 0 }, children: [new TextRun(" This rulebook and adventure book")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Optional But Fun:", bold: true, size: 26 })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Small toys or coins to use as player tokens on maps")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Crayons or colored pencils for drawing characters")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Snacks and drinks for the break")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Background music (soft fantasy or adventure music)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Props (toy sword, wizard hat, etc.)")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Time Requirements
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Time Requirements")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [4680, 4680],
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: boxBorders,
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "FFE6E6", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PREPARATION", bold: true, size: 26 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "30-45 minutes", size: 32, bold: true })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun("Read rulebook and adventure")] }),
                  new Paragraph({ children: [new TextRun("Print materials")] }),
                  new Paragraph({ children: [new TextRun("Help kids create characters")] })
                ]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "E6FFE6", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "PLAY SESSION", bold: true, size: 26 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2 hours", size: 32, bold: true })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun("Act 1: 30-40 min")] }),
                  new Paragraph({ children: [new TextRun("Act 2: 40-50 min")] }),
                  new Paragraph({ children: [new TextRun("Act 3: 30-40 min")] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "Tip: ", bold: true, italics: true }), new TextRun({ text: "Plan for a 10-minute snack break between Act 2 and Act 3!", italics: true })] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Setup Steps
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Setup Steps")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("One Week Before")] }),
      new Paragraph({ numbering: { reference: "number-list", level: 0 }, children: [new TextRun({ text: "Read the Rulebook ", bold: true }), new TextRun("(20 minutes) - Familiarize yourself with the basic mechanics")] }),
      new Paragraph({ numbering: { reference: "number-list", level: 0 }, children: [new TextRun({ text: "Read the Adventure ", bold: true }), new TextRun("(30 minutes) - Understand the story flow and encounters")] }),
      new Paragraph({ numbering: { reference: "number-list", level: 0 }, children: [new TextRun({ text: "Print Materials ", bold: true }), new TextRun("- Print character sheets, maps, and any other documents")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Day Before Game Day")] }),
      new Paragraph({ numbering: { reference: "number-list", level: 0 }, children: [new TextRun({ text: "Gather materials ", bold: true }), new TextRun("- Dice, pencils, printed materials, snacks")] }),
      new Paragraph({ numbering: { reference: "number-list", level: 0 }, children: [new TextRun({ text: "Set up play area ", bold: true }), new TextRun("- Clear table, comfortable seating")] }),
      new Paragraph({ numbering: { reference: "number-list", level: 0 }, children: [new TextRun({ text: "Review Act 1 ", bold: true }), new TextRun("- Quick refresher on the opening scenes")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("30 Minutes Before Players Arrive")] }),
      new Paragraph({ numbering: { reference: "number-list", level: 0 }, children: [new TextRun("Set out all materials on the table")] }),
      new Paragraph({ numbering: { reference: "number-list", level: 0 }, children: [new TextRun("Have Map 1 (Path to Windmill) ready")] }),
      new Paragraph({ numbering: { reference: "number-list", level: 0 }, children: [new TextRun("Put on soft background music (optional)")] }),
      new Paragraph({ numbering: { reference: "number-list", level: 0 }, children: [new TextRun("Take a deep breath - you're going to do great!")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Session Flow
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Session Flow & Timeline")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [2340, 4680, 2340],
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                shading: { fill: "8B4513", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Time", bold: true, color: "FFFFFF" })] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "8B4513", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Activity", bold: true, color: "FFFFFF" })] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                shading: { fill: "8B4513", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Duration", bold: true, color: "FFFFFF" })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("0:00")] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Welcome & Character Creation")] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("15 min")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("0:15")] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "FFE6E6", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "ACT 1: Rescue Sparkle", bold: true })] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("30-40 min")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("0:50")] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Quick 5-minute break")] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("5 min")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("0:55")] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "E6FFE6", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "ACT 2: Find the Rainbow Gems", bold: true })] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("40-50 min")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("1:40")] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Snack break & bathroom")] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("10 min")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("1:50")] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "E6E6FF", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "ACT 3: Defeat Grumbletooth!", bold: true })] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("30-40 min")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("2:25")] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 4680, type: WidthType.DXA },
                shading: { fill: "FFFACD", type: ShadingType.CLEAR },
                children: [new Paragraph({ children: [new TextRun({ text: "Celebration & Wrap-up", bold: true })] })]
              }),
              new TableCell({
                borders: boxBorders,
                width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("5 min")] })]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Character Creation Help
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Helping Kids Create Characters")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "This should be fun and quick! Here's how to guide them:", bold: true })] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step-by-Step Process")] }),
      
      new Paragraph({ children: [new TextRun({ text: "1. Choose a Class (5 minutes)", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("Briefly describe each class using the character sheets. Let them pick what sounds fun! Don't overthink it - they can always play a different class next time.")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Quick class descriptions:", italics: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Warrior: ", bold: true }), new TextRun("\"Strong and brave! Protects friends!\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Wizard: ", bold: true }), new TextRun("\"Smart and magical! Casts cool spells!\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Cleric: ", bold: true }), new TextRun("\"Kind healer! Helps friends feel better!\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Rogue: ", bold: true }), new TextRun("\"Sneaky and quick! Finds secrets!\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Druid: ", bold: true }), new TextRun("\"Talks to animals! Loves nature!\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Barbarian: ", bold: true }), new TextRun("\"Super strong! Gets REALLY powerful when angry!\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Paladin: ", bold: true }), new TextRun("\"Holy warrior! Protects friends with divine power!\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Ranger: ", bold: true }), new TextRun("\"Expert archer! Tracks and hunts in the wilderness!\"")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "2. Choose a Species (3 minutes)", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("Keep it simple! Ask: \"Do you want to be a human, elf, dwarf, gnome, half-elf, or halfling?\" Briefly mention the special features (elves have pointy ears, dwarves are short and tough, etc.)")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "3. Pick a Name (2 minutes)", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("Let them choose any name! Their favorite color, an animal they like, a cool word - anything goes! If they're stuck, suggest a few from the rulebook.")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "4. Fill in Character Sheet (5 minutes)", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("Help them write down:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Name, class, and species")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Hit points (from their class)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Weapon and damage")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Special powers")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Tips for Success
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Tips for a Great Session")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: boxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "FFF9E6", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "🌟 GOLDEN RULES FOR DMs 🌟", bold: true, size: 28, color: "B8860B" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "1. Say YES More Than NO", bold: true, size: 24 })] }),
                  new Paragraph({ children: [new TextRun("When kids have creative ideas, try to make them work! \"Yes, you can try to befriend the spider!\" is much better than \"No, you have to fight it.\"")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "2. Keep Things Moving", bold: true, size: 24 })] }),
                  new Paragraph({ children: [new TextRun("If they get stuck, give hints! \"You notice something shiny...\" or \"Sparkle suggests looking under the hay...\" Kids won't remember if you help them along.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "3. Use Silly Voices", bold: true, size: 24 })] }),
                  new Paragraph({ children: [new TextRun("Make each character sound different! Goblins can be squeaky, dragons can be roar-y, Grumbletooth can be grumpy but funny. Kids LOVE this.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "4. Let Them Feel Heroic", bold: true, size: 24 })] }),
                  new Paragraph({ children: [new TextRun("This is their first adventure! Make sure they win. If a fight is going badly, have an enemy run away or a friend show up to help.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "5. Celebrate Their Ideas", bold: true, size: 24 })] }),
                  new Paragraph({ children: [new TextRun("When someone does something clever, make a big deal! \"That's such a smart idea!\" This encourages creativity and makes them feel proud.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "6. Don't Worry About Rules", bold: true, size: 24 })] }),
                  new Paragraph({ children: [new TextRun("If you forget a rule or make a mistake, it's okay! Just make a quick decision and keep the game moving. Fun is more important than perfect rules.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "7. Take Breaks", bold: true, size: 24 })] }),
                  new Paragraph({ children: [new TextRun("Young kids need breaks! Plan for bathroom trips and snacks. It's okay to pause the adventure for a few minutes.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "8. Watch for Engagement", bold: true, size: 24 })] }),
                  new Paragraph({ children: [new TextRun("If kids seem bored, speed up. If they're scared, tone it down. If they're having fun, you're doing it right! Trust your instincts.")] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Handling Challenges
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Handling Common Challenges")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "\"I don't know what to do!\"", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("Offer 2-3 options: \"You could search the room, talk to the goblin, or try to sneak past. What sounds fun?\"")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "\"This is too scary!\"", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("Immediately tone it down! \"Actually, the spider is kind of cute and just wants to be friends!\" Remember, this should be fun, not frightening.")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "\"Can I do something totally crazy?\"", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("Usually say yes! \"You want to ride the giant spider? That's AMAZING! Roll to see if you can!\" Even if it fails, praise the creativity.")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "One kid is dominating", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("Address quieter kids directly: \"Luna, what does YOUR hero do?\" or \"Marcus, how does your character feel about this?\"")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "They're taking too long to decide", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("Add a gentle time pressure: \"While you're thinking, the goblin is getting closer!\" or \"Sparkle is crying louder - what do you do?\"")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Someone has to leave early", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("Their character goes to \"guard the entrance\" or \"protect Sparkle.\" They can rejoin later, or you can wrap up their part of the story positively.")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // After the Game
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("After the Game")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Celebrating Success")] }),
      new Paragraph({ children: [new TextRun("Take time to celebrate what the kids accomplished! Ask questions like:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("\"What was your favorite part?\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("\"What was the coolest thing your character did?\"")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("\"Do you want to go on another adventure?\"")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Save Their Characters")] }),
      new Paragraph({ children: [new TextRun("Keep the character sheets! They can use the same heroes for future adventures. This builds attachment and excitement for next time.")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Continue the Adventure")] }),
      new Paragraph({ children: [new TextRun("If the kids loved it, you can:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Create your own simple adventures using these rules")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Find other beginner D&D adventures online")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Have the kids help create the next story!")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Final Page
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("You're Ready!")] }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 120, bottom: 120, left: 180, right: 180 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: boxBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "FFE6E6", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🎲 YOU'VE GOT THIS! 🎲", bold: true, size: 36, color: "8B0000" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Remember:", size: 28, bold: true })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "There's no perfect way to run D&D.", size: 24 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "If everyone's having fun, you're doing it right!", size: 24 })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Don't stress about the rules.", size: 24 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Just tell a fun story together!", size: 24 })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "The kids will remember the adventure,", size: 24 })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "not whether you rolled the dice perfectly!", size: 24 })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Have fun and be brave -", size: 26, italics: true })] }),
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "you're about to create magical memories!", size: 26, italics: true })] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "May your rolls be high and your adventures epic!", size: 28, bold: true, color: "8B4513" })] }),
      new Paragraph({ text: "" }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "⚔️ 🐉 🎲 ⚔️", size: 48 })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("./Getting_Started_Guide.docx", buffer);
  console.log("Getting started guide created successfully!");
});
