const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType, PageBreak } = require('docx');
const fs = require('fs');

const mapBorder = { style: BorderStyle.DOUBLE, size: 3, color: "000000" };
const mapBorders = { top: mapBorder, bottom: mapBorder, left: mapBorder, right: mapBorder };
const cellBorder = { style: BorderStyle.SINGLE, size: 1, color: "666666" };
const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

// Function to create a map cell
function createMapCell(content, color = "FFFFFF") {
  return new TableCell({
    borders: cellBorders,
    width: { size: 1560, type: WidthType.DXA },
    shading: { fill: color, type: ShadingType.CLEAR },
    children: [new Paragraph({ 
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: content, size: 20, bold: true })] 
    })]
  });
}

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
        paragraph: { spacing: { before: 180, after: 120 }, outlineLevel: 1 } }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } }
    },
    children: [
      // Title Page
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Game Maps & Boards")] }),
      new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "The Dragon's Friends Adventure", size: 28, italics: true, color: "654321" })]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Use these maps to track player movement and encounters during your adventure!", size: 22 })]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // MAP 1: Village to Windmill Path
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Map 1: Path to the Windmill")] }),
      new Paragraph({ children: [new TextRun({ text: "Use this map for Scene 2 (Goblin encounter)", italics: true })] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [1560, 1560, 1560, 1560, 1560, 1560],
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        rows: [
          new TableRow({ children: [
            createMapCell("🏘️\nVillage", "98FB98"),
            createMapCell("🌸\nFlowers", "FFB6C1"),
            createMapCell("🌸\nFlowers", "FFB6C1"),
            createMapCell("🌳\nBush", "90EE90"),
            createMapCell("🌸\nPath", "F5DEB3"),
            createMapCell("🏚️\nMill", "A0522D")
          ]}),
          new TableRow({ children: [
            createMapCell("🏡\nStart", "98FB98"),
            createMapCell("🌿\nGrass", "90EE90"),
            createMapCell("⚔️\nGoblins", "FF6B6B"),
            createMapCell("🌳\nBush", "90EE90"),
            createMapCell("🌸\nPath", "F5DEB3"),
            createMapCell("🎯\nGoal", "FFD700")
          ]}),
          new TableRow({ children: [
            createMapCell("🌸\nFlowers", "FFB6C1"),
            createMapCell("🌿\nGrass", "90EE90"),
            createMapCell("🌸\nFlowers", "FFB6C1"),
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("🌸\nPath", "F5DEB3"),
            createMapCell("🌸\nFlowers", "FFB6C1")
          ]})
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "KEY:", bold: true })] }),
      new Paragraph({ children: [new TextRun("🏘️ = Village Square (Starting Point)")] }),
      new Paragraph({ children: [new TextRun("⚔️ = 3 Goblins appear here!")] }),
      new Paragraph({ children: [new TextRun("🏚️ = Old Windmill (Destination)")] }),
      new Paragraph({ children: [new TextRun("🌸 = Path / Safe areas")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // MAP 2: Windmill Ground Floor
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Map 2: Windmill - Ground Floor")] }),
      new Paragraph({ children: [new TextRun({ text: "Use this map for Scene 3 (Exploring the mill)", italics: true })] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [1560, 1560, 1560, 1560, 1560, 1560],
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        rows: [
          new TableRow({ children: [
            createMapCell("📦\nGrain", "D2B48C"),
            createMapCell("📦\nGrain", "D2B48C"),
            createMapCell("", "FFFFFF"),
            createMapCell("🔒\nLocked", "8B4513"),
            createMapCell("🎒\nStorage", "D3D3D3"),
            createMapCell("", "FFFFFF")
          ]}),
          new TableRow({ children: [
            createMapCell("📦\nGrain", "D2B48C"),
            createMapCell("🔑\nKey!", "FFD700"),
            createMapCell("", "FFFFFF"),
            createMapCell("🚪\nDoor", "8B4513"),
            createMapCell("🛡️\nShield", "C0C0C0"),
            createMapCell("", "FFFFFF")
          ]}),
          new TableRow({ children: [
            createMapCell("", "FFFFFF"),
            createMapCell("", "FFFFFF"),
            createMapCell("⭐\nOpen\nSpace", "F5F5DC"),
            createMapCell("", "FFFFFF"),
            createMapCell("🪔\nLantern", "FFA500"),
            createMapCell("", "FFFFFF")
          ]}),
          new TableRow({ children: [
            createMapCell("", "FFFFFF"),
            createMapCell("📦\nGrain", "D2B48C"),
            createMapCell("", "FFFFFF"),
            createMapCell("", "FFFFFF"),
            createMapCell("", "FFFFFF"),
            createMapCell("🪜\nStairs\nUP!", "A0522D")
          ]}),
          new TableRow({ children: [
            createMapCell("🚪\nENTER", "98FB98"),
            createMapCell("", "FFFFFF"),
            createMapCell("", "FFFFFF"),
            createMapCell("📦\nGrain", "D2B48C"),
            createMapCell("📦\nGrain", "D2B48C"),
            createMapCell("", "FFFFFF")
          ]})
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "KEY:", bold: true })] }),
      new Paragraph({ children: [new TextRun("🚪 = Entrance")] }),
      new Paragraph({ children: [new TextRun("📦 = Grain sacks (search DC 10 for key)")] }),
      new Paragraph({ children: [new TextRun("🔑 = Silver key location")] }),
      new Paragraph({ children: [new TextRun("🔒 = Locked door (needs key or DC 12 to pick)")] }),
      new Paragraph({ children: [new TextRun("🎒 = Storage room (rope inside)")] }),
      new Paragraph({ children: [new TextRun("🛡️ = Wooden shield (+1 defense)")] }),
      new Paragraph({ children: [new TextRun("🪔 = Lantern")] }),
      new Paragraph({ children: [new TextRun("🪜 = Stairs to second floor")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // MAP 3: Windmill Upper Floor
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Map 3: Windmill - Upper Floor")] }),
      new Paragraph({ children: [new TextRun({ text: "Use this map for Scenes 4 & 5 (Spider and Sparkle)", italics: true })] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [1560, 1560, 1560, 1560, 1560, 1560],
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        rows: [
          new TableRow({ children: [
            createMapCell("", "FFFFFF"),
            createMapCell("", "FFFFFF"),
            createMapCell("🐉\nSparkle!", "FFB6C1"),
            createMapCell("🔒\nCage", "8B4513"),
            createMapCell("", "FFFFFF"),
            createMapCell("", "FFFFFF")
          ]}),
          new TableRow({ children: [
            createMapCell("", "FFFFFF"),
            createMapCell("🌾\nHay", "F5DEB3"),
            createMapCell("🔑\nKey", "FFD700"),
            createMapCell("🌾\nHay", "F5DEB3"),
            createMapCell("", "FFFFFF"),
            createMapCell("", "FFFFFF")
          ]}),
          new TableRow({ children: [
            createMapCell("", "FFFFFF"),
            createMapCell("", "FFFFFF"),
            createMapCell("", "FFFFFF"),
            createMapCell("", "FFFFFF"),
            createMapCell("", "FFFFFF"),
            createMapCell("⚙️\nGear", "A9A9A9")
          ]}),
          new TableRow({ children: [
            createMapCell("🪜\nStairs\nDOWN", "A0522D"),
            createMapCell("🕸️\nWeb", "E6E6FA"),
            createMapCell("🕷️\nSpider!", "8B008B"),
            createMapCell("🕸️\nWeb", "E6E6FA"),
            createMapCell("", "FFFFFF"),
            createMapCell("⚙️\nGear", "A9A9A9")
          ]})
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "KEY:", bold: true })] }),
      new Paragraph({ children: [new TextRun("🪜 = Stairs from ground floor")] }),
      new Paragraph({ children: [new TextRun("🕷️ = Giant Spider (HP 8)")] }),
      new Paragraph({ children: [new TextRun("🕸️ = Spider web (blocks path)")] }),
      new Paragraph({ children: [new TextRun("🐉 = Sparkle the dragon in cage!")] }),
      new Paragraph({ children: [new TextRun("🔒 = Locked cage")] }),
      new Paragraph({ children: [new TextRun("🔑 = Key hidden under hay (DC 12)")] }),
      new Paragraph({ children: [new TextRun("⚙️ = Mill gears (decorative)")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // MAP 4: Whispering Woods Central
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Map 4: The Whispering Woods")] }),
      new Paragraph({ children: [new TextRun({ text: "Use this map for Scene 6 (Choosing which gem to find first)", italics: true })] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [1560, 1560, 1560, 1560, 1560, 1560],
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        rows: [
          new TableRow({ children: [
            createMapCell("💎\nSapphire", "87CEEB"),
            createMapCell("🌊\nStream", "ADD8E6"),
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("⛰️\nCave", "A9A9A9"),
            createMapCell("💎\nEmerald", "50C878")
          ]}),
          new TableRow({ children: [
            createMapCell("↖️\nLeft\nPath", "F5DEB3"),
            createMapCell("🌸\nFlower", "FFB6C1"),
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("🌸\nFlower", "FFB6C1"),
            createMapCell("↗️\nMiddle\nPath", "F5DEB3")
          ]}),
          new TableRow({ children: [
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("🌸\nFlower", "FFB6C1"),
            createMapCell("⭐\nFork", "FFD700"),
            createMapCell("⭐\nFork", "FFD700"),
            createMapCell("🌸\nFlower", "FFB6C1"),
            createMapCell("🌳\nTree", "90EE90")
          ]}),
          new TableRow({ children: [
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("🌸\nFlower", "FFB6C1"),
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("🌸\nFlower", "FFB6C1"),
            createMapCell("➡️\nRight\nPath", "F5DEB3")
          ]}),
          new TableRow({ children: [
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("🏚️\nFrom\nMill", "A0522D"),
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("🌅\nGrove", "FFA500"),
            createMapCell("💎\nRuby", "DC143C")
          ]})
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "KEY:", bold: true })] }),
      new Paragraph({ children: [new TextRun("🏚️ = Coming from the Windmill")] }),
      new Paragraph({ children: [new TextRun("⭐ = Three-way fork (players choose path)")] }),
      new Paragraph({ children: [new TextRun("↖️ = Left path leads to Singing Stream (Sapphire 💎)")] }),
      new Paragraph({ children: [new TextRun("↗️ = Middle path leads to Crystal Cave (Emerald 💎)")] }),
      new Paragraph({ children: [new TextRun("➡️ = Right path leads to Sunset Grove (Ruby 💎)")] }),
      new Paragraph({ children: [new TextRun({ text: "NOTE: ", bold: true }), new TextRun("Players return to the fork after each gem quest")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // MAP 5: Singing Stream
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Map 5: The Singing Stream")] }),
      new Paragraph({ children: [new TextRun({ text: "Use this map for the Sapphire quest", italics: true })] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [1560, 1560, 1560, 1560, 1560, 1560],
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        rows: [
          new TableRow({ children: [
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("🌊\nWater", "ADD8E6"),
            createMapCell("🌊\nWater", "ADD8E6"),
            createMapCell("🌊\nWater", "ADD8E6"),
            createMapCell("🌊\nWater", "ADD8E6"),
            createMapCell("🌳\nTree", "90EE90")
          ]}),
          new TableRow({ children: [
            createMapCell("🌸\nBank", "FFB6C1"),
            createMapCell("🌊\nShallow", "B0E0E6"),
            createMapCell("🧜\nSpirit", "48D1CC"),
            createMapCell("🪨\nRock", "A9A9A9"),
            createMapCell("🌊\nShallow", "B0E0E6"),
            createMapCell("🌸\nBank", "FFB6C1")
          ]}),
          new TableRow({ children: [
            createMapCell("🌸\nBank", "FFB6C1"),
            createMapCell("🌊\nShallow", "B0E0E6"),
            createMapCell("🌀\nDeep\nPool", "000080"),
            createMapCell("🐟\nFish", "00CED1"),
            createMapCell("🌊\nShallow", "B0E0E6"),
            createMapCell("🌸\nBank", "FFB6C1")
          ]}),
          new TableRow({ children: [
            createMapCell("🌸\nBank", "FFB6C1"),
            createMapCell("🌊\nShallow", "B0E0E6"),
            createMapCell("💎\nSapphire", "0000FF"),
            createMapCell("🌀\nDeep", "000080"),
            createMapCell("🌊\nShallow", "B0E0E6"),
            createMapCell("🌸\nBank", "FFB6C1")
          ]}),
          new TableRow({ children: [
            createMapCell("🌳\nTree", "90EE90"),
            createMapCell("🌸\nBank", "FFB6C1"),
            createMapCell("🌸\nBank", "FFB6C1"),
            createMapCell("🌸\nBank", "FFB6C1"),
            createMapCell("🌸\nBank", "FFB6C1"),
            createMapCell("↙️\nBack to\nWoods", "F5DEB3")
          ]})
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "KEY:", bold: true })] }),
      new Paragraph({ children: [new TextRun("🧜 = Friendly Water Spirit (on rock)")] }),
      new Paragraph({ children: [new TextRun("🌀 = Deep pool (10 feet deep)")] }),
      new Paragraph({ children: [new TextRun("💎 = Sapphire gem at bottom of pool")] }),
      new Paragraph({ children: [new TextRun("🐟 = Friendly fish swimming around")] }),
      new Paragraph({ children: [new TextRun("🌊 = Shallow water (easy to wade)")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // MAP 6: Crystal Cave
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Map 6: The Crystal Cave")] }),
      new Paragraph({ children: [new TextRun({ text: "Use this map for the Emerald quest", italics: true })] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [1560, 1560, 1560, 1560, 1560, 1560],
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        rows: [
          new TableRow({ children: [
            createMapCell("💎\nCrystal", "E6E6FA"),
            createMapCell("", "696969"),
            createMapCell("", "696969"),
            createMapCell("", "696969"),
            createMapCell("💎\nCrystal", "E6E6FA"),
            createMapCell("", "696969")
          ]}),
          new TableRow({ children: [
            createMapCell("", "696969"),
            createMapCell("💎\nCrystal", "E6E6FA"),
            createMapCell("⭐\nMain\nChamber", "D3D3D3"),
            createMapCell("🪨\nRock\nElemental", "8B4513"),
            createMapCell("", "696969"),
            createMapCell("💎\nCrystal", "E6E6FA")
          ]}),
          new TableRow({ children: [
            createMapCell("", "696969"),
            createMapCell("", "696969"),
            createMapCell("💎\nEmerald", "50C878"),
            createMapCell("", "696969"),
            createMapCell("", "696969"),
            createMapCell("", "696969")
          ]}),
          new TableRow({ children: [
            createMapCell("🌿\nTunnel", "90EE90"),
            createMapCell("", "696969"),
            createMapCell("", "696969"),
            createMapCell("", "696969"),
            createMapCell("💰\nTunnel", "FFD700"),
            createMapCell("", "696969")
          ]}),
          new TableRow({ children: [
            createMapCell("", "696969"),
            createMapCell("", "696969"),
            createMapCell("🚪\nENTER", "98FB98"),
            createMapCell("↙️\nBack to\nWoods", "F5DEB3"),
            createMapCell("", "696969"),
            createMapCell("", "696969")
          ]})
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "KEY:", bold: true })] }),
      new Paragraph({ children: [new TextRun("🚪 = Cave entrance")] }),
      new Paragraph({ children: [new TextRun("⭐ = Main chamber")] }),
      new Paragraph({ children: [new TextRun("🪨 = Rock Elemental (HP 12) - not hostile!")] }),
      new Paragraph({ children: [new TextRun("💎 = Emerald gem (on Elemental) + crystals on walls")] }),
      new Paragraph({ children: [new TextRun("🌿 = Side tunnel (moss and plants)")] }),
      new Paragraph({ children: [new TextRun("💰 = Side tunnel (crystals worth 10gp each)")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // MAP 7: Sunset Grove
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Map 7: Sunset Grove")] }),
      new Paragraph({ children: [new TextRun({ text: "Use this map for the Ruby quest", italics: true })] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [1560, 1560, 1560, 1560, 1560, 1560],
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        rows: [
          new TableRow({ children: [
            createMapCell("🔥\nVolcano\nTop", "FF4500"),
            createMapCell("💎\nRuby!", "DC143C"),
            createMapCell("🦎\nSalamander", "FFA500"),
            createMapCell("🔥\nLava", "FF6347"),
            createMapCell("🌳\nGolden\nTree", "FFD700"),
            createMapCell("🌳\nGolden\nTree", "FFD700")
          ]}),
          new TableRow({ children: [
            createMapCell("🔥\nWarm\nLava", "FF6347"),
            createMapCell("🪨\nRock", "A9A9A9"),
            createMapCell("🪨\nRock", "A9A9A9"),
            createMapCell("🌺\nBush", "FF69B4"),
            createMapCell("🌳\nGolden\nTree", "FFD700"),
            createMapCell("🦜\nPhoenix", "FF4500")
          ]}),
          new TableRow({ children: [
            createMapCell("🌺\nFlower", "FF69B4"),
            createMapCell("", "F5DEB3"),
            createMapCell("🪨\nRock", "A9A9A9"),
            createMapCell("🌺\nBush", "FF69B4"),
            createMapCell("", "F5DEB3"),
            createMapCell("🌳\nGolden\nTree", "FFD700")
          ]}),
          new TableRow({ children: [
            createMapCell("🌳\nGolden\nTree", "FFD700"),
            createMapCell("🌺\nFlower", "FF69B4"),
            createMapCell("⭐\nGrove\nCenter", "FFA500"),
            createMapCell("", "F5DEB3"),
            createMapCell("🌺\nFlower", "FF69B4"),
            createMapCell("🌳\nGolden\nTree", "FFD700")
          ]}),
          new TableRow({ children: [
            createMapCell("🌳\nGolden\nTree", "FFD700"),
            createMapCell("🌺\nFlower", "FF69B4"),
            createMapCell("", "F5DEB3"),
            createMapCell("🚪\nENTER", "98FB98"),
            createMapCell("↙️\nBack to\nWoods", "F5DEB3"),
            createMapCell("🌳\nGolden\nTree", "FFD700")
          ]})
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "KEY:", bold: true })] }),
      new Paragraph({ children: [new TextRun("🚪 = Grove entrance")] }),
      new Paragraph({ children: [new TextRun("⭐ = Center of grove")] }),
      new Paragraph({ children: [new TextRun("🦜 = Phoenix bird (friendly, gives hints)")] }),
      new Paragraph({ children: [new TextRun("🔥 = Small volcano (warm, not dangerous)")] }),
      new Paragraph({ children: [new TextRun("🦎 = Fire Salamander (playful, loves games)")] }),
      new Paragraph({ children: [new TextRun("💎 = Ruby of Fire at volcano top")] }),
      new Paragraph({ children: [new TextRun("🌳 = Golden-red trees")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // MAP 8: Goblin Fort
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Map 8: The Goblin Fort")] }),
      new Paragraph({ children: [new TextRun({ text: "Use this map for Scenes 7-9 (Final confrontation)", italics: true })] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [1560, 1560, 1560, 1560, 1560, 1560],
        margins: { top: 60, bottom: 60, left: 60, right: 60 },
        rows: [
          new TableRow({ children: [
            createMapCell("🏰\nWall", "8B4513"),
            createMapCell("🏰\nWall", "8B4513"),
            createMapCell("🏰\nWall", "8B4513"),
            createMapCell("🏰\nWall", "8B4513"),
            createMapCell("🏰\nWall", "8B4513"),
            createMapCell("🏰\nWall", "8B4513")
          ]}),
          new TableRow({ children: [
            createMapCell("🏰\nWall", "8B4513"),
            createMapCell("👑\nKing\nThrone", "FFD700"),
            createMapCell("⚔️\nGoblin", "FF6B6B"),
            createMapCell("⚔️\nGoblin", "FF6B6B"),
            createMapCell("🎪\nTent", "FFA500"),
            createMapCell("🏰\nWall", "8B4513")
          ]}),
          new TableRow({ children: [
            createMapCell("🏰\nWall", "8B4513"),
            createMapCell("⚔️\nGoblin", "FF6B6B"),
            createMapCell("⭐\nCourt\nYard", "F5DEB3"),
            createMapCell("⭐\nCourt\nYard", "F5DEB3"),
            createMapCell("⚔️\nGoblin", "FF6B6B"),
            createMapCell("🏰\nWall", "8B4513")
          ]}),
          new TableRow({ children: [
            createMapCell("🏰\nWall", "8B4513"),
            createMapCell("📦\nBoxes", "A0522D"),
            createMapCell("", "F5DEB3"),
            createMapCell("🔥\nFire", "FF4500"),
            createMapCell("📦\nBoxes", "A0522D"),
            createMapCell("🏰\nWall", "8B4513")
          ]}),
          new TableRow({ children: [
            createMapCell("🏰\nWall", "8B4513"),
            createMapCell("🏰\nWall", "8B4513"),
            createMapCell("🚪\nGATE", "654321"),
            createMapCell("👮\nGuard", "FF6B6B"),
            createMapCell("🏰\nWall", "8B4513"),
            createMapCell("🏰\nWall", "8B4513")
          ]}),
          new TableRow({ children: [
            createMapCell("🕳️\nSecret\nTunnel", "D3D3D3"),
            createMapCell("", "90EE90"),
            createMapCell("↙️\nFrom\nWoods", "90EE90"),
            createMapCell("", "90EE90"),
            createMapCell("", "90EE90"),
            createMapCell("", "90EE90")
          ]})
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "KEY:", bold: true })] }),
      new Paragraph({ children: [new TextRun("🚪 = Main gate (3 guards here initially)")] }),
      new Paragraph({ children: [new TextRun("🕳️ = Secret tunnel under wall (DC 13 to find)")] }),
      new Paragraph({ children: [new TextRun("⭐ = Courtyard (open space)")] }),
      new Paragraph({ children: [new TextRun("👑 = King Grumbletooth on throne")] }),
      new Paragraph({ children: [new TextRun("⚔️ = Goblin guards (4 total inside fort)")] }),
      new Paragraph({ children: [new TextRun("🏰 = Wooden wall (DC 12 to climb)")] }),
      new Paragraph({ children: [new TextRun("🔥 = Campfire")] }),
      new Paragraph({ children: [new TextRun("📦 = Supply crates")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Quick Reference Page
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Quick Map Reference")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [3120, 3120, 3120],
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "8B4513", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Map #", bold: true, color: "FFFFFF", size: 26 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "8B4513", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Location", bold: true, color: "FFFFFF", size: 26 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "8B4513", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Scene(s)", bold: true, color: "FFFFFF", size: 26 })] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Map 1")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Path to Windmill")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Scene 2 (Goblins)")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Map 2")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Windmill Ground Floor")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Scene 3 (Exploration)")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Map 3")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Windmill Upper Floor")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Scene 4-5 (Spider & Sparkle)")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Map 4")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Whispering Woods")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Scene 6 (Path Choice)")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Map 5")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Singing Stream")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Sapphire Quest")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Map 6")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Crystal Cave")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Emerald Quest")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Map 7")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Sunset Grove")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Ruby Quest")] })] })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun("Map 8")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Goblin Fort")] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Scene 7-9 (Final Battle)")] })] })
            ]
          })
        ]
      }),
      
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Tip: Print these maps and use coins, dice, or small toys as player tokens!", size: 22, italics: true, color: "654321" })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("./Game_Maps.docx", buffer);
  console.log("Game maps created successfully!");
});
