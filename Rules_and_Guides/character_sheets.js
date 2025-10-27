const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType, PageBreak } = require('docx');
const fs = require('fs');

const heavyBorder = { style: BorderStyle.SINGLE, size: 3, color: "000000" };
const cellBorders = { top: heavyBorder, bottom: heavyBorder, left: heavyBorder, right: heavyBorder };
const lightBorder = { style: BorderStyle.SINGLE, size: 1, color: "666666" };
const lightCellBorders = { top: lightBorder, bottom: lightBorder, left: lightBorder, right: lightBorder };

// Function to create a character sheet for a specific class
function createCharacterSheet(className, color, weapon, weaponDamage, hitPoints, specialPower, additionalInfo) {
  return [
    // Header with class name
    new Paragraph({ 
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: className.toUpperCase() + " CHARACTER SHEET", size: 48, bold: true, color: color })] 
    }),
    new Paragraph({ text: "" }),
    
    // Basic Info Table
    new Table({
      columnWidths: [4680, 4680],
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorders,
              width: { size: 4680, type: WidthType.DXA },
              shading: { fill: "F0F0F0", type: ShadingType.CLEAR },
              children: [
                new Paragraph({ children: [new TextRun({ text: "Hero's Name:", bold: true, size: 26 })] }),
                new Paragraph({ children: [new TextRun({ text: "_________________________", size: 28 })] })
              ]
            }),
            new TableCell({
              borders: cellBorders,
              width: { size: 4680, type: WidthType.DXA },
              shading: { fill: "F0F0F0", type: ShadingType.CLEAR },
              children: [
                new Paragraph({ children: [new TextRun({ text: "Species:", bold: true, size: 26 })] }),
                new Paragraph({ children: [new TextRun({ text: "_________________________", size: 28 })] })
              ]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorders,
              width: { size: 9360, type: WidthType.DXA },
              columnSpan: 2,
              shading: { fill: color, type: ShadingType.CLEAR },
              children: [
                new Paragraph({ 
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "CLASS: " + className.toUpperCase(), bold: true, size: 32, color: "FFFFFF" })] 
                })
              ]
            })
          ]
        })
      ]
    }),
    
    new Paragraph({ text: "" }),
    
    // Stats Table
    new Table({
      columnWidths: [4680, 4680],
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorders,
              width: { size: 4680, type: WidthType.DXA },
              shading: { fill: "FFE6E6", type: ShadingType.CLEAR },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HIT POINTS", bold: true, size: 28, color: "8B0000" })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: hitPoints.toString(), size: 72, bold: true, color: "8B0000" })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "(Check off when hurt)", size: 18, italics: true })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "☐ ☐ ☐ ☐ ☐", size: 36 })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "☐ ☐ ☐ ☐ ☐", size: 36 })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "☐ ☐ ☐ ☐ ☐", size: 36 })] })
              ]
            }),
            new TableCell({
              borders: cellBorders,
              width: { size: 4680, type: WidthType.DXA },
              shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "WEAPON", bold: true, size: 28, color: "2E5C8A" })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: weapon, size: 32, bold: true })] }),
                new Paragraph({ text: "" }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "DAMAGE", bold: true, size: 24, color: "2E5C8A" })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: weaponDamage, size: 48, bold: true, color: "2E5C8A" })] })
              ]
            })
          ]
        })
      ]
    }),
    
    new Paragraph({ text: "" }),
    
    // Special Power Box
    new Table({
      columnWidths: [9360],
      margins: { top: 100, bottom: 100, left: 120, right: 120 },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorders,
              width: { size: 9360, type: WidthType.DXA },
              shading: { fill: "FFF9E6", type: ShadingType.CLEAR },
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "⭐ SPECIAL POWER ⭐", bold: true, size: 32, color: "B8860B" })] }),
                new Paragraph({ text: "" }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: specialPower, size: 26 })] }),
                new Paragraph({ text: "" }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "(Check when used)", size: 20, italics: true })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "☐ ☐ ☐", size: 42 })] })
              ]
            })
          ]
        })
      ]
    }),
    
    new Paragraph({ text: "" }),
    
    // Additional Info
    new Table({
      columnWidths: [9360],
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: cellBorders,
              width: { size: 9360, type: WidthType.DXA },
              shading: { fill: "F0F0F0", type: ShadingType.CLEAR },
              children: [
                new Paragraph({ children: [new TextRun({ text: "ABOUT " + className.toUpperCase() + "S:", bold: true, size: 26 })] }),
                new Paragraph({ children: [new TextRun({ text: additionalInfo, size: 24 })] })
              ]
            })
          ]
        })
      ]
    }),
    
    new Paragraph({ text: "" }),
    
    // Inventory and Notes
    new Table({
      columnWidths: [9360],
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: lightCellBorders,
              width: { size: 9360, type: WidthType.DXA },
              children: [
                new Paragraph({ children: [new TextRun({ text: "MY ITEMS & TREASURES:", bold: true, size: 24 })] }),
                new Paragraph({ children: [new TextRun({ text: "______________________________________", size: 22 })] }),
                new Paragraph({ children: [new TextRun({ text: "______________________________________", size: 22 })] }),
                new Paragraph({ children: [new TextRun({ text: "______________________________________", size: 22 })] }),
                new Paragraph({ children: [new TextRun({ text: "______________________________________", size: 22 })] }),
                new Paragraph({ children: [new TextRun({ text: "______________________________________", size: 22 })] })
              ]
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              borders: lightCellBorders,
              width: { size: 9360, type: WidthType.DXA },
              children: [
                new Paragraph({ children: [new TextRun({ text: "MY HERO'S STORY:", bold: true, size: 24 })] }),
                new Paragraph({ children: [new TextRun({ text: "______________________________________", size: 22 })] }),
                new Paragraph({ children: [new TextRun({ text: "______________________________________", size: 22 })] }),
                new Paragraph({ children: [new TextRun({ text: "______________________________________", size: 22 })] }),
                new Paragraph({ children: [new TextRun({ text: "______________________________________", size: 22 })] })
              ]
            })
          ]
        })
      ]
    }),
    
    new Paragraph({ children: [new PageBreak()] })
  ];
}

