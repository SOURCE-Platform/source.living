
import json
import os
import glob

# Files to analyze
files = glob.glob("public/audio/WORDz/WORDz_JSON/*.json")
# Exclude chapter/paragraph files if any exist already (though name pattern should avoid them if carefully chosen, but * includes _chapters)
files = [f for f in files if "_chapters" not in f and "_paragraphs" not in f]

print(f"Analyzing {len(files)} files...")

for file_path in files:
    print(f"\nProcessing {file_path}")
    try:
        with open(file_path, "r") as f:
            data = json.load(f)
        
        words = data.get("words", [])
        if not words:
            print("  No words found.")
            continue
            
        gaps = []
        for i in range(len(words) - 1):
            end_current = words[i]["end"]
            start_next = words[i+1]["start"]
            gap = start_next - end_current
            if gap > 0:
                gaps.append((gap, words[i]["text"], words[i+1]["text"], start_next))
        
        # Sort gaps to see distribution
        gaps.sort(key=lambda x: x[0], reverse=True)
        
        print("  Top 20 gaps:")
        for g in gaps[:20]:
            print(f"    {g[0]}ms: '...{g[1]}' -> '{g[2]}...' (at {g[3]}ms)")
            
    except Exception as e:
        print(f"  Error: {e}")
