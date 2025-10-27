const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType, LevelFormat, PageBreak } = require('docx');
const fs = require('fs');

// ============================================================================
// ART STYLE GUIDELINES
// ============================================================================
// These guidelines are used by the Artwork Generator CLI to maintain visual
// consistency across all generated character art and scene artwork.
// They are prepended to all image generation prompts.
// ============================================================================

const ART_STYLE_GUIDELINES = {
  style_description: `
    Fantasy illustration style with digital painting aesthetic.
    Professional character design with expressive features.
    Warm, rich color palette with natural lighting.
    High-quality, detailed artwork suitable for both digital display and print.
  `,

  technical_specs: {
    resolution: "512x512 pixels minimum, high DPI (300+ for print)",
    aspect_ratio: "1:1 square format preferred",
    file_format: "PNG with transparency where appropriate",
    quality: "High detail, painterly texture, professional finishing"
  },

  character_specific: {
    composition: "Full-body or waist-up portrait, character centered and prominent",
    background: "Simple, non-distracting background that complements the character",
    clothing: "Detailed armor, robes, and accessories as described",
    expression: "Clear facial expression showing personality and emotion",
    lighting: "Dynamic lighting with warm highlights, soft shadows for depth"
  },

  consistency_notes: "Maintain consistent art style across all race/class combinations. Ensure all characters feel like they belong to the same game world."
};

