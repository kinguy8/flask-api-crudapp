from api import db, ma


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)

    def __init__(self, name):
        self.name = name

    
#Product Schema
class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')


product_schema = ProductSchema()
products_schema = ProductSchema(many=True)


