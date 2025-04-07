#!/usr/bin/env python3

import os
import subprocess

# Ensure 'out' dir exists
os.makedirs("out", exist_ok=True)

tracks = [
    ("Castle Clear", "0:00", "full"),
    ("Ending Theme", "0:00", "12"),
    ("Underwater Theme", "0:41", "9"),
    ("Castle Theme", "0:00", "10"),
    ("Underground Theme", "0:19", "5"),
    ("Overworld Theme", "0:00", "30"),
]


files = os.listdir(".")

for i in range(len(tracks)):
    track_name, start, duration = tracks[i]
    num = i + 1
    print(f"Processing track {num}: {track_name} (Start: {start}, Duration: {duration})")

    # STEP 3.4: Format output filename as "NNN_Track_Name.mp3"
    out_name =f"{num:03}-{track_name.replace(" ", "_")}.mp3"
    out_path = f"out/{out_name}"
    # Skip if exists
    if os.path.exists(out_path):
        print(f"Skipping {out_path} (already exists)")
        continue
    print(f"Out_name: {out_name}")


    # Example: "0:41" → 41
    start_sec = int(start.split(":")[1]) + int(start.split(":")[0]) * 60
    print(f"start_sec: {start_sec}")

    # Prepare fade-in/out filters
    # - If duration == "full", skip fade logic
    # - Else, set up fade-out, and fade-in if start != 0
    fade_clauses: list[str] = []
    if duration != "full":
        # 0.8-second fade out
        fade_clauses.append(f"afade=t=out:st={int(duration) - 0.8}:d=0.8")
        if start_sec != 0:
            # 0.4-second fade in
            fade_clauses.append("afade=t=in:ss=0:d=0.5")
    fade_str = ",".join(fade_clauses)
    print(f"fade_str: {fade_str}")

    # Prepare duration flag
    duration_args = []
    if duration != "full":
        duration_args = ["-t", str(duration)]

    # Search for input file that matches the track name (case-insensitive)
    matches = [line for line in files if track_name.lower() in line.lower()]
    print(f"files: {files}")
    print(f"matches: {matches}")

    if len(matches) == 0:
        print(f"Couldn't find match for {track_name}")
        continue
    if len(matches) > 1:
        print(f"Found {len(matches)} matches for {track_name}: {matches}")
        continue

    input_file = matches[0]

    # Build the ffmpeg command as a list
    # Use a list of arguments like ['ffmpeg', '-ss', str(ss), '-i', input_file, ...]
    # Run using subprocess.run
    cmd = ["ffmpeg", "-ss", str(start_sec), "-i", input_file]
    if duration_args:
        cmd += duration_args
    cmd += ["-avoid_negative_ts", "make_zero"]
    if fade_str:
        cmd += ["-af", fade_str]
    cmd.append(out_path)

    print(f"Attempting to run {' '.join(cmd)}")
    subprocess.run(cmd, check=True)
