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
│   ├── Stories/                     # Campaign-specific artwork
│   │   └── The_Dragons_Friends/
│   │       └── Act 1/               # Scene artwork organized by act
│   ├── generator/                   # Python CLI for generating art prompts
│   │   ├── main.py                  # CLI entry point (character, adventure, api-test)
│   │   ├── generators/              # Character and adventure prompt generators
│   │   ├── prompts/                 # Prompt templates and base styles
│   │   ├── api/                     # Gemini API client (optional)
│   │   ├── config.py                # Configuration management
│   │   └── pyproject.toml           # Python package configuration
│   └── generated/                   # Output prompts from generator
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
    ├── The_Dragons_Friends/
    │   ├── adventure.js             # Source: Adventure content
    │   ├── Adventure_The_Dragons_Friends.docx # Generated from adventure.js
    │   ├── maps.js                  # Source: Maps content
    │   └── Game_Maps.docx           # Generated from maps.js
    ├── STORY_CREATION_GUIDE.md      # Guide for creating new adventures
    └── STORY_TEMPLATE.js            # Template starter file for new adventures
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

### Makefile Automation

A `Makefile` is included to automate document generation:

```bash
# Generate all documents
make docs

# Generate specific document types
make docs-rules       # Rules and Guides only
make docs-stories     # Adventure stories only

# Clean up generated documents
make docs-clean
```

This is the recommended workflow instead of running individual `node` commands.

### Adventure Structure in Documents

Adventures use a hierarchical structure that's automatically parsed for the artwork generator:

1. **NPC Descriptions Section** (required)
   - Lists all major NPCs with role, appearance, personality, and scenes
   - Used to generate consistent character descriptions for artwork
   - Example format: See The_Dragons_Friends/adventure.js

2. **Acts** (major story divisions)
   - Format: `# Act N: Act Title`
   - Contains scenes and encounters

3. **Scenes** (specific encounters or locations)
   - Format: `## Scene N: Scene Title`
   - Contains read-aloud text and DM guidance
   - DM sections marked with blue color (color: "2E5C8A")

4. **Scene Content** (automatically parsed)
   - Read-aloud text gives narrative context
   - DM guidance provides mechanics and tips
   - Parsed to extract prompts for the artwork generator

### Version Control
- **Commit `.js` files**: These are your source of truth
- **Commit generated `.docx` files**: Include them so others can view documents without Node.js
- Use descriptive commit messages: "Update rulebook: add new spellcasting rules"
- Keep track of rule changes across related files (e.g., if you add a class, update both rulebook.js and character_sheets.js)
- For adventures: Keep `.docx` in sync with `.js` for artwork generation

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

## Artwork Generator System

### Overview

The project includes a Python-based CLI tool (`Artwork/generator/`) for generating AI image prompts for both character artwork and adventure scenes. The generator parses game documents and creates detailed prompts suitable for image generation services like Gemini, Midjourney, or Stable Diffusion.

### Key Features

- **Character Prompt Generation**: Creates prompts based on race, class, gender, and art style selections
- **Adventure Scene Prompts**: Generates scene prompts that include NPC visual descriptions for consistency
- **Dynamic Art Styles**: Supports 6 different art styles (Fantasy, Photorealistic, Cartoon, Watercolor, Concept Art, Oil Painting)
- **NPC Consistency**: Automatically extracts NPC descriptions from adventure documents to ensure consistent character rendering across scenes
- **Direct .docx Parsing**: Parses acts and scenes directly from adventure .docx files using markitdown

### Usage

```bash
# Character prompt generation (interactive)
generate-image character

# Adventure scene prompt generation (interactive)
generate-image adventure

# Character prompt with specific options
generate-image character --race elf --class wizard --gender female --style photorealistic

# Adventure prompt with specific options
generate-image adventure --story "The_Dragons_Friends" --act 1 --scene "1" --style fantasy
```

### How It Works

1. **Character Generation**:
   - User selects race, class, gender, and art style
   - Generator loads character descriptions from `base_prompts.py`
   - Creates detailed prompt with style guidelines and character specs
   - Saves prompt to `Artwork/generated/`

2. **Adventure Scene Generation**:
   - User selects story, act, scene, and art style
   - Generator parses .docx file to find acts and scenes
   - Extracts scene narrative content from the document
   - Loads NPC descriptions from the adventure
   - Creates prompt with style, NPCs, requirements, and scene description
   - Saves prompt to `Artwork/generated/`

### Development Notes

- **Main CLI**: `Artwork/generator/main.py`
- **Character Generator**: `Artwork/generator/generators/character_generator.py`
- **Adventure Generator**: `Artwork/generator/generators/adventure_generator.py`
- **Prompt Templates**: `Artwork/generator/prompts/base_prompts.py`
- **Configuration**: `Artwork/generator/config.py`

When modifying prompts or adding features, update the relevant files in the generator directory and regenerate prompts to test changes.

## Common Tasks

### Adding a New Adventure Module

1. **Read the guide**: Check `Stories/STORY_CREATION_GUIDE.md` for detailed instructions
2. **Use the template**: Copy `Stories/STORY_TEMPLATE.js` as your starting point
3. Create new directory in `Stories/` (e.g., `Stories/The_New_Adventure/`)
4. Create your adventure `.js` file (e.g., `adventure.js`) - use STORY_TEMPLATE.js as reference
5. Create your maps `.js` file (e.g., `maps.js`)
6. **Important**: Include an "NPC Descriptions" section that lists all major NPCs with:
   - Role in the adventure
   - Physical appearance (for artwork consistency)
   - Personality and behavior
   - Which scenes they appear in
7. Structure acts and scenes with proper markdown headings:
   - `# Act N: Title` for act headings
   - `## Scene N: Title` for scene headings
8. Generate documents: `make docs-stories` or `node adventure.js && node maps.js`
9. Create corresponding artwork directory (e.g., `Artwork/Stories/The_New_Adventure/`)
10. Organize scene artwork by act (e.g., `Artwork/Stories/The_New_Adventure/Act 1/`, `Act 2/`)
11. Name scene artwork descriptively (e.g., `Act 1 Scene 1.png`, `Act 1 Scene 2.png`)
12. Commit the `.js` files and generated `.docx` files

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
