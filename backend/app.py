from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

model = load_model('heart_model.h5')
scaler = joblib.load('scaler.save')
selected_features = np.load('selected_features.npy')  # Load selected features

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        required_fields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 
                         'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
        
        # Validate all fields are present
        for field in required_fields:
            if field not in data or data[field] == '':
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Convert to array and select only the important features
        all_features = np.array([[float(data[field]) for field in required_fields]])
        scaled = scaler.transform(all_features)
        selected = scaled[:, selected_features]  # Use only selected features
        reshaped = selected.reshape(1, len(selected_features), 1)  # Reshape based on selected features count

        prediction = model.predict(reshaped)[0][0]

        return jsonify({
            'probability': float(prediction),
            'diagnosis': 'High risk' if prediction > 0.5 else 'Low risk',
            'confidence': 'High' if abs(prediction-0.5) > 0.3 else 'Medium' if abs(prediction-0.5) > 0.15 else 'Low',
            'selected_features': selected_features.tolist()  # Return which features were used
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)