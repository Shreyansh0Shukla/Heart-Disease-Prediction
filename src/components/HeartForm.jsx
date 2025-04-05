// components/HeartForm.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Container,
} from "@mui/material";

const HeartForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === "") {
        alert(`Please fill in the '${key}' field.`);
        return;
      }
    }
    console.log("Submitted Data:", formData);
    // Send to backend or ML model
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Heart Disease Prediction Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {Object.keys(formData).map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  fullWidth
                  label={key}
                  name={key}
                  variant="outlined"
                  value={formData[key]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default HeartForm;
