/**
 * STORY_TEMPLATE.js - Template for Creating New Adventures
 *
 * This file is a template for creating new adventure modules.
 * Copy this file to a new story directory and modify the content.
 *
 * Usage:
 * 1. Create a new directory in Stories/ (e.g., Stories/The_New_Adventure/)
 * 2. Copy this file to adventure.js in that directory
 * 3. Follow the sections below and replace placeholder content
 * 4. Run: node adventure.js (or make docs-stories)
 * 5. Generated document will be placed in your story directory
 *
 * IMPORTANT: Include the NPC Descriptions section so the artwork generator
 * can create consistent character references for scene illustrations!
 */

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 24 }
      }
    },
    paragraphStyles: [
      {
        id: "Title",
        name: "Title",
        basedOn: "Normal",
        run: { size: 56, bold: true, color: "8B0000", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 240 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 36, bold: true, color: "8B0000", font: "Arial" },
        paragraph: { spacing: { before: 280, after: 180 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 30, bold: true, color: "B8860B", font: "Arial" },
        paragraph: { spacing: { before: 200, after: 140 }, outlineLevel: 1 }
      },
      {
        id: "ReadAloud",
        name: "Read Aloud",
        basedOn: "Normal",
        run: { size: 24, italics: true, color: "4B0082", font: "Arial" },
        paragraph: { spacing: { after: 120, before: 120 }, indent: { left: 360 } }
      },
      {
        id: "DMText",
        name: "DM Text",
        basedOn: "Normal",
        run: { size: 22, color: "2E5C8A", font: "Arial" },
        paragraph: { spacing: { after: 120 } }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullet-list",
        levels: [
          {
            level: 0,
            format: "bullet",
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          }
        ]
      }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    children: [
      // ========== TITLE PAGE ==========
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("YOUR ADVENTURE TITLE HERE")] }),
      new Paragraph({ style: "Subtitle", children: [new TextRun("Adventure Hook or Tagline")] }),
      new Paragraph({ text: "" }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Brief description of the adventure (1-2 sentences)", size: 26, italics: true })]
      }),
      new Paragraph({ text: "" }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Adventure Length: X hours", bold: true, color: "8B0000" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "For X-Y Players", bold: true, color: "8B0000" })]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== INTRODUCTION ==========
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Dungeon Master's Introduction")] }),
      new Paragraph({ children: [new TextRun({ text: "Welcome, Dungeon Master!", bold: true, size: 28, color: "2E5C8A" })] }),
      new Paragraph({ children: [new TextRun("Brief introduction text describing the adventure and how to use this document.")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Adventure Overview")] }),
      new Paragraph({ children: [new TextRun({ text: "The Story:", bold: true }), new TextRun(" [Main plot summary here]")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("How to Use This Book")] }),
      new Paragraph({ children: [new TextRun("Explain the format: Read-aloud text, DM guidance sections, etc.")] }),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== NPC DESCRIPTIONS SECTION ==========
      // IMPORTANT: This section is parsed by the artwork generator!
      // Include all NPCs with role, appearance, personality, and scenes
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("NPC Descriptions")] }),
      new Paragraph({ children: [new TextRun("These characters appear throughout the adventure. Use these descriptions to keep their portrayal consistent!")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("NPC Name - Character Type")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Role: ", bold: true }), new TextRun("What this NPC does in the adventure")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Appearance: ", bold: true }), new TextRun("Physical description for artwork")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Personality: ", bold: true }), new TextRun("Behavior, voice, attitude")] }),
      new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, children: [new TextRun({ text: "Scenes: ", bold: true }), new TextRun("Where they appear (Act X Scene Y)")] }),

      // Add more NPCs as needed - use the same format above

      new Paragraph({ children: [new PageBreak()] }),

      // ========== ACT 1 ==========
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Act 1: ACT TITLE HERE")] }),
      new Paragraph({ children: [new TextRun({ text: "Estimated Time: XX-YY minutes", italics: true })] }),

      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scene 1: Scene Title")] }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("Read this text aloud to set the scene. Describe what the players see, hear, and feel.")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE", bold: true, color: "2E5C8A" })] }),
      new Paragraph({ children: [new TextRun({ text: "• Mechanical details (combat stats, DCs, etc.)", color: "2E5C8A" })] }),
      new Paragraph({ children: [new TextRun({ text: "• Handling different player actions", color: "2E5C8A" })] }),
      new Paragraph({ children: [new TextRun({ text: "• Clues, rewards, or follow-up hooks", color: "2E5C8A" })] }),

      // Add more scenes as needed - use the same format above

      new Paragraph({ children: [new PageBreak()] }),

      // ========== ACT 2 ==========
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Act 2: ACT TITLE HERE")] }),
      new Paragraph({ children: [new TextRun({ text: "Estimated Time: XX-YY minutes", italics: true })] }),

      new Paragraph({ text: "" }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scene X: Scene Title")] }),
      new Paragraph({ style: "ReadAloud", children: [new TextRun("Read-aloud text for this scene.")] }),

      new Paragraph({ text: "" }),
      new Paragraph({ children: [new TextRun({ text: "DM GUIDANCE", bold: true, color: "2E5C8A" })] }),
      new Paragraph({ children: [new TextRun({ text: "• Guidance for this encounter", color: "2E5C8A" })] }),

      new Paragraph({ children: [new PageBreak()] }),

      // ========== CONCLUSION ==========
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Adventure Conclusion")] }),
      new Paragraph({ children: [new TextRun("Describe how the adventure concludes, rewards for the players, and hooks for future adventures.")] })
    ]
  }]
});

// Generate the document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("Adventure_YOUR_STORY_NAME.docx", buffer);
  console.log("Adventure book created successfully!");
});
