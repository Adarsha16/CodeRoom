import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GitHubUser({ username }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user data from GitHub API
        axios.get(`https://api.github.com/users/${username}`)
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="flex items-center border border-brown shadow-md justify-center rounded-md p-3 cursor-pointer">
            <a href={`https://github.com/${user.login}`} target="_blank">
                <img className="w-10 h-10 rounded-full hover:scale-95" src={user.avatar_url} alt={`${user.login} profile`} />
            </a>

            <h1 className="text-1xl font-bold ml-2 ">&nbsp;{user.login}</h1>
        </div>
    );
}

export default GitHubUser;
