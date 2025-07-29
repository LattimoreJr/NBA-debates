import { useState, useEffect } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios'
import Legends from './components/Legends';
import Login from './components/Login';


function App() {
  const [legends, setLegends] = useState([])
  const [user, setUser] = useState({})

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

  return (
    <div>
      {
        user.id ? (
          <div>
          <h1>Welcome {user.username}</h1>
          <button onClick={logout}>Logout</button>
          <Legends legends={legends}/>
          </div>
        ) : (
          <div>
          <Login attempLoginWithToken={attempLoginWithToken}/>
          <Legends legends={legends}/>
          </div>
        )
      }

    </div>
  )
}

export default App
