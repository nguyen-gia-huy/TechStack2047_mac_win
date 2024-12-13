import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserSug = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("loggedInUserId");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/users`);

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        // Lọc danh sách người dùng (không bao gồm người dùng hiện tại)
        const filteredUsers = users.filter((user) => user.id !== userId);

        setResults(filteredUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [userId]);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        marginTop: "20px",
      }}
    >
      <h5>People you could know</h5>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div style={{ marginTop: "25px" }}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.map((user) => (
              <Link to={`/profile/${user.id}`} key={user.id}>
                <div style={{ marginTop: "10px" }} className="input-search-li">
                  <img
                    className="search-avatar"
                    src={user.avatar || "default-avatar-url"}
                    alt=""
                  />
                  {user.nickname}
                  <br />
                </div>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserSug;
