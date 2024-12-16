import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./searchUser.css";
import { ProfileContext } from "../../../ProfileContext";

const SearchUser = () => {
  const [nickname, setNickname] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("loggedInUserId");

  // Hàm tìm kiếm user theo nickname
  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/users`);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();

      // Lọc kết quả: nickname khớp và không phải người dùng hiện tại
      const filteredUsers = users.filter(
        (user) =>
          user.nickname?.toLowerCase().includes(nickname.toLowerCase()) &&
          user.id !== userId
        // Loại bỏ người dùng hiện tại
      );

      setResults(filteredUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      console.log(userId);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <h5 style={{  fontSize: "20px",
            color: "gray", color: "#333", marginBottom: "15px" }}>
        Search User
      </h5>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          className="input-name"
          type="text"
          placeholder="Enter nickname"
          value={nickname}
          onInput={(e) => setNickname(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "14px",
            boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
            outline: "none",
          }}
        />
        <button
          className="input-name"
          onClick={handleSearch}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Search
        </button>
      </div>

      {/* Hiển thị trạng thái tìm kiếm */}
      <div style={{ marginTop: "15px" }}>
        {isLoading && (
          <p style={{ fontSize: "14px", color: "#666" }}>Loading...</p>
        )}
        {error && (
          <p style={{ fontSize: "14px", color: "red" }}>Error: {error}</p>
        )}
      </div>

      {/* Hiển thị kết quả */}
      <div style={{ marginTop: "20px" }}>
        {results.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {results.map((user) => (
              <Link
                to={`/profile/${user.id}`}
                key={user.id}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="input-search-li"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    marginBottom: "10px",
                    transition: "background-color 0.3s ease",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#eef3ff")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#f9f9f9")
                  }
                >
                  <img
                    className="search-avatar"
                    src={user.avatar || "default-avatar-url"}
                    alt="User Avatar"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "10px",
                      border: "1px solid #ddd",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      fontWeight: "bold",
                    }}
                  >
                    {user.nickname}
                  </span>
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: "14px", color: "#666" }}>No users found</p>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
