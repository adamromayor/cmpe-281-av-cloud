import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AvStatus from './AvStatus';
import AvStatuses from './AvStatuses';
import Home from './Home'
import Login from './Login';
import NavbarComponent from './NavbarComponent';
import Signup from './Signup';
import { UserContext } from './UserContext';
import UserDashboard from './UserDashboard';

function App() {

  const [user, setUser] = useState(null);

  const providerValue = useMemo(() => ({user, setUser}),[user,setUser]);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
      setLoggedIn(localStorage.getItem('user'));
  }, [loggedIn]);


  return (
    <Router>
    <div className="App">
      <UserContext.Provider value={providerValue}>
          <NavbarComponent loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <div className="content">
          
            <Routes>
              
              <Route exact path="/" element={ <Home/> } />
              <Route path="/login" element={ <Login setLoggedIn={setLoggedIn}/> } />
              <Route path="/signup" element={ <Signup /> } />
              <Route exact path="/admin" element={ <AdminDashboard /> } />
              <Route path="/user" element= {<UserDashboard />} />
              <Route exact path="/admin/avstatus" element= {<AvStatuses />} />
              <Route path="/admin/avstatus/:id" element={<AvStatus />} />
            </Routes>
          </div>
        </UserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
