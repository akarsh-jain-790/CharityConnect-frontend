import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/Slices/authenticationSlice";
import image from '../../assets/icon/login.jpg';

export default function SignIn(){
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const [credentials, setcredentials] = useState({username:"",email:"",password:""});
	const { error, error_message, success_message } = useSelector((state) => state.authentication);

	useEffect(() => {
        // redirect to home if already logged in
        if (success_message !== '') navigate("/sign-in", { replace: true });
    }, [success_message]);

	const handleSubmit = async (e) =>{
        e.preventDefault();
        const {username, email, password} = credentials;
		dispatch(registerUser({ username, email, password}));
    }
    const onChange = (e) =>{
        setcredentials({...credentials,[e.target.name]:e.target.value});
      }
	  
	return(
		<div class="limiter">
			<div class="container-login100">
				<div class="wrap-login100">
					<div class="login100-pic js-tilt" data-tilt>
						<img src={image} alt="IMG" className="login_image"/>
					</div>

					<form class="login100-form validate-form" onSubmit={handleSubmit}>
						<span class="login100-form-title">
							Member Sign Up
						</span>

						<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
							<input class="input100" onChange={onChange} type="text" name="email" placeholder="Email" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-envelope" aria-hidden="true"></i>
							</span>
						</div>

						<div class="wrap-input100 validate-input" data-validate = "Password is required">
							<input class="input100" minLength={8} onChange={onChange} type="password" name="pass" placeholder="Password" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-lock" aria-hidden="true"></i>
							</span>
						</div>
						
						{error ? <span className="sign__error">{error_message}</span>: success_message !== '' && <span className="sign__success">{success_message}</span>}

						<div class="container-login100-form-btn">
							<button class="login100-form-btn">
								Create your Account
							</button>
						</div>

						<div class="text-center p-t-12 p-b-100">
							<Link to='/sign-in'>
								<a class="txt2" href="#">
									Login
									<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
								</a>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}