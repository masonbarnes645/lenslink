from models.__init__ import SerializerMixin, validates, db, re


class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    body = db.Column(db.String)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))
    photographer_id = db.Column(db.Integer, db.ForeignKey('photographers.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    photographer = db.relationship("Photographer", back_populates="reviews")
    customer = db.relationship("Customer", back_populates="reviews")


    serialize_rules = ("-photographer", "-customer")




    @validates("rating")
    def validate_rating(self, _, rating):
        if not isinstance(rating, int):
            raise TypeError("Rating must be of type integer")
        if not (0 <= rating <= 5):
            raise ValueError("Rating must be between 0 and 5")
        return rating
    @validates("body")
    def validate_body(self,_, body):
        if not isinstance(body,str):
            raise TypeError("Review body must be of type string")
        if len(body) > 1000:
            raise ValueError("Body cannot exceed 1000 characters")

