#!/bin/bash

command="rsync -avzP --delete-after static_assets build/."
echo "\n"${command}"\n"
${command}


