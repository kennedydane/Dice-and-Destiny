const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType, LevelFormat, PageBreak } = require('docx');
const fs = require('fs');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "8B4513" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: "8B4513", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 240 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, color: "8B4513", font: "Arial" },
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
      { reference: "number-list-1",
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
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("My First Adventure")] }),
      new Paragraph({ style: "Subtitle", children: [new TextRun("A Beginner's Guide to Dungeons & Dragons")] }),
      new Paragraph({ style: "Subtitle", children: [new TextRun("For Young Heroes Ages 5-8")] }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Welcome, brave adventurer! This book will teach you how to play Dungeons & Dragons, a game where you can be a hero, go on quests, and have amazing adventures with your friends!", size: 26, italics: true })]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Introduction
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("What is Dungeons & Dragons?")] }),
      new Paragraph({ children: [new TextRun("Dungeons & Dragons (D&D) is a storytelling game where you and your friends become heroes in a magical world! One person, called the Dungeon Master (or DM), tells the story and describes what happens. Everyone else plays as heroes called characters who go on adventures together.")] }),
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "Think of it like playing pretend, but with rules and dice to make it fair and exciting!", bold: true })] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("What You Need to Play")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("This rulebook")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("The adventure storybook")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Character sheets for each player")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Game maps")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Dice (a full set: d4, d6, d8, d10, d12, d20)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Pencils and erasers")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Your imagination!")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Understanding Dice
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Understanding Your Dice")] }),
      new Paragraph({ children: [new TextRun("In D&D, we use special dice with different numbers of sides. Each die has a special name:")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [2340, 7020],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 2340, type: WidthType.DXA },
                shading: { fill: "DEB887", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Die Name", bold: true })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 7020, type: WidthType.DXA },
                shading: { fill: "DEB887", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "What It Does", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "d4", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 7020, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("A pyramid with 4 sides (1-4). Used for small damage.")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "d6", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 7020, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("A cube with 6 sides (1-6). Like a regular game die!")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "d8", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 7020, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("8 sides (1-8). Used for medium damage.")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "d10", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 7020, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("10 sides (1-10 or 0-9). Used for bigger numbers.")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "d12", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 7020, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("12 sides (1-12). Used for big damage!")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "d20", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 7020, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("20 sides (1-20). The MOST IMPORTANT die! You'll use this a lot!")] })] })
            ]
          })
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "The d20 is Your Friend!", bold: true, size: 26, color: "8B4513" })] }),
      new Paragraph({ children: [new TextRun("Most of the time in D&D, you'll roll a d20 (the 20-sided die) to see if your character succeeds at something. Rolling a high number is usually good! Rolling a 20 is the best and means something amazing happens! Rolling a 1 is the worst and means something went wrong.")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Creating Your Character
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Creating Your Hero")] }),
      new Paragraph({ children: [new TextRun("Your character is the hero you play in the game! Let's create one together. You'll need a character sheet (included with this game).")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 1: Choose Your Species")] }),
      new Paragraph({ children: [new TextRun("Your species is what kind of creature you are. Each species has special abilities!")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Human", bold: true })] }),
      new Paragraph({ children: [new TextRun("Humans are versatile and can be good at anything! They're brave and adaptable.")] }),
      new Paragraph({ children: [new TextRun({ text: "Special: ", bold: true, italics: true }), new TextRun({ text: "Can add +1 to any roll once per adventure", italics: true })] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Elf", bold: true })] }),
      new Paragraph({ children: [new TextRun("Elves are graceful and magical. They have pointy ears and can see in the dark!")] }),
      new Paragraph({ children: [new TextRun({ text: "Special: ", bold: true, italics: true }), new TextRun({ text: "Can see in dim light and are good at noticing things", italics: true })] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Dwarf", bold: true })] }),
      new Paragraph({ children: [new TextRun("Dwarves are short, strong, and tough. They love mining and building!")] }),
      new Paragraph({ children: [new TextRun({ text: "Special: ", bold: true, italics: true }), new TextRun({ text: "Very tough! Get +2 hit points", italics: true })] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Gnome", bold: true })] }),
      new Paragraph({ children: [new TextRun("Gnomes are tiny, clever, and love tinkering with things!")] }),
      new Paragraph({ children: [new TextRun({ text: "Special: ", bold: true, italics: true }), new TextRun({ text: "Can talk to small animals", italics: true })] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Half-Elf", bold: true })] }),
      new Paragraph({ children: [new TextRun("Half-elves are part human, part elf! They're friendly and get along with everyone.")] }),
      new Paragraph({ children: [new TextRun({ text: "Special: ", bold: true, italics: true }), new TextRun({ text: "Good at making friends. Animals and creatures like you", italics: true })] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Halfling", bold: true })] }),
      new Paragraph({ children: [new TextRun("Halflings are small, cheerful, and very lucky!")] }),
      new Paragraph({ children: [new TextRun({ text: "Special: ", bold: true, italics: true }), new TextRun({ text: "Can re-roll any dice that shows a 1", italics: true })] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 2: Choose Your Class")] }),
      new Paragraph({ children: [new TextRun("Your class is your job or what you're good at. Each class plays differently!")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Warrior", bold: true })] }),
      new Paragraph({ children: [new TextRun("Brave fighters who protect their friends! They wear heavy armor and use swords and shields.")] }),
      new Paragraph({ children: [new TextRun({ text: "Weapon: ", bold: true }), new TextRun("Sword (does 1d8 damage)")] }),
      new Paragraph({ children: [new TextRun({ text: "Hit Points: ", bold: true }), new TextRun("10")] }),
      new Paragraph({ children: [new TextRun({ text: "Special Power: ", bold: true }), new TextRun("Once per battle, can take a hit for a friend")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Wizard", bold: true })] }),
      new Paragraph({ children: [new TextRun("Smart magic users who cast spells! They carry a magic wand or staff.")] }),
      new Paragraph({ children: [new TextRun({ text: "Weapon: ", bold: true }), new TextRun("Magic Staff (does 1d4 damage)")] }),
      new Paragraph({ children: [new TextRun({ text: "Hit Points: ", bold: true }), new TextRun("6")] }),
      new Paragraph({ children: [new TextRun({ text: "Special Power: ", bold: true }), new TextRun("Can cast 3 spells per adventure (see spell list)")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Cleric", bold: true })] }),
      new Paragraph({ children: [new TextRun("Holy healers who help their friends! They use divine magic.")] }),
      new Paragraph({ children: [new TextRun({ text: "Weapon: ", bold: true }), new TextRun("Mace (does 1d6 damage)")] }),
      new Paragraph({ children: [new TextRun({ text: "Hit Points: ", bold: true }), new TextRun("8")] }),
      new Paragraph({ children: [new TextRun({ text: "Special Power: ", bold: true }), new TextRun("Can heal a friend for 1d6 hit points, three times per adventure")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Rogue", bold: true })] }),
      new Paragraph({ children: [new TextRun("Sneaky and quick! They can pick locks, find traps, and move silently.")] }),
      new Paragraph({ children: [new TextRun({ text: "Weapon: ", bold: true }), new TextRun("Dagger (does 1d4 damage, but +2 from stealth attacks)")] }),
      new Paragraph({ children: [new TextRun({ text: "Hit Points: ", bold: true }), new TextRun("7")] }),
      new Paragraph({ children: [new TextRun({ text: "Special Power: ", bold: true }), new TextRun("Can sneak attack for extra damage once per battle")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Druid", bold: true })] }),
      new Paragraph({ children: [new TextRun("Nature lovers who can talk to animals and plants!")] }),
      new Paragraph({ children: [new TextRun({ text: "Weapon: ", bold: true }), new TextRun("Wooden Staff (does 1d6 damage)")] }),
      new Paragraph({ children: [new TextRun({ text: "Hit Points: ", bold: true }), new TextRun("7")] }),
      new Paragraph({ children: [new TextRun({ text: "Special Power: ", bold: true }), new TextRun("Can talk to animals and ask plants for help")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Barbarian", bold: true })] }),
      new Paragraph({ children: [new TextRun("Wild and strong! They get angry in battle and become super powerful!")] }),
      new Paragraph({ children: [new TextRun({ text: "Weapon: ", bold: true }), new TextRun("Big Axe (does 1d12 damage)")] }),
      new Paragraph({ children: [new TextRun({ text: "Hit Points: ", bold: true }), new TextRun("12")] }),
      new Paragraph({ children: [new TextRun({ text: "Special Power: ", bold: true }), new TextRun("Can RAGE! Take half damage for 3 turns, once per adventure")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Paladin", bold: true })] }),
      new Paragraph({ children: [new TextRun("Holy warriors blessed by divine power! They protect their friends and shine with holy light.")] }),
      new Paragraph({ children: [new TextRun({ text: "Weapon: ", bold: true }), new TextRun("Sword & Holy Shield (does 1d8 damage)")] }),
      new Paragraph({ children: [new TextRun({ text: "Hit Points: ", bold: true }), new TextRun("11")] }),
      new Paragraph({ children: [new TextRun({ text: "Special Power: ", bold: true }), new TextRun("Divine Protection - Once per battle, can protect themselves or a friend from one attack AND force the attacker to target the Paladin next turn instead")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Ranger", bold: true })] }),
      new Paragraph({ children: [new TextRun("Expert archers and wilderness trackers! They're skilled hunters who notice everything in nature.")] }),
      new Paragraph({ children: [new TextRun({ text: "Weapon: ", bold: true }), new TextRun("Bow (does 1d8 damage)")] }),
      new Paragraph({ children: [new TextRun({ text: "Hit Points: ", bold: true }), new TextRun("9")] }),
      new Paragraph({ children: [new TextRun({ text: "Special Power: ", bold: true }), new TextRun("Can track enemies - notice hidden enemies and their location once per adventure")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 3: Write Down Your Hero's Name")] }),
      new Paragraph({ children: [new TextRun("Give your hero a cool name! It can be anything you want. Here are some ideas:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Brave names: Valor, Thunder, Blaze, Storm")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Nature names: Leaf, River, Cloud, Star")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Fantasy names: Eldrin, Aria, Thorin, Luna")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Fun names: Giggles, Sparkle, Buttons, Whiskers")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Step 4: Fill In Your Character Sheet")] }),
      new Paragraph({ children: [new TextRun("Write down all your information on your character sheet:")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun("Your name")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun("Your species")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun("Your class")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun("Your hit points")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun("Your weapon and its damage")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun("Your special powers")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // How to Play
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("How to Play")] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Taking Your Turn")] }),
      new Paragraph({ children: [new TextRun("On your turn, you can do TWO things:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Move: Walk to a new place on the map")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Action: Do something! Like attack, use a spell, help a friend, or search for something")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Rolling to Succeed")] }),
      new Paragraph({ children: [new TextRun("When you try to do something tricky, the DM will ask you to roll a d20. Here's how to know if you succeed:")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [3120, 6240],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "DEB887", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "What You Roll", bold: true })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6240, type: WidthType.DXA },
                shading: { fill: "DEB887", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "What Happens", bold: true })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "10 or higher", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("You succeed! You do what you wanted to do!")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "15 or higher", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Great success! You do it really well!")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "20 (natural)", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("CRITICAL SUCCESS! Something amazing happens!")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "9 or lower", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("You fail. But that's okay! Try something else!")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "1 (natural)", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("FUMBLE! Something funny or unfortunate happens!")] })] })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Combat (Fighting Bad Guys)")] }),
      new Paragraph({ children: [new TextRun("Sometimes you'll need to fight monsters or bad guys. Don't worry - combat in D&D is fun and not scary!")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "How Combat Works:", bold: true })] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun("Everyone rolls a d20. Whoever rolls highest goes first!")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun("On your turn, you can move AND attack")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun("To attack, roll a d20. If you roll 10 or higher, you hit!")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun("If you hit, roll your weapon's damage die")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun("The bad guy loses that many hit points")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun("When the bad guy has 0 hit points, they're defeated!")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "What If I Get Hit?", bold: true })] }),
      new Paragraph({ children: [new TextRun("If a monster hits you, you lose hit points. Don't worry! Your Cleric friend can heal you, or you can drink a healing potion. If you reach 0 hit points, you fall down and need help from a friend to wake up. Your friends can heal you or help you - nobody really dies in this adventure!")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Wizard Spells
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Wizard Spells")] }),
      new Paragraph({ children: [new TextRun("If you're playing a Wizard, you can use these spells. Remember, you can only use 3 spells per adventure, so choose wisely!")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Magic Missile", bold: true })] }),
      new Paragraph({ children: [new TextRun("You shoot glowing darts of magic! Automatically hits for 1d4+1 damage. Never misses!")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Shield", bold: true })] }),
      new Paragraph({ children: [new TextRun("Creates a shimmering shield around you! Blocks one attack completely.")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Sleep", bold: true })] }),
      new Paragraph({ children: [new TextRun("Makes enemies sleepy! One small enemy falls asleep and can't fight.")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Light", bold: true })] }),
      new Paragraph({ children: [new TextRun("Your staff glows bright! Lights up dark places for the whole adventure.")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Mage Hand", bold: true })] }),
      new Paragraph({ children: [new TextRun("Creates a magical floating hand! Can pick up or move small objects from far away.")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Exploration and Problem Solving
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Exploring and Solving Puzzles")] }),
      new Paragraph({ children: [new TextRun("Not everything in D&D is about fighting! You'll also explore, talk to creatures, and solve problems.")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Things You Can Do")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Search: ", bold: true }), new TextRun("Look around for clues or hidden things (roll d20)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Listen: ", bold: true }), new TextRun("Listen carefully for sounds (roll d20)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Talk: ", bold: true }), new TextRun("Talk to friendly creatures or even enemies!")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Help: ", bold: true }), new TextRun("Help a friend do something tricky (they add +2 to their roll)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Think: ", bold: true }), new TextRun("Come up with creative solutions! The DM will tell you if it works")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "Remember:", bold: true, color: "8B4513" }), new TextRun({ text: " There's no wrong way to try something! Tell the DM what you want to do, and they'll help you figure out if you need to roll dice.", color: "8B4513" })] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Guide for the DM
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Guide for the Dungeon Master")] }),
      new Paragraph({ children: [new TextRun("Welcome, Dungeon Master! Your job is to tell the story, describe what happens, and help the players have fun. Don't worry - it's easier than it sounds!")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Your Main Jobs")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun({ text: "Describe the Scene: ", bold: true }), new TextRun("Tell the players what they see, hear, and smell")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun({ text: "Ask Questions: ", bold: true }), new TextRun("\"What do you do?\" is the most important question!")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun({ text: "Control Monsters: ", bold: true }), new TextRun("You play the bad guys and creatures")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun({ text: "Make Rulings: ", bold: true }), new TextRun("Decide if something works or if they need to roll dice")] }),
      new Paragraph({ numbering: { reference: "number-list-1", level: 0 }, children: [new TextRun({ text: "Have Fun: ", bold: true }), new TextRun("Your goal is for everyone to have a good time!")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("When to Ask for Dice Rolls")] }),
      new Paragraph({ children: [new TextRun("Not everything needs a dice roll! Only ask for rolls when:")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("The action is difficult or risky")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Failure would be interesting (not just frustrating)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("The outcome is uncertain")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "Don't Ask for Rolls When:", bold: true })] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("It's something easy (like opening an unlocked door)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("It's creative and cool (just let it happen!)")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("They've already rolled for this recently")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Describing Results")] }),
      new Paragraph({ children: [new TextRun("Make the results of dice rolls exciting! Here are some examples:")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Success (10-14): ", bold: true }), new TextRun({ text: "You swing your sword and it hits! Roll for damage!", italics: true })] }),
      new Paragraph({ children: [new TextRun({ text: "Great Success (15-19): ", bold: true }), new TextRun({ text: "Your sword strikes perfectly! You can roll damage, and you also push the goblin backward!", italics: true })] }),
      new Paragraph({ children: [new TextRun({ text: "Critical Success (20): ", bold: true }), new TextRun({ text: "Amazing! Your sword glows with power! Roll double damage!", italics: true })] }),
      new Paragraph({ children: [new TextRun({ text: "Failure (6-9): ", bold: true }), new TextRun({ text: "You swing your sword but the goblin dodges. You'll have to try again!", italics: true })] }),
      new Paragraph({ children: [new TextRun({ text: "Fumble (1): ", bold: true }), new TextRun({ text: "Oh no! You swing so hard you spin around and fall down! You drop your sword (but you can pick it up next turn).", italics: true })] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Tips for Great DMing")] }),
      
      new Paragraph({ children: [new TextRun({ text: "Say 'Yes, And' More Than 'No'", bold: true })] }),
      new Paragraph({ children: [new TextRun("When players come up with creative ideas, try to make them work! Instead of \"No, you can't do that,\" try \"Yes, but it will be hard - roll a d20!\"")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Use Voices and Sounds", bold: true })] }),
      new Paragraph({ children: [new TextRun("Make funny voices for different characters! Use sound effects (\"ROAR!\" for dragons, \"squeak\" for mice). Kids love this!")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Keep Things Moving", bold: true })] }),
      new Paragraph({ children: [new TextRun("If the kids get stuck, give them hints! \"You notice something shiny under the rock...\" or \"The friendly mouse seems to want to show you something...\"")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Let Them Win (Mostly)", bold: true })] }),
      new Paragraph({ children: [new TextRun("This is their first adventure! Make sure they feel like heroes. If a fight is going badly, maybe the monster runs away, or a friendly NPC helps them.")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Celebrate Their Ideas", bold: true })] }),
      new Paragraph({ children: [new TextRun("When a player comes up with something clever, make a big deal about it! \"That's such a smart idea!\" This encourages creativity.")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Take Breaks", bold: true })] }),
      new Paragraph({ children: [new TextRun("2 hours is a long time for young kids. Take a break in the middle for snacks and bathroom!")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Simplified Monster Stats")] }),
      new Paragraph({ children: [new TextRun("Here are some simple monsters you might use. All stats are kept simple for this age group!")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [2340, 2340, 2340, 2340],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, shading: { fill: "DEB887", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Monster", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, shading: { fill: "DEB887", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Hit Points", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, shading: { fill: "DEB887", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Attack", bold: true })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, shading: { fill: "DEB887", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Damage", bold: true })] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Goblin")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("5")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Needs 10")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("1d4")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Giant Spider")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("8")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Needs 11")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("1d6")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Skeleton")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("6")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Needs 10")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("1d4")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Wolf")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("8")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Needs 11")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("1d6")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Boss Monster")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("15")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Needs 12")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("1d8")] })] })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Handling Difficult Situations")] }),
      
      new Paragraph({ children: [new TextRun({ text: "Player Wants to Do Something Dangerous", bold: true })] }),
      new Paragraph({ children: [new TextRun("Let them try, but warn them! \"That sounds really dangerous! Are you sure?\" If they insist, let them roll but maybe lower the consequences.")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Players Are Scared", bold: true })] }),
      new Paragraph({ children: [new TextRun("Tone it down! Remember, no monsters actually eat the heroes in this adventure. Make it clear they're safe and the monsters are more silly than scary.")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Players Are Stuck", bold: true })] }),
      new Paragraph({ children: [new TextRun("Give them a helper! Maybe a friendly fairy appears with a hint, or their special abilities suddenly give them an idea.")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "One Player Is Dominating", bold: true })] }),
      new Paragraph({ children: [new TextRun("Ask the quiet players directly: \"What does YOUR character do?\" or \"How does YOUR hero feel about this?\"")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Fight Is Too Hard", bold: true })] }),
      new Paragraph({ children: [new TextRun("Have the monster run away when it gets to low health, or have reinforcements arrive (a friendly knight or animal!)")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "Fight Is Too Easy", bold: true })] }),
      new Paragraph({ children: [new TextRun("Add another monster mid-fight, or have this monster's friend show up!")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Final Section
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Ready to Adventure!")] }),
      new Paragraph({ children: [new TextRun("You now know everything you need to play your first D&D adventure! Remember:")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "There's no wrong way to play - ", bold: true }), new TextRun("Be creative!")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Work together - ", bold: true }), new TextRun("Help your friends!")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Have fun! - ", bold: true }), new TextRun("That's the most important rule!")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Be brave! - ", bold: true }), new TextRun("Heroes are brave even when scared!")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Be kind - ", bold: true }), new TextRun("To your friends and even to monsters!")] }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Now grab your dice, choose your character,", size: 26, bold: true, color: "8B4513" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "and get ready for", size: 26, bold: true, color: "8B4513" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "THE DRAGON'S FRIENDS!", size: 32, bold: true, color: "8B4513" })] }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Your adventure awaits!", size: 28, italics: true })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("./Beginners_Rulebook.docx", buffer);
  console.log("Rulebook created successfully!");
});
