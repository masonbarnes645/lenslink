from models.__init__ import SerializerMixin, validates, db, re, hybrid_property, flask_bcrypt


class Photographer(db.Model, SerializerMixin):
    __tablename__ = "photographers"
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column("password", db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    reviews = db.relationship("Review", back_populates="photographer")
    bookings = db.relationship("Booking", back_populates="photographer")
    photos = db.relationship("Photograph", back_populates="photographer")

    def __init__(self, email, password=None, **kwargs):
        super().__init__(email=email, **kwargs)
        if password:
            self.password_hash = password
    @hybrid_property
    def password_hash(self):
        raise AttributeError("Passwords are private")
    
    @password_hash.setter
    def password_hash(self, new_pass):
        if not isinstance(new_pass, str):
            raise TypeError("Password must be of type string")
        elif len(new_pass) < 8:
            raise ValueError("Password must be at least 8 characters")
        hash_pass = flask_bcrypt.generate_password_hash(new_pass).decode("utf-8")
        self._password_hash = hash_pass

    def authenticate(self, pass_check):
        return flask_bcrypt.check_password_hash(self._password_hash, pass_check)     

    @validates("email")
    def validate_email(self, _, email):
        if not isinstance(email, str):
            raise TypeError("Email must be a string")
        elif not re.match(r"^[\w\.-]+@([\w]+\.)+[\w-]{2,}$", email):
            raise ValueError("Email must be in a proper format")
        return email