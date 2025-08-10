import React from "react";
import { Container, Typography, Paper, List, ListItem } from "@mui/material";

const Instructions = () => (
  <Container maxWidth="md" sx={{ mt: 8 }}>
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        How to Use
      </Typography>
      <List>
        <ListItem>Navigate to the prediction form.</ListItem>
        <ListItem>Fill in all required medical information.</ListItem>
        <ListItem>Submit the form to receive your prediction.</ListItem>
        <ListItem>Ensure data is accurate for reliable results.</ListItem>
      </List>
    </Paper>
  </Container>
);

export default Instructions;
