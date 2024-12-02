import React, { useState, useEffect } from "react";

function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
     
      try {
              // Retrieve JWT token from storage (e.g., localStorage)
      let token = localStorage.getItem("token");
     
      // Replace with your storage method if different
      if (token && token.startsWith("Bearer ")) {
        token = token.slice(7);
      }
      const response = await fetch("http://localhost:8080/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Include JWT token in the Authorization header
        }
      });
 
      const data = await response.json();
      setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert("An error occurred KLEMENS. Please try again.");
      }
 
    }
    fetchData();
  }, []);


  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#A020F0", marginBottom: "20px" }}>
        Welcome Admin
      </h1>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f4f4f4",
                borderBottom: "2px solid #ccc",
              }}
            >
              <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Role</th>
            </tr>
          </thead>
        </table>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            borderTop: "1px solid #ccc",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td style={cellStyle}>{user.name}</td>
                    <td style={cellStyle}>{user.email}</td>
                    <td style={cellStyle}>{user.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const cellStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "left",
};

export default AdminPage;
