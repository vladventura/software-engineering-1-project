from flask import Flask
from flask_cors import CORS
from routes.Calendars import calendars

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.register_blueprint(calendars, url_prefix="/api/calendars")

if __name__ == "__main__":
    app.run()
