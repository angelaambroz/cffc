import csv
import re
import os
from pathlib import Path
import pymupdf  # PyMuPDF

PLANT_FILENAME = "plant_data.pdf"
OUTPUT_PATH = "plant_data.csv"


def extract_plant_sections(pdf_path: str | Path) -> list[dict]:
    """Extract plant information from PDF into structured data."""

    doc = pymupdf.open(pdf_path)

    # Table of contents, list of plants
    page = doc[0]
    links = page.get_links()
    toc_entries = []
    for link in links:
        if link["kind"] == 1:
            rect = link["from"]
            # Get text within the link rectangle, and clean it up
            text = page.get_textbox(rect).split(".")[0].strip()
            dest_page = link["page"]
            toc_entries.append({"name": text, "page": dest_page})

    # Adding the range of pages to look for each plant
    for ix, plant in enumerate(toc_entries):
        if ix < len(toc_entries) - 1:
            plant["end_page"] = toc_entries[ix + 1]["page"]
        else:
            plant["end_page"] = len(doc)

    print(f"\nFound {len(toc_entries)} plants")

    plants = []

    for entry in toc_entries:
        # Extract text for this plant's pages
        text = ""
        for page_num in range(entry["page"], entry["end_page"]):
            text += doc[page_num].get_text()

        plant = {"name": entry["name"]}

        # Extract structured fields
        fields = {
            "overview": r"Overview:\s*(.*?)(?=\nAppearance:)",
            "appearance": r"Appearance:\s*(.*?)(?=\nTaste and Flavor:)",
            "taste": r"Taste and Flavor:\s*(.*?)(?=\nNutritional Value:)",
            "nutritional_value": r"Nutritional Value:\s*(.*?)(?=\nGrowing Conditions:)",
            "growing_conditions": r"Growing Conditions:\s*(.*?)(?=\nCultivation:)",
            "cultivation": r"Cultivation:\s*(.*?)(?=\nAvailability:)",
            "availability": r"Availability:\s*(.*?)(?=\nCulinary Uses:)",
            "culinary_uses": r"Culinary Uses:\s*(.*?)(?=\nInteresting Facts:)",
            "interesting_facts": r"Interesting Facts:\s*(.*?)(?=\nStorage and Shelf Life:)",
            "shelf_life": r"Storage and Shelf Life:\s*(.*?)(?=\nAllergies and Precautions:)",
            "allergies": r"Allergies and Precautions:\s*(.*?)(?=\nFun Trivia:)",
            "fun_trivia": r"Fun Trivia:\s*(.*?)(?=\n[A-Z].*\nName:|$)",
        }

        for field, pattern in fields.items():
            match = re.search(pattern, text, re.DOTALL)
            if match:
                # Clean up whitespace
                value = " ".join(match.group(1).split())
                plant[field] = value

        plants.append(plant)

    return plants


def save_to_csv(plants: list[dict], output_path: str | Path):
    """Save plant data to CSV."""
    if not plants:
        print("No plants found")
        return

    fieldnames = [
        "name",
        "overview",
        "appearance",
        "taste",
        "nutritional_value",
        "growing_conditions",
        "cultivation",
        "availability",
        "culinary_uses",
        "interesting_facts",
        "shelf_life",
        "allergies",
        "fun_trivia",
    ]

    with open(output_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(plants)


if __name__ == "__main__":

    plants = extract_plant_sections(PLANT_FILENAME)

    print(f"Found {len(plants)} plants")
    save_to_csv(plants, OUTPUT_PATH)
    print(f"Saved to {OUTPUT_PATH}")
