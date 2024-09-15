
from random import choice as rc
from werkzeug.security import generate_password_hash

from faker import Faker
import random


from app import app, db
from models.booking import Booking
from models.customer import Customer
from models.photo import Photograph
from models.photographer import Photographer
from models.review import Review

fake = Faker()


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
                created_at=fake.date_time_this_decade()
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
                customer_id=random.choice(customers).id,  
                photographer_id=random.choice(photographers).id,  
                session_length=random.uniform(1.0, 5.0), 
                booking_date=fake.date_this_year(),  
                booking_time=random.uniform(8.0, 18.0), 
                location=fake.city(),  
                created_at=fake.date_time_this_decade(),
            )
            bookings.append(booking)
            db.session.add(booking)

        db.session.commit()


        photographs = []
        for _ in range(50):
            photograph = Photograph(
                booking_id=random.choice(bookings).id, 
                photographer_id=random.choice(photographers).id,  
                image_url=fake.unique.image_url(),  
                title=fake.sentence(nb_words=3),  
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