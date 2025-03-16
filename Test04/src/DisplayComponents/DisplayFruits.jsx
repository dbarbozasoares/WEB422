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
import { fruitsAtom } from "../atoms/fruitsAtom";
import { useAtom } from "jotai";
import "./displayComponents.css";

const DisplayFruits = () => {
  const [fruits, setFruits] = useAtom(fruitsAtom);

  return (
    <div className="fruits-container">
      {fruits.length > 0 ? (
        <ul className="fruits-list">
          {fruits.map((fruit, index) => (
            <li key={index} className="fruit-item">
              {fruit}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-fruits">No fruits available</p>
      )}
      <hr className="divider" />
    </div>
  );
};

export default DisplayFruits;
