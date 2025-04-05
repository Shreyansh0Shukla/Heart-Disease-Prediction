// Home.jsx
import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const Home = () => (
  <Box
    sx={{
      backgroundImage: `url("https://media.istockphoto.com/id/1128931450/photo/heart-attack-concept.jpg?s=612x612&w=0&k=20&c=XHOhTXhpZMSV6XIhXLbH6uvNQjZQS93b1UetGfqQXtI=")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Container maxWidth="md">
      <Paper elevation={6} sx={{ p: 6, bgcolor: "rgba(255,255,255,0.8)", borderRadius: 3 }}>
        <Typography variant="h3" align="center" color="primary" gutterBottom>
          Heart Disease Predictor
        </Typography>
        <Typography variant="h6" align="center">
          Welcome! Use this tool to assess your heart health risk.
        </Typography>
      </Paper>
    </Container>
  </Box>
);

export default Home;
