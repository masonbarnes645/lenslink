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
    photos = db.relationship("Photo", back_populates="booking")

    serialize_rules = ("-customer", "-photographer")