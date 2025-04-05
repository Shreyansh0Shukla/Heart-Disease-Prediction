import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const Signup = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Full Name" fullWidth />
          <TextField label="Email" type="email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          <Button variant="contained" type="submit">Sign Up</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
