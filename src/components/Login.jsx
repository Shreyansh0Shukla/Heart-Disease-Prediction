import React from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const Login = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Email" type="email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          <Button variant="contained" type="submit">Log In</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
