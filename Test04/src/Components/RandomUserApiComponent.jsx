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
import { userApiAtom } from "../atoms/userApiAtom";
import { useEffect, useState } from "react";
import "./components.css";

const RandomUserApiComponent = () => {
  const [user, setUser] = useAtom(userApiAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      await setUser();
      setLoading(false);
    };

    fetchUser();
  }, [setUser]);

  if (loading) {
    return <div className="random-user-loading">Loading...</div>;
  }

  if (user && user.error) {
    return <div className="random-user-error">Error: {user.error}</div>;
  }

  return (
    <div>
      <h2 className="random-user-heading">
        Random User Information API using Atom
      </h2>
      <div className="random-user-container">
        <div className="random-user-info">
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            className="random-user-avatar"
          />
          <p>
            <strong>Name:</strong> {user.name.first} {user.name.last}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Location:</strong> {user.location.city},{" "}
            {user.location.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RandomUserApiComponent;
