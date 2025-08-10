import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv1D, MaxPooling1D, Flatten, Dense, Input, Dropout, BatchNormalization
from tensorflow.keras.regularizers import l2
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import joblib
from tensorflow.keras.models import save_model

# Load and prepare data
data = pd.read_csv('Heart disease dataset (not final).csv')
X = data.drop('target', axis=1).values
y = data['target'].values.reshape(-1, 1)

# Normalize data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_reshaped = X_scaled.reshape(X_scaled.shape[0], X_scaled.shape[1], 1)

# Stratified split to maintain class balance
X_train, X_temp, y_train, y_temp = train_test_split(
    X_reshaped, y, 
    test_size=0.3, 
    random_state=42, 
    stratify=y
)
X_val, X_test, y_val, y_test = train_test_split(
    X_temp, y_temp, 
    test_size=0.5, 
    random_state=42, 
    stratify=y_temp
)

# Enhanced CNN model builder
def build_model(input_shape, filters=16, kernel_size=3, dense_units=16):
    model = Sequential([
        Input(shape=input_shape),
        Conv1D(filters, kernel_size, activation='relu', kernel_regularizer=l2(0.05)),
        BatchNormalization(),
        MaxPooling1D(2),
        Dropout(0.5),
        Flatten(),
        Dense(dense_units, activation='relu', kernel_regularizer=l2(0.05)),
        Dropout(0.4),
        Dense(1, activation='sigmoid')
    ])
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    return model

# Early stopping callback
early_stopping = EarlyStopping(
    monitor='val_loss',
    patience=5,
    restore_best_weights=True,
    verbose=1
)

# GA Feature Selection 
def genetic_algorithm(X_train, y_train, X_val, y_val):
    population = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1],  # All features
        [1,0,1,0,1,0,1,0,1,0,1,0,1],   # Alternate features
        [1,1,0,0,1,1,0,0,1,1,0,0,1]    # Another pattern
    ]
    
    best_acc = 0
    best_features = None
    
    for chromosome in population:
        selected = [i for i, val in enumerate(chromosome) if val == 1]
        if not selected:
            continue
            
        X_train_sel = X_train[:, selected, :]
        X_val_sel = X_val[:, selected, :]
        
        model = build_model((len(selected), 1))
        history = model.fit(
            X_train_sel, y_train,
            epochs=30,
            validation_data=(X_val_sel, y_val),
            callbacks=[early_stopping],
            verbose=0
        )
        val_acc = max(history.history['val_accuracy'])
        
        if val_acc > best_acc:
            best_acc = val_acc
            best_features = selected
    
    print(f"\nGA Best Validation Accuracy: {best_acc:.4f}")
    print(f"Selected Features: {data.columns[best_features].tolist()}")
    return best_features

# TLBO Optimization 
def tlbo_optimization(X_train, y_train, X_val, y_val, input_shape):
    population = [
        {'filters': 16, 'kernel_size': 3, 'dense_units': 16},
        {'filters': 32, 'kernel_size': 2, 'dense_units': 16},
        {'filters': 16, 'kernel_size': 4, 'dense_units': 32}
    ]
    
    best_acc = 0
    best_params = None
    
    for params in population:
        model = build_model(input_shape, **params)
        history = model.fit(
            X_train, y_train,
            epochs=30,
            validation_data=(X_val, y_val),
            callbacks=[early_stopping],
            verbose=0
        )
        val_acc = max(history.history['val_accuracy'])
        if val_acc > best_acc:
            best_acc = val_acc
            best_params = params
    
    print(f"\nTLBO Best Validation Accuracy: {best_acc:.4f}")
    return best_params

# Main execution 
if __name__ == "__main__":
    print("=== Heart Disease Prediction Model Training ===")
    
    print("\nRunning GA for feature selection...")
    best_features = genetic_algorithm(X_train, y_train, X_val, y_val)
    
    # Prepare data with selected features
    X_train_sel = X_train[:, best_features, :]
    X_val_sel = X_val[:, best_features, :]
    X_test_sel = X_test[:, best_features, :]
    input_shape = (len(best_features), 1)
    
    print("\nRunning TLBO for hyperparameter optimization on selected features...")
    best_params = tlbo_optimization(X_train_sel, y_train, X_val_sel, y_val, input_shape)
    
    print("\nTraining final model with selected features and optimized parameters...")
    final_model = build_model(input_shape, **best_params)
    history = final_model.fit(
        X_train_sel, y_train,
        epochs=50,
        validation_data=(X_val_sel, y_val),
        callbacks=[early_stopping],
        verbose=1
    )
    
    # Plot training history
    plt.figure(figsize=(12, 5))
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'], label='Train Accuracy')
    plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
    plt.title('Model Accuracy')
    plt.ylabel('Accuracy')
    plt.xlabel('Epoch')
    plt.legend()
    
    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'], label='Train Loss')
    plt.plot(history.history['val_loss'], label='Validation Loss')
    plt.title('Model Loss')
    plt.ylabel('Loss')
    plt.xlabel('Epoch')
    plt.legend()
    plt.tight_layout()
    plt.savefig('training_history.png')
    plt.close()
    
    # Evaluate on test set
    test_loss, test_acc = final_model.evaluate(X_test_sel, y_test, verbose=0)
    print(f"\nTest Set Accuracy: {test_acc:.4f}")
    
    # Save model and artifacts
    save_model(final_model, 'heart_model.h5')
    joblib.dump(scaler, 'scaler.save')
    np.save('selected_features.npy', best_features)
    
    print("\nSaved artifacts:")
    print("- heart_model.h5 (trained CNN model)")
    print("- scaler.save (feature scaler)")
    print("- selected_features.npy (selected feature indices)")
    print("- training_history.png (training metrics plot)")
    
    # Sample prediction
    sample_patient = np.array([[62, 0, 3, 138, 294, 0, 1, 142, 1, 2.0, 2, 0, 3]])
    sample_scaled = scaler.transform(sample_patient)
    sample_selected = sample_scaled[:, best_features]
    sample_reshaped = sample_selected.reshape(1, len(best_features), 1)
    
    prediction = final_model.predict(sample_reshaped, verbose=0)[0][0]
    pred_class = 1 if prediction > 0.5 else 0
    
    print("\nSample Prediction:")
    print(f"Raw Features: {sample_patient[0]}")
    print(f"Selected Features: {sample_selected[0]}")
    print(f"Predicted Probability: {prediction:.4f}")
    print(f"Diagnosis: {'High risk' if pred_class == 1 else 'Low risk'}")