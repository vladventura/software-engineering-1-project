import json

# example of a class dictionary
# Each items are titled json object containing a dictionary defining the event
c1_dict = {
    "Homework1": {
        "title": "Homework1",
        "description": "Dummy Homework",
        "date": "2022-12-6",
        "duration": "some duration",
        "repeats": False,
        "frequency": 3,
    },
    "Quiz1": {
        "title": "Quiz1",
        "description": "Dummy Quiz Event",
        "date": "2022-12-10",
        "duration": "some duration",
        "repeats": False,
        "frequency": 3,
    }
}

# example of a calendar json object. events is a json object containing dictionary of events
class1 = {
    "title": "class1",
    "events": c1_dict,
    "is_class": True
}

p_dict = {
    "Christmas!": {
        "title": "Christmas!",
        "description": "Special Holiday!",
        "date": "2022-12-25",
        "duration": "some duration",
        "repeats": False,
        "frequency": 0,
    }
}

# We should probably fill this one out as this is supposed to be the customizable one
personal1 = {
    "title": "Personal1",
    "events": p_dict,
    "is_class": False
}


# Structure - Dictionary that can be searched by the keyword title.
# Dictionary containing calendars where each calendar is a dictionary
calendars = {
    class1["title"]: class1,
    personal1["title"]: personal1
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
 

with open("data.json", "w") as outfile:
    json.dump(data_set, outfile)
