import React, { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const callApi = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/status");
      if (!res.ok) {
        throw new Error("API request failed");
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
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>E‑commerce Frontend (React)</h1>

      <button onClick={callApi}>
        Call Backend API
      </button>

      {loading && <p>Calling backend…</p>}

      {response && (
        <pre style={{ background: "#eee", padding: "10px" }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
