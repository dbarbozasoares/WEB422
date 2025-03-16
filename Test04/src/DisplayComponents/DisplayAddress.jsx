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
import "./displayComponents.css";

const AddressDisplay = ({ previousAddress, currentAddress, isTyping }) => {
  return (
    <div className="address-display-container">
      {isTyping ? (
        <p className="updating-address">Updating address: {currentAddress}</p> // Show while typing
      ) : (
        <div className="address-status">
          <p>
            Previous address:{" "}
            {previousAddress === currentAddress ? "No change" : previousAddress}
          </p>
          <p>Current address: {currentAddress}</p>
        </div> // Show after submission
      )}
      <hr className="divider" />
    </div>
  );
};

export default AddressDisplay;
