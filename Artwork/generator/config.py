"""
Configuration management for the Artwork Generator

Handles API keys, paths, and settings from environment variables and config files.
"""

import os
from pathlib import Path
from typing import Optional


class Config:
    """Artwork Generator Configuration."""

    def __init__(self):
        """Initialize configuration from environment and defaults."""
        # API Configuration
        self.gemini_api_key: Optional[str] = os.getenv("GEMINI_API_KEY")

        # Project paths
        self.project_root = self._find_project_root()
        self.artwork_root = self.project_root / "Artwork" if self.project_root else None
        self.generator_root = self.artwork_root / "generator" if self.artwork_root else None
        self.stories_root = self.project_root / "Stories" if self.project_root else None
        self.rules_root = self.project_root / "Rules_and_Guides" if self.project_root else None

        # Output paths
        self.output_root = self.artwork_root / "generated" if self.artwork_root else None

        # Character output subdirectory
        self.character_output = self.artwork_root / "Characters" if self.artwork_root else None

        # Story output root
        self.story_output = self.artwork_root / "Stories" if self.artwork_root else None

        # Logging
        self.log_level = os.getenv("LOG_LEVEL", "INFO")
        self.log_file = (
            self.generator_root / "logs" / "generator.log"
            if self.generator_root
            else None
        )

    def _find_project_root(self) -> Optional[Path]:
        """
        Find the project root by looking for known project directories.

        Returns:
            Path to project root, or None if not found
        """
        current = Path(__file__).resolve()

        # Walk up directory tree looking for Artwork/generator directory
        for parent in current.parents:
            if (parent / "Artwork" / "generator").exists():
                return parent

        # Fallback: assume project root is several levels up
        try:
            return current.parent.parent.parent.parent
        except Exception:
            return None

    def validate(self) -> tuple[bool, list[str]]:
        """
        Validate configuration.

        Returns:
            Tuple of (is_valid: bool, warnings: list[str])
        """
        warnings = []

        if not self.gemini_api_key:
            warnings.append(
                "GEMINI_API_KEY not set. Will use prompt generation mode (no direct image generation)."
            )

        if not self.project_root or not self.project_root.exists():
            warnings.append(f"Project root not found or invalid: {self.project_root}")

        if not self.stories_root or not self.stories_root.exists():
            warnings.append(f"Stories directory not found: {self.stories_root}")

        is_valid = len(warnings) < 2  # Allow some warnings, fail only if critical

        return is_valid, warnings

    def ensure_output_directories(self) -> bool:
        """
        Create output directories if they don't exist.

        Returns:
            True if successful, False otherwise
        """
        try:
            if self.output_root:
                self.output_root.mkdir(parents=True, exist_ok=True)
            if self.character_output:
                self.character_output.mkdir(parents=True, exist_ok=True)
            if self.story_output:
                self.story_output.mkdir(parents=True, exist_ok=True)
            if self.log_file:
                self.log_file.parent.mkdir(parents=True, exist_ok=True)
            return True
        except Exception as e:
            print(f"Error creating output directories: {e}")
            return False

    def to_dict(self) -> dict:
        """
        Convert configuration to dictionary.

        Returns:
            Dictionary representation of configuration
        """
        return {
            "api_key_configured": bool(self.gemini_api_key),
            "project_root": str(self.project_root) if self.project_root else None,
            "artwork_root": str(self.artwork_root) if self.artwork_root else None,
            "output_root": str(self.output_root) if self.output_root else None,
            "stories_root": str(self.stories_root) if self.stories_root else None,
            "rules_root": str(self.rules_root) if self.rules_root else None,
            "log_level": self.log_level,
            "log_file": str(self.log_file) if self.log_file else None,
        }


# Global configuration instance
_config: Optional[Config] = None


def get_config() -> Config:
    """
    Get or create global config instance.

    Returns:
        Config instance
    """
    global _config
    if _config is None:
        _config = Config()
    return _config


def reset_config() -> None:
    """Reset global configuration instance (useful for testing)."""
    global _config
    _config = None
