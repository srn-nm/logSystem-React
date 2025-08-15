import { Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        bgcolor: "#f9f9f9"
      }}
      className="shadow-lg"
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to your minimal and efficient dashboard.
        </Typography>
      </Box>
    </Container>
  );
}
