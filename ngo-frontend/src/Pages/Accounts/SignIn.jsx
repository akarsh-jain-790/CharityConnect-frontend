import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from '../../assets/icon/login.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from "../../redux/Slices/authenticationSlice";

export default function SignIn() {
	let navigate = useNavigate();
	const [credentials, setcredentials] = useState({ email: "", password: "" });
	const { user, pending, error, error_message, success_message } = useSelector((state) => state.authentication);
	const dispatch = useDispatch();

	useEffect(() => {
        // redirect to home if already logged in
        if (localStorage.getItem("Authentication-token")) navigate("/", { replace: true });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		// authenticateUser({ username: credentials.username, password: credentials.password }, dispatch);
		dispatch(authenticateUser({ email: credentials.email, password: credentials.password }));
	}

	const onChange = (event) => {
		setcredentials({ ...credentials, [event.target.name]: event.target.value })
	}

	return (
		<div class="limiter">
			<div class="container-login100">
				<div class="wrap-login100">
					<div class="login100-pic js-tilt" data-tilt>
						<img src={image} alt="IMG" className="login_image"/>
					</div>

					<form class="login100-form validate-form" onSubmit={handleSubmit}>
						<span class="login100-form-title">
							Member Login
						</span>

						<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
							<input class="input100" value={credentials.email} onChange={onChange} type="text" name="email" placeholder="Email" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-envelope" aria-hidden="true"></i>
							</span>
						</div>

						<div class="wrap-input100 validate-input" data-validate = "Password is required">
							<input class="input100" value={credentials.password} onChange={onChange} type="password" name="password" placeholder="Password" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-lock" aria-hidden="true"></i>
							</span>
						</div>

						{error ? <span className="sign__error">{error_message}</span>: success_message !== '' && <span className="sign__success">{success_message}</span>}
						
						<div class="container-login100-form-btn">
							<button class="login100-form-btn">
								Login
							</button>
						</div>

						<div class="text-center p-t-12 p-b-100">
							<Link class="txt2" to={'/sign-up'}>
								<a>
									Create your Account
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


