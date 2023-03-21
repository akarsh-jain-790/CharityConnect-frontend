import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerOrg } from "../../redux/Slices/authenticationSlice";
import image from '../../assets/icon/images.jpeg';

export default function SignUpNgo(){
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const [credentials, setcredentials] = useState({name:"", description:"", email:"",phone:"", pincode:"", address:"", unique_id:"", type:"", website:"", password:""});
	const { error, error_message, success_message } = useSelector((state) => state.authentication);

	useEffect(() => {
        // redirect to home if already logged in
        if (success_message !== '') navigate("/sign-in", { replace: true });
    }, [success_message]);

	const handleSubmit = async (e) =>{
        e.preventDefault();
        const {name, description, email, phone, pincode, address, website, unique_id, type, password} = credentials;
		dispatch(registerOrg({ name, description, email, phone, pincode, address, website, unique_id, type, password}));
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
							Register NGO
						</span>

						<div class="wrap-input100 validate-input">
							<input class="input100" value={credentials.name} onChange={onChange} type="text" name="name" placeholder="Full Name" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-user" aria-hidden="true"></i>
							</span>
						</div>

						<div class="wrap-input100 validate-input">
							<input class="input100" value={credentials.description} onChange={onChange} type="text" name="description" placeholder="Description" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-book" aria-hidden="true"></i>
							</span>
						</div>

						<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
							<input class="input100" value={credentials.email} onChange={onChange} type="text" name="email" placeholder="Email" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-envelope" aria-hidden="true"></i>
							</span>
						</div>

						<div class="wrap-input100 validate-input">
							<input class="input100" value={credentials.phone} onChange={onChange} type="text" name="phone" placeholder="Phone" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-phone" aria-hidden="true"></i>
							</span>
						</div>

						<div class="wrap-input100 validate-input">
							<input class="input100" minValue={6} value={credentials.pincode} onChange={onChange} type="text" name="pincode" placeholder="Pincode" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-map-marker" aria-hidden="true"></i>
							</span>
						</div>
						
						<div class="wrap-input100 validate-input">
							<input class="input100" value={credentials.unique_id} onChange={onChange} type="text" name="unique_id" placeholder="Unique Id" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-id-card" aria-hidden="true"></i>
							</span>
						</div>

						<div class="wrap-input100 validate-input">
							<input class="input100" value={credentials.type} onChange={onChange} type="text" name="type" placeholder="Type" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-id-card" aria-hidden="true"></i>
							</span>
						</div>

						<div class="wrap-input100 validate-input">
							<input class="input100" value={credentials.address} onChange={onChange} type="text" name="address" placeholder="Address" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-address-book" aria-hidden="true"></i>
							</span>
						</div>

						<div class="wrap-input100 validate-input">
							<input class="input100" value={credentials.website} onChange={onChange} type="text" name="website" placeholder="Website" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-link" aria-hidden="true"></i>
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