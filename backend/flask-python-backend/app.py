from flask import Flask, json, render_template, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_cors import CORS
import pymongo
import yaml

app = Flask(__name__)
config = yaml.safe_load(open('database.yaml'))
client = MongoClient(config['uri'])
db = client['crud_db']
CORS(app)


@app.route('/drinks', methods=['POST', 'GET'])
def data():

    # POST a data to database
    if request.method == 'POST':
        _json = request.json
        _drink_name = _json['drinkName']
        _volume = _json['volume']
        _calories = _json['calories']
        _caffeine = _json['caffeine']
        _type_of_drink = _json['type']
        # db.users.insert_one({
        db['drinks'].insert_one({
            'Drink Name': _drink_name,
            'Volume (ml)': _volume,
            'Calories':_calories,
            'Caffeine (mg)': _caffeine,
            'Type of Drink': _type_of_drink
        })
        return jsonify({
            'status': 'Data is posted to MongoDB!',
            'Drink Name': _drink_name,
            'Volume (ml)': _volume,
            'Calories':_calories,
            'Caffeine (mg)': _caffeine,
            'Type of Drink': _type_of_drink
        })

    # GET all data from database
    if request.method == 'GET':
        allData = db['drinks'].find()
        dataJson = []
        for data in allData:
            id = data['_id']
            _drink_name = data['Drink Name']
            _volume = data['Volume (ml)']
            _calories = data['Calories']
            _caffeine = data['Caffeine (mg)']
            _type_of_drink = data['Type of Drink']
            dataDict = {
                'id': str(id),
                'Drink Name': _drink_name,
                'Volume (ml)': _volume,
                'Calories':_calories,
                'Caffeine (mg)': _caffeine,
                'Type of Drink': _type_of_drink
            }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)


@app.route('/view-analytics/<string:chart>', methods=['GET'])
def graph(chart):
    if request.method == 'GET':
        types= ["Coffee", "Tea", "Energy Drinks", "Energy Shots", "Water", "Soft Drinks"]
        # To calculate average calorie content in each type of drink
        dataDict = {}
        if str(chart) == "Bar":
            for type in types:
                data = db['drinks'].find({'Type of Drink': type}, {'_id' : 0, 'Calories':1})
                length = len(list(data.clone()))
                sum = 0.0
                for val in data:
                    sum = sum + float(val['Calories'])
                avg = sum/length
                dataDict[type] = avg
            print(dataDict)
            return jsonify(dataDict)
        # To find max caffeine content in each type
        else:
            for type in types:
                data = db['drinks'].find({'Type of Drink': type}).sort('Caffeine (mg)', pymongo.DESCENDING).limit(1)
                for val in data:
                    caffeine = val['Caffeine (mg)']
                    dataDict[type] = caffeine
            print(dataDict)
            return jsonify(dataDict)

# @app.route('/search/<string:name>',methods=['GET'])
# def search(name):
#     if request.method == 'GET':
#         allData = db['drinks'].find({'Drink Name': str(name)})
#         dataJson = []
#         for data in allData:
#             id = data['_id']
#             _drink_name = data['Drink Name']
#             _volume = data['Volume (ml)']
#             _calories = data['Calories']
#             _caffeine = data['Caffeine (mg)']
#             _type_of_drink = data['Type of Drink']
#             dataDict = {
#                 'id': str(id),
#                 'Drink Name': _drink_name,
#                 'Volume (ml)': _volume,
#                 'Calories':_calories,
#                 'Caffeine (mg)': _caffeine,
#                 'Type of Drink': _type_of_drink
#             }
#             dataJson.append(dataDict)
#         print(dataJson)
#         return jsonify(dataJson)


@app.route('/drinks/<string:id>', methods=['GET', 'DELETE', 'PUT'])
def onedata(id):

    # GET a specific data by id
    if request.method == 'GET':
        data = db['drinks'].find_one({'_id': ObjectId(id)})
        id = data['_id']
        _drink_name = data['Drink Name']
        _volume = data['Volume (ml)']
        _calories = data['Calories']
        _caffeine = data['Caffeine (mg)']
        _type_of_drink = data['Type of Drink']
        dataDict = {
            'id': str(id),
            'Drink Name': _drink_name,
            'Volume (ml)': _volume,
            'Calories':_calories,
            'Caffeine (mg)': _caffeine,
            'Type of Drink': _type_of_drink
        }
        print(dataDict)
        return jsonify(dataDict)

    # DELETE a data
    if request.method == 'DELETE':
        db['drinks'].delete_many({'_id': ObjectId(id)})
        print('\n # Deletion successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is deleted!'})

    # UPDATE a data by id
    if request.method == 'PUT':
        _json = request.json
        _drink_name = _json['drinkName']
        _volume = _json['volume']
        _calories = _json['calories']
        _caffeine = _json['caffeine']
        _type_of_drink = _json['type']

        db['drinks'].update_one(
            {'_id': ObjectId(id)},
            {
                "$set": {
                    'Drink Name': _drink_name,
                    'Volume (ml)': _volume,
                    'Calories':_calories, 
                    'Caffeine (mg)': _caffeine,
                    'Type of Drink': _type_of_drink
                }
            }
        )

        print('\n # Update successful # \n')
        return jsonify({'status': 'Data id: ' + id + ' is updated!'})

if __name__ == '__main__':
    app.debug = True
    app.run()
