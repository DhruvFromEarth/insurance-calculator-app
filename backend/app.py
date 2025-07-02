from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes 
CORS(app, resources={r"/*": {"origins": "*"}})

model = pickle.load(open('./model/model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def pred():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)
    prediction = model.predict(features).item()
    return jsonify({'prediction': int(prediction)})


if __name__ == '__main__':
    app.run(debug=True)