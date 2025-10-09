import React, { useState } from "react";
import api from "../AxiosInstance";
import li from "../assets/VALORANT_V_Red.jpg";

export function GameModes() {
  const [gameModes, setGameModes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMode, setSelectedMode] = useState(null);
  const [fetched, setFetched] = useState(false);

  const fetchGameModes = () => {
    setLoading(true);
    setError("");

    api
      .get("/getGameModes")
      .then((response) => {
        if (response.data && response.data.data) {
          setGameModes(response.data.data);
          setFetched(true);
        } else {
          console.error("Error fetching data", response);
          setError("Unexpected response format 😢");
        }
      })
      .catch((error) => {
        console.error("Error fetching", error);
        setError("Failed to fetch game modes, try again later 🥲");
      })
      .finally(() => {
        setLoading(false);
      });
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
            onClick={fetchGameModes}
            disabled={loading}
            className="btn btn-danger px-4 py-2 mt-4"
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {loading ? "Retrying..." : "Try Again"}
          </button>
        </>
      ) : (
        <>
          {!fetched && (
            <div className="mb-5">
              <h2
                className="fw-bold"
                style={{
                  color: "#f94f4f",
                  fontSize: "2.5rem",
                  textShadow: "2px 2px 5px rgba(0,0,0,0.6)",
                }}
              >
                Explore All Game Modes
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
                <em>Valorant</em> offers a variety of game modes, each bringing a
                unique flavor to your gameplay — whether you're here to grind or
                chill with friends. Curious? Click below to discover them all!
              </p>
              <button
                onClick={fetchGameModes}
                disabled={loading}
                className="btn btn-danger px-4 py-2 fw-bold"
                style={{ fontSize: "1.1rem", letterSpacing: "1px" }}
              >
                {loading ? "Loading..." : "Get Game Modes Info"}
              </button>
            </div>
          )}

          {fetched && (
            <div className="row justify-content-center w-100">
              {gameModes.map((mode) => (
                <div
                  key={mode.uuid}
                  className="col-md-4 mb-4"
                  onClick={() => setSelectedMode(mode)}
                >
                  <div
                    className="card shadow-lg border-0 h-100"
                    style={{
                      background: "rgba(0, 0, 0, 0.7)",
                      color: "#f8f9fa",
                      cursor: "pointer",
                      borderRadius: "15px",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
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
                    <img
                      src={mode.displayIcon || li}
                      alt={mode.displayName}
                      className="card-img-top"
                      style={{
                        height: "8rem",
                        objectFit: "contain",
                        background: "#000",
                      }}
                    />
                    <div className="card-body text-center">
                      <h5
                        className="card-title fw-bold"
                        style={{
                          fontSize: "1.5rem",
                          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
                        }}
                      >
                        {mode.displayName}
                      </h5>
                      <p className="card-text text-light small">
                        {mode.duration || "Click to learn more"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal-style detail view */}
          {selectedMode && (
            <div
              className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
              style={{
                background: "rgba(0, 0, 0, 0.8)",
                zIndex: 1050,
                padding: "20px",
                overflowY: "auto",
              }}
            >
              <div
                className="card p-4"
                style={{
                  background: "rgba(20,20,20,0.9)",
                  color: "#fff",
                  borderRadius: "20px",
                  maxWidth: "600px",
                  width: "100%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                }}
              >
                <button
                  className="btn btn-sm btn-outline-light mb-3 align-self-end"
                  onClick={() => setSelectedMode(null)}
                >
                  Close
                </button>
                <h3 className="fw-bold text-danger text-uppercase mb-3">
                  {selectedMode.displayName}
                </h3>
                <img
                  src={selectedMode.displayIcon || li}
                  alt={selectedMode.displayName}
                  className="img-fluid my-3"
                  style={{ maxHeight: "200px", objectFit: "contain" }}
                />
                <p
                  className="text-light"
                  style={{ fontSize: "1.1rem", lineHeight: "1.6" }}
                >
                  {selectedMode.description || "Stay Tuned, We are working on it."}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
