import json

events1 = {
    "homework1": {
        "title": "Homework1",
        "description": "Dummy Homework",
        "date": "some date",
        "duration": "some duration",
        "repeats": False,
        "frequency": 3,
    }
}

classes = {
    "class1": events1
}

# We should probably fill this one out as this is supposed to be the customizable one
personal = {

}

calendars = {
    "classes": classes,
    "personal": personal
}


# Notifications should contain multiple as an exmample below
# TODO need to figure string format for some of these.
notifications = {
    "1": {
        "calendar": "class1",
        "event": "homework1",
        "window":0, # ?
        "repeats":0, # ?
        "requency":0, # ?
        "method":0 # ?
    }
}

# Data to be written - should have calendar
data = {
    "calendars": calendars,
    "notifications": notifications
}

# main student
data_set = {
    "student": "Example Student",
    "email": "jaec1989@gmail.com",
    "data": data,
    "password": 1203875
}
 

with open("sample.json", "w") as outfile:
    json.dump(data_set, outfile)
