from flask import Blueprint

calendars = Blueprint('calendars', 'calendars')

@calendars.route('/', methods=["GET"])
def get_calendar():
    return []