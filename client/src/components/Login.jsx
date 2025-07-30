import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ attempLoginWithToken }) => {
    const navigate = useNavigate()
    const login = async (ev) => {
    ev.preventDefault(); // stop page reload

    const formData = new FormData(ev.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const user = {
      username,
      password,
    };

    try {
      const { data } = await axios.post("http://localhost:3000/api/auth/login", user);
      
      const {token} = data

      window.localStorage.setItem('token', data.token.token);
      attempLoginWithToken();
      navigate('/')  
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;