import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || '';

const Login = ({ attempLoginWithToken }) => {
    const navigate = useNavigate()
    const login = async (ev) => {
    ev.preventDefault(); 

    const formData = new FormData(ev.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const user = {
      username,
      password,
    };

    console.log("Attempting login with:", user);

    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, user);
      
      const token  = data.token || data?.token?.token
      window.localStorage.setItem('token', token);
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