import React, { useState } from "react";
import api from "../AxiosInstance";

export function Agents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError("");
    api
      .get("getAgents/true")
      .then((response) => {
        if (response.data && response.data.data) {
          setAgents(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Unexpected response format 😢");
        }
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setError(
          "We're sorry! Something went wrong while fetching agent data. Please check your internet connection or try again later 😢"
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center text-center min-vh-100 px-3">
      {error ? (
        <>
          <h2
            className="fw-bold"
            style={{
              color: "#ff6b6b",
              fontSize: "2.5rem",
              textShadow: "2px 2px 5px rgba(0,0,0,0.6)",
            }}
          >
            Oops! Something went wrong.
          </h2>
          <p
            className="lead text-light"
            style={{
              maxWidth: "700px",
              marginTop: "1rem",
              fontSize: "1.3rem",
              lineHeight: "1.6",
              color: "#f1f1f1",
            }}
          >
            {error}
          </p>
          <button
            onClick={fetchData}
            disabled={loading}
            className="btn btn-danger px-4 py-2 mt-4"
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {loading ? "Retrying..." : "Try Again"}
          </button>
        </>
      ) : agents.length === 0 ? (
        <>
          <h2
            className="fw-bold"
            style={{
              color: "#f94f4f",
              fontSize: "2.5rem",
              textShadow: "2px 2px 5px rgba(0,0,0,0.6)",
            }}
          >
            What are Agents?
          </h2>
          <p
            className="lead text-light"
            style={{
              maxWidth: "700px",
              marginTop: "0.25rem",
              marginBottom: "2rem",
              fontSize: "1.5rem",
              lineHeight: "1.6",
              textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
            }}
          >
            Agents are characters in Valorant, each with unique abilities and
            roles like Duelist, Initiator, Controller, or Sentinel. They define
            your playstyle!
          </p>
          <button
            onClick={fetchData}
            disabled={loading}
            className="btn btn-danger px-4 py-2"
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {loading ? "Loading..." : "Get Agents Info"}
          </button>
        </>
      ) : (
        <>
          <div className="row justify-content-center mt-4">
            {agents.map((agent, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div
                  className="card shadow-lg border-0 h-100"
                  style={{
                    background: "rgba(0, 0, 0, 0.7)",
                    color: "#f8f9fa",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    borderRadius: "15px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedAgent(agent)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0,0,0,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 5px 10px rgba(0,0,0,0.2)";
                  }}
                >
                  <div className="card-body text-center">
                    <h4
                      className="card-title fw-bold"
                      style={{
                        color: "#f39c12",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.8)",
                      }}
                    >
                      {agent.displayName || "Unknown Agent"}
                    </h4>

                    {agent.displayIcon ? (
                      <img
                        src={agent.displayIcon}
                        alt={agent.displayName || "Agent"}
                        className="img-fluid rounded-circle mt-3"
                        style={{
                          maxWidth: "130px",
                          border: "3px solid #f39c12",
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.7)",
                        }}
                      />
                    ) : (
                      <p className="text-muted">No Image Available</p>
                    )}

                    <p
                      className="mt-3"
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "500",
                        color: "#3498db",
                        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <strong>Role:</strong>{" "}
                      <span style={{ color: "#e74c3c", fontStyle: "italic" }}>
                        {agent.role ? agent.role.displayName : "Not Available"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedAgent && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-start"
              style={{
                background: "rgba(0, 0, 0, 0.85)",
                zIndex: 9999,
                paddingTop: "6rem",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                paddingBottom: "2rem",
                overflowY: "auto",
              }}
              onClick={() => setSelectedAgent(null)}
            >
              <div
                className="card p-4"
                style={{
                  backgroundColor: "#1a1a1a",
                  borderRadius: "20px",
                  color: "#f8f9fa",
                  maxWidth: "700px",
                  width: "100%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  position: "relative",
                  textAlign: "left",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                  onClick={() => setSelectedAgent(null)}
                >
                  X
                </button>

                <h2 className="text-center mb-4" style={{ color: "#ff4655" }}>
                  {selectedAgent.displayName}
                </h2>

                {selectedAgent.fullPortrait && (
                  <img
                    src={selectedAgent.fullPortrait}
                    alt={selectedAgent.displayName}
                    className="img-fluid mb-3 rounded"
                  />
                )}

                <p>
                  <strong>Role:</strong>{" "}
                  {selectedAgent.role?.displayName || "N/A"}
                </p>

                <p>
                  <strong>Agent Description:</strong>{" "}
                  {selectedAgent.description || "No description available."}
                </p>

                {selectedAgent.abilities && (
                  <>
                    <h5 className="mt-3">Abilities</h5>
                    <ul>
                      {selectedAgent.abilities.map((ab, i) => (
                        <li key={i}>
                          <strong>{ab.displayName}:</strong> {ab.description}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
