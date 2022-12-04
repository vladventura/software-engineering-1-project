# Example on how python data is read

import json
f_name = "./data.json"

with open(f_name) as json_file:
  obj = json.load(json_file)
  json_file.close()


  print(obj["data"]["notifications"])

