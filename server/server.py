from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os
import util

app = Flask(__name__, template_folder='templates')
CORS(app)

# Configure paths
app.template_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
client_folder = os.path.join(app.template_folder, 'client')

@app.route('/')
def home():
    return render_template('client/index.html')

@app.route('/client/<path:filename>')
def client_files(filename):
    return send_from_directory(client_folder, filename)

@app.route('/get_location_name')
def get_location_name():
    response = jsonify({
        'locations': util.get_location_names()
    })
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location, total_sqft, bhk, bath)
    })

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run(debug=True)