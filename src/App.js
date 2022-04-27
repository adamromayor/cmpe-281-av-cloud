import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AdminDashboard from './Admin/AdminDashboard';
import AvStatus from './Admin/AvStatus';
import AvStatuses from './Admin/AvStatuses';
import Home from './Home/Home'
import Login from './Login/Login';
import NavbarComponent from './Components/NavbarComponent';
import RegisterAv from './Admin/RegisterAv';
import Signup from './Signup/Signup';
import { UserContext } from './CustomHooks/UserContext';
import UserDashboard from './User/UserDashboard';
import UserRideStatus from './User/UserRideStatus';
import UserDetails from './Admin/UserDetails';

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
              <Route path="/signup" element={ <Signup setLoggedIn={setLoggedIn}/> } />
              <Route exact path="/admin" element={ <AdminDashboard /> } />
              <Route exact path="/user" element= {<UserDashboard />} />
              <Route path="/user/ride/:username" element= {<UserRideStatus />} />
              <Route exact path="/admin/avstatus" element= {<AvStatuses />} />
              <Route exact path="/admin/avstatus/:id" element={<AvStatus />} />
              <Route exact path="/admin/users" element={<UserDetails />} />
              <Route exact path="/admin/register" element={<RegisterAv />} />
            </Routes>
          </div>
        </UserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
