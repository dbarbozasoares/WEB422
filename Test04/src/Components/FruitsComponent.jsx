/********************************************************************************
 * WEB422 – Test 04
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Diego B Soares Student ID: ____145820239____ Date: __mar - 15 - 2025_______
 * Published URL: _________________https://github.com/dbarbozasoares/assignment_3_repo__________________________________________
 ********************************************************************************/
import { useAtom } from "jotai";
import { fruitsAtom } from "../atoms/fruitsAtom";
import { useState } from "react";
import DisplayFruits from "../DisplayComponents/DisplayFruits";
import "./components.css";
const FruitsComponent = () => {
  const [fruits, setFruits] = useAtom(fruitsAtom);
  const [fruit, setFruit] = useState("");

  const handleAppend = (e) => {
    e.preventDefault();
    setFruits([...fruits, fruit]);
    setFruit("");
  };

  return (
    <div className="container">
      <form onSubmit={handleAppend} className="form">
        <input
          type="text"
          value={fruit}
          onChange={(e) => setFruit(e.target.value)}
          placeholder="Enter a fruit..."
        />
        <button type="submit" className="btn add-btn">
          Add fruit into list
        </button>
      </form>
      <DisplayFruits />
      <hr />
    </div>
  );
};

export default FruitsComponent;
