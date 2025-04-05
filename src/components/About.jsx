import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const About = () => (
  <Container maxWidth="md" sx={{ mt: 8 }}>
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography>
        This app helps users assess the likelihood of heart disease using medically relevant metrics.
        It’s built with React and integrates predictive models for fast, reliable results.
      </Typography>
    </Paper>
  </Container>
);

export default About;
