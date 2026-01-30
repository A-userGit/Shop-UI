import { useEffect, useState } from 'react';
import { useAuthContext } from 'react-oauth2-code-pkce';

const Dashboard = () => {
    const { token, logIn } = useAuthContext();
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        if (token) {
            fetch('http://localhost:8080/api/data', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => setApiData(data))
                .catch(error => console.error('Error fetching API data:', error));
        } else if (!token) {
            logIn();
        }
    }, [token, logIn]);

    return (
        <div>
            <h2>Dashboard</h2>
            {apiData ? (
                <pre>{JSON.stringify(apiData, null, 2)}</pre>
            ) : (
                <p>Loading API data or not authenticated...</p>
            )}
        </div>
    );
};

export default Dashboard;