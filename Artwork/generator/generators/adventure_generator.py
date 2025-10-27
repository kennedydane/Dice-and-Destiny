"""
Adventure Scene Generator

Handles generation of adventure scene artwork prompts based on story, act, and scene selections.
"""

import os
import logging
import re
from pathlib import Path
from typing import Optional
from markitdown import MarkItDown
from ..prompts import build_adventure_prompt, ART_STYLES

logger = logging.getLogger(__name__)


class AdventureGenerator:
    """Generates prompts for adventure scene artwork based on story structure."""

    VALID_STYLES = list(ART_STYLES.keys())

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

    def _load_scene_content_from_docx(self, story: str, act: int, scene: str) -> Optional[str]:
        """
        Extract scene content from the story's .docx file.

        Converts the .docx to markdown using markitdown, then extracts the read-aloud text
        for the specified scene.

        Args:
            story: Story name
            act: Act number
            scene: Scene name/identifier

        Returns:
            Scene narrative text if found, None otherwise
        """
        try:
            story_path = self.stories_path / story

            # Look for Adventure_*.docx file in story directory
            docx_files = list(story_path.glob("Adventure_*.docx"))
            if not docx_files:
                logger.debug(f"No Adventure_*.docx file found in {story_path}")
                return None

            docx_file = docx_files[0]  # Use first match if multiple exist

            # Convert .docx to markdown
            md_converter = MarkItDown()
            result = md_converter.convert(str(docx_file))
            markdown_content = result.text_content

            # Parse the markdown to find the scene
            # Convert scene identifier to likely heading format
            # "Scene_1" -> "Scene 1" or similar variations
            scene_variations = [
                f"Scene {scene.split('_')[-1]}",  # Scene_1 -> Scene 1
                scene.replace("_", " "),  # Scene_1 -> Scene 1
                scene,
            ]

            # Split by lines and find the target scene
            lines = markdown_content.split("\n")
            scene_content = []
            in_target_scene = False

            for i, line in enumerate(lines):
                # Check if this line is a heading (starts with ##)
                if line.startswith("##"):
                    # Check if it matches one of our scene variations
                    heading_text = line.replace("##", "").strip()

                    for variation in scene_variations:
                        if variation.lower() in heading_text.lower():
                            in_target_scene = True
                            scene_content = []
                            break
                    else:
                        # Different heading found - we're past the target scene
                        if in_target_scene:
                            break

                elif in_target_scene:
                    # Stop if we hit a new heading
                    if line.startswith("#"):
                        break

                    # Collect text content
                    line = line.strip()
                    if line and not any(skip in line for skip in ["DM GUIDANCE", "DM TIPS", "---", "**DM", "|"]):
                        scene_content.append(line)

            if scene_content:
                # Join content and clean up
                description = " ".join(scene_content)
                # Remove extra whitespace
                description = re.sub(r"\s+", " ", description).strip()
                logger.debug(f"Extracted scene content from {docx_file.name} for {story} Act {act} Scene {scene}")
                return description

            logger.debug(f"Could not extract scene content for {scene} in {docx_file.name}")
            return None

        except Exception as e:
            logger.warning(f"Error loading scene content from docx: {e}")
            return None

    def _build_scene_description(self, story: str, act: int, scene: str) -> str:
        """
        Build a description for a scene based on available information.

        Attempts to extract content from the story's .docx file first.
        Falls back to a generic description if extraction fails.

        Args:
            story: Story name
            act: Act number
            scene: Scene name/identifier

        Returns:
            Scene description for prompt generation
        """
        # Try to load from .docx first
        docx_content = self._load_scene_content_from_docx(story, act, scene)
        if docx_content:
            return docx_content

        # Fallback to generic description
        return f"Scene from {story}, Act {act}: {scene.replace('_', ' ')}"

    def validate_style(self, style: str) -> str:
        """
        Validate and normalize art style name.

        Args:
            style: Art style name (case-insensitive)

        Returns:
            Normalized style name

        Raises:
            ValueError: If style is not valid
        """
        style_lower = style.lower().strip()
        if style_lower in self.VALID_STYLES:
            return style_lower

        raise ValueError(
            f"Invalid style: {style}. Valid styles are: {', '.join(sorted(self.VALID_STYLES))}"
        )

    def generate_prompt(
        self, story: str, act: int, scene: str, npc_type: Optional[str] = None, style: str = "fantasy"
    ) -> str:
        """
        Generate an adventure scene art prompt.

        Args:
            story: Story name
            act: Act number
            scene: Scene name/identifier
            npc_type: Optional NPC type to include in scene (e.g., "merchant", "guard")
            style: Art style (default: fantasy)

        Returns:
            Complete prompt for image generation

        Raises:
            ValueError: If any parameter is invalid
        """
        # Validate inputs
        scene_details = self.get_scene_details(story, act, scene)
        validated_style = self.validate_style(style)

        scene_description = scene_details["description"]

        # Enhance description with NPC if provided
        if npc_type:
            scene_description += f" Include a {npc_type} NPC."

        # Build the prompt with story/act/scene information for image text
        prompt = build_adventure_prompt(
            scene_description=scene_description,
            story_name=story.replace("_", " "),
            act=act,
            scene_name=scene.replace("_", " "),
            style=validated_style
        )

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
