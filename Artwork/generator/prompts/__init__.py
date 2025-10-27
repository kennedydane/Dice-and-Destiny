"""Prompt generation and management"""

from .base_prompts import (
    ART_STYLES,
    ART_STYLE_GUIDELINES,
    RACE_DESCRIPTIONS,
    CLASS_DESCRIPTIONS,
    CHARACTER_PROMPT_TEMPLATE,
    ADVENTURE_PROMPT_TEMPLATE,
    build_character_prompt,
    build_adventure_prompt,
)

__all__ = [
    "ART_STYLES",
    "ART_STYLE_GUIDELINES",
    "RACE_DESCRIPTIONS",
    "CLASS_DESCRIPTIONS",
    "CHARACTER_PROMPT_TEMPLATE",
    "ADVENTURE_PROMPT_TEMPLATE",
    "build_character_prompt",
    "build_adventure_prompt",
]
