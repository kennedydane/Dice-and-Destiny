"""
Character Art Generator

Handles generation of character art prompts based on race, class, and gender selections.
"""

import re
from typing import Optional
from ..prompts import build_character_prompt, RACE_DESCRIPTIONS, CLASS_DESCRIPTIONS


class CharacterGenerator:
    """Generates prompts for character artwork based on game system specifications."""

    VALID_RACES = list(RACE_DESCRIPTIONS.keys())
    VALID_CLASSES = list(CLASS_DESCRIPTIONS.keys())
    VALID_GENDERS = ["male", "female", "neutral"]

    def __init__(self):
        """Initialize the character generator."""
        # Normalize race names for internal use
        self.race_mapping = {
            "human": "human",
            "elf": "elf",
            "dwarf": "dwarf",
            "gnome": "gnome",
            "half_elf": "half_elf",
            "half-elf": "half_elf",
            "halfling": "halfling",
        }

        self.class_mapping = {
            "warrior": "warrior",
            "wizard": "wizard",
            "cleric": "cleric",
            "rogue": "rogue",
            "druid": "druid",
            "barbarian": "barbarian",
            "paladin": "paladin",
            "ranger": "ranger",
        }

    def validate_race(self, race: str) -> str:
        """
        Validate and normalize race name.

        Args:
            race: Race name (case-insensitive)

        Returns:
            Normalized race name

        Raises:
            ValueError: If race is not valid
        """
        race_lower = race.lower().strip()
        if race_lower in self.race_mapping:
            return self.race_mapping[race_lower]

        raise ValueError(
            f"Invalid race: {race}. Valid races are: {', '.join(sorted(self.VALID_RACES))}"
        )

    def validate_class(self, class_name: str) -> str:
        """
        Validate and normalize class name.

        Args:
            class_name: Class name (case-insensitive)

        Returns:
            Normalized class name

        Raises:
            ValueError: If class is not valid
        """
        class_lower = class_name.lower().strip()
        if class_lower in self.class_mapping:
            return self.class_mapping[class_lower]

        raise ValueError(
            f"Invalid class: {class_name}. Valid classes are: {', '.join(sorted(self.VALID_CLASSES))}"
        )

    def validate_gender(self, gender: str) -> str:
        """
        Validate and normalize gender name.

        Args:
            gender: Gender name (case-insensitive)

        Returns:
            Normalized gender name or description for prompt

        Raises:
            ValueError: If gender is not valid
        """
        gender_lower = gender.lower().strip()

        if gender_lower in ["m", "male"]:
            return "male"
        elif gender_lower in ["f", "female"]:
            return "female"
        elif gender_lower in ["n", "neutral", "androgynous"]:
            return "neutral"
        else:
            raise ValueError(
                f"Invalid gender: {gender}. Valid options are: male, female, neutral"
            )

    def generate_prompt(
        self, race: str, class_name: str, gender: str = "neutral"
    ) -> str:
        """
        Generate a character art prompt.

        Args:
            race: Character race
            class_name: Character class
            gender: Character gender (default: neutral)

        Returns:
            Complete prompt for image generation

        Raises:
            ValueError: If any parameter is invalid
        """
        # Validate inputs
        validated_race = self.validate_race(race)
        validated_class = self.validate_class(class_name)
        validated_gender = self.validate_gender(gender)

        # Build the prompt
        prompt = build_character_prompt(
            race=validated_race,
            class_name=validated_class,
            gender=validated_gender,
        )

        return prompt

    def get_race_description(self, race: str) -> dict:
        """
        Get description details for a race.

        Args:
            race: Race name

        Returns:
            Dictionary with race appearance and features
        """
        validated_race = self.validate_race(race)
        return RACE_DESCRIPTIONS[validated_race]

    def get_class_description(self, class_name: str) -> dict:
        """
        Get description details for a class.

        Args:
            class_name: Class name

        Returns:
            Dictionary with class appearance, weapons, and other details
        """
        validated_class = self.validate_class(class_name)
        return CLASS_DESCRIPTIONS[validated_class]

    def list_valid_races(self) -> list[str]:
        """Get list of valid races."""
        return sorted(self.VALID_RACES)

    def list_valid_classes(self) -> list[str]:
        """Get list of valid classes."""
        return sorted(self.VALID_CLASSES)

    def list_valid_genders(self) -> list[str]:
        """Get list of valid genders."""
        return self.VALID_GENDERS
