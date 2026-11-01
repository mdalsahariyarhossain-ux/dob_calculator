
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateAge } from "../services/ageApi";

export default function Home() {
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!dob) {
      setError("Please select your date of birth.");
      return;
    }

    setLoading(true);

    try {
      const result = await calculateAge(dob);

      navigate("/result", {
        state: result,
      });
    } catch (err) {
      setError(err.message || "Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-container">
      <section className="calculator-card">
        <h1>Calculate your age</h1>

        <p className="description">
          Enter your date of birth 
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="dob">Date of birth</label>

          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(event) => {
              setDob(event.target.value);
              setError("");
            }}
            required
          />

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Calculating..." : "Calculate my age →"}
          </button>
        </form>
      </section>
    </main>
  );
}
