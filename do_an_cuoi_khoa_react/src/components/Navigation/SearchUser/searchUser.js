import React, { useState } from "react";
import { Link } from "react-router-dom";
import './searchUser.css'
const SearchUser = () => {
  const [nickname, setNickname] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

      // Lọc các user có nickname khớp (không phân biệt chữ hoa/chữ thường)
      const filteredUsers = users.filter((user) =>
        user.nickname?.toLowerCase().includes(nickname.toLowerCase())
      );


      setResults(filteredUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div >
      <h3>Search User by Nickname</h3>
      <input className="input-name"
        type="text"
        placeholder="Enter nickname"
        value={nickname}
        onInput={(e) => setNickname(e.target.value)}
        style={{
          padding: "10px",
          marginRight: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button className="input-name"
        onClick={handleSearch}
        style={{
          padding: "10px 15px",
          backgroundColor: "#1890ff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {/* Hiển thị trạng thái tìm kiếm */}
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Hiển thị kết quả */}
      <div style={{ marginTop: "20px" }}>
        {results.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.map((user) => (
              <Link to={`/profile/${user.id}`}
                key={user.id}

              >
                <div className="input-search-li"><img
                  className="search-avatar"
                  src={user.avatar || "default-avatar-url"}
                  alt=""
                /> {user.nickname}
                  <br /></div>
              </Link>
            ))}
          </ul>
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
