"""
Base Prompts and Style Guidelines

This module defines the art style guidelines and prompt templates used by the
Artwork Generator to create consistent, high-quality prompts for image generation.

The style guidelines are based on specifications from Rules_and_Guides/character_art.js
"""

# ============================================================================
# ART STYLE GUIDELINES
# ============================================================================
# These guidelines are prepended to all image generation prompts to ensure
# visual consistency across all generated artwork.

ART_STYLE_GUIDELINES = """
STYLE GUIDELINES FOR ALL GENERATED ARTWORK:
- Fantasy illustration style with digital painting aesthetic
- Professional character design with expressive features
- Warm, rich color palette with natural lighting
- High-quality, detailed artwork suitable for both digital display and print
- 1:1 square aspect ratio (portrait format)
- PNG format with transparency where appropriate
- High detail, painterly texture, professional finishing

For all characters:
- Full-body portrait, character centered and prominent
- Simple, non-distracting background that complements the character
- Detailed armor, robes, and accessories as specified
- Clear facial expression showing personality and emotion
- Dynamic lighting with warm highlights and soft shadows for depth
- Maintain consistent art style - all characters should feel part of the same game world
- Gender expression: Male characters should have masculine features, female characters feminine features
"""

# ============================================================================
# CHARACTER RACE DESCRIPTIONS
# ============================================================================
# Used when generating character art prompts

RACE_DESCRIPTIONS = {
    "human": {
        "appearance": "Look like regular people. Can have any hair color, any skin color, any eye color. Very diverse.",
        "features": "Determined expression showing adaptability and versatility"
    },
    "elf": {
        "appearance": "Tall and graceful. Usually slim. Fair skin (can be pale or golden). Hair is often blonde, silver, or black.",
        "features": "POINTY EARS! Large, beautiful eyes. Often have elegant clothes"
    },
    "dwarf": {
        "appearance": "Short but VERY sturdy and strong! Stocky build with broad shoulders.",
        "features": "Often have beards (even young dwarves can have braided beards!). Love wearing metal decorations"
    },
    "gnome": {
        "appearance": "Very tiny! Even shorter than dwarves. Mischievous and curious looking.",
        "features": "Often have wild, colorful hair. Big nose. Tinkerer tools in pockets. Cheerful expressions"
    },
    "half_elf": {
        "appearance": "Mix between human and elf! Medium height. Various skin tones.",
        "features": "Slightly pointed ears (not as long as elves). Can have any hair color. Friendly appearance"
    },
    "halfling": {
        "appearance": "Small and cheerful! About gnome-sized but more like tiny humans.",
        "features": "Curly hair on head AND on the top of their bare feet! Round, happy faces. Always smiling"
    }
}

# ============================================================================
# CHARACTER CLASS DESCRIPTIONS
# ============================================================================
# Used when generating character art prompts

