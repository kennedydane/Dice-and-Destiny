# Dice and Destiny

A custom tabletop role-playing game (TRPG) system featuring comprehensive rules, extensive character artwork, and modular adventure campaigns.

## Overview

Dice and Destiny is a complete TRPG system designed for fantasy gameplay. It includes:

- **Core Rules**: A beginner-friendly rulebook with mechanics for character creation and gameplay
- **Character System**: 6 playable races and 8 character classes with 72 unique character portraits
- **Game Materials**: Character sheets, guides, and reference materials for players
- **Adventures**: Modular campaign modules including maps and encounter design
- **Artwork**: Professional character portraits and scene illustrations

## Getting Started

### For New Players

Start with **Getting_Started_Guide.docx** in the `Rules_and_Guides/` directory. This guide will introduce you to:
- Core concepts and how to play
- Character creation process
- Basic rules and mechanics

### For Game Masters (DMs)

1. Read **Beginners_Rulebook.docx** for complete rules
2. Review **Game_Maps.docx** in `Stories/The_Dragons_Friends/` for encounter layouts
3. Use **Adventure_The_Dragons_Friends.docx** to run your first campaign
4. Print or digitally distribute **Character_Sheets.docx** to your players

### For Content Creators

Refer to **Character_Art_Guide.docx** if you're expanding the game with new content or creating additional character artwork.

## Project Structure

```
Dice-and-Destiny/
├── Artwork/
│   ├── Characters/               # Character portraits organized by race
│   │   ├── Dwarf/
│   │   ├── Elf/
│   │   ├── Gnome/
│   │   ├── Half Elf/
│   │   ├── Halfling/
│   │   └── Human/
│   └── Stories/                  # Campaign-specific artwork
│       └── The_Dragons_Friends/
│           └── Act 1/            # Scene artwork organized by act
│
├── Rules_and_Guides/
│   ├── rulebook.js               # Source file for Beginners Rulebook
│   ├── Beginners_Rulebook.docx   # Generated from rulebook.js
│   ├── character_art.js          # Source file for Character Art Guide
│   ├── Character_Art_Guide.docx  # Generated from character_art.js
│   ├── character_sheets.js       # Source file for Character Sheets
│   ├── Character_Sheets.docx     # Generated from character_sheets.js
│   ├── getting_started.js        # Source file for Getting Started Guide
│   └── Getting_Started_Guide.docx # Generated from getting_started.js
│
└── Stories/
    └── The_Dragons_Friends/      # First campaign module
        ├── adventure.js          # Source file for adventure
        ├── Adventure_The_Dragons_Friends.docx # Generated from adventure.js
        ├── maps.js               # Source file for maps
        └── Game_Maps.docx        # Generated from maps.js
```

## Game System

### Character Races
- Human
- Dwarf
- Elf
- Gnome
- Half-Elf
- Halfling

### Character Classes
- Barbarian
- Cleric
- Druid
- Paladin
- Ranger
- Rogue
- Warrior
- Wizard

### Character Artwork
The `Artwork/Characters/` directory contains 72 unique character portraits covering all race and class combinations, with both male and female variants for visual representation and character inspiration.

## Documents Guide

### Beginners_Rulebook.docx
The core rules document containing all mechanics needed to play Dice and Destiny. Covers character creation, combat, skills, spellcasting, and core gameplay loops.

### Getting_Started_Guide.docx
An introductory guide for new players. Perfect for first-time TRPG players, covering basic concepts before diving into full rules.

### Character_Art_Guide.docx
Reference guide for character creation, including descriptions of races and classes with visual guides using the character artwork.

### Character_Sheets.docx
Blank character sheets ready to print or fill digitally. One sheet per character with sections for attributes, skills, equipment, and notes.

### The_Dragons_Friends Campaign
Located in `Stories/The_Dragons_Friends/`:
- **Adventure_The_Dragons_Friends.docx**: Complete adventure module with story, encounters, and NPCs
- **Game_Maps.docx**: Tactical maps, town layouts, and dungeon designs

## How to Use This Repository

