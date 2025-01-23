// Fetches message from the backend

'use client';

import { useEffect, useState } from 'react';

export default function MessagePage() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/message') // Your backend endpoint
            .then((response) => response.text())
            .then((data) => setMessage(data))
            .catch((error) => console.error('Error fetching message:', error));
    }, []);

    return (
        <div>
            <h1>Backend Connection Test</h1>
            <p>{message || 'Loading...'}</p>
        </div>
    );
}