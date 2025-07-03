# import eventlet
# eventlet.monkey_patch()
from flask import Flask, request
import pickle
import os
import pandas as pd
from flask_socketio import SocketIO, emit


app = Flask(__name__)

# Enable CORS for all routes 
socketio = SocketIO(app, cors_allowed_origins="*", async_mode="threading")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model', 'model.pkl')
model = pickle.load(open(MODEL_PATH, 'rb'))

def validation(data):
    required_fields = ['age', 'bmi', 'smoker', 'sex', 'children', 'region']
    for field in required_fields:
        if field not in data:
            return False, f"Missing field: {field}"
        
    smoker_map = {'yes': 1, 'no': 0, '1': 1, '0': 0}
    sex_map = {'male': 1, 'female': 0, '1': 1, '0': 0}
    region_map = {'northeast': 0, 'southeast': 1, 'southwest': 2, 'northwest': 3, '0': 0, '1': 1, '2': 2, '3': 3}

    try:
        age = int(data['age'])
        if age < 0 or age > 150:
            return False, "Age must be between 0 and 150"

        bmi = float(data['bmi'])
        if bmi < 0 or bmi > 80:
            return False, "BMI must be between 0 and 80"

        smoker_str = str(data['smoker']).lower()
        if smoker_str not in smoker_map:
            return False, "Smoker must be 'yes' or 'no'"
        smoker = smoker_map[smoker_str]

        sex_str = str(data['sex']).lower()
        if sex_str not in sex_map:
            return False, "Sex must be 'male' or 'female'"
        sex = sex_map[sex_str]

        children = int(data['children'])
        if children < 0:
            return False, "Children must be >= 0"
        
        region_str = str(data['region']).lower()
        if region_str not in region_map:
            return False, "Region must be one of northeast, southeast, southwest, northwest"
        region = region_map[region_str]

    except ValueError:
        return False, "Invalid data type"
    
    data.update({
        'age': age,
        'sex': sex,
        'bmi': bmi,
        'children': children,
        'smoker': smoker,
        'region': region
    })

    return True, ""

@socketio.on('predict')
def predict(data):
    print("Data:", data)
    is_valid, message = validation(data)
    if not is_valid:
        emit('prediction_error', {'error': message})
        return

    df = pd.DataFrame([data])
    df = df[['age', 'sex', 'bmi', 'children', 'smoker', 'region']]

    prediction = model.predict(df).item()
    emit('predict_response', {'prediction': int(prediction)})

if __name__ == '__main__':
    socketio.run(app, debug=True, host='127.0.0.1', port=5000, allow_unsafe_werkzeug=True)