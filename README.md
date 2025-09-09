
# 🏠 Home Price Prediction - Flask App

This project is a simple **Home Price Prediction Web App** built using **Python**, **Flask**, and **Machine Learning**. It allows users to input property details like square footage, location, number of bedrooms (BHK), and bathrooms to get an estimated home price.

---

## 📁 Project Structure

```

home\_price\_prediction/
│
├── templates/
│   └── client/
│       └── index.html        # Frontend HTML file
│
├── util.py                   # ML model loading & utility functions
├── app.py                   # Flask backend API
├── README.md                # Project documentation (this file)
└── requirements.txt         # Python dependencies

````

---

## 🚀 Features

- Predicts house prices based on:
  - Location
  - Total square feet
  - Number of BHK
  - Number of bathrooms
- Web interface built with HTML & served via Flask
- CORS enabled for API usage with external clients

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/abhishekawasthi565/banglore_price_prediction_flask.git
cd home_price_prediction
````

### 2. Create a Virtual Environment (Optional but Recommended)

```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Add Required Files

Make sure your `util.py` includes:

* A trained ML model (e.g., `bangalore_home_prices_model.pickle`)
* A JSON or similar file with location names, if applicable

And that `util.py` has these methods:

* `load_saved_artifacts()`
* `get_location_names()`
* `get_estimated_price(location, sqft, bhk, bath)`

> You may need to train your model using a Jupyter Notebook and export the artifacts.

### 5. Run the App

```bash
python app.py
```

The server will start on `http://127.0.0.1:5000/`.

---

## 📫 API Endpoints

### `GET /`

Serves the main web UI (`index.html`).

---

### `GET /get_location_name`

Returns all available locations as a JSON list:

```json
{
  "locations": ["Location1", "Location2", "Location3", ...]
}
```

---

### `POST /predict_home_price`

Accepts form data and returns the estimated price:

#### Request Form Data:

* `total_sqft`: float
* `location`: string
* `bhk`: int
* `bath`: int

#### Example Response:

```json
{
  "estimated_price": 123.45
}
```

---

## 🌐 Frontend Access

The frontend is located at:

```
http://127.0.0.1:5000/
```

Additional static files can be served from `/client/<filename>` if needed.

---

## 🛠 Built With

* [Python](https://www.python.org/)
* [Flask](https://flask.palletsprojects.com/)
* [Scikit-learn](https://scikit-learn.org/)
* [HTML/CSS/JavaScript](https://developer.mozilla.org/en-US/docs/Web)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Your Name**
[Your GitHub Profile](https://github.com/abhishekawasthi565)

---

## ⭐️ Support

If you like this project, give it a ⭐️ on [GitHub](https://github.com/abhishekawasthi565/home_price_prediction)!

```

---

