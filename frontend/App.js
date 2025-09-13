import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    location: "",
    crop: "",
    rainfall: "",
    temperature: "",
    humidity: ""
  });
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setResult(data.predictedYield);

    // Fetch updated history
    const histRes = await fetch("http://127.0.0.1:8000/api/history");
    setHistory(await histRes.json());
  };

  return (
    <div className="p-6">
      <h1>🌱 Crop Yield Predictor</h1>
      <form onSubmit={handleSubmit}>
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input name="crop" placeholder="Crop" onChange={handleChange} />
        <input name="rainfall" type="number" placeholder="Rainfall" onChange={handleChange} />
        <input name="temperature" type="number" placeholder="Temperature" onChange={handleChange} />
        <input name="humidity" type="number" placeholder="Humidity" onChange={handleChange} />
        <button type="submit">Predict</button>
      </form>

      {result && <h2>Predicted Yield: {result}</h2>}

      <h3>History</h3>
      <ul>
        {history.map((h, i) => (
          <li key={i}>{h.crop} in {h.location} → {h.predictedYield}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
