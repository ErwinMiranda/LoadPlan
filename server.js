const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public")); // serves index.html if you put it in public/

// 🔑 SQL Config (replace with real values OR env vars on Render)
const dbConfig = {
  user: process.env.DB_USER || "your_username",
  password: process.env.DB_PASS || "your_password",
  server: process.env.DB_SERVER || "your_server",
  database: process.env.DB_NAME || "your_database",
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

// API endpoint
app.get("/data", async (req, res) => {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query("SELECT TOP 50 * FROM your_table");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
