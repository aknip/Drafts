# Converts a directory with .md files to a Drafts .json-file, including all contents and correct creation / modified dates
# v1.0
# Usage:
# python3 convert_markdown_files_to_drafts.py <directory> > DraftsExport.json
#
import os, time
import json
import uuid
import sys

from datetime import datetime, timezone

output_datetime_format = '%Y-%m-%dT%H:%M:%S%Z'
directory_in_str = sys.argv[1]
# print(directory_in_str)

directory = os.fsencode(directory_in_str)

export_output = []

for subdir, dirs, files in os.walk(directory_in_str):
    for file in files:
        filepath = subdir + os.sep + file
        # print(filepath)

        if filepath.endswith(".md"):
            json_export = {}
            json_export['folder'] = 0
            json_export['languageGrammar'] = "Markdown"
            json_export['flagged'] = False
            json_export['uuid'] = str(uuid.uuid4())
            json_export['tags'] = []
            
            #Replace with your preferred coordinates. Use numbers only, not strings
            longitude = 6.9410069232319005
            latitude = 50.931519119649714

            json_export['modified_longitude'] = longitude
            json_export['created_longitude'] = longitude
            json_export['modified_latitude'] = latitude
            json_export['created_latitude'] = latitude

            m_time = os.path.getmtime(filepath)
            c_time = os.path.getctime(filepath)
            json_export['modified_at'] = datetime.fromtimestamp(m_time, timezone.utc).strftime(output_datetime_format)
            # json_export['created_at'] = datetime.fromtimestamp(c_time, timezone.utc).strftime(output_datetime_format)
            # bug: ctime is not always correct, use mtime instead!
            json_export['created_at'] = datetime.fromtimestamp(m_time, timezone.utc).strftime(output_datetime_format)
            json_export['accessed_at'] = datetime.fromtimestamp(m_time, timezone.utc).strftime(output_datetime_format)

            file_contents = open(filepath)
            json_export['content'] = file_contents.read()

            export_output.append(json_export)

import_file = json.dumps(export_output, sort_keys=True, indent=4)
import_file = import_file.replace('UTC"', 'Z"')

print(import_file)

"""
Example output format:
[
  {
    "uuid" : "C13A345F-A2F2-425B-828C-F6585C892239",
    "content" : "Draft Content",
    "folder" : 0,
    "tags" : [

    ],
    "created_latitude" : 46.055316670125848,
    "created_longitude" : -88.705367973270526,
    "modified_latitude" : 46.055530370721598,
    "modified_longitude" : 46.055530370721598,
    "flagged" : false,
    "modified_at" : "2020-09-05T14:38:24Z",
    "accessed_at" : "2020-09-06T02:52:06Z",
    "created_at" : "2020-09-04T01:18:15Z"
    "languageGrammar" : "Markdown",
  }
]
"""