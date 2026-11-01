
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AgeResult from "./pages/AgeResult";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<AgeResult />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
