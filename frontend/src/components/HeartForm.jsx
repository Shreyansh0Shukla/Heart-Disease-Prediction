import React, { useState } from 'react';
import { 
  TextField, Button, Paper, Typography,
  Container, Grid, Alert, CircularProgress,
  Box, Card, CardContent 
} from '@mui/material';

const HeartForm = () => {
  const [formData, setFormData] = useState({
    age: '', sex: '', cp: '', trestbps: '', chol: '', 
    fbs: '', restecg: '', thalach: '', exang: '', 
    oldpeak: '', slope: '', ca: '', thal: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Validation ranges for each parameter
  const validationRanges = {
    age: { min: 1, max: 120 },
    sex: { min: 0, max: 1 },
    cp: { min: 0, max: 3 },
    trestbps: { min: 90, max: 200 },
    chol: { min: 100, max: 600 },
    fbs: { min: 0, max: 1 },  // 0 or 1
    restecg: { min: 0, max: 2 },
    thalach: { min: 50, max: 250 },
    exang: { min: 0, max: 1 },  // 0 or 1
    oldpeak: { min: 0, max: 6 },
    slope: { min: 0, max: 2 },
    ca: { min: 0, max: 3 },
    thal: { min: 1, max: 3 }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate the form data based on the validation ranges
  const validateFormData = () => {
    for (let [key, value] of Object.entries(formData)) {
      const { min, max } = validationRanges[key];
      if (value !== '') {
        if (value < min || value > max) {
          return `Invalid value for ${key}. Please enter a value between ${min} and ${max}.`;
        }
      }
    }
    return null; // no error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Perform form data validation
    const validationError = validateFormData();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Prediction failed');
      setResult(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Heart Disease Risk Assessment
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {Object.entries({
              age: 'Age',
              sex: 'Sex (0=Female, 1=Male)',
              cp: 'Chest Pain Type (0-3)',
              trestbps: 'Resting BP (mm Hg)',
              chol: 'Cholesterol (mg/dl)',
              fbs: 'Fasting Blood Sugar (>120 mg/dl, 0/1)',
              restecg: 'Resting ECG (0-2)',
              thalach: 'Max Heart Rate',
              exang: 'Exercise Angina (0/1)',
              oldpeak: 'ST Depression',
              slope: 'Slope of Peak Exercise',
              ca: 'Major Vessels (0-3)',
              thal: 'Thalassemia (1-3)'
            }).map(([name, label]) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  type="number"
                  variant="outlined"
                  inputProps={{
                    min: validationRanges[name]?.min,
                    max: validationRanges[name]?.max,
                    step: 1
                  }}
                />
              </Grid>
            ))}

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                sx={{ px: 5, py: 1.5 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Calculate Risk'}
              </Button>
            </Grid>
          </Grid>
        </form>

        {result && (
          <Card sx={{ mt: 4, bgcolor: result.diagnosis.includes('High') ? '#ffebee' : '#e8f5e9' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Prediction Results
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography><strong>Risk Level:</strong> {result.diagnosis}</Typography>
                <Typography><strong>Probability:</strong> {(result.probability * 100).toFixed(1)}%</Typography>
                <Typography><strong>Confidence:</strong> {result.confidence} confidence</Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Paper>
    </Container>
  );
};

export default HeartForm;