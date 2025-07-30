import { useState} from "react";
import { Link } from "react-router-dom";

const Home = ({ handleSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h1>Welcome to Who's Better!</h1>
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
      <p>
        This web app lets you explore and compare legendary NBA players. You can view stats,
        championships, and build arguments for your favorites. While anyone can compare players,
        only registered users can save favorites and suggest new legends to be added.
      </p>

      <p>
        Want to see the legends? <Link to="/legends">Browse the list</Link>
      </p>
    </div>
  );
};

export default Home;