# ❤️ Heart Disease Prediction System

**Heart Disease Prediction System** is a web application that helps users assess their risk of heart disease using a trained machine learning model. It provides a simple, intuitive interface to enter health parameters and receive an immediate, easy-to-understand risk assessment.

---

## 📌 Overview

Early detection of heart disease can dramatically improve outcomes. This project demonstrates a practical pipeline that converts clinical and lifestyle inputs into a risk prediction, presented through a user-friendly web interface. The system is intended as a preliminary screening tool to raise awareness and encourage professional medical consultation when needed.

---

## ✨ Features

- **User-friendly interface** with validated data input forms  
- **Real-time predictions** — immediate risk output after form submission  
- **Secure user accounts** and personal result history (where applicable)  
- **Clear visualization** and textual interpretation of model output  
- **Modular architecture** for easy extension and integration with new data sources  
- **Privacy-aware design**: results are presented locally or through secure APIs

---

## 📊 Prediction Parameters

The prediction model uses the following health indicators as input features:

- Age  
- Sex  
- Chest Pain Type  
- Resting Blood Pressure  
- Serum Cholesterol  
- Fasting Blood Sugar  
- Resting ECG Results  
- Maximum Heart Rate Achieved  
- Exercise-Induced Angina  
- ST Depression Induced by Exercise  
- Slope of the Peak Exercise ST Segment  
- Number of Major Vessels Colored  
- Thalassemia

> These parameters are typical of public heart-disease datasets and clinical assessments. The system validates inputs before making predictions.

---

## 🛠 How It Works (Conceptual)

1. **User Interaction** — A user logs in (optional) and fills a health form with the parameters above.  
2. **Request Handling** — The frontend sends the cleaned and validated input to a prediction endpoint.  
3. **Model Inference** — The backend transforms inputs into the model's expected format and computes a risk score or class.  
4. **Result Presentation** — The result is returned to the frontend and displayed with explanatory text and visual cues (e.g., risk band, suggestions).  
5. **Optional Storage** — With user consent, results can be saved to a user profile for future reference.

---

## 📥 Installation

### Install Python & Backend Dependencies
Make sure **Python 3.8+** is installed. Then install the required Python libraries:

    pip install flask
    pip install flask-cors
    pip install scikit-learn
    pip install pandas
    pip install numpy

If you have a `requirements.txt` file, you can run:

    pip install -r requirements.txt

---

### Install Node.js, React, and Frontend Dependencies
Make sure **Node.js** and **npm** are installed. Navigate to the frontend folder and install the dependencies:

    cd frontend
    npm install

This will install React, React Router, Material-UI, and other required libraries.

---

## ▶️ Running the Project

### Start Backend
Navigate to the backend folder (where `app.py` is located):

    cd backend
    python app.py

This starts the Flask server (default: `http://127.0.0.1:5000/`).

---

### Start Frontend
In a separate terminal window:

    cd frontend
    npm start

This starts the React app (default: `http://localhost:3000/`).

---

## 📷 Screenshots & Diagram

> Place these images in an `assets/` folder in your repository.

![System Architecture](assets/system-architecture.png)  
*System Architecture of Heart Disease Prediction System*

![Heart Form](assets/heartform-screenshot.png)  
*User Interface for entering health parameters*

![Prediction Output](assets/prediction-output.png)  
*Sample Prediction Result*

---

## 📈 Output Interpretation (Example)

- **Low risk** — No immediate action required; follow preventive measures and routine checkups.  
- **Moderate risk** — Consider scheduling a checkup with a healthcare provider and reviewing lifestyle factors.  
- **High risk** — Seek professional medical evaluation promptly.

---

## 🔭 Future Scope

- Integration with wearable and remote-monitoring devices for continuous assessment  
- Ensemble or deep-learning approaches to improve performance  
- Cloud deployment for wider availability and scalability  
- Multilingual UI and accessibility improvements  
- Integration with electronic health records (EHRs) under appropriate privacy safeguards

---

## 👥 Contributors

- Project authors: Shreyansh Shukla , Sarthak Rautela, Shubh Bishnoi

---

## 📄 License

This project is Lisence is reserved to the project Authors .

---

## 📬 Contact

For questions, suggestions, or collaboration, open an issue in this repository or contact the maintainers via the details in the repo profile. Also can mail us in shreyanshshukla.21011724@gehu.ac.in , shubhbishnoi.210111561@gehu.ac.in or sarthakrautela,21011982@gehu.ac.in

---
