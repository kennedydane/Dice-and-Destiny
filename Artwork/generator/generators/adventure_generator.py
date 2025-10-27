"""
Adventure Scene Generator

Handles generation of adventure scene artwork prompts based on story, act, and scene selections.
"""

import os
from pathlib import Path
from typing import Optional
from ..prompts import build_adventure_prompt


class AdventureGenerator:
    """Generates prompts for adventure scene artwork based on story structure."""

    def __init__(self, stories_path: str = None):
        """
        Initialize the adventure generator.

        Args:
            stories_path: Path to the Stories directory (defaults to project structure)
        """
        if stories_path is None:
            # Default to project structure
            current_file = Path(__file__).resolve()
            project_root = current_file.parent.parent.parent.parent
            stories_path = os.path.join(project_root, "Stories")

        self.stories_path = Path(stories_path)

    def get_available_stories(self) -> list[str]:
        """
        Get list of available adventure stories.

        Returns:
            List of story directory names
        """
        if not self.stories_path.exists():
            return []

        stories = []
        for item in self.stories_path.iterdir():
            if item.is_dir() and not item.name.startswith("."):
                stories.append(item.name)

        return sorted(stories)

    def get_story_acts(self, story: str) -> list[int]:
        """
        Get list of available acts for a story.

        Args:
            story: Story name

        Returns:
            List of act numbers

        Raises:
            ValueError: If story doesn't exist
        """
        story_path = self.stories_path / story
        if not story_path.exists():
            raise ValueError(f"Story not found: {story}")

        acts = []
        for item in story_path.iterdir():
            if item.is_dir() and item.name.startswith("Act"):
                # Extract act number from "Act 1", "Act 2", etc.
                try:
                    act_num = int(item.name.split()[-1])
                    acts.append(act_num)
                except (ValueError, IndexError):
                    pass

        return sorted(acts)

    def get_act_scenes(self, story: str, act: int) -> list[str]:
        """
        Get list of available scenes for an act.

        Args:
            story: Story name
            act: Act number

        Returns:
            List of scene descriptions

        Raises:
            ValueError: If story or act doesn't exist
        """
        act_path = self.stories_path / story / f"Act {act}"
        if not act_path.exists():
            raise ValueError(f"Act {act} not found in story: {story}")

        scenes = []
        for item in act_path.iterdir():
            if item.is_dir() and not item.name.startswith("."):
                # Scene directories are typically "Scene 1", "Scene 2", etc.
                # For now, we'll use directory names as scene identifiers
                scenes.append(item.name)

        return sorted(scenes)

    def get_scene_details(self, story: str, act: int, scene: str) -> dict:
        """
        Get details about a specific scene.

        In the full implementation, this would read from adventure.js or a manifest file.
        For now, it returns a basic structure that can be enhanced.

        Args:
            story: Story name
            act: Act number
            scene: Scene name/identifier

        Returns:
            Dictionary with scene details

        Raises:
            ValueError: If scene doesn't exist
        """
        act_path = self.stories_path / story / f"Act {act}"
        scene_path = act_path / scene

        if not scene_path.exists():
            raise ValueError(f"Scene '{scene}' not found in {story} Act {act}")

        return {
            "story": story,
            "act": act,
            "scene": scene,
            "path": str(scene_path),
            "description": self._build_scene_description(story, act, scene),
        }

    def _build_scene_description(self, story: str, act: int, scene: str) -> str:
        """
        Build a description for a scene based on available information.

        This is a basic implementation. In a full version, this would read from
        the adventure.js file or a separate manifest.

        Args:
            story: Story name
            act: Act number
            scene: Scene name/identifier

        Returns:
            Scene description for prompt generation
        """
        # Basic description - in full implementation, would read from adventure.js
        return f"Scene from {story}, Act {act}: {scene.replace('_', ' ')}"

    def generate_prompt(
        self, story: str, act: int, scene: str, npc_type: Optional[str] = None
    ) -> str:
        """
        Generate an adventure scene art prompt.

        Args:
            story: Story name
            act: Act number
            scene: Scene name/identifier
            npc_type: Optional NPC type to include in scene (e.g., "merchant", "guard")

        Returns:
            Complete prompt for image generation

        Raises:
            ValueError: If any parameter is invalid
        """
        # Validate inputs
        scene_details = self.get_scene_details(story, act, scene)

        scene_description = scene_details["description"]

        # Enhance description with NPC if provided
        if npc_type:
            scene_description += f" Include a {npc_type} NPC."

        # Build the prompt
        prompt = build_adventure_prompt(scene_description)

        return prompt

    def validate_story_act_scene(self, story: str, act: int, scene: str) -> bool:
        """
        Validate that a story/act/scene combination exists.

        Args:
            story: Story name
            act: Act number
            scene: Scene name/identifier

        Returns:
            True if valid, False otherwise
        """
        try:
            self.get_scene_details(story, act, scene)
            return True
        except ValueError:
            return False
