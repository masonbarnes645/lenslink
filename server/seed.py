from random import choice as rc
from werkzeug.security import generate_password_hash


from faker import Faker
import random
from datetime import time


from app import app, db
from models.booking import Booking
from models.customer import Customer
from models.photo import Photograph
from models.photographer import Photographer
from models.review import Review

fake = Faker()

photos = ["https://images.pexels.com/photos/27914301/pexels-photo-27914301/free-photo-of-reflexion-urbana.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/25786814/pexels-photo-25786814/free-photo-of-reflection-of-a-woman-in-small-pieces-of-a-broken-mirror-held-by-two-hands-in-front-of-an-apartment-building-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/28589065/pexels-photo-28589065/free-photo-of-black-and-white-portrait-by-river.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/14467849/pexels-photo-14467849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/29140770/pexels-photo-29140770/free-photo-of-cozy-dog-relaxing-on-a-couch-in-the-living-room.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/24877164/pexels-photo-24877164/free-photo-of-a-woman-standing-in-front-of-a-rug.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/29435310/pexels-photo-29435310/free-photo-of-close-up-of-cinnamon-sticks-in-a-bowl.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/4309368/pexels-photo-4309368.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/5390348/pexels-photo-5390348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/29250590/pexels-photo-29250590/free-photo-of-vibrant-autumn-foliage-in-a-forest-setting.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]


def generate_random_time():
    hour = random.randint(8, 19)
    minute = random.randint(0, 59)
    return time(hour=hour, minute=minute)



def seed_data():
    with app.app_context():

        Booking.query.delete()
        Customer.query.delete()
        Photograph.query.delete()
        Photographer.query.delete()
        Review.query.delete()

        db.session.commit()

        customers = []
        for _ in range(10):
            customer = Customer(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.unique.email(),
                created_at=fake.date_time_this_decade(),
            )
            customer.password_hash = generate_password_hash("password")
            customers.append(customer)
            db.session.add(customer)

        db.session.commit()

        photographers = []
        for _ in range(10):
            photographer = Photographer(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.unique.email(),
                created_at=fake.date_time_this_decade(),
            )
            photographer.password_hash = generate_password_hash("password")
            photographers.append(photographer)
            db.session.add(photographer)

        db.session.commit()

        bookings = []
        for _ in range(10):
            booking = Booking(
                customer_id=rc(customers).id,
                photographer_id=rc(photographers).id,
                session_length=random.randint(1, 5),
                booking_date=fake.date_between(start_date="today", end_date="+1y"),
                booking_time=generate_random_time(),
                location=fake.city(),
                created_at=fake.date_time_this_decade(),
            )
            bookings.append(booking)
            db.session.add(booking)
            db.session.commit()

        photographs = []
        for _ in range(250):
            photograph = Photograph(
                booking_id=random.choice(bookings).id,
                photographer_id=random.choice(photographers).id,
                image_url=random.choice(photos),
                title=fake.sentence(nb_words=1),
                description=fake.sentence(),
            )
            photographs.append(photograph)
            db.session.add(photograph)

        db.session.commit()

        customers = Customer.query.all()
        photographers = Photographer.query.all()

        reviews = []
        for _ in range(10):
            review = Review(
                customer_id=random.choice(customers).id,
                photographer_id=random.choice(photographers).id,
                rating=random.randint(0, 5),
                body=fake.text(max_nb_chars=500),
                created_at=fake.date_time_this_decade(),
            )
            reviews.append(review)
            db.session.add(review)

        db.session.commit()

        print("Seeding completed.")


if __name__ == "__main__":
    seed_data()
