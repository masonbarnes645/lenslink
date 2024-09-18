from models.__init__ import SerializerMixin, validates, db, datetime, association_proxy 



class Booking(db.Model, SerializerMixin):
    __tablename__="bookings"
    
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    photographer_id = db.Column(db.Integer, db.ForeignKey('photographers.id'))
    session_length = db.Column(db.Float)
    booking_date = db.Column(db.String)
    booking_time = db.Column(db.Float)
    location = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    customer = db.relationship("Customer", back_populates="bookings")
    photographer = db.relationship("Photographer", back_populates="bookings")
    photos = db.relationship("Photograph", back_populates="booking")

    serialize_rules = ("-customer", "-photographer")


    @validates("session_length")
    def session_length(self, _, session_length):
        if not isinstance(session_length, float):
            raise TypeError("session length must be of type float")
        if session_length % 0.5 != 0:
            raise ValueError("session length must be in increments of 0.5")
        return session_length
    
    @validates("booking_date")
    def validate_booking_date(self, _, booking_date):
        if not isinstance(booking_date, datetime):
            raise TypeError("booking date must be of type datetime")
        if booking_date <= datetime.now():
            raise ValueError("booking date must be in the future")
        return booking_date
   
    @validates("location")
    def validate_location(self, _, location):
        if not isinstance(location, str):
            raise TypeError("location must be a string")
        return location
    
        
