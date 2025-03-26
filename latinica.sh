#!/bin/sh
sudo apt-get install gettext
export LANG=C.utf8
for dir in "src/content/vesti" "src/content/rioTinto" "src/content/stranice"
do
	rm -rf "$dir/sr-lat"
    mkdir -p "$dir/sr-lat"

    for file in "$dir"/sr/*
    do
        recode-sr-latin < "$file" > "$dir/sr-lat/$(basename "$file")"
    done
done
