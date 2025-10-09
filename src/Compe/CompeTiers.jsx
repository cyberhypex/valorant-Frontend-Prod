import React, { useState } from "react";
import api from "../AxiosInstance";

export function CompeTiers() {
  const [compe, setCompe] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComp = () => {
    setLoading(true);
    setErr("");

    api
      .get("/getCompe")
      .then((response) => {
        if (response.data && response.data.data && response.data.data[0].tiers) {
          setCompe(response.data.data[0].tiers);
        } else {
          console.error("Unexpected response format", response);
          setErr("Unexpected response format 😕");
        }
      })
      .catch((error) => {
        console.error("Error fetching", error);
        setErr("Failed to fetch competitive tiers 😞");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center text-center min-vh-100 px-3">
      {err ? (
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
            {err}
          </p>
          <button
            onClick={fetchComp}
            disabled={loading}
            className="btn btn-danger px-4 py-2 mt-4"
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            {loading ? "Retrying..." : "Try Again"}
          </button>
        </>
      ) : (
        <>
          {compe.length === 0 && (
            <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
              <h2
                className="fw-bold"
                style={{
                  color: "#f94f4f",
                  fontSize: "2.5rem",
                  textShadow: "2px 2px 5px rgba(0,0,0,0.6)",
                }}
              >
                Climb the Ranks!
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
                Valorant's competitive tiers range from Iron to Radiant. Each rank
                shows your skill level and how far you've progressed. Are you ready
                to rise?
              </p>
              <button
                onClick={fetchComp}
                disabled={loading}
                className="btn btn-danger px-4 py-2"
                style={{ fontSize: "1.2rem", fontWeight: "bold" }}
              >
                {loading ? "Loading..." : "Learn about Competitive Tiers"}
              </button>
            </div>
          )}

          <div className="row justify-content-center mt-4">
            {compe
              .filter((tier) => tier.tierName !== "Unused1" && tier.tierName !== "Unused2")
              .map((tier, index) => (
                <div key={index} className="col-md-3 mb-4" style={{ padding: "1rem" }}>
                  <div
                    className="card h-100 shadow"
                    style={{
                      background: "rgba(30, 30, 30, 0.85)",
                      borderRadius: "15px",
                      color: "#EA3F0B",
                      overflow: "hidden",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 5px 10px rgba(0,0,0,0.2)";
                    }}
                  >
                    <img
                      src={tier.largeIcon || "https://via.placeholder.com/100?text=No+Icon"}
                      alt={tier.tierName}
                      className="card-img-top"
                      style={{
                        height: "8rem",
                        width: "100%",
                        objectFit: "contain",
                        backgroundColor: "#111",
                      }}
                    />
                    <div className="card-body text-center">
                      <h5
                        className="card-title fw-bold"
                        style={{
                          fontSize: "1.25rem",
                          textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
                        }}
                      >
                        {tier.tierName}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
