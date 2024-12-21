#!/bin/bash

# Read the JSON file
input_file="src/data/newsAndEventsData.json"

# Use jq to extract each entry and create individual markdown files
jq -c '.[]' "$input_file" | while read entry; do
    # Extract individual fields from the JSON entry
    type=$(echo "$entry" | jq -r '.type')
    date=$(echo "$entry" | jq -r '.date')
    title=$(echo "$entry" | jq -r '.title')
    dateStr=$(echo "$entry" | jq -r '.dateStr')
    description=$(echo "$entry" | jq -r '.description')
    image=$(echo "$entry" | jq -r '.image')

    # Format the title and date to create a file name
    file_name=$(echo "$dateStr" | tr -d '-' )"-$(echo "$title" | tr '[:space:]' '_')"

    # Create the markdown file
    cat <<EOF > "news_events/$file_name.md"
---
type: $type
date: "$date"
title: "$title"
dateStr: "$dateStr"
image: "$image"
---

$description
EOF

done