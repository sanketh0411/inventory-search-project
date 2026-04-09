const express = require("express");
const cors = require("cors");
const inventory = require("./data/inventory.json");

const app = express();
app.use(cors());

// 🔍 SEARCH API
app.get("/search", (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;

  let filtered = [...inventory];

  // ❌ Invalid price range
  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    return res.status(400).json({
      error: "Minimum price cannot be greater than maximum price"
    });
  }

  // 🔍 Name filter
  if (q) {
    filtered = filtered.filter(item =>
      item.productName.toLowerCase().includes(q.toLowerCase())
    );
  }

  // 📂 Category filter
  if (category) {
    filtered = filtered.filter(item =>
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  // 💰 Price filters
  if (minPrice) {
    filtered = filtered.filter(item => item.price >= Number(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter(item => item.price <= Number(maxPrice));
  }

  res.json(filtered);
});

// 🚀 Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});