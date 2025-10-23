import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vacations.map(v => (
        <div key={v.id} className="p-4 border rounded shadow">
          <h2 className="font-bold text-xl">{v.v_destinition}</h2>
          <p>{v.v_description}</p>
          <p>
            {v.v_from_date} - {v.v_to_date}
          </p>
          <p className="font-semibold">${v.v_price}</p>
        </div>
      ))}
    </div>
  );
}
