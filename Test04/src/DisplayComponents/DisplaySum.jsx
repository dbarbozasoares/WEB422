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
import "./displayComponents.css";

const DisplaySum = () => {
  const [sum, setSum] = useAtom(sumAtom);
  return (
    <div className="sum-container">
      <h1 className="sum-heading">Displaying current atom sum: {sum}</h1>
      <hr className="divider" />
    </div>
  );
};

export default DisplaySum;
