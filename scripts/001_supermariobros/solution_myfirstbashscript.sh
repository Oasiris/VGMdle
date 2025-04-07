#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p out

# Define tracks: "Name|Start|Duration"
tracks=(
  "Castle Clear|0:00|full"
  "Ending Theme|0:00|12"
  "Underwater Theme|0:41|9"
  "Castle Theme|0:00|10"
  "Underground Theme|0:19|5"
  "Overworld Theme|0:00|30"
)

# Case-insensitive filename matching
shopt -s nocaseglob

index=1
for entry in "${tracks[@]}"; do
  IFS="|" read -r name start duration <<< "$entry"
  
  # Convert start time (M:SS) to total seconds
  IFS=":" read -r min sec <<< "$start"
  ss=$((10#$min * 60 + 10#$sec))

  # Determine fade logic and duration flag
  if [[ "$duration" == "full" ]]; then
    filter=""
    duration_flag=""
  else
    to=$duration
    fade="afade=t=out:st=$(echo "$to-1" | bc):d=1"
    [[ "$ss" != "0" ]] && fade="afade=t=in:ss=0:d=1,$fade"
    filter="-af $fade"
    duration_flag="-t $to"
  fi

  # Find matching input file
  q="$name"
  i="$(ls | grep -i "$q")"

  # Format output filename
  filename="$(printf "%03d_%s.mp3" "$index" "${name// /_}")"
  out_path="out/$filename"

  # Skip if already processed
  if [[ -f "$out_path" ]]; then
    echo "Skipping: $filename (already exists)"
  else
    echo "Processing: $filename"
    ffmpeg -ss "$ss" -i "$i" $duration_flag -avoid_negative_ts make_zero $filter "$out_path"
  fi

  ((index++))
done
