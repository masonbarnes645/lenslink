# Remote library imports
from flask import request, make_response, session, redirect
from flask_restful import Resource
import os
from datetime import datetime
from functools import wraps


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

# Local imports
from config import app, db, api
from models.booking import Booking
from models.customer import Customer
from models.photo import Photograph
from models.photographer import Photographer
from models.review import Review


class PhotoById(Resource):
    def get(self, id):
        try:
            photo = db.session.get(Photograph, id)

            if photo is None:
                return make_response({"error": str(e)}, 404)
            else:
                return make_response(photo.to_dict(), 200)
        except Exception as e:
            return make_response({"error": str(e)}, 404)

        

class Photos(Resource):
    def get(self):
        try:
            return make_response([photo.to_dict() for photo in Photograph.query], 200)
        except Exception as e:
            return make_response({"error": str(e)}, 404)
    def post(self):
        try:
            data = request.get_json()
            new_photo = Photograph(**data)
            db.session.add(new_photo)
            db.session.commit()
            return make_response(new_photo.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 400)
    
class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            email = data.get('email')
            cEmail = db.session.query(Customer).filter_by(email=email).first()
            pEmail = db.session.query(Photographer).filter_by(email=email).first()
            if cEmail or pEmail:
                return make_response({"error":"Email is already registered to account"}, 400)
            role = data.pop("role", None)
            
            if role == "customer":
                new_user = Customer(**data)
            elif role == "photographer":
                new_user = Photographer(**data)
            else:
                return make_response({"error": "Invalid role provided"}, 400)

            db.session.add(new_user)
            db.session.commit()
            
            session["user_id"] = new_user.id
            return make_response(new_user.to_dict(), 201)

        except Exception as e:
            db.session.rollback()
            if "UNIQUE constraint failed" in str(e):
                return make_response({"error": "Email already exists"}, 400)
            return make_response({"error": str(e)}, 400)
        
class Login(Resource):
    def post(self):
        try:
            data = request.get_json()
            email = data.get("email")
            password = data.get("password")

            user = Customer.query.filter_by(email=email).first() or Photographer.query.filter_by(email=email).first()

            if user and user.authenticate(password):
                session["user_id"] = user.id
                session["role"] = "customer" if isinstance(user, Customer) else "photographer"
                print(f"Session after login: {session}")

                return make_response(user.to_dict(), 200)

            return make_response({"error": "Incorrect email or password"}, 401)

        except Exception as e:
            return make_response({"error": str(e)}, 422)
        
class CheckSession(Resource):
    def get(self):
        try:
            user_id = session.get("user_id")
            role = session.get("role")

            if not user_id or not role:
                return make_response({"error": "No logged in user"}, 401)

            if role == "customer":
                user = db.session.get(Customer, user_id)
            elif role == "photographer":
                user = db.session.get(Photographer, user_id)
            else:
                return make_response({"error": "Invalid role in session"}, 400)
            
            if user:
                return make_response(
                    user.to_dict(rules=("id", "email", "first_name")), 200
                )
            
            return make_response({"error": "User not found"}, 404)

        except Exception as e:
            return make_response({"error": str(e)}, 422)
        
class Logout(Resource):
    def delete(self):
        try:
            if session.get("user_id"):
                del session["user_id"]
                return make_response({}, 204)
            else:
                return make_response({}, 400)
        except Exception as e:
            return make_response({}, 400)


class Photographers(Resource):
    def get(self):
        try:
            return make_response([photographer.to_dict() for photographer in Photographer.query], 200)
        except Exception as e:
            return make_response({"error": str(e)}, 404)
        
class PhotographerById(Resource):
    def get(self, id):
        try:
            photographer = db.session.get(Photographer, id)
            if photographer:
                return make_response(photographer.to_dict(), 200 )
            return make_response({"error": str(e)}, 404)
        except Exception as e:
            return make_response({"error": str(e)}, 400)


        

api.add_resource(PhotoById, "/photographs/<int:id>")
api.add_resource(Photos, "/photographs")
api.add_resource(Signup, "/signup")
api.add_resource(Photographers, "/photographers")
api.add_resource(PhotographerById, "/photographers/<int:id>")
api.add_resource(Login, "/login")
api.add_resource(CheckSession, "/check-session")
api.add_resource(Logout,"/logout")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
