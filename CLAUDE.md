# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Dice and Destiny** is a custom tabletop role-playing game (TRPG) system featuring:
- Comprehensive rulebooks and player guides
- Modular adventure modules with maps
- Extensive character artwork (72 character portraits covering all race/class combinations)
- Game materials and character sheets

This is a **content and design project**, not a software application. All files are documents (.docx) and visual assets (PNG images).

## Repository Structure

```
Dice-and-Destiny/
├── Artwork/                          # Visual game assets
│   ├── Characters/                  # Character portraits by race
│   │   ├── Dwarf/, Elf/, Gnome/
│   │   ├── Half Elf/, Halfling/
│   │   └── Human/
│   └── Stories/                     # Campaign-specific artwork
│       └── The_Dragons_Friends/
│           └── Act 1/               # Scene artwork organized by act
│
├── Rules_and_Guides/                # Core game documentation (source + generated)
│   ├── rulebook.js                  # Source: Rulebook content
│   ├── Beginners_Rulebook.docx      # Generated from rulebook.js
│   ├── character_art.js             # Source: Character Art Guide content
│   ├── Character_Art_Guide.docx     # Generated from character_art.js
│   ├── character_sheets.js          # Source: Character Sheets content
│   ├── Character_Sheets.docx        # Generated from character_sheets.js
│   ├── getting_started.js           # Source: Getting Started Guide content
│   └── Getting_Started_Guide.docx   # Generated from getting_started.js
│
└── Stories/                         # Adventure modules (source + generated)
    └── The_Dragons_Friends/
        ├── adventure.js             # Source: Adventure content
        ├── Adventure_The_Dragons_Friends.docx # Generated from adventure.js
        ├── maps.js                  # Source: Maps content
        └── Game_Maps.docx           # Generated from maps.js
```

**Note**: JavaScript `.js` files are the source of truth. `.docx` files are generated outputs.

## Game System Design

### Character Options
- **Races**: Human, Dwarf, Elf, Gnome, Half-Elf, Halfling (6 total)
- **Classes**: Barbarian, Cleric, Druid, Paladin, Ranger, Rogue, Warrior, Wizard (8 total)
- **Character Art**: 72 portraits (current race/class combinations, male/female variants) - note: artwork is not yet updated for all 8 classes

### Content Organization
1. **Rules_and_Guides**: Primary game rules and reference documents
   - Rulebook contains core mechanics
   - Character Art Guide explains race/class options
   - Character Sheets provide blank templates for gameplay
   - Getting Started Guide is entry point for new players

2. **Artwork**: Visual assets organized by context
   - Character artwork: Indexed by race, covering all playable combinations
   - Story artwork: Campaign-specific scene artwork
     - Organized by campaign name (e.g., `The_Dragons_Friends/`)
     - Further organized by act (e.g., `Act 1/`, `Act 2/`)
     - Scene artwork files named descriptively (e.g., `Act 1 Scene 1.png`)

3. **Stories**: Campaign modules with adventures and maps
   - "The Dragons Friends" is the primary campaign
   - Includes detailed maps for encounters and exploration

## Development Notes

### Document Generation System

**All `.docx` game documents are programmatically generated from JavaScript source files.** This is the source of truth - NOT the Word documents.

#### How It Works

Each document has a corresponding JavaScript file that uses the Node.js `docx` library to generate the Word document:

| JavaScript File | Generates | Location |
|---|---|---|
| `rulebook.js` | Beginners_Rulebook.docx | Rules_and_Guides/ |
| `character_sheets.js` | Character_Sheets.docx | Rules_and_Guides/ |
| `character_art.js` | Character_Art_Guide.docx | Rules_and_Guides/ |
| `getting_started.js` | Getting_Started_Guide.docx | Rules_and_Guides/ |
| `adventure.js` | Adventure_The_Dragons_Friends.docx | Stories/The_Dragons_Friends/ |
| `maps.js` | Game_Maps.docx | Stories/The_Dragons_Friends/ |

### Editing Documents: The Correct Workflow

**IMPORTANT**: Always edit the `.js` files, NEVER the `.docx` files directly.

#### Step-by-Step Process

1. **Identify the source file**: Determine which `.js` file generates the document you want to edit
2. **Edit the JavaScript file**: Modify the content, styles, or structure in the `.js` file
3. **Generate the document**: Run `node filename.js` to create/update the `.docx`
4. **Verify the output**: Open the generated `.docx` to confirm changes look correct
5. **Commit the changes**: Only commit the `.js` file to git, NOT the `.docx` file

#### Example: Updating the Rulebook

