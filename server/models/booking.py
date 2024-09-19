from models.__init__ import SerializerMixin, validates, db, datetime, association_proxy
from datetime import date, time



class Booking(db.Model, SerializerMixin):
    __tablename__="bookings"
    
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    photographer_id = db.Column(db.Integer, db.ForeignKey('photographers.id'))
    session_length = db.Column(db.Float)
    booking_date = db.Column(db.Date)
    booking_time = db.Column(db.Time)
    location = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    customer = db.relationship("Customer", back_populates="bookings")
    photographer = db.relationship("Photographer", back_populates="bookings")
    photos = db.relationship("Photograph", back_populates="booking")

    serialize_rules = ("-customer", "-photographer")


    @validates("session_length")
    def validate_session_length(self, _, session_length):
        if session_length % 0.5 != 0:
            raise ValueError("session length must be in increments of 0.5")
        return session_length
    
    @validates("booking_date")
    def validate_booking_date(self, _, booking_date):
        if isinstance(booking_date, str):
            try:
                booking_date = datetime.strptime(booking_date, '%Y-%m-%d').date()
            except ValueError:
                raise ValueError("Invalid date format. Use 'YYYY-MM-DD' format.")
        if booking_date <= date.today():
            raise ValueError("Booking date must be in the future")
        
        return booking_date
   
    @validates("location")
    def validate_location(self, _, location):
        if not isinstance(location, str):
            raise TypeError("location must be a string")
        return location
    
    @validates("booking_time")
    def validate_booking_time(self, _, booking_time):
        if isinstance(booking_time, str):
            try:
                booking_time = datetime.strptime(booking_time, '%H:%M').time()
            except ValueError:
                raise ValueError("Invalid time format. Use 'HH:MM' format.")
    
        if not (time(8, 0) <= booking_time <= time(20, 0)):
            raise ValueError("Booking time must be between 8:00 AM and 8:00 PM")
        
        return booking_time