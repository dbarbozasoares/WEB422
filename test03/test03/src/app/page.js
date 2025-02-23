"use client"; //enables using useState and useEffect

import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]); // set users as empty when initialize

  // Fetching users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Fetch users data from the API
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

    fetchUsers(); // Call the fetch function
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
