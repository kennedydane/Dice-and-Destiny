# Dice and Destiny Artwork Generator

A command-line tool for generating AI image prompts (and optionally images) for **Dice and Destiny** character art and adventure scene artwork.

## Features

- 🎨 **Character Art Generation**: Create prompts for character portraits based on race, class, and gender
- 🗺️ **Adventure Scene Generation**: Create prompts for story locations and environments
- ✏️ **Prompt Editing**: Review and customize prompts before generation
- 🤖 **Gemini API Integration**: Optional direct image generation (fallback to prompt-only mode)
- 📁 **Organized Output**: Automatically saves prompts to appropriate directories
- 🎯 **Consistent Style**: All prompts include professional art style guidelines

## Quick Start

### Installation

1. **Install Python 3.10+**
   - Download from [python.org](https://www.python.org/)

2. **Navigate to the generator directory**
   ```bash
   cd Artwork/generator
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

### Generate Character Art Prompt

```bash
python -m generator character --race human --class warrior --gender male
```

Or let the CLI prompt you:
```bash
python -m generator character
```

### Generate Adventure Scene Prompt

```bash
python -m generator adventure --story "The Dragons Friends" --act 1 --scene "Whispering Woods"
```

### Edit Prompt Before Generation

Add `--edit` flag to review and customize the prompt:
```bash
python -m generator character --race elf --class wizard --gender female --edit
python -m generator adventure --story "The Dragons Friends" --act 1 --scene "Village Square" --edit
```

## Setup: Gemini API (Optional)

To enable direct image generation with Google Gemini API:

### Get Your API Key

1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Create API Key"
3. Copy your API key

### Configure Environment Variable

**Linux/macOS:**
```bash
export GEMINI_API_KEY="your-api-key-here"
```

**Windows (Command Prompt):**
```cmd
set GEMINI_API_KEY=your-api-key-here
```

**Windows (PowerShell):**
```powershell
$env:GEMINI_API_KEY="your-api-key-here"
```

### Test the Connection

```bash
python -m generator api-test
```

## Commands

### `generator character`

Generate a character art prompt.

**Options:**
- `--race RACE` - Character race: human, elf, dwarf, gnome, half-elf, halfling
- `--class CLASS` - Character class: warrior, wizard, cleric, rogue, druid, barbarian, paladin, ranger
- `--gender GENDER` - Character gender: male, female, neutral (default: neutral)
- `--edit` - Open editor to customize prompt before generation

**Examples:**
```bash
# Interactive prompts
python -m generator character

# Specify everything
python -m generator character --race dwarf --class cleric --gender male

# Edit before generation
python -m generator character --race elf --class ranger --gender female --edit
```

### `generator adventure`

Generate an adventure scene artwork prompt.

**Options:**
- `--story STORY` - Adventure story name
- `--act ACT` - Act number (integer)
- `--scene SCENE` - Scene identifier
- `--npc NPC` - Optional NPC type to include (e.g., "merchant", "guard")
- `--edit` - Open editor to customize prompt before generation

**Examples:**
```bash
# Interactive prompts
python -m generator adventure

# Specify everything
python -m generator adventure --story "The Dragons Friends" --act 1 --scene "Scene_1" --npc "farmer"

# Edit before generation
python -m generator adventure --story "The Dragons Friends" --act 2 --scene "Scene_6" --edit
```

#### Adventure Scene Content Extraction

The adventure generator automatically extracts scene content from the story's `.docx` file to create rich, detailed prompts:

1. **Story .docx file** - Created by running the story's `.js` file (e.g., `adventure.js`)
2. **Scene Detection** - Generator identifies Act/Scene directories in the story folder
3. **Content Extraction** - Automatically converts the `.docx` to markdown and extracts the read-aloud narrative for each scene
4. **Prompt Enrichment** - Actual scene descriptions are used instead of generic placeholders

This means adventure prompts automatically include rich narrative context directly from your game documents!

### `generator api-test`

Test connection to Gemini API.

```bash
python -m generator api-test
```

## Art Style Guidelines

All prompts include professional art style guidelines to ensure visual consistency:

- **Style**: Fantasy illustration with digital painting aesthetic
- **Resolution**: 512x512 pixels minimum, high DPI for print
- **Aspect Ratio**: 1:1 square format (portrait)
- **Quality**: High detail, painterly texture, professional finishing
- **Composition**: Character-centered, expressive faces, dynamic lighting

These guidelines are defined in `prompts/base_prompts.py` and derived from game system specifications in `Rules_and_Guides/character_art.js`.

## Output Files

### Generated Prompts

Prompts are saved as `.txt` files in the `generated/` folder:

**Character prompts:**
```
generated/human_warrior_male_prompt.txt
generated/elf_wizard_female_prompt.txt
```

**Adventure prompts:**
```
generated/the_dragons_friends_act1_windmill_prompt.txt
```

### Generated Images (if API enabled)

Images are saved alongside prompts with `.png` extension:
```
generated/human_warrior_male_prompt.png
```

## Usage Workflow

### Without API (Prompt Generation Mode)

1. Run generator command
2. Review displayed prompt
3. Optionally edit with `--edit` flag
4. Prompt is saved to file
5. Copy prompt text to:
   - [Gemini in Browser](https://aistudio.google.com/)
   - Gemini Nano Banana
   - Your preferred image generator

### With API (Full Auto Generation)

1. Configure `GEMINI_API_KEY`
2. Run generator command
3. Review displayed prompt
4. Optionally edit with `--edit` flag
5. Choose to generate image via API
6. Image saved automatically

## Supported Races

- Human
- Elf
- Dwarf
- Gnome
- Half-Elf
- Halfling

## Supported Classes

- Warrior
- Wizard
- Cleric
- Rogue
- Druid
- Barbarian
- Paladin
- Ranger

## Troubleshooting

### "Project root not found"

Make sure you're running the generator from within the Dice-and-Destiny project structure.

### "GEMINI_API_KEY not set"

This is expected - you'll use prompt generation mode. To enable image generation:
1. Get API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Set environment variable (see Setup section)

### "Story/Act/Scene not found"

The generator looks for adventure definitions in the `Stories/` directory. Make sure:
- Story directories exist in `Stories/`
- Act directories are named `Act 1`, `Act 2`, etc.
- Scene directories exist within act directories

## Project Structure

```
Artwork/
├── generator/                 # This tool
│   ├── __init__.py
│   ├── __main__.py           # Entry point
│   ├── main.py               # CLI commands
│   ├── config.py             # Configuration management
│   ├── generators/           # Prompt generation logic
│   │   ├── character_generator.py
│   │   └── adventure_generator.py
│   ├── prompts/              # Prompt templates
│   │   ├── base_prompts.py
│   │   └── __init__.py
│   ├── api/                  # API clients
│   │   ├── gemini_client.py
│   │   └── __init__.py
│   ├── requirements.txt       # Python dependencies
│   └── README.md             # This file
├── generated/                # Output directory for prompts and images
└── Characters/               # Character art (existing)
```

## Environment Variables

- `GEMINI_API_KEY` - Google Gemini API key for image generation
- `LOG_LEVEL` - Logging level (default: INFO)

## Development

### Running Tests

```bash
pytest tests/
```

### Code Formatting

```bash
black generator/
```

### Linting

```bash
pylint generator/
```

## Known Limitations

1. **Image Generation**: Requires Gemini API key; defaults to prompt generation
2. **Story/Act/Scene Discovery**: Currently finds directories; full adventure metadata support coming soon
3. **Prompt Customization**: Limited to CLI inline editing; future versions will support templates

## Future Enhancements

- [ ] Full adventure.js metadata integration
- [ ] Batch generation (multiple characters at once)
- [ ] Template system for custom prompts
- [ ] Web UI for easier generation
- [ ] Image post-processing options
- [ ] Prompt history and variations
- [ ] Integration with image upscaling services

## Contributing

To contribute improvements:

1. Make changes to generator code
2. Test thoroughly
3. Update documentation
4. Submit pull request

## License

Part of the Dice and Destiny project. All content and code is included in the main repository.

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the generated prompts for correctness
3. Refer to main project README at `../../README.md`

---

**Ready to generate amazing artwork?** Run `python -m generator character` to get started!
