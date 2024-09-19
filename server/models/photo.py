from models.__init__ import SerializerMixin, validates, db, re


class Photograph(db.Model, SerializerMixin):
    __tablename__ = "photographs"


    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'))
    photographer_id = db.Column(db.Integer, db.ForeignKey('photographers.id'))
    image_url = db.Column(db.String)
    title = db.Column(db.String)
    description = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    photographer = db.relationship("Photographer", back_populates="photos")
    booking = db.relationship("Booking", back_populates="photos")

    serialize_rules = ("-photographer", "-booking")


    @validates("title")
    def validate_title(self, _, title):
        if not isinstance(title, str):
            raise TypeError("Title must be a string")
        if not (2 <= len(title) <= 30):
            raise ValueError("title must be between 2 and 30 characters")
        return title
    
    @validates("description")
    def validate_description(self, _, description):
        if not isinstance(description, str):
            raise TypeError("Description must be a string")
        if not (5 <= len(description) <= 100):
            raise ValueError("Description must be between 5 and 100 characters")
        return description
    
    @validates("image_url")
    def validate_image_url(self, _, image_url):
        if not isinstance(image_url, str):
            raise TypeError("image_url must be a string")
        return image_url
    
        
