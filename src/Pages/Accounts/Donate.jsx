import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerOrg } from "../../redux/Slices/authenticationSlice";
import image from '../../assets/icon/images.jpeg';

export default function SignUpNgo(){
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const [credentials, setcredentials] = useState({name:"", pincode:"", type:""});
	const { error, error_message, success_message } = useSelector((state) => state.authentication);

	useEffect(() => {
        // redirect to home if already logged in
        if (success_message !== '') navigate("/sign-in", { replace: true });
    }, [success_message]);

	const handleSubmit = async (e) =>{
        e.preventDefault();
        const {name, pincode, type} = credentials;
		dispatch(registerOrg({ name, pincode, type }));
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
							Donate
						</span>

						<div class="wrap-input100 validate-input">
							<input class="input100" value={credentials.name} onChange={onChange} type="text" name="name" placeholder="Full Name" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-user" aria-hidden="true"></i>
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
							<input class="input100" minValue={6} value={credentials.pincode} onChange={onChange} type="text" name="pincode" placeholder="Pincode" />
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-map-marker" aria-hidden="true"></i>
							</span>
						</div>

						{error ? <span className="sign__error">{error_message}</span>: success_message !== '' && <span className="sign__success">{success_message}</span>}

						<div class="container-login100-form-btn">
							<button class="login100-form-btn">
								Search NGO's
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}