const artBorder = { style: BorderStyle.DOUBLE, size: 2, color: "8B4513" };
const artBorders = { top: artBorder, bottom: artBorder, left: artBorder, right: artBorder };

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
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } }
    },
    children: [
      // Title Page
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Character Art Guide")] }),
      new Paragraph({ style: "Subtitle", children: [new TextRun("Visual Descriptions for Drawing Your Hero")] }),
      new Paragraph({ text: "" }),
      new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Use these descriptions to imagine what your hero looks like, or draw them yourself!", size: 26 })]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Character Classes Section
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Character Classes")] }),
      new Paragraph({ children: [new TextRun("Here are detailed descriptions of each class to help you visualize and draw your hero!")] }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // WARRIOR
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("THE WARRIOR")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "FFE6E6", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "⚔️ WARRIOR ⚔️", bold: true, size: 36, color: "8B0000" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Overall Look:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Strong and heroic! Warriors stand tall and look brave. They wear shiny armor that protects them.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Clothing & Armor:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Metal chest plate (can be silver or bronze colored)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Arm guards and shoulder pads")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Sturdy boots")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Cape (optional - can be red, blue, or any color!)")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Weapons:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Sword (shiny and sharp-looking)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Shield (round or rectangle, with a symbol)")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Face & Expression:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Brave and determined! Maybe has a confident smile. Can have any hair color and style.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Cool Details to Add:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("A symbol or emblem on the shield (star, lion, eagle, etc.)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("A belt with pouches")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Battle scars or bandages (shows they're experienced!)")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Color Suggestions:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Silver or bronze armor, red or blue cape, brown leather boots and belt")] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // WIZARD
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("THE WIZARD")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E6E6FA", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🧙 WIZARD 🧙", bold: true, size: 36, color: "4B0082" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Overall Look:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Mystical and magical! Wizards look wise and mysterious. They have flowing robes and magical sparkles around them.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Clothing:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Long, flowing robes (purple, blue, or starry pattern)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Pointed wizard hat with stars or moons")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Wide sleeves")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Comfortable shoes or sandals")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Weapons & Tools:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Magic staff (tall wooden staff with crystal on top)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Spell book (can be tucked under arm or in bag)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Magic wand (optional)")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Face & Expression:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Smart and thoughtful! Maybe wearing glasses. Can have long hair or short hair.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Cool Details to Add:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Magical sparkles or stars floating around them")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("A familiar pet (owl, cat, or mouse)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Glowing crystal on the staff")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Pouches full of spell components")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Color Suggestions:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Purple or blue robes with silver stars, brown wooden staff, glowing crystals in blue or white")] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // CLERIC
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("THE CLERIC")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "FFFACD", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "✨ CLERIC ✨", bold: true, size: 36, color: "B8860B" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Overall Look:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Kind and healing! Clerics look warm and friendly. They have a gentle glow of holy light around them.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Clothing:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("White, gold, or light blue robes")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Chain mail armor underneath (protects while healing)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Holy symbol necklace (sun, star, heart, etc.)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Comfortable traveling boots")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Weapons & Tools:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Mace or hammer (simple but effective)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Holy symbol (glows when healing)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Healer's bag with bandages")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Face & Expression:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Warm smile! Looks caring and trustworthy. Eyes that sparkle with kindness.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Cool Details to Add:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Golden aura or sparkles when casting healing spells")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Prayer beads on a bracelet")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Flowers or vines growing on their staff")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Bandages wrapped around one arm (from helping others)")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Color Suggestions:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("White or cream robes with gold trim, silver chain mail, golden holy symbol")] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // ROGUE
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("THE ROGUE")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E8E8E8", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🗡️ ROGUE 🗡️", bold: true, size: 36, color: "2C3E50" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Overall Look:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Sneaky and quick! Rogues look mysterious and agile. They move silently like cats!")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Clothing:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Dark, fitted clothes (black, dark green, or dark purple)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Leather armor (quiet and flexible)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Hood or mask (for sneaking)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Soft boots (for silent steps)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Fingerless gloves")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Weapons & Tools:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Twin daggers (small and sharp)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Lockpicks in a small case")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Grappling hook and rope")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Throwing stars (optional)")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Face & Expression:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Clever smirk! Quick eyes that notice everything. Maybe has a small scar that shows they're experienced.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Cool Details to Add:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Multiple pouches on belt full of tools")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Flowing scarf or cape")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Shadow effects around their feet")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("A lucky coin or charm")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Color Suggestions:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Black or dark purple clothes, brown leather armor, silver daggers")] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // DRUID
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("THE DRUID")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E8F5E9", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🌿 DRUID 🌿", bold: true, size: 36, color: "228B22" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Overall Look:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Natural and wild! Druids look like they belong in the forest. Animals and plants are their friends!")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Clothing:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Earth-colored robes (green, brown, or tan)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Leather armor made from tree bark")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Flower crown or wreath of leaves")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Bare feet or simple sandals")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Vine or vine bracelet accessories")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Weapons & Tools:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Wooden staff with growing vines")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Sickle or curved knife")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Pouch of seeds and herbs")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Face & Expression:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Peaceful and wise! Connected to nature. Maybe has leaves or flowers in their hair.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Cool Details to Add:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Small animals following them (birds, squirrels, butterflies)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Flowers growing from their staff")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Leaf patterns on their clothes")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Glowing green eyes when using nature magic")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Color Suggestions:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Green, brown, and tan clothes, brown wooden staff, colorful flowers, golden sunlight effects")] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // BARBARIAN
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("THE BARBARIAN")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "FFE4E1", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🪓 BARBARIAN 🪓", bold: true, size: 36, color: "DC143C" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Overall Look:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Wild and powerful! Barbarians are big, strong, and fierce! But they're good-hearted heroes.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Clothing:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Fur vest or animal skin armor")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Tribal patterns or tattoos (can be drawn on arms)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Leather pants or kilt")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Heavy boots with fur trim")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("War paint on face (optional)")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Weapons:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("HUGE double-bladed axe (bigger than a normal axe!)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Club or hammer (backup weapon)")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Face & Expression:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Fierce but friendly! Big smile when happy. Looks tough but has a soft heart. Wild, messy hair!")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Cool Details to Add:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Red glow in eyes when RAGING")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Trophies from adventures (teeth, claws on necklace)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Muscles! Show they're super strong")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Battle scars (shows they've been in fights)")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Color Suggestions:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Brown fur and leather, red or orange war paint, silver axe blade, dark messy hair")] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // PALADIN
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("THE PALADIN")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "FFF9E6", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "⚔️ PALADIN ⚔️", bold: true, size: 36, color: "DAA520" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Overall Look:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Noble and radiant! Paladins are holy warriors who shine with divine light. They look heroic and honorable.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Clothing & Armor:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Shining plate armor (silver or gold colored)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("White or gold cape with holy symbols")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Polished metal boots and gauntlets")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Holy symbol tabard or surcoat over armor")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Weapons:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Blessed sword (glows with holy light)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Holy shield with sacred emblems (sun, star, etc.)")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Face & Expression:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Noble and determined! Kind eyes that show courage. Clean and well-groomed appearance.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Cool Details to Add:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Golden aura or halo when using divine powers")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Holy symbols engraved on armor")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("White or golden light radiating from shield")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Oath scroll or sacred text at their belt")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Color Suggestions:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Silver or gold armor, white cape with gold trim, glowing golden or white holy light effects")] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // RANGER
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("THE RANGER")] }),
      new Paragraph({ text: "" }),
      
      new Table({
        columnWidths: [9360],
        margins: { top: 100, bottom: 100, left: 120, right: 120 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 9360, type: WidthType.DXA },
                shading: { fill: "E8F5E9", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🏹 RANGER 🏹", bold: true, size: 36, color: "556B2F" })] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Overall Look:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Rugged and alert! Rangers are skilled wilderness scouts who blend into nature. They look ready for adventure!")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Clothing:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Forest-colored clothes (green, brown, tan)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Light leather armor (quiet and flexible)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Hooded cloak or camouflage cape")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Sturdy traveling boots")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Quiver of arrows on back")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Weapons & Tools:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Longbow (elegant wooden bow)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Quiver full of feathered arrows")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Hunting knife or short sword")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Tracking tools (compass, rope, map)")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Face & Expression:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Alert and observant! Sharp eyes that notice everything. Often has windswept hair from outdoor life.")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Cool Details to Add:", bold: true, size: 26 })] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Animal companion (hawk, wolf, or fox)")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Leaves or feathers decorating equipment")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Camouflage face paint")] }),
                  new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun("Tracks or pawprints on their boots (from hiking)")] }),
                  new Paragraph({ text: "" }),
                  new Paragraph({ children: [new TextRun({ text: "Color Suggestions:", bold: true, size: 26 })] }),
                  new Paragraph({ children: [new TextRun("Forest green and brown clothes, tan leather armor, brown wooden bow, green cloak")] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Species Section
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Species & Ancestries")] }),
      new Paragraph({ children: [new TextRun("Each species has special features! Mix and match with any class above.")] }),
      new Paragraph({ text: "" }),
      
      // Table of Species
      new Table({
        columnWidths: [3120, 6240],
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "FFE4B5", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HUMAN", bold: true, size: 28 })] })
                ]
              }),
              new TableCell({
                borders: artBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun("Look like regular people! Can have any hair color, any skin color, any eye color. Humans are very diverse!")] }),
                  new Paragraph({ children: [new TextRun({ text: "Special feature: ", bold: true }), new TextRun("Determined expression showing adaptability")] })
                ]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "E6F9E6", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ELF", bold: true, size: 28 })] })
                ]
              }),
              new TableCell({
                borders: artBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun("Tall and graceful. Usually slim. Fair skin (can be pale or golden). Hair is often blonde, silver, or black.")] }),
                  new Paragraph({ children: [new TextRun({ text: "Special features: ", bold: true }), new TextRun("POINTY EARS! Large, beautiful eyes. Often have elegant clothes")] })
                ]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "F4E4C1", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "DWARF", bold: true, size: 28 })] })
                ]
              }),
              new TableCell({
                borders: artBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun("Short but VERY sturdy and strong! Stocky build with broad shoulders.")] }),
                  new Paragraph({ children: [new TextRun({ text: "Special features: ", bold: true }), new TextRun("Often have beards (even the kids can have braided beards!). Love wearing metal decorations")] })
                ]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "FFE4F5", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GNOME", bold: true, size: 28 })] })
                ]
              }),
              new TableCell({
                borders: artBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun("Very tiny! Even shorter than dwarves. Mischievous and curious looking.")] }),
                  new Paragraph({ children: [new TextRun({ text: "Special features: ", bold: true }), new TextRun("Often have wild, colorful hair. Big nose. Tinkerer tools in pockets. Cheerful expressions")] })
                ]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "E6F2FF", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HALF-ELF", bold: true, size: 28 })] })
                ]
              }),
              new TableCell({
                borders: artBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun("Mix between human and elf! Medium height. Various skin tones.")] }),
                  new Paragraph({ children: [new TextRun({ text: "Special features: ", bold: true }), new TextRun("Slightly pointed ears (not as long as elves). Can have any hair color. Friendly appearance")] })
                ]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: artBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "FFFACD", type: ShadingType.CLEAR },
                children: [
                  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HALFLING", bold: true, size: 28 })] })
                ]
              }),
              new TableCell({
                borders: artBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun("Small and cheerful! About gnome-sized but more like tiny humans.")] }),
                  new Paragraph({ children: [new TextRun({ text: "Special features: ", bold: true }), new TextRun("Curly hair on head AND on the top of their bare feet! Round, happy faces. Always smiling")] })
                ]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      // Drawing Tips Page
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Tips for Drawing Your Hero")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "1. Start Simple", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("Draw a stick figure first! Then add the body shape. Then add clothes and weapons!")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "2. Use Your Imagination", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("These are just ideas! Your hero can look however YOU want them to look. Make them YOUR own!")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "3. Add Color", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("Use bright colors to make your hero pop! Don't worry about staying in the lines - have fun!")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "4. Show Action", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("Draw your hero doing something cool! Swinging a sword, casting a spell, or helping a friend!")] }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ children: [new TextRun({ text: "5. Tell Their Story", bold: true, size: 26 })] }),
      new Paragraph({ children: [new TextRun("On your character sheet, write a little story about your hero. Where are they from? What do they like?")] }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Remember: There's no wrong way to imagine your hero!", size: 28, bold: true, color: "8B4513" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "The most important thing is that YOU love how they look!", size: 26, italics: true })] }),
      new Paragraph({ text: "" }),
      new Paragraph({ text: "" }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "🎨 HAPPY DRAWING! 🎨", size: 32, bold: true })] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("./Character_Art_Guide.docx", buffer);
  console.log("Character art guide created successfully!");
});
