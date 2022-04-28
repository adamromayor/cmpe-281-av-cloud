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
import UserProfile from './User/UserProfile';

function App() {

  const [user, setUser] = useState(null);

  const providerValue = useMemo(() => ({user, setUser}),[user,setUser]);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
      setLoggedIn(localStorage.getItem('user'));
  }, [loggedIn]);

  /**
   * FRONTEND ONLY
   * User Routes will be /{username}/path
   * Admin Routes will be /administrator/path
   * 
   * This will help avoid conflicts with backend routes /admin and /user
   */
  return (
    <Router>
    <div className="App">
      <UserContext.Provider value={providerValue}>
          <NavbarComponent loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <div className="content" style={{height:"100vh"}}>
          
            <Routes>
              
              <Route exact path="/" element={ <Home/> } />
              <Route path="/login" element={ <Login setLoggedIn={setLoggedIn}/> } />
              <Route path="/signup" element={ <Signup setLoggedIn={setLoggedIn}/> } />
              <Route exact path="/profile" element={<UserProfile />} />

              <Route exact path="/:username" element= {<UserDashboard />} />
              <Route path="/:username/ride" element= {<UserRideStatus />} />

              <Route exact path="/administrator" element={ <AdminDashboard /> } />
              <Route exact path="/administrator/avstatus" element= {<AvStatuses />} />
              <Route exact path="/administrator/avstatus/:id" element={<AvStatus />} />
              <Route exact path="/administrator/users" element={<UserDetails />} />
              <Route exact path="/administrator/register" element={<RegisterAv />} />
                            
              <Route path="/*" element={<Home/>} />
            </Routes>
          </div>

          
        </UserContext.Provider>
    </div>
    </Router>
  );
}

export default App;
