
import json
import os
import glob
import re

# Threshold for paragraph break (in ms)
# Based on analysis, 2000ms is a very strong break. 
# But let's try 1500ms to get reasonable paragraph sizes, or even 1200ms.
# Let's start with 1500ms.
PAUSE_THRESHOLD_MS = 1500

files = glob.glob("public/audio/WORDz/WORDz_JSON/*.json")
files = [f for f in files if "_chapters" not in f and "_paragraphs" not in f]

def is_sentence_end(text):
    return re.search(r'[.!?]+$', text.strip()) is not None

for file_path in files:
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
        
        words = data.get("words", [])
        if not words:
            continue
            
        # We want to identify the START timestamps of new paragraphs.
        # The first paragraph starts at the first word's start.
        paragraph_starts = [words[0]["start"]]
        
        for i in range(len(words) - 1):
            current_word = words[i]
            next_word = words[i+1]
            
            end_current = current_word["end"]
            start_next = next_word["start"]
            gap = start_next - end_current
            
            # Heuristic: Significant gap usually effectively starts a new thought
            # Also checking for sentence ending on the current word is safer
            if gap > PAUSE_THRESHOLD_MS:
                 # If the gap is huge (e.g. > 3s), it's definitely a paragraph.
                 # If it's 1.5-3s, maybe check for punctuation?
                 # Let's keep it simple: > 1.5s is a paragraph break.
                 # Most natural speech pauses > 1.5s are significant.
                 paragraph_starts.append(start_next)
            elif gap > 1000 and is_sentence_end(current_word["text"]):
                 # Shorter gap but clear sentence end
                 paragraph_starts.append(start_next)

        output_filename = file_path.replace(".json", "_paragraphs.json")
        with open(output_filename, "w") as f:
            json.dump(paragraph_starts, f)
            
        print(f"Generated {output_filename} with {len(paragraph_starts)} paragraphs.")
        
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