### Playing the Game
1. Print or digitally open the **Getting Started Guide** and **Rulebook**
2. Have each player print or open a **Character Sheet**
3. Create characters using the **Character Art Guide** for inspiration
4. Download character portraits from `Artwork/Characters/` for reference

### Running an Adventure
1. Read **The Dragons Friends** adventure module
2. Prepare maps from **Game_Maps.docx**
3. Review artwork in `Artwork/` for atmosphere and scene descriptions
4. Prepare NPCs, encounters, and story beats

### Expanding the Game
- Add new adventures in the `Stories/` directory following the same structure
- Create additional character artwork in `Artwork/Characters/` following the race/class organization
- Add scene artwork to `Artwork/Act 1/` or create new act directories as your campaign progresses

## Document Generation Workflow

All `.docx` game documents are **programmatically generated** from JavaScript source files using the Node.js `docx` library. This ensures consistency, version control, and maintainability.

### Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. This installs the `docx` package needed to generate documents.

### Document Source Files & Generation

| JavaScript File | Generates | Location |
|---|---|---|
| `rulebook.js` | Beginners_Rulebook.docx | Rules_and_Guides/ |
| `character_sheets.js` | Character_Sheets.docx | Rules_and_Guides/ |
| `character_art.js` | Character_Art_Guide.docx | Rules_and_Guides/ |
| `getting_started.js` | Getting_Started_Guide.docx | Rules_and_Guides/ |
| `adventure.js` | Adventure_The_Dragons_Friends.docx | Stories/The_Dragons_Friends/ |
| `maps.js` | Game_Maps.docx | Stories/The_Dragons_Friends/ |

### Editing Documents

**Important**: Edit the `.js` files, NOT the `.docx` files. The `.docx` files are generated outputs.

#### Workflow:
1. **Edit** the JavaScript source file (e.g., `rulebook.js`)
2. **Generate** the document by running: `node filename.js`
3. **Verify** the output `.docx` file looks correct
4. **Commit** the `.js` file to version control

#### Example - Editing the Rulebook:

```bash
# Edit the source file
nano Rules_and_Guides/rulebook.js

# Generate the updated document
node Rules_and_Guides/rulebook.js

# Verify the output
# (Check that Rules_and_Guides/Beginners_Rulebook.docx was updated)

# Commit your changes
git add Rules_and_Guides/rulebook.js
git commit -m "Update rulebook: add new class ability"
```

#### Example - Generating All Documents:

```bash
# Navigate to Rules_and_Guides
cd Rules_and_Guides
node rulebook.js
node character_sheets.js
node character_art.js
node getting_started.js

# Navigate to Stories/The_Dragons_Friends
cd ../Stories/The_Dragons_Friends/
node adventure.js
node maps.js
```

### File Formats

- **Source Files**: JavaScript (.js)
  - Contains the source of truth for game content
  - Edit these files to make changes
  - Use `node filename.js` to generate the corresponding `.docx`

- **Generated Documents**: Microsoft Word format (.docx)
  - Automatically generated from `.js` files
  - Do not edit directly (changes will be lost on next generation)
  - Open with Microsoft Word, Google Docs, LibreOffice, or compatible applications

- **Artwork**: PNG format (.png)
  - Ready for digital display and printing

## Contributing

If you're expanding Dice and Destiny with new content:

1. **New Adventures**: Create a new directory in `Stories/` with adventure and map documents
2. **Character Artwork**: Add to `Artwork/Characters/` following the race/class naming convention
3. **Scene Artwork**: Add to `Artwork/Act 1/` (or new act directories) with descriptive names
4. **Documentation**: Update relevant guides if rules or mechanics change

See `CLAUDE.md` for detailed development guidelines and content consistency practices.

## License

Dice and Destiny is a custom TRPG system. All content is included in this repository.

## Support

For questions about rules, character creation, or running adventures, refer to the relevant guide document or consult the comprehensive rulebook.

---

**Ready to play?** Start with the Getting Started Guide and gather your friends for an adventure in the world of Dice and Destiny!
