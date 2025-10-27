.PHONY: docs help

help:
	@echo "Dice and Destiny - Document Generation"
	@echo ""
	@echo "Available targets:"
	@echo "  make docs           - Generate all .docx files from .js sources"
	@echo "  make docs-rules     - Generate Rules and Guides .docx files"
	@echo "  make docs-stories   - Generate Adventure .docx files"
	@echo "  make docs-clean     - Remove generated .docx files"
	@echo "  make help           - Display this help message"

# Generate all documents
docs: docs-rules docs-stories

# Generate Rules and Guides documents
docs-rules:
	@echo "Generating Rules and Guides documents..."
	@cd Rules_and_Guides && node rulebook.js && echo "✓ Beginners_Rulebook.docx"
	@cd Rules_and_Guides && node character_art.js && echo "✓ Character_Art_Guide.docx"
	@cd Rules_and_Guides && node character_sheets.js && echo "✓ Character_Sheets.docx"
	@cd Rules_and_Guides && node getting_started.js && echo "✓ Getting_Started_Guide.docx"
	@echo "✓ Rules and Guides documents complete"

# Generate Adventure Story documents
docs-stories:
	@echo "Generating Adventure Story documents..."
	@cd Stories/The_Dragons_Friends && node adventure.js && echo "✓ Adventure_The_Dragons_Friends.docx"
	@cd Stories/The_Dragons_Friends && node maps.js && echo "✓ Game_Maps.docx"
	@echo "✓ Adventure Story documents complete"

# Clean up generated documents
docs-clean:
	@echo "Removing generated .docx files..."
	@rm -f Rules_and_Guides/*.docx
	@rm -f Stories/**/*.docx
	@echo "✓ Cleaned"
