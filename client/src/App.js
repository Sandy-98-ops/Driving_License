import './App.css';
import GuestLayout from './component/GuestLayout/GuestLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import AdminLayout from './component/adminLayout/AdminLayout';
import { Route, Routes } from 'react-router-dom';
import Home from './component/GuestLayout/Home';
import SignUp from './component/GuestLayout/SignUp';
import Login from './component/GuestLayout/Login';
import Notifications from './component/adminLayout/Notifications';
import Services from './component/adminLayout/Services';
import ViewApplications from './component/adminLayout/ViewApplications';
import AdminMaster from './component/adminLayout/AdminMaster';
import TrackingApplication from './component/adminLayout/TrackingApplication';
import About from './component/GuestLayout/About';
import AdminLogIn from './component/GuestLayout/AdminLogIn';
import AddCircleOfficer from './component/adminLayout/AddCircleOfficer';
import TalathiLogIn from './component/GuestLayout/TalathiLogIn';
import StaffLogIn from './component/GuestLayout/StaffLogIn';
import CitizenLayout from './component/citizenLayout/CitizenLayout';
import IncomeStep1 from './component/citizenLayout/IncomeStep1';
import IncomeStep2 from './component/citizenLayout/IncomeStep2';
import AddSchema from './component/adminLayout/AddSchema';
import IncomeStep3 from './component/citizenLayout/IncomeStep3';
import AllSchemes from './component/GuestLayout/AllSchemes';
import ViewCircleOfficers from './component/adminLayout/ViewCircleOfficers';
import ViewSchems from './component/adminLayout/ViewSchems';
import CircleOfficerLogin from './component/GuestLayout/CircleOfficerLogin';
import AdminForgotPassword from './component/adminLayout/AdminForgotPassword';
import CitizenForgotPassword from './component/citizenLayout/CitizenForgotPassword';
import ApplicationStatus from './component/citizenLayout/ApplicationStatus';
import CitizenEditProfile from './component/citizenLayout/CitizenEditProfile';
import CitizenChangePassword from './component/citizenLayout/CitizenChangePassword';
import ApplicationForm from './component/citizenLayout/ApplicationForm';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/guestLayout/Login' element={<Login />}></Route>
          <Route path='/guestLayout/adminlogin' element={<AdminLogIn />}></Route>
          <Route path='/guestLayout/staffLogin' element={<StaffLogIn />}></Route>
          <Route path='/guestLayout/talathiLogin' element={<TalathiLogIn />}></Route>
          <Route path='/guestLayout/circleOfficerLogin' element={<CircleOfficerLogin />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/schemes' element={<AllSchemes />}></Route>
          <Route path='/adminForgotPassword' element={<AdminForgotPassword />}></Route>
          <Route path='/citizenForgotPassword' element={<CitizenForgotPassword />}></Route>

        </Route>


        <Route path='/admin' element={<AdminLayout />}>
          <Route path='/admin/notifications' element={<Notifications />}></Route>
          <Route path='/admin/services' element={<Services />} ></Route>
          <Route path='/admin/circleofficer' element={<AddCircleOfficer />}></Route>
          <Route path='/admin/viewCircleOfficers' element={<ViewCircleOfficers />} />
          <Route path='/admin/viewSchemes' element={<ViewSchems />} />
          <Route path='/admin/view' element={<ViewApplications />}></Route>
          <Route path='/admin/adminmaster' element={<AdminMaster />}></Route>
          <Route path='/admin/tracking' element={<TrackingApplication />}></Route>
          <Route path='/admin/scheme' element={<AddSchema />}></Route>
        </Route>

        <Route path='/citizen' element={<CitizenLayout />}>
          <Route index element={<IncomeStep1 />}></Route>

          <Route path='/citizen/applicationForm' element={<ApplicationForm />}/>
          <Route path='/citizen/step1' element={<IncomeStep1 />}></Route>
          <Route path='/citizen/step2' element={<IncomeStep2 />}></Route>
          <Route path='/citizen/step3' element={<IncomeStep3 />}></Route>
          <Route path='/citizen/view' element={<ApplicationStatus />} />
          <Route path='/citizen/edit-profile' element={<CitizenEditProfile />} />
          <Route path='/citizen/change-password' element={<CitizenChangePassword />} />
        </Route>



      </Routes>
    </div>


  );
}

export default App;
