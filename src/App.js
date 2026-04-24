import React, { useState } from "react";

function App() {
  const [customerName, setCustomerName] = useState("");
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const createOrder = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerName,
          product,
          amount: Number(amount)
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Order creation failed");
      }

      const data = await res.json();
      setResponse(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>E‑commerce Order Create</h2>

      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="text"
        placeholder="Product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={createOrder} disabled={loading}>
        {loading ? "Creating Order..." : "Create Order"}
      </button>

      {response && (
        <pre style={{ background: "#eee", padding: "10px", marginTop: "15px" }}>
{JSON.stringify(response, null, 2)}
        </pre>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
