import { useState } from "react";

function App() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (q) params.append("q", q);
      if (category) params.append("category", category);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);

      const res = await fetch(`http://localhost:5000/search?${params}`);
      const data = await res.json();

      setResults(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
  <div
    style={{
      width: "100vw",
      minHeight: "100vh",
      padding: "20px",
      boxSizing: "border-box",
      fontFamily: "Arial",
      background: "#f5f7fa"
    }}
  >
    <h2
      style={{
        textAlign: "center",
        color: "#333",
        marginBottom: "20px"
      }}
    >
      Inventory Search
    </h2>

    {/* Filters */}
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "20px",
        justifyContent: "center"
      }}
    >
      <input
        placeholder="Search product"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          flex: "1 1 200px"
        }}
      />

      <select
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          flex: "1 1 200px"
        }}
      >
        <option value="">All Categories</option>
        <option value="Furniture">Furniture</option>
        <option value="Electronics">Electronics</option>
        <option value="Stationery">Stationery</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        onChange={(e) => setMinPrice(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          flex: "1 1 150px"
        }}
      />

      <input
        type="number"
        placeholder="Max Price"
        onChange={(e) => setMaxPrice(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          flex: "1 1 150px"
        }}
      />

      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Search
      </button>
    </div>

    {/* Loading */}
    {loading && (
      <p style={{ textAlign: "center", color: "#666" }}>
        Loading...
      </p>
    )}

    {/* No Results */}
    {!loading && results.length === 0 && (
      <p style={{ textAlign: "center", color: "#888" }}>
        No results found
      </p>
    )}

    {/* Results Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "15px"
      }}
    >
      {!loading &&
        results.map((item) => (
          <div
            key={item.id}
            style={{
              background: "white",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "0.2s"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <h4 style={{ margin: 0 }}>{item.productName}</h4>
            <p style={{ color: "#555" }}>
              Category: {item.category}
            </p>
            <p style={{ color: "#555" }}>
              Price: ₹{item.price}
            </p>
          </div>
        ))}
    </div>
  </div>
);
}

export default App;