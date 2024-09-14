# Standard library imports
from random import choice as rc
from werkzeug.security import generate_password_hash

# Remote library imports
from faker import Faker
import random

# Local imports
from app import app, db
from models.booking import Booking
from models.customer import Customer
from models.photo import Photograph
from models.photographer import Photographer
from models.review import Review

fake = Faker()


def seed_data():
    with app.app_context():
        # Delete old data
        Booking.query.delete()
        Customer.query.delete()
        Photograph.query.delete()
        Photographer.query.delete()
        Review.query.delete()

        db.session.commit()  # Clear old data in the database

        # Seed Customers
        customers = []
        for _ in range(10):
            customer = Customer(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.unique.email(),
                _password_hash=generate_password_hash("password"),  # Use hashed password
                created_at=fake.date_time_this_decade(),
            )
            customers.append(customer)
            db.session.add(customer)

        db.session.commit()

        # Seed Photographers
        photographers = []
        for _ in range(10):
            photographer = Photographer(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.unique.email(),
                _password_hash=generate_password_hash("password"),  # Use hashed password
                created_at=fake.date_time_this_decade(),
            )
            photographers.append(photographer)
            db.session.add(photographer)

        db.session.commit()

        # Seed Bookings
        bookings = []
        for _ in range(10):
            booking = Booking(
                customer_id=random.choice(customers).id,  # Randomly select a customer ID
                photographer_id=random.choice(photographers).id,  # Randomly select a photographer ID
                session_length=random.uniform(1.0, 5.0),  # Generate a random session length
                booking_date=fake.date_this_year(),  # Generate a random date
                booking_time=random.uniform(8.0, 18.0),  # Random time between 8 AM and 6 PM
                location=fake.city(),  # Generate a random city location
                created_at=fake.date_time_this_decade(),
            )
            bookings.append(booking)
            db.session.add(booking)

        db.session.commit()

        # Seed Photographs
        photographs = []
        for _ in range(50):
            photograph = Photograph(
                booking_id=random.choice(bookings).id,  # Randomly select a booking ID
                photographer_id=random.choice(photographers).id,  # Randomly select a photographer ID
                image_url=fake.unique.image_url(),  # Ensure unique image URL
                title=fake.sentence(nb_words=3),  # Generate a random title
                description=fake.sentence(),  # Generate a random description
            )
            photographs.append(photograph)
            db.session.add(photograph)

        db.session.commit()

        # Seed Reviews
        customers = Customer.query.all()  # Fetch all customers
        photographers = Photographer.query.all()  # Fetch all photographers

        reviews = []
        for _ in range(10):
            review = Review(
                customer_id=random.choice(customers).id,  # Randomly select a customer ID
                photographer_id=random.choice(photographers).id,  # Randomly select a photographer ID
                rating=random.randint(0, 5),  # Rating between 0 and 5
                body=fake.text(max_nb_chars=500),  # Random body text, max 500 characters
                created_at=fake.date_time_this_decade(),
            )
            reviews.append(review)
            db.session.add(review)

        db.session.commit()

        print("Seeding completed.")


if __name__ == "__main__":
    seed_data()
