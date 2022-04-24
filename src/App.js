import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AvStatus from './AvStatus';
import AvStatuses from './AvStatuses';
import Home from './Home'
import Login from './Login';
import NavbarComponent from './NavbarComponent';
import RegisterAv from './RegisterAv';
import Signup from './Signup';
import { UserContext } from './UserContext';
import UserDashboard from './UserDashboard';
import UserRideStatus from './UserRideStatus';
import ViewUsers from './ViewUsers';

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
              <Route exact path="/admin/users" element={<ViewUsers />} />
              <Route exact path="/admin/register" element={<RegisterAv />} />
            </Routes>
          </div>
        </UserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