```bash
# 1. Edit the source file
nano Rules_and_Guides/rulebook.js

# 2. Generate the updated document
node Rules_and_Guides/rulebook.js

# 3. Verify it was created/updated
ls -la Rules_and_Guides/Beginners_Rulebook.docx

# 4. Commit only the source file
git add Rules_and_Guides/rulebook.js
git commit -m "Update rulebook: add Paladin class abilities"
```

#### Why This Approach?

- **Version Control**: The `.js` files are human-readable and track changes clearly in git
- **Consistency**: Ensures all documents follow the same structure and styling
- **Maintainability**: Changes in one place propagate to the generated document
- **No Duplication**: Content lives in one place - the source `.js` file

### Editing the JavaScript Files

When working with the `.js` files:

1. **Content**: Modify the text within `new TextRun()` and `new Paragraph()` calls
2. **Styling**: Adjust colors, fonts, sizes in the style definitions at the top
3. **Structure**: Tables, headings, and layout use the `docx` library API
4. **Colors**: Uses hex color codes (e.g., "8B4513" for brown)

Each file contains:
- Style definitions (fonts, colors, spacing)
- Document structure (sections, paragraphs, tables)
- Content (the actual game text)

### Managing Artwork
- Character artwork should follow the established visual style
- Scene artwork should be consistent with the tone and setting of acts
- PNG format preferred for web compatibility
- Consider both digital display and print quality

### Version Control
- **Commit `.js` files**: These are your source of truth
- **Don't commit `.docx` files**: These are generated outputs (update them locally, regenerate as needed)
- Use descriptive commit messages: "Update rulebook: add new spellcasting rules"
- Keep track of rule changes across related files (e.g., if you add a class, update both rulebook.js and character_sheets.js)

### Content Consistency
When updating rules or mechanics:
1. Update the primary rulebook (rulebook.js)
2. Regenerate: `node Rules_and_Guides/rulebook.js`
3. Check if Character Art Guide needs updates (character_art.js)
4. Verify adventure modules align with current rules (adventure.js)
5. Update character sheets if mechanics change (character_sheets.js)
6. Update Getting Started Guide if onboarding changes (getting_started.js)
7. Regenerate all affected documents
8. Commit all modified `.js` files

### Art Asset Naming Convention
Character portraits follow the pattern:
```
[Race]/[Class]_[Gender]_[variations].png
```

Example: `Human/Warrior_Male.png`, `Elf/Wizard_Female.png`

Ensure new artwork adheres to this convention for easy identification and organization.

## Common Tasks

### Adding a New Adventure Module

1. Create new directory in `Stories/` (e.g., `Stories/The_New_Adventure/`)
2. Create main adventure `.js` source file (e.g., `adventure.js`)
3. Create maps `.js` source file (e.g., `maps.js`)
4. Generate documents by running: `node adventure.js` and `node maps.js`
5. Create corresponding artwork directory (e.g., `Artwork/Stories/The_New_Adventure/`)
6. Organize scene artwork by act (e.g., `Artwork/Stories/The_New_Adventure/Act 1/`, `Act 2/`)
7. Name scene artwork descriptively (e.g., `Act 1 Scene 1.png`, `Act 1 Scene 2.png`)
8. Commit the `.js` files (not the `.docx` files)

### Updating Game Rules

1. **Edit the source**: Open `Rules_and_Guides/rulebook.js` and make changes
2. **Generate**: Run `node Rules_and_Guides/rulebook.js`
3. **Update related files** (all as `.js` files):
   - Character Art Guide (`character_art.js`) if adding/modifying races or classes
   - Character Sheets (`character_sheets.js`) if mechanics affecting characters change
   - Getting Started Guide (`getting_started.js`) if onboarding changes
   - Adventure modules (`adventure.js`) to ensure alignment
4. **Regenerate all affected**: Run `node` for each modified `.js` file
5. **Verify consistency**: Open the generated `.docx` files to confirm changes
6. **Test** with existing adventures for compatibility
7. **Commit** only the modified `.js` files

### Adding Character Artwork

1. Create/place artwork in appropriate race directory under `Artwork/Characters/`
2. Follow established visual style and naming convention
3. Include both male and female variants for new classes
4. Consider quality for both digital display and print
5. Commit with artwork description
6. **Note**: Character artwork is separate from the document generation system - add artwork directly to git

## Git Configuration

- **Remote**: git@github.com:kennedydane/Dice-and-Destiny.git
- **Default Branch**: main
- **Current Status**: Content-based project with modular documentation

---

*This CLAUDE.md focuses on the unique aspects of this TRPG design project. Refer to this when managing rules, artwork, and adventure content.*
