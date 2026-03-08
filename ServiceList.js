import { useEffect, useState } from 'react';

function ServiceList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // פנייה לשרת ה-Node החדש שהקמת
    fetch(`${process.env.REACT_APP_NODE_API_URL}/services`)
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error("Error fetching services:", err));
  }, []);

  return (
    <div>
      <h2>My Render Services</h2>
      <ul>
        {services.map(s => <li key={s.id}>{s.name}</li>)}
      </ul>
    </div>
  );
}