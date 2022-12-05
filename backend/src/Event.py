# Author: Zachary McCann
# COMP.4110-201 Software Engineering I 
# Team 6, Enhanced Blackboard Calendar
#
# Functionality for printing and saving a calendar
#
#
#   Cowritten by: Max Tighe
#

from Calendar import Calendar
from enum import Enum
from datetime import datetime
from fpdf import FPDF

#FPDF can be found and installed here:
# https://pyfpdf.github.io/fpdf2/index.html
#

class DisplayMode(Enum): # Enum for each kind of frequency an event can repeat
        MONTHLY = 1
        WEEKLY = 2
        DAILY = 3


class Exporter:
    # Used to print a list of Calendar objects
    # Calendar objects list passed to Exporter from the Main Calendar Display
    # For the prototype, we will just send text to the screen of the frontend
    # for "printing".
    # In a fully fleshed out application, we would send this information
    # from the backend to the frontend, and then include display information
    # from the frontend to create the printable file (i.e. PDF)
    def printCalendar(self, calendars, month):
        # Use to get the month number (index of array that matches month name is the month number) 
        months = [
            'January', 'February', 'March',
            'April', 'May', 'June',
            'July', 'August', 'September',
            'October', 'November', 'December'
        ]

        month = month.capitalize()

        events = []     # A list for storing all of the events particular to the month of interest
        for cal in calendars:
            for e in cal.events:
                if(e.date.month == months.index(month)):    # Add to list if event's month is the month specified
                                                            # by argument passed to function call
                   events.append((cal.title, e))

        # Hierarchical format for output text:
        #
        # Month
        #   Day1
        #       Event Title: Time
        #       Event Title: StartTime - EndTime
        #   Day2
        #       Event Title: Time

        message = month + '\n'
        for i in range(events.__len__+1):
            message += '\t' + events[i][0] + '\n'
            message += '\t\t' + events[i][1].title + ' : ' + events[i][1].date.time()
            if(events[i][1].duration.time() != events[i][1].date.time()):
                message += ' - ' + events[i][1].duration.time()
            message += '\n'
            
        return message


    # Used to export a list of Calendar objects to a file
    # Calendar objects list passed to Exporter from the Main Calendar Display
    # For the prototype, we will just save the information as a text file
    # For a fully fleshed out application, we would have the options to save
    # as a PDF and .ics file.
    def exportCalendar(self, calendars, month) -> FPDF:
        outPdf = FPDF(orientation="P", unit="mm", format="Letter")

        outPdf.add_page()
        outPdf.set_font("Times", size=12)

        outPdf.set_title("Saved Calendar")

        outPdf.cell(100, 1200, self.printCalendar(calendars, month))

        return outPdf
