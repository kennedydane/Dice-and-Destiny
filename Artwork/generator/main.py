"""
Dice and Destiny Artwork Generator CLI

A command-line tool for generating prompts (and optionally images) for character
art and adventure scene artwork.

Usage:
    python -m generator character --race RACE --class CLASS [--gender GENDER] [--edit]
    python -m generator adventure --story STORY --act ACT --scene SCENE [--edit]
    python -m generator api-test
"""

import sys
import click
import logging
from pathlib import Path
from typing import Optional

from .config import get_config
from .generators import CharacterGenerator, AdventureGenerator
from .api import GeminiClient

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


def setup_logging(config):
    """Set up logging based on configuration."""
    if config.log_file:
        try:
            handler = logging.FileHandler(config.log_file)
            handler.setFormatter(
                logging.Formatter(
                    "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
                )
            )
            logging.getLogger().addHandler(handler)
        except Exception as e:
            logger.warning(f"Could not set up file logging: {e}")


@click.group()
@click.version_option()
def cli():
    """Dice and Destiny Artwork Generator

    Generate prompts for character art and adventure scene artwork.
    """
    config = get_config()
    is_valid, warnings = config.validate()
    config.ensure_output_directories()

    for warning in warnings:
        click.secho(f"⚠️  {warning}", fg="yellow")

    setup_logging(config)


@cli.command()
@click.option(
    "--race",
    type=click.Choice(
        ["human", "elf", "dwarf", "gnome", "half-elf", "halfling"],
        case_sensitive=False,
    ),
    prompt="Select race",
    help="Character race",
)
@click.option(
    "--class",
    "class_name",
    type=click.Choice(
        ["warrior", "wizard", "cleric", "rogue", "druid", "barbarian", "paladin", "ranger"],
        case_sensitive=False,
    ),
    prompt="Select class",
    help="Character class",
)
@click.option(
    "--gender",
    type=click.Choice(["male", "female", "neutral"], case_sensitive=False),
    prompt="Select gender",
    help="Character gender",
)
@click.option(
    "--style",
    type=click.Choice(
        ["fantasy", "photorealistic", "cartoon", "watercolor", "concept_art", "oil_painting"],
        case_sensitive=False,
    ),
    prompt="Select art style",
    help="Art style for the character",
)
@click.option(
    "--edit",
    is_flag=True,
    help="Edit the prompt before generation",
)
def character(race: str, class_name: str, gender: str, style: str, edit: bool):
    """Generate character art prompt.

    Specify race and class, optionally customize the prompt, and generate
    artwork prompt suitable for image generation.
    """
    try:
        config = get_config()
        generator = CharacterGenerator()

        # Generate the prompt
        prompt = generator.generate_prompt(race, class_name, gender, style)

        click.echo("\n" + "=" * 80)
        click.echo(f"CHARACTER ART PROMPT: {race.title()} {class_name.title()} ({gender.title()})")
        click.echo("=" * 80 + "\n")

        # Show the prompt
        click.echo(prompt)

        # Allow editing
        if edit:
            click.echo("\n" + "-" * 80)
            click.secho("EDIT MODE", fg="cyan", bold=True)
            click.echo("-" * 80)

            edited = click.edit(prompt)
            if edited:
                prompt = edited
                click.secho("✓ Prompt updated", fg="green")
            else:
                click.secho("Prompt unchanged", fg="yellow")

        # Save prompt
        client = GeminiClient(config.gemini_api_key)

        # Generate filename
        safe_race = race.lower().replace("-", "_")
        safe_class = class_name.lower()
        safe_gender = gender.lower()
        filename = f"{safe_race}_{safe_class}_{safe_gender}_prompt.txt"
        output_path = config.output_root / filename if config.output_root else Path(filename)

        success = client.save_prompt_for_manual_generation(prompt, str(output_path))

        if success:
            click.secho(f"\n✓ Prompt saved to: {output_path}", fg="green")
            click.echo("\n" + "─" * 80)
            click.echo("To generate an image, use this prompt with:")
            click.echo("  • Gemini Nano Banana (https://aistudio.google.com/)")
            click.echo("  • Midjourney")
            click.echo("  • Stable Diffusion")
            click.echo("  • Or your preferred AI image generator")
            click.echo("─" * 80)
        else:
            click.secho("✗ Failed to save prompt", fg="red")
            sys.exit(1)

    except ValueError as e:
        click.secho(f"✗ Error: {e}", fg="red")
        sys.exit(1)
    except Exception as e:
        click.secho(f"✗ Unexpected error: {e}", fg="red")
        logger.exception("Unexpected error in character command")
        sys.exit(1)


@cli.command()
@click.option(
    "--story",
    default=None,
    help="Adventure story name",
)
@click.option(
    "--act",
    type=int,
    default=None,
    help="Act number",
)
@click.option(
    "--scene",
    default=None,
    help="Scene identifier/name",
)
@click.option(
    "--npc",
    default=None,
    help="NPC type to include (e.g., 'merchant', 'guard')",
)
@click.option(
    "--style",
    type=click.Choice(
        ["fantasy", "photorealistic", "cartoon", "watercolor", "concept_art", "oil_painting"],
        case_sensitive=False,
    ),
    default="fantasy",
    help="Art style for the scene",
)
@click.option(
    "--edit",
    is_flag=True,
    help="Edit the prompt before generation",
)
def adventure(story: Optional[str], act: Optional[int], scene: Optional[str], npc: Optional[str], style: str, edit: bool):
    """Generate adventure scene art prompt.

    Specify story, act, and scene to generate an artwork prompt for adventure locations.
    """
    try:
        config = get_config()
        generator = AdventureGenerator(str(config.stories_root))

        # Get available stories
        available_stories = generator.get_available_stories()
        if not available_stories:
            click.secho("✗ No adventure stories found in Stories/ directory", fg="red")
            sys.exit(1)

        # Prompt for story if not provided
        if not story:
            click.echo("\nAvailable stories:")
            for i, s in enumerate(available_stories, 1):
                click.echo(f"  {i}. {s}")

            selection = click.prompt(
                "Select story (enter number or name)",
                type=str
            )

            # Try to interpret as index first
            try:
                index = int(selection) - 1
                if 0 <= index < len(available_stories):
                    story = available_stories[index]
                else:
                    click.secho(f"✗ Invalid index: {selection}", fg="red")
                    sys.exit(1)
            except ValueError:
                # Not a number, try as name
                if selection.lower() in [s.lower() for s in available_stories]:
                    story = next(s for s in available_stories if s.lower() == selection.lower())
                else:
                    click.secho(f"✗ Unknown story: {selection}", fg="red")
                    sys.exit(1)

        # Get available acts for selected story
        available_acts = generator.get_story_acts(story)
        if not available_acts:
            click.secho(f"✗ No acts found in story: {story}", fg="red")
            sys.exit(1)

        # Prompt for act if not provided
        if not act:
            click.echo(f"\nAvailable acts in '{story}':")
            for act_num in available_acts:
                click.echo(f"  • Act {act_num}")
            act = click.prompt("Select act number", type=click.IntRange(min=min(available_acts), max=max(available_acts)))

        # Get available scenes for selected act
        available_scenes = generator.get_act_scenes(story, act)
        if not available_scenes:
            click.secho(f"✗ No scenes found in {story} Act {act}", fg="red")
            sys.exit(1)

        # Prompt for scene if not provided
        if not scene:
            click.echo(f"\nAvailable scenes in '{story}' Act {act}:")
            for i, s in enumerate(available_scenes, 1):
                click.echo(f"  {i}. {s}")

            selection = click.prompt(
                "Select scene (enter number or name)",
                type=str
            )

            # Try to interpret as index first
            try:
                index = int(selection) - 1
                if 0 <= index < len(available_scenes):
                    scene = available_scenes[index]
                else:
                    click.secho(f"✗ Invalid index: {selection}", fg="red")
                    sys.exit(1)
            except ValueError:
                # Not a number, try as name
                if selection.lower() in [s.lower() for s in available_scenes]:
                    scene = next(s for s in available_scenes if s.lower() == selection.lower())
                else:
                    click.secho(f"✗ Unknown scene: {selection}", fg="red")
                    sys.exit(1)

        # Validate the complete selection
        if not generator.validate_story_act_scene(story, act, scene):
            click.secho(
                f"✗ Story/Act/Scene not found: {story} Act {act} - {scene}",
                fg="red"
            )
            sys.exit(1)

        # Generate the prompt
        prompt = generator.generate_prompt(story, act, scene, npc, style)

        click.echo("\n" + "=" * 80)
        click.echo(f"ADVENTURE SCENE PROMPT: {story} - Act {act} - {scene}")
        click.echo("=" * 80 + "\n")

        # Show the prompt
        click.echo(prompt)

        # Allow editing
        if edit:
            click.echo("\n" + "-" * 80)
            click.secho("EDIT MODE", fg="cyan", bold=True)
            click.echo("-" * 80)

            edited = click.edit(prompt)
            if edited:
                prompt = edited
                click.secho("✓ Prompt updated", fg="green")
            else:
                click.secho("Prompt unchanged", fg="yellow")

        # Save prompt
        client = GeminiClient(config.gemini_api_key)

        # Generate filename
        safe_story = story.lower().replace(" ", "_")
        filename = f"{safe_story}_act{act}_{scene.lower()}_prompt.txt"
        output_path = config.output_root / filename if config.output_root else Path(filename)

        success = client.save_prompt_for_manual_generation(prompt, str(output_path))

        if success:
            click.secho(f"\n✓ Prompt saved to: {output_path}", fg="green")
            click.echo("\n" + "─" * 80)
            click.echo("To generate an image, use this prompt with:")
            click.echo("  • Gemini Nano Banana (https://aistudio.google.com/)")
            click.echo("  • Midjourney")
            click.echo("  • Stable Diffusion")
            click.echo("  • Or your preferred AI image generator")
            click.echo("─" * 80)
        else:
            click.secho("✗ Failed to save prompt", fg="red")
            sys.exit(1)

    except ValueError as e:
        click.secho(f"✗ Error: {e}", fg="red")
        sys.exit(1)
    except Exception as e:
        click.secho(f"✗ Unexpected error: {e}", fg="red")
        logger.exception("Unexpected error in adventure command")
        sys.exit(1)


@cli.command(name="api-test")
def api_test():
    """Test Gemini API connection."""
    config = get_config()
    client = GeminiClient(config.gemini_api_key)
    status = client.get_status()

    click.echo("\n" + "=" * 80)
    click.echo("GEMINI API TEST")
    click.echo("=" * 80 + "\n")

    for key, value in status.items():
        click.echo(f"  {key}: {value}")

    click.echo()

    if status["available"]:
        click.secho("✓ API is ready for image generation", fg="green")
    else:
        click.secho(
            "✗ API not available. Using prompt generation mode.",
            fg="yellow"
        )
        if not status["api_key_configured"]:
            click.echo("\n  To enable API: set GEMINI_API_KEY environment variable")


if __name__ == "__main__":
    cli()
