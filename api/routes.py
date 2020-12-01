from flask import render_template, request, redirect, url_for, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import json

from api import app, db, ma
from api.models import *


@app.route("/product", methods=['POST'])
def add_product():
    try:
        name = request.json['name']
        if not name:
            raise ValueError("Incorrect data")
        else:
            new_product = Product(name)
            db.session.add(new_product)
            db.session.commit()
            print('Запись успешно добавлена')
    except ValueError as error:
        print("Incorrect data")
        db.session.rollback()
        print('Ошибка записи в базу данных')
    
    return product_schema.jsonify(new_product)


@app.route("/product", methods=['GET'])
def get_product():
    all_product = Product.query.all()
    res = products_schema.dump(all_product)
    return jsonify(res)


@app.route("/product/<id>", methods=['GET'])
def get_one_product(id):
    product = Product.query.get(id)
    res = product_schema.dump(product)
    return jsonify(res)


@app.route("/product/<id>", methods=['PUT'])
def update_product(id):
    name = request.json['name']
    
    try:
        product = Product.query.get(id)
        product.name = name
        db.session.commit()
    except:
        print("Ошибка при изменении объекта")

    return product_schema.jsonify(product)


@app.route("/product/<id>", methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    try:
        db.session.delete(product)
        db.session.commit()
    except:
        print("Ошибка при удалении")
    return product_schema.jsonify(product)

