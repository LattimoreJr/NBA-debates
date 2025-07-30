import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
    const [pendingPlayers, setPendingPlayers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchPendingPlayers();
        fetchUsers();
    }, []);

    const fetchPendingPlayers = async () => {
        try {
            const response = await axios.get("/api/legends/pending");
            setPendingPlayers(response.data);
        } catch (error) {
            console.error("Error fetching pending players:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const approvePlayer = async (id) => {
        try {
            await axios.put(`/api/legends/${id}/approve`);
            fetchPendingPlayers();
        } catch (error) {
            console.error("Error approving player:", error);
        }
    };

    const rejectPlayer = async (id) => {
        try {
            await axios.delete(`/api/legends/${id}`);
            fetchPendingPlayers();
        } catch (error) {
            console.error("Error rejecting player:", error);
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
                        <button onClick={() => approvePlayer(player.id)}>Approve</button>
                        <button onClick={() => rejectPlayer(player.id)}>Reject</button>
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