"""
Prompt Generator Client

Handles generation and saving of prompts for character and adventure artwork.
Prompts can be used with any AI image generation service.
"""

import logging
from pathlib import Path

logger = logging.getLogger(__name__)


class GeminiClient:
    """
    Prompt generation and management client.

    Generates and saves prompts for character and adventure artwork that can be
    used with any AI image generation service (Gemini, Midjourney, Stable Diffusion, etc).
    """

    def __init__(self, api_key=None):
        """
        Initialize prompt client.

        Args:
            api_key: Optional API key (not required for prompt generation)
        """
        pass


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

    def get_status(self) -> dict:
        """Get client status information."""
        return {
            "available": True,
            "api_key_configured": False,
            "fallback_mode": False,
            "message": "Prompt generation mode (ready to generate prompts for any image generator)",
        }
