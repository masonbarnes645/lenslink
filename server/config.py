# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from flask_session import Session
from os import environ


# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = environ.get("SESSION_SECRET")
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'lenslinkoutreach@gmail.com'
app.config['MAIL_PASSWORD'] = 'idsa fmnj keyy rosg'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

app.config["SESSION_TYPE"] = "sqlalchemy"
app.config["SESSION_SQLALCHEMY"] = db


# Instantiate REST API
api = Api(app, prefix='/api/v1')

# Instantiate CORS
CORS(app)

# flask-bcrypt configuration
flask_bcrypt = Bcrypt(app)

# flask-session configuration
Session(app)