// Create document with all character sheets
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } }
  },
  sections: [{
    properties: {
      page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } }
    },
    children: [
      // Warrior
      ...createCharacterSheet(
        "Warrior",
        "8B0000",
        "Sword & Shield",
        "1d8",
        10,
        "Once per battle, can protect a friend from an attack!",
        "Warriors are brave fighters who wear armor and protect their friends. They're strong and tough!"
      ),
      
      // Wizard
      ...createCharacterSheet(
        "Wizard",
        "4B0082",
        "Magic Staff",
        "1d4",
        6,
        "Can cast 3 spells per adventure (see spell list in rulebook)",
        "Wizards use magic to solve problems! They're smart and can do amazing things with spells."
      ),
      
      // Cleric
      ...createCharacterSheet(
        "Cleric",
        "FFD700",
        "Holy Mace",
        "1d6",
        8,
        "Can heal a friend for 1d6 hit points, three times per adventure!",
        "Clerics are healers who use holy magic. They help their friends and make everyone safer!"
      ),
      
      // Rogue
      ...createCharacterSheet(
        "Rogue",
        "2C3E50",
        "Sneaky Dagger",
        "1d4 (+2 from stealth)",
        7,
        "Can do a sneaky sneak attack for extra damage once per battle!",
        "Rogues are quick and clever! They can sneak, pick locks, and find hidden things."
      ),
      
      // Druid
      ...createCharacterSheet(
        "Druid",
        "228B22",
        "Wooden Staff",
        "1d6",
        7,
        "Can talk to animals and ask plants for help!",
        "Druids love nature! They're friends with animals and plants. Nature magic is powerful!"
      ),
      
      // Barbarian
      ...createCharacterSheet(
        "Barbarian",
        "DC143C",
        "Big Axe",
        "1d12",
        12,
        "Can RAGE! Takes half damage for 3 turns, once per adventure!",
        "Barbarians are wild and strong! When they get angry, they become super powerful in battle!"
      ),
      
      // Paladin
      ...createCharacterSheet(
        "Paladin",
        "FFD700",
        "Sword & Holy Shield",
        "1d8",
        11,
        "Divine Protection - Once per battle, protect yourself or a friend from one attack AND force attacker to target you next turn!",
        "Paladins are holy warriors blessed by divine power! They protect their friends and shine with holy light."
      ),
      
      // Ranger
      ...createCharacterSheet(
        "Ranger",
        "228B22",
        "Bow",
        "1d8",
        9,
        "Can track enemies - notice hidden enemies and their location once per adventure!",
        "Rangers are expert archers and wilderness trackers! They're skilled hunters who notice everything in nature."
      )
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("./Character_Sheets.docx", buffer);
  console.log("Character sheets created successfully!");
});
