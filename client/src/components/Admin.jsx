import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || '';

const Admin = () => {
    const getHeaders = () => {
        const token = window.localStorage.getItem("token");
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    const [pendingPlayers, setPendingPlayers] = useState([]);
    const [users, setUsers] = useState([]);
    const [approvedPlayers, setApprovedPlayers] = useState([]);

    useEffect(() => {
        fetchPendingPlayers();
        fetchUsers();
        fetchApprovedPlayers();
    }, []);

    const fetchPendingPlayers = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/legends/pending`, getHeaders());
            setPendingPlayers(response.data);
        } catch (error) {
            console.error("Error fetching pending players:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/users`, getHeaders());
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchApprovedPlayers = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/legends`, getHeaders());
            setApprovedPlayers(response.data);
        } catch (error) {
            console.error("Error fetching approved players:", error);
        }
    };

    const approvePlayer = async (id) => {
        try {
            const { data } = await axios.put(`${API_URL}/api/legends/${id}/approve`, {}, getHeaders());
           
            setPendingPlayers(prev => prev.filter(player => player.id !== id));
    
        } catch (error) {
            console.error("Error approving player:", error);
        }
    };

    const rejectPlayer = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/legends/${id}`, getHeaders());
            fetchPendingPlayers();
        } catch (error) {
            console.error("Error rejecting player:", error);
        }
    };

    const removePlayer = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/legends/${id}`, getHeaders());
            setApprovedPlayers(prev => prev.filter(player => player.id !== id));
        } catch (error) {
            console.error("Error removing player:", error);
        }
    };

    const updatePlayerImage = async (id, imageUrl) => {
        try {
            await axios.put(`${API_URL}/api/legends/${id}/image`, { image_url: imageUrl }, getHeaders());
            fetchPendingPlayers();
            fetchApprovedPlayers();
        } catch (error) {
            console.error("Error updating player image:", error);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>

            <h3>Pending Players</h3>
            <ul>
                {pendingPlayers.map((player) => (
                    <li key={player.id}>
                        {player.first_name} {player.last_name}
                        <input
                            type="text"
                            placeholder="Image URL"
                            onChange={(e) => player.newImage = e.target.value}
                        />
                        <button onClick={() => updatePlayerImage(player.id, player.newImage)}>Save Image</button>
                        <button onClick={() => approvePlayer(player.id)}>Approve</button>
                        <button onClick={() => rejectPlayer(player.id)}>Reject</button>
                    </li>
                ))}
            </ul>

            <h3>Approved Players</h3>
            <ul>
                {approvedPlayers.map((player) => (
                    <li key={player.id}>
                        {player.first_name} {player.last_name}
                        <input
                            type="text"
                            placeholder="Image URL"
                            onChange={(e) => player.newImage = e.target.value}
                        />
                        <button onClick={() => updatePlayerImage(player.id, player.newImage)}>Save Image</button>
                        <button onClick={() => removePlayer(player.id)}>Remove</button>
                    </li>
                ))}
            </ul>

            <h3>All Users</h3>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
}

export default Admin