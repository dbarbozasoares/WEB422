/********************************************************************************
 * WEB422 – Test 03
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Diego B Soares Student ID: ____145820239____ Date: __feb - 22 - 2025_______
 * Published URL: _________________https://github.com/dbarbozasoares/WEB422__________________________________________
 ********************************************************************************/
"use client"; //enables using useState and useEffect

import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]); // set users as empty when initialize

  // fetching users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // fetch users data from the API
        if (response.ok) {
          const data = await response.json(); // Parse JSON data
          setUsers(data); // Update state with users data
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers(); // call the fetch function
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}: {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