CLASS_DESCRIPTIONS = {
    "warrior": {
        "overall": "Strong and heroic! Warriors stand tall and look brave. They wear shiny armor that protects them.",
        "clothing": "Metal chest plate (silver or bronze), arm guards, shoulder pads, sturdy boots, optional cape (red, blue, or any color)",
        "weapons": "Shiny sharp-looking sword, shield (round or rectangle with symbol)",
        "face": "Brave and determined! Maybe has a confident smile. Can have any hair color and style.",
        "details": "Shield symbol (star, lion, eagle), belt with pouches, battle scars or bandages",
        "colors": "Silver or bronze armor, red or blue cape, brown leather boots and belt"
    },
    "wizard": {
        "overall": "Mystical and magical! Wizards look wise and mysterious. They have flowing robes and magical sparkles around them.",
        "clothing": "Long, flowing robes (purple, blue, or starry pattern), pointed wizard hat with stars or moons, wide sleeves, comfortable shoes or sandals",
        "weapons": "Magic staff (tall wooden staff with crystal on top), spell book, magic wand (optional)",
        "face": "Smart and thoughtful! Maybe wearing glasses. Can have long hair or short hair.",
        "details": "Magical sparkles or stars floating around them, familiar pet (owl, cat, or mouse), glowing crystal on the staff, pouches full of spell components",
        "colors": "Purple or blue robes with silver stars, brown wooden staff, glowing crystals in blue or white"
    },
    "cleric": {
        "overall": "Kind and healing! Clerics look warm and friendly. They have a gentle glow of holy light around them.",
        "clothing": "White, gold, or light blue robes, chain mail armor underneath, holy symbol necklace (sun, star, heart), comfortable traveling boots",
        "weapons": "Mace or hammer (simple but effective), holy symbol (glows when healing), healer's bag with bandages",
        "face": "Warm smile! Looks caring and trustworthy. Eyes that sparkle with kindness.",
        "details": "Golden aura or sparkles when casting healing spells, prayer beads on bracelet, flowers or vines growing on staff, bandages wrapped around one arm",
        "colors": "White or cream robes with gold trim, silver chain mail, golden holy symbol"
    },
    "rogue": {
        "overall": "Sneaky and quick! Rogues look mysterious and agile. They move silently like cats!",
        "clothing": "Dark, fitted clothes (black, dark green, or dark purple), leather armor (quiet and flexible), hood or mask (for sneaking), soft boots (for silent steps), fingerless gloves",
        "weapons": "Twin daggers (small and sharp), lockpicks in a small case, grappling hook and rope, throwing stars (optional)",
        "face": "Clever smirk! Quick eyes that notice everything. Maybe has a small scar that shows they're experienced.",
        "details": "Multiple pouches on belt full of tools, flowing scarf or cape, shadow effects around their feet, a lucky coin or charm",
        "colors": "Black or dark purple clothes, brown leather armor, silver daggers"
    },
    "druid": {
        "overall": "Natural and wild! Druids look like they belong in the forest. Animals and plants are their friends!",
        "clothing": "Earth-colored robes (green, brown, or tan), leather armor made from tree bark, flower crown or wreath of leaves, bare feet or simple sandals, vine or bracelet accessories",
        "weapons": "Wooden staff with growing vines, sickle or curved knife, pouch of seeds and herbs",
        "face": "Peaceful and wise! Connected to nature. Maybe has leaves or flowers in their hair.",
        "details": "Small animals following them (birds, squirrels, butterflies), flowers growing from their staff, leaf patterns on their clothes, glowing green eyes when using nature magic",
        "colors": "Green, brown, and tan clothes, brown wooden staff, colorful flowers, golden sunlight effects"
    },
    "barbarian": {
        "overall": "Wild and powerful! Barbarians are big, strong, and fierce! But they're good-hearted heroes.",
        "clothing": "Fur vest or animal skin armor, tribal patterns or tattoos (can be drawn on arms), leather pants or kilt, heavy boots with fur trim, optional war paint on face",
        "weapons": "HUGE double-bladed axe (bigger than a normal axe!), club or hammer (backup weapon)",
        "face": "Fierce but friendly! Big smile when happy. Looks tough but has a soft heart. Wild, messy hair!",
        "details": "Red glow in eyes when RAGING, trophies from adventures (teeth, claws on necklace), muscles showing they're super strong, battle scars",
        "colors": "Brown fur and leather, red or orange war paint, silver axe blade, dark messy hair"
    },
    "paladin": {
        "overall": "Noble and radiant! Paladins are holy warriors who shine with divine light. They look heroic and honorable.",
        "clothing": "Shining plate armor (silver or gold colored), white or gold cape with holy symbols, polished metal boots and gauntlets, holy symbol tabard or surcoat over armor",
        "weapons": "Blessed sword (glows with holy light), holy shield with sacred emblems (sun, star, etc.)",
        "face": "Noble and determined! Kind eyes that show courage. Clean and well-groomed appearance.",
        "details": "Golden aura or halo when using divine powers, holy symbols engraved on armor, white or golden light radiating from shield, oath scroll or sacred text at their belt",
        "colors": "Silver or gold armor, white cape with gold trim, glowing golden or white holy light effects"
    },
    "ranger": {
        "overall": "Rugged and alert! Rangers are skilled wilderness scouts who blend into nature. They look ready for adventure!",
        "clothing": "Forest-colored clothes (green, brown, tan), light leather armor (quiet and flexible), hooded cloak or camouflage cape, sturdy traveling boots, quiver of arrows on back",
        "weapons": "Longbow (elegant wooden bow), quiver full of feathered arrows, hunting knife or short sword, tracking tools (compass, rope, map)",
        "face": "Alert and observant! Sharp eyes that notice everything. Often has windswept hair from outdoor life.",
        "details": "Animal companion (hawk, wolf, or fox), leaves or feathers decorating equipment, camouflage face paint, tracks or pawprints on their boots (from hiking)",
        "colors": "Forest green and brown clothes, tan leather armor, brown wooden bow, green cloak"
    }
}

