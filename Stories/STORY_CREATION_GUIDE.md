# Guide to Creating New Adventures

This guide explains how to create new adventure modules for Dice and Destiny.

## Quick Start

1. **Use the template**: Copy `STORY_TEMPLATE.js` as your starting point
2. **Create a story directory**: Make a new folder in `Stories/` (e.g., `Stories/The_New_Quest/`)
3. **Place your files**: Put your `adventure.js` in that directory
4. **Edit the content**: Replace placeholder text with your adventure
5. **Generate the document**: Run `node adventure.js` or `make docs-stories`
6. **Create artwork**: Add scene illustrations to `Artwork/Stories/The_New_Quest/Act 1/`, etc.

## Project Structure

Your new adventure should follow this structure:

```
Stories/
└── Your_New_Adventure/
    ├── adventure.js                          # Source file (REQUIRED)
    ├── maps.js                               # Maps and tactical diagrams (optional)
    ├── Adventure_Your_New_Adventure.docx     # Generated from adventure.js
    └── Game_Maps.docx                        # Generated from maps.js
```

## JavaScript File Structure

Your `adventure.js` file should follow this structure:

### 1. Header Comment
```javascript
/**
 * Brief description of your adventure
 */
```

### 2. Imports
```javascript
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak } = require('docx');
const fs = require('fs');
```

### 3. Style Definitions
Define the styles for your document (fonts, colors, spacing).

### 4. Document Structure
Create a new `Document` with:
- `styles`: Paragraph and character styles
- `numbering`: Bullet and numbered lists
- `sections`: The document content

### 5. Document Generation
At the end, use `Packer` to generate the `.docx` file:

```javascript
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("Adventure_Your_Title.docx", buffer);
  console.log("Adventure book created successfully!");
});
```

## Content Sections

### Title Page
- Adventure title
- Subtitle (optional)
- Tagline or hook
- Estimated length and player count

### DM Introduction
- Welcome message
- Adventure overview
- How to use the document
- Key NPCs and hooks

### **NPC Descriptions** (CRITICAL!)
This section is **required** for the artwork generator to work correctly.

Include:
- **NPC Name**: The character's name
- **Character Type**: What they are (e.g., "Elf Ranger", "Merchant", "Dragon")
- **Role**: What they do in the adventure
- **Appearance**: Physical description for consistent artwork
- **Personality**: How they behave and speak
- **Scenes**: Which acts/scenes they appear in

Example format:
```
## Sparkle - Baby Dragon

• Role: The center of the adventure - the dragon everyone must rescue
• Appearance: Smaller than a dog, purple and pink shimmering scales, big hopeful eyes
• Personality: Very friendly, loves flowers, grateful when helped
• Scenes: Act 1 Scene 5 (rescue), Act 2 Scenes 6-10, Act 3 Scenes 7-10
```

### Acts
Each major story section should be an Act:

```javascript
new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Act 1: Adventure Title")] }),
```

### Scenes
Scenes are individual encounters within an act:

```javascript
new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scene 1: Scene Title")] }),
```

The artwork generator looks for headings like:
- `# Act 1: Title`
- `# Act 2: Title`
- `## Scene 1: Title`
- `## Scene 2: Another Title`

### Read-Aloud Text
Use the ReadAloud style for narrative text that should be read to players:

```javascript
new Paragraph({
  style: "ReadAloud",
  children: [new TextRun("Text the DM reads aloud to set the scene.")]
}),
```

### DM Guidance
Use the DMText style for mechanics, tips, and guidance:

```javascript
new Paragraph({
  children: [new TextRun({ text: "DM GUIDANCE", bold: true, color: "2E5C8A" })]
}),
new Paragraph({
  children: [new TextRun({ text: "• Combat stats: 10 HP, needs 12+ to hit", color: "2E5C8A" })]
}),
```

## Creating Acts and Scenes

### Act Structure

Each act should contain:
1. Act heading: `# Act N: Title`
2. Estimated time
3. Multiple scenes
4. Encounter details and mechanics

### Scene Structure

Each scene should contain:
1. Scene heading: `## Scene N: Title`
2. Read-aloud text (what players see/hear)
3. DM guidance boxes with:
   - Mechanics and stats
   - How to handle different actions
   - Potential rewards
   - Clues and hooks

## Color Coding

Use these colors for consistency:

- **8B0000** (Dark Red): Main headings, adventure title
- **B8860B** (Dark Goldenrod): Subheadings
- **4B0082** (Indigo): Read-aloud text
- **2E5C8A** (Steel Blue): DM guidance text
- **654321** (Brown): Secondary headings

## Artwork Integration

### Scene Artwork
Create artwork for important scenes and place them with proper naming:

```
Artwork/
└── Stories/
    └── Your_New_Adventure/
        ├── Act 1/
        │   ├── Scene 1: The Beginning.png
        │   ├── Scene 2: The Encounter.png
        │   └── Scene 3: The Twist.png
        ├── Act 2/
        │   └── Scene 6: The Resolution.png
        └── Act 3/
            └── Scene 9: The Finale.png
```

### Using the Artwork Generator

Once your adventure is created, you can generate AI image prompts:

```bash
# Generate character artwork prompt
generate-image character --race elf --class wizard --style fantasy

# Generate scene artwork prompt (interactive)
generate-image adventure

# Select your story, act, and scene
# The generator will include NPC descriptions automatically!
```

The generator will:
1. Parse acts and scenes from your `.docx`
2. Extract NPC descriptions for visual consistency
3. Create detailed prompts for image generators (Gemini, Midjourney, etc.)
4. Save prompts to `Artwork/generated/`

## Document Generation

### Using Make (Recommended)
```bash
# Generate all stories
make docs-stories

# Or just generate this story (after cd-ing to your directory)
node adventure.js
```

### Output
Your generated `.docx` file will be created in your story directory with the same name as your output file specified in the script.

## Tips for Great Adventures

1. **Know Your Audience**: Keep mechanics simple for young players
2. **Balance Story and Combat**: Mix narrative with encounters
3. **Use NPC Variety**: Create interesting, distinct NPCs
4. **Provide Hints**: Give DMs ways to guide lost players
5. **Allow Creativity**: Suggest how to handle unexpected player actions
6. **Build to a Climax**: Make the final encounter memorable
7. **Give Rewards**: Provide meaningful rewards for completion

## Important Notes

- **NPC Descriptions are Critical**: The artwork generator relies on the NPC Descriptions section. Without it, scene prompts won't include character visual specifications.
- **Heading Format Matters**: Use the correct markdown heading levels (`#` and `##`) so the artwork generator can parse acts and scenes correctly.
- **Use Color Codes Consistently**: This helps DMs quickly identify read-aloud vs. mechanics text.
- **Test Your Content**: Run through your adventure with a group and verify the pacing and difficulty.

## Example Files

Reference these files for structure and style:
- `The_Dragons_Friends/adventure.js` - Complete adventure example
- `STORY_TEMPLATE.js` - Simplified template to get started

## Getting Help

If you have questions about:
- **JavaScript syntax**: Check the `The_Dragons_Friends/adventure.js` example
- **Text formatting**: Look at the style definitions in `STORY_TEMPLATE.js`
- **Artwork generation**: See `README.md` in the main directory
- **Document generation**: Check `Makefile` for available commands

---

**Ready to create?** Copy `STORY_TEMPLATE.js`, follow this guide, and tell an amazing story!
