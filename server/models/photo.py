from models.__init__ import SerializerMixin, validates, db, re


class Photograph(db.Model, SerializerMixin):
    __tablename__ = "photographs"


    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'))
    photographer_id = db.Column(db.Integer, db.ForeignKey('photographers.id'))
    image_url = db.Column(db.String, unique=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    photographer = db.relationship("Photographer", back_populates="photos")
    booking = db.relationship("Booking", back_populates="photos")

    serialize_rules = ("-photographer", "-booking")