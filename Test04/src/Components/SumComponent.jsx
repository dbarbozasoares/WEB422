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
import { sumAtom } from "../atoms/sumAtom";
import { useState, useRef } from "react";
import DisplaySum from "../DisplayComponents/DisplaySum";
import "./components.css";
const UseSum = () => {
  const [sum, setSum] = useAtom(sumAtom);
  const [number, setNumber] = useState(0);
  const inputRef = useRef(null);

  const handleSum = () => {
    setSum(parseInt(number) + parseInt(sum));
    setNumber("");
    inputRef.current.focus();
  };

  const resetSum = () => {
    setSum(0);
    setNumber(0);
    inputRef.current.focus();
  };

  return (
    <div className="container">
      <input
        ref={inputRef}
        type="number"
        name="inputNumber"
        className="input-field"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number..."
      />
      <div className="button-group">
        <button onClick={handleSum} className="btn add-btn">
          ADD Number
        </button>
        <button onClick={resetSum} className="btn reset-btn">
          Reset
        </button>
      </div>
      <DisplaySum />
      <hr />
    </div>
  );
};

export default UseSum;
