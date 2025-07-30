import { useState, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios'
import Legends from './components/Legends';
import Login from './components/Login';
import UserHome from './components/UserHome';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Compare from './components/Compare';
import Admin from './components/Admin';
import Register from './components/Register';
import './index.css'

function App() {
  const [legends, setLegends] = useState([])
  const [user, setUser] = useState({})
  const [favorites, setFavorites] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

 useEffect(() => {
  const token = window.localStorage.getItem("token");
  if (token) {
    setIsLoggedIn(true);
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setIsAdmin(!!payload.isAdmin);
    } catch (err) {
      console.error("Invalid token", err);
    }
  } else {
    setIsLoggedIn(false);
    setIsAdmin(false);
  }
}, []);

  const getHeaders = () => {
    const token = window.localStorage.getItem('token');

    return {
      headers: {
      Authorization: `Bearer ${token}`,
    },
    };
  }

  const attempLoginWithToken = async () => {
  const token = window.localStorage.getItem('token');
  if (token) {
    try {
      
      const { data } = await axios.get('/api/auth/me', getHeaders());
      console.log(data);
      setUser(data)
    } catch (error) {
      console.log(error);
      window.localStorage.removeItem('token');
    }
  }
};

const logout = () => {
    window.localStorage.removeItem('token');
    setUser({}) 
}

  useEffect(() => {
      const fetchLegends = async () => {
        try {
            const {data} = await axios.get('/api/legends')
            
            setLegends(data)
        } catch (error) {
            console.log(error)
        }
      }
      fetchLegends()
  }, [])

  useEffect(() => {
      attempLoginWithToken()
  },[])

useEffect(() => {
  const token = window.localStorage.getItem("token");
  if (!token) return;

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get("/api/favorites", getHeaders());
      //console.log(data);
      setFavorites(data);
    } catch (error) {
      console.log("Error fetching favorites:", error);
    }
  };

  fetchFavorites();
}, [user])

  return (
    <div>
      <Navbar isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
      {user.id && (
        <div>
          <h3>Welcome {user.username}!</h3>
          <button onClick={logout}>Logout</button>
        </div>
      )}

          <Routes>
            <Route path = "/" element={<Home/>} />
            <Route path = "/userhome" element={<UserHome user={user} favorites={favorites} getHeaders={getHeaders} setFavorites={setFavorites} />} />
            <Route path = "/login" element={<Login attempLoginWithToken={attempLoginWithToken} />} />
            <Route path = "/legends" element={<Legends legends={legends} setLegends={setLegends}/>}/>
            <Route path="/compare/:id1/:id2" element={<Compare />} />
            <Route path= "/admin" element={<Admin isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>}/>
            <Route path= "/register" element={<Register/>}/>
          </Routes>
    </div>
  )
}

export default App
