import json

# example of a class dictionary
# Each items are titled json object containing a dictionary defining the event
c1_dict = {
    "Homework1": {
        "title": "Homework1",
        "description": "Dummy Homework",
        "date": "2022-12-06T23:59:00",
        "duration": "2022-12-06T23:59:00",
        "repeats": False,
        "frequency": 3
    },
    "Quiz1": {
        "title": "Quiz1",
        "description": "Dummy Quiz Event",
        "date": "2022-12-10T14:30:00",
        "duration": "2022-12-10T15:00:00",
        "repeats": False,
        "frequency": 3
    }
}

# example of a calendar json object. events is a json object containing dictionary of events
class1 = {
    "title": "class1",
    "events": c1_dict,
    "is_official": True,
    "color": "#FE3A11"
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
    "is_official": False,
    "color": "#1C9730"
}


# Structure - Dictionary that can be searched by the keyword title.
# Dictionary containing calendars where each calendar is a dictionary
calendars = {
    class1["title"]: class1,
    personal1["title"]: personal1
}


# Notifications should contain dictionaries - each defining a notification object.
# For this particular one - there are two identifiers so we should combine two strings....
# example class1 + Homework1 = class1Homework1
notifications = {
    "class1Homework1": {
        "calendar": "class1",
        "event": "Homework1",
        "date": "2022-12-06T23:59:00",
        "window": "03:00:00",
        "repeats": False, # boolean field
        "frequency":0,
        "method": "EMAIL" # string matching the enum class in notifications.py
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
    "password": 1203875,
    "phonenumber": "xxx-xx-xxxx"
}
 

with open("data.json", "w") as outfile:
    json.dump(data_set, outfile)
