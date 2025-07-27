import { useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./surveyform.css";


export default function SurveyForm() {
  const [rating, setRating] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [frequency, setFrequency] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [buySource, setBuySource] = useState("");
  const [ecoFriendlyInterest, setEcoFriendlyInterest] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "responses"), {
        uid: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        rating,
        suggestion,
        ageGroup,
        frequency,
        priceRange,
        buySource,
        ecoFriendlyInterest,
        timestamp: serverTimestamp()
      });
      alert("Thank you for your feedback!");
      setRating("");
      setSuggestion("");
      setAgeGroup("");
      setFrequency("");
      setPriceRange("");
      setBuySource("");
      setEcoFriendlyInterest("");
    } catch (err) {
      alert("Error submitting response: " + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="survey-container">
    <h2>Survey Form</h2>
    <form onSubmit={handleSubmit}>
        <label>Age Group:</label>
        <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} required>
          <option value="">Select</option>
          <option value="Under 18">Under 18</option>
          <option value="18-24">18-24</option>
          <option value="25-34">25-34</option>
          <option value="35-44">35-44</option>
          <option value="45+">45+</option>
        </select>

        <label>How often do you buy scrunchies?</label>
        <select value={frequency} onChange={(e) => setFrequency(e.target.value)} required>
          <option value="">Select</option>
          <option value="Rarely">Rarely</option>
          <option value="Occasionally">Occasionally</option>
          <option value="Frequently">Frequently</option>
          <option value="Very Frequently">Very Frequently</option>
        </select>

        <label>Preferred price range (per scrunchie):</label>
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} required>
          <option value="">Select</option>
          <option value="Below ₹20">Below ₹20</option>
          <option value="₹20-50">₹20-50</option>
          <option value="₹50-100">₹50-100</option>
          <option value="Above ₹100">Above ₹100</option>
        </select>

        <label>Where do you usually buy scrunchies from?</label>
        <input type="text" value={buySource} onChange={(e) => setBuySource(e.target.value)} placeholder="E.g., Local store, Instagram, Amazon" required />

        <label>Would you prefer eco-friendly/fabric-based scrunchies?</label>
        <select value={ecoFriendlyInterest} onChange={(e) => setEcoFriendlyInterest(e.target.value)} required>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Maybe">Maybe</option>
        </select>

        <label>How satisfied are you with current options? (1-5)</label>
        <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />

        <label>Any suggestions?</label>
        <textarea value={suggestion} onChange={(e) => setSuggestion(e.target.value)} />

        <button type="submit">Submit</button>
      </form>
    <button className="logout-btn" onClick={handleLogout}>Logout</button>
    <p className="muted-text">Powered by Instagram Forms</p>

  </div>
  );
}
