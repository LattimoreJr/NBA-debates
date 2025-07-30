import { useState} from "react";
import { Link } from "react-router-dom";
import './Home.css';

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
    <div className="home-container">
      <h1>Welcome to Who's Better!</h1>
            
      <p>
        It's time to finally settle all those playground and barbershop debates. Finally time to answer the question that all sports fans 
        are constantly thinking of WHO'S BETTER?! Here is where you compare your favorite players against the all time greats and see which
        one comes out on top. Choose any two players from our list and compare their stats and accolades. Don't see your favorite player? 
        <Link to="/register"> Register now </Link> and add them yourself, along with creating your own top ten list.
      </p>

      <p>
        Want to see the legends? <Link to="/legends">Browse the list</Link>
      </p>
      <div className="corner-bottom-left"></div>
      <div className="corner-bottom-right"></div>
    </div>
  );
};

export default Home;