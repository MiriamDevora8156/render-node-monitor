import { useEffect, useState } from 'react';

function ServiceList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // ודאי שהכתובת הזו תואמת לשרת ה-Node שלך ב-Render
        fetch('https://render-node-monitor.onrender.com/api/services')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then(data => {
                setServices(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching services:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div style={{ padding: '20px' }}>טוען נתונים מרנדר...</div>;
    if (error) return <div style={{ color: 'red', padding: '20px' }}>שגיאה: {error}</div>;

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>השירותים שלי ב-Render</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {services.map((item) => (
                    <li key={item.service.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '15px',
                        marginBottom: '10px',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '2px 2px 5px rgba(0,0,0,0.05)'
                    }}>
                        <strong style={{ fontSize: '1.2em' }}>{item.service.name}</strong>
                        <div style={{ marginTop: '5px' }}>
                            <span style={{ 
                                backgroundColor: item.service.suspended === 'not_suspended' ? '#d4edda' : '#f8d7da',
                                color: item.service.suspended === 'not_suspended' ? '#155724' : '#721c24',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                fontSize: '0.8em'
                            }}>
                                {item.service.suspended === 'not_suspended' ? 'פעיל' : 'מושהה'}
                            </span>
                            <span style={{ marginRight: '10px', color: '#666' }}>סוג: {item.service.type}</span>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <a href={item.service.serviceDetails.url} target="_blank" rel="noreferrer" style={{ color: '#007bff', textDecoration: 'none' }}>
                                לכניסה לאתר 🔗
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ServiceList;