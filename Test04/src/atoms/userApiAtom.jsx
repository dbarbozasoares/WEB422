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
import { atom } from "jotai";

export const userApiAtom = atom(null, async (get, set) => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    if (!response.ok) throw new Error("Failed to fetch user data");
    const data = await response.json();
    set(userApiAtom, data.results[0]);
  } catch (error) {
    set(userApiAtom, { error: error.message });
  }
});
