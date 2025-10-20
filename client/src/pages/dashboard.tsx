import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Dashboard.css";
const PORT = process.env.PORT || 4000


interface Vacation {
  id: number;
  v_destinition: string;
  v_description: string;
  v_from_date: string;
  v_to_date: string;
  v_price: number;
  v_picture_url: string;
  is_starred?: boolean; // שדה כוכב
}

const DashboardPage: React.FC = () => {
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [filterStarred, setFilterStarred] = useState(false);
  const userRole = localStorage.getItem("role"); // נשמור role בלוגין

  useEffect(() => {
    fetchVacations();
  }, []);

  const fetchVacations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:${PORT}/vacations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVacations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStar = async (id: number) => {
    if (userRole !== "user") return; // אדמין לא יכול לסמן
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:${PORT}/followers/${id}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setVacations((prev) =>
        prev.map((v) =>
          v.id === id ? { ...v, is_starred: res.data.starred } : v
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const displayedVacations = filterStarred
    ? vacations.filter((v) => v.is_starred)
    : vacations;

  return (
    <div className="dashboard-container">
      <h1>Available Vacations</h1>

      {userRole === "user" && (
        <button onClick={() => setFilterStarred((prev) => !prev)}>
          {filterStarred ? "Show All" : "Show Starred"}
        </button>
      )}

      <div className="vacation-grid">
        {displayedVacations.map((v) => (
          <div key={v.id} className="vacation-card">
            <img src={v.v_picture_url} alt={v.v_destinition} />
            <h2>{v.v_destinition}</h2>
            <p>{v.v_description}</p>
            <p>
              {new Date(v.v_from_date).toLocaleDateString()} -{" "}
              {new Date(v.v_to_date).toLocaleDateString()}
            </p>
            <p>Price: ${v.v_price}</p>

            {userRole === "user" && (
              <button
                className={`star-btn ${v.is_starred ? "starred" : ""}`}
                onClick={() => toggleStar(v.id)}
              >
                {v.is_starred ? "★" : "☆"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
