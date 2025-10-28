import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // 👈 הוספנו את ה-CSS

interface Vacation {
  id: number;
  v_destinition: string;
  v_description: string;
  v_from_date: string;
  v_to_date: string;
  v_price: number;
  v_picture_url: string;
}

export default function Dashboard() {
  const [vacations, setVacations] = useState<Vacation[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/vacations')
      .then(res => setVacations(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      {vacations.map(v => (
        <div key={v.id} className="vacation-card">
          {v.v_picture_url && (
            <img src={v.v_picture_url} alt={v.v_destinition} />
          )}

          <div className="vacation-card-content">
            <h2>{v.v_destinition}</h2>
            <p>{v.v_description}</p>
            <p className="vacation-dates">
              {v.v_from_date} - {v.v_to_date}
            </p>
            <p className="vacation-price">${v.v_price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
