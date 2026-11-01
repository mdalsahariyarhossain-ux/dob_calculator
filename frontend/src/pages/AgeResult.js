
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AgeResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <main className="page-container">
        <section className="calculator-card">
          <h1>No result available</h1>
          <p className="description">
            Please calculate your age first.
          </p>
          <button onClick={() => navigate("/")}>
            Go to calculator
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-container">
      <section className="calculator-card result-card">
        <h1>Your Age</h1>
        <div className="age-grid">
          <div className="age-box">
            <strong>{state.years}</strong>
            <span>Years</span>
          </div>

          <div className="age-box">
            <strong>{state.months}</strong>
            <span>Months</span>
          </div>

          <div className="age-box">
            <strong>{state.days}</strong>
            <span>Days</span>
          </div>
        </div>

        <button onClick={() => navigate("/")}>
          Calculate another age →
        </button>
      </section>
    </main>
  );
}
