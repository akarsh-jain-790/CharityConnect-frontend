import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Components/Navbar";
import HomePage from "./Pages/Home/HomePage";
import SignIn from "./Pages/Accounts/SignIn";
import SignUp from "./Pages/Accounts/SignUp";
import Error404 from "./Pages/Utils/Error404";
import Contacts from "./Pages/Utils/Contacts";
import About from "./Pages/Utils/About";
import Donate from "./Pages/Accounts/Donate";
import "./App.css"
import SignUpNgo from "./Pages/Accounts/SignUpNgo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-in" element={<SignIn />}/>
          <Route path="/sign-up" element={<SignUp />}/>
          <Route path="/sign-up-ngo" element={<SignUpNgo />}/>
          <Route path="/donate" element={<Donate />}/>
          <Route path="/contact-us" element={<Contacts />}/>
          <Route path="/about-us" element={<About />}/>
          <Route path="*" element={<Error404/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
