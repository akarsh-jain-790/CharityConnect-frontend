import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/icon/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from '../../redux/Slices/authenticationSlice';

export default function Navbar() {
	let navigate = useNavigate();
	const dispatch = useDispatch();

    const handleLogout = () =>{
		dispatch(logoutUser());
        navigate("/sign-in", { replace: true });
    }

    return (
            <header>
            <div class="header-area">
                <div class="main-header ">
                    <div class="header-bottom  header-sticky">
                        <div class="container-fluid">
                            <div class="row align-items-center">
                                <div class="col-xl-2 col-lg-2">
                                    <div class="logo">
                                        <a href="index.html">
                                            <img src={logo} className="logo"></img>
                                            </a>
                                    </div>
                                </div>
                                <div class="col-xl-10 col-lg-10">
                                    <div class="menu-wrapper  d-flex align-items-center justify-content-end">
                                        <div class="main-menu d-none d-lg-block">
                                            <nav>
                                                <ul id="navigation">                                                                                          
                                                    <li>
                                                        <Link to='/'>
                                                            <a>Home</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/'>
                                                            <a>About</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to='/'>
                                                            <a href="contact.html">Contact</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>

                                        {!localStorage.getItem("Authentication-token") &&
                                            <div class="header-right-btn d-none d-lg-block ml-20">
                                                <Link to='/sign-up-ngo'>
                                                    <a class="btn header-btn">Register NGO</a>
                                                </Link>
                                            </div>
                                        }
                                        {!localStorage.getItem("Authentication-token")?
                                            <div class="header-right-btn d-none d-lg-block ml-20">
                                                <Link to='/sign-in'>
                                                    <a class="btn header-btn">Login</a>
                                                </Link>
                                            </div>:
                                            <div class="header-right-btn d-none d-lg-block ml-20">
                                                    <a class="btn header-btn" onClick={handleLogout}>Logout</a>
                                            </div>}
                                    </div>
                                </div> 
                                <div class="col-12">
                                    <div class="mobile_menu d-block d-lg-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
