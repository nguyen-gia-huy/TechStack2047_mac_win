import axios from "axios";
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
        const { data: users } = await axios.get(`http://localhost:3000/users`);

        // Lọc danh sách người dùng: không phải bạn bè và không phải chính mình
        const filteredUsers = users.filter(
          (user) =>
            user.id !== userId &&
            Array.isArray(user.friends) &&
            !user.friends.includes(userId)
        );

        setResults(filteredUsers);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch users");
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
