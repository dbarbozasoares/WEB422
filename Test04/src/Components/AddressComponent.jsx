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
import { userAddressAtom } from "../atoms/addressAtom";
import { useState, useRef, useEffect } from "react";
import AddressDisplay from "../DisplayComponents/DisplayAddress";
import "./components.css";
const ChangeAddress = () => {
  const [address, setAddress] = useAtom(userAddressAtom);
  const [newAddress, setNewAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const prevAddressRef = useRef(address);

  useEffect(() => {
    if (submitted) {
      prevAddressRef.current = address;
    }
  }, [submitted, address]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setAddress(newAddress);
    setNewAddress("");
    setIsTyping(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewAddress(e.target.value);
    setIsTyping(true);
  };

  return (
    <div className="address-container">
      <form onSubmit={handleSubmit} className="address-form">
        <h2 className="address-heading">Type new address</h2>
        <input
          type="text"
          name="nameInput"
          value={newAddress}
          onChange={handleChange}
          className="address-input"
        />
        <button type="submit" className="btn change-btn" disabled={!newAddress}>
          Change current address
        </button>
      </form>

      <AddressDisplay
        previousAddress={prevAddressRef.current}
        currentAddress={address}
        isTyping={isTyping}
      />
    </div>
  );
};

export default ChangeAddress;