# ============================================================================
# CHARACTER ART PROMPT TEMPLATE
# ============================================================================

CHARACTER_PROMPT_TEMPLATE = """
{style_guidelines}

Create a professional fantasy character portrait of a {gender} {race} {class_name}:

RACE CHARACTERISTICS:
{race_description}

CLASS CHARACTERISTICS:
{class_description}

Additional Requirements:
- The character should embody both their race's features and their class's profession
- Include all distinctive weapons, armor, and accessories for this class
- The character should look confident and capable in their role
- Add interesting details that suggest their personality and experience
- Ensure the background complements the character without overwhelming them

Generate a high-quality fantasy illustration that brings this character to life!
"""

# ============================================================================
# ADVENTURE SCENE PROMPT TEMPLATE
# ============================================================================

ADVENTURE_PROMPT_TEMPLATE = """
{style_guidelines}

Create a fantasy scene illustration for a tabletop RPG adventure:

SCENE DESCRIPTION:
{scene_description}

IMPORTANT REQUIREMENTS:
- NO adventurer player characters in the scene
- Focus on the environment, NPCs, and atmosphere
- Suitable for a fantasy adventure for young players (ages 5-8)
- Include any mentioned NPCs, creatures, or key objects
- Create an immersive, magical atmosphere

Generate a high-quality fantasy scene that sets the mood for this adventure location!
"""

# ============================================================================
# UTILITIES
# ============================================================================

def build_character_prompt(race: str, class_name: str, gender: str = "a") -> str:
    """
    Build a complete character art prompt with style guidelines.

    Args:
        race: Character race (human, elf, dwarf, gnome, half_elf, halfling)
        class_name: Character class (warrior, wizard, cleric, rogue, druid, barbarian, paladin, ranger)
        gender: Character gender (male, female, neutral) - defaults to "a" for art variety

    Returns:
        Complete formatted prompt for image generation
    """
    if race.lower() not in RACE_DESCRIPTIONS:
        raise ValueError(f"Unknown race: {race}")
    if class_name.lower() not in CLASS_DESCRIPTIONS:
        raise ValueError(f"Unknown class: {class_name}")

    race_key = race.lower()
    class_key = class_name.lower()

    race_desc = RACE_DESCRIPTIONS[race_key]
    class_desc = CLASS_DESCRIPTIONS[class_key]

    # Format race characteristics
    race_text = f"""
{race.title()} Features:
- {race_desc['appearance']}
- {race_desc['features']}
"""

    # Format class characteristics
    class_text = f"""
{class_name.title()} ({class_key.upper()}):
- Overall Look: {class_desc['overall']}
- Clothing: {class_desc['clothing']}
- Weapons/Tools: {class_desc['weapons']}
- Face & Expression: {class_desc['face']}
- Special Details: {class_desc['details']}
- Color Suggestions: {class_desc['colors']}
"""

    prompt = CHARACTER_PROMPT_TEMPLATE.format(
        style_guidelines=ART_STYLE_GUIDELINES,
        gender=gender,
        race=race.title(),
        class_name=class_name.title(),
        race_description=race_text,
        class_description=class_text
    )

    return prompt


def build_adventure_prompt(scene_description: str) -> str:
    """
    Build a complete adventure scene prompt with style guidelines.

    Args:
        scene_description: Detailed description of the scene to generate

    Returns:
        Complete formatted prompt for image generation
    """
    prompt = ADVENTURE_PROMPT_TEMPLATE.format(
        style_guidelines=ART_STYLE_GUIDELINES,
        scene_description=scene_description
    )

    return prompt
