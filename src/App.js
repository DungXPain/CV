
import './App.css';
import { createBrowserHistory } from 'history'
import { Router, Switch } from 'react-router-dom'
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import CheckOutTemplate from './templates/CheckOutTemplate/CheckOutTemplate';
import LoginTemplate from './templates/LoginTemplate/LoginTemplate';
import Demo from './pages/CheckOut.js/CheckOut';
import Loading from './components/Loading/Loading';
import UserTemplate from './templates/UserTemplate/UserTemplate';
import Profile from './pages/Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';

import User from './pages/Admin/User/User';
import Showtime from './pages/Admin/Showtime/Showtime';
import Films from './pages/Admin/Films/Films';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Films/Edit/Edit';
import NewUser from './pages/Admin/User/NewUser/NewUser';
import UpdateUser from './pages/Admin/User/UpdateUser/UpdateUser';


export const history = createBrowserHistory()

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <LoginTemplate exact path='/login' Component={Login} />
        <HomeTemplate exact path='/' Component={Home} />
        <HomeTemplate exact path='/home' Component={Home} />
        <HomeTemplate exact path='/contact' Component={Contact} />
        <HomeTemplate exact path='/news' Component={News} />
        <HomeTemplate exact path='/detail/:id' Component={Detail} />
        <HomeTemplate exact path='/profile' Component={Profile} />

        <CheckOutTemplate exact path='/checkout/:id' Component={Demo} />
        <AdminTemplate exact path='/admin' Component={Films} />
        <AdminTemplate exact path='/admin/user' Component={User} />
        <AdminTemplate exact path='/admin/user/addUser' Component={NewUser} />
        <AdminTemplate exact path='/admin/user/updateUser/:userAccount' Component={UpdateUser} />
        <AdminTemplate exact path='/admin/films/showtime/:id/:tenPhim' Component={Showtime} />
        <UserTemplate exact path='/register' Component={Register} />

        <AdminTemplate exact path='/admin/films' Component={Films} />
        <AdminTemplate exact path='/admin/films/addnew' Component={AddNew} />
        <AdminTemplate exact path='/admin/films/edit/:id' Component={Edit} />
      </Switch>
    </Router>
  );
}

export default App;
