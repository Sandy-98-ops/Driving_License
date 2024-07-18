import './App.css';
import GuestLayout from './component/GuestLayout/GuestLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import AdminLayout from './component/adminLayout/AdminLayout';
import { Route, Routes } from 'react-router-dom';
import Home from './component/GuestLayout/Home';
import SignUp from './component/GuestLayout/SignUp';
import Login from './component/GuestLayout/Login';
import Notifications from './component/adminLayout/Notifications';
import About from './component/GuestLayout/About';
import AdminLogIn from './component/GuestLayout/AdminLogIn';
import TalathiLogIn from './component/GuestLayout/TalathiLogIn';
import StaffLogIn from './component/GuestLayout/StaffLogIn';
import CitizenLayout from './component/citizenLayout/CitizenLayout';
import AllSchemes from './component/GuestLayout/AllSchemes';
import CircleOfficerLogin from './component/GuestLayout/CircleOfficerLogin';
import AdminForgotPassword from './component/adminLayout/AdminForgotPassword';
import CitizenForgotPassword from './component/citizenLayout/CitizenForgotPassword';
import CitizenEditProfile from './component/citizenLayout/CitizenEditProfile';
import CitizenChangePassword from './component/citizenLayout/CitizenChangePassword';
import ApplicationForm from './component/citizenLayout/ApplicationForm';
import LLApplication from './component/GuestLayout/LLApplication';
import LLAppAuthentication from './component/GuestLayout/LLAppAuthentication';
import Payment from './component/citizenLayout/Payment';
import UploadDocuments from './component/citizenLayout/UploadDocuments';
import LearnersLicenseTest from './component/citizenLayout/LearnersLicenseTest';


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

          <Route path='/LLApplicaion' element={<LLApplication />}></Route>
          <Route path='/LLAppAuth' element={<LLAppAuthentication />}></Route>

        </Route>


        <Route path='/admin' element={<AdminLayout />}>
          <Route path='/admin/notifications' element={<Notifications />}></Route>
        </Route>

        <Route path='/citizen' element={<CitizenLayout />}>
          <Route index element={<ApplicationForm />} />
          <Route path='/citizen/applicationForm' element={<ApplicationForm />} />
          <Route path='/citizen/uploadDocuments' element={<UploadDocuments />} />
          <Route path='/citizen/payment' element={<Payment />} />
          <Route path='/citizen/edit-profile' element={<CitizenEditProfile />} />
          <Route path='/citizen/change-password' element={<CitizenChangePassword />} />
          <Route path='/citizen/mockQuestions' element={<LearnersLicenseTest />}></Route>
        </Route>



      </Routes>
    </div>


  );
}

export default App;
