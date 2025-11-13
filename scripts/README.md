# Plant Data Extraction Scripts

This directory contains scripts for extracting plant information from PDF documents and converting it to structured CSV format.

## Files

- `extract_from_pdf.py` - Main extraction script that processes the plant data PDF
- `plant_data.csv` - Output CSV file containing structured plant information
- `plant_data.pdf` - Source PDF document with plant information (29 plants total)

## How it works

The `extract_from_pdf.py` script:

1. **Parses the table of contents** on page 1 to identify plant names and their page ranges
2. **Extracts structured data** for each plant using regex patterns to find sections like:
   - Overview
   - Appearance  
   - Taste and Flavor
   - Nutritional Value
   - Growing Conditions
   - Cultivation
   - Availability
   - Culinary Uses
   - Interesting Facts
   - Storage and Shelf Life
   - Allergies and Precautions
   - Fun Trivia

3. **Outputs to CSV** with standardized field names for easy data analysis

## Usage

```bash
python extract_from_pdf.py
```

The script will process `plant_data.pdf` and generate `plant_data.csv` with structured information for all 29 plants in the document.

## Plants Included

The PDF contains detailed information for 29 plants including:
- Anise Hyssop
- Apple
- Beach Plum
- Thornless Blackberry
- Black Chokeberry
- Black Raspberry
- Blueberry
- Bush Cherry
- Clove Currant
- Cherry Red Currant
- Elderberry
- Fig
- Hazelnut
- Holly (Yaupon)
- Jostaberry
- Kiwi (Anna Hardy)
- Kiwi (Fuzzy)
- Kiwi (Issai)
- Mulberry (Weeping)
- Mulberry (Shangri-La)
- New Jersey Tea
- Pawpaw
- Pear
- Pecan
- Persimmon
- Pomegranate
- Sea Kale
- Serviceberry
- Sorrel

## Dependencies

- `pymupdf` - For PDF text extraction and link parsing
- `csv` - For CSV output formatting
- `re` - For regex pattern matching
- `os` and `pathlib` - For file handling
