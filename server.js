const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth.routes");
const db = require("./utils/database");
dotenv.config({ path: ".env.local" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files (css, js, images, etc.)
app.use(express.static(path.join(__dirname,'src')));
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'images')));

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve login page from src/pages directory
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "src/pages/login.html"));
});

// Serve signup page from src/pages directory
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "src/pages/login.html"));
});

app.use("/", authRouter);

// Handle 404 - Must be after all other routes
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

db();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
