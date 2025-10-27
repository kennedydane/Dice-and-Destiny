"""
Gemini API Client

Handles communication with Google's Gemini API for image generation.
Supports fallback to prompt generation if API is unavailable.
"""

import os
import logging
from typing import Optional, Tuple
from pathlib import Path

logger = logging.getLogger(__name__)


class GeminiClient:
    """
    Client for Google Gemini API image generation.

    Supports both direct image generation (if available) and prompt generation
    for manual use with Gemini UI or other image generators.
    """

    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize Gemini client.

        Args:
            api_key: Google Gemini API key (defaults to GEMINI_API_KEY env var)

        Raises:
            ValueError: If no API key is provided or found in environment
        """
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")

        if not self.api_key:
            logger.warning(
                "GEMINI_API_KEY not found. Will generate prompts only (no image generation)."
            )
            self.available = False
        else:
            self.available = self._test_connection()

    def _test_connection(self) -> bool:
        """
        Test connection to Gemini API.

        Returns:
            True if connection successful, False otherwise
        """
        try:
            import google.generativeai as genai

            genai.configure(api_key=self.api_key)
            # Try to get model list to verify connection
            _ = genai.list_models()
            logger.info("Gemini API connection successful")
            return True
        except Exception as e:
            logger.warning(f"Gemini API connection failed: {e}")
            return False


    def save_prompt_for_manual_generation(
        self, prompt: str, output_path: str
    ) -> bool:
        """
        Save a prompt to a file for manual image generation.

        Useful when API is unavailable or for manual use with Gemini UI.

        Args:
            prompt: Image generation prompt
            output_path: Path to save the prompt file

        Returns:
            True if successful, False otherwise
        """
        try:
            output_path_obj = Path(output_path)
            output_path_obj.parent.mkdir(parents=True, exist_ok=True)

            with open(output_path, "w", encoding="utf-8") as f:
                f.write("IMAGE GENERATION PROMPT\n")
                f.write("=" * 80 + "\n\n")
                f.write("Use this prompt with Gemini Nano Banana or your preferred image generator.\n\n")
                f.write("PROMPT:\n")
                f.write("-" * 80 + "\n")
                f.write(prompt)
                f.write("\n" + "-" * 80 + "\n")

            logger.info(f"Prompt saved to {output_path}")
            return True
        except Exception as e:
            logger.error(f"Failed to save prompt: {e}")
            return False

    def is_available(self) -> bool:
        """Check if Gemini API is available."""
        return self.available

    def get_status(self) -> dict:
        """Get API status information."""
        return {
            "available": self.available,
            "api_key_configured": bool(self.api_key),
            "fallback_mode": not self.available,
            "message": (
                "Gemini API ready for image generation"
                if self.available
                else "Using prompt generation mode (API unavailable)"
            ),
        }
