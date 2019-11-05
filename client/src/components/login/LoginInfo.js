import React, { useState, Fragment } from 'react';
import { login } from '../../actions/auth';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LoginInfo = ({ login }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	
	//if google respond with code, console log the err; else log the user
	const responseGoogle = (res) => {
		console.log(res);
	};
	return (
		<Fragment>
			<div className="col-6 login-input">
				<h3 className="pb-5"> Build Better Forum with ForumSight</h3>
				<form onSubmit={() => login(email)}>
					<div className="pb-4">
						<input
							type="text"
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							className="px-2 py-1 email input"
						/>
					</div>
					<div>
						<input
							type="text"
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							className="px-2 py-1 password input"
						/>
					</div>

					<button
						onClick={(e) => {
							e.preventDefault();
							login(email);
						}}
						className="btn_signin btn my-3"
					>
						Log In
					</button>
				</form>
				<p> ----- Or ----- </p>
				<GoogleLogin
					clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
					buttonText="Log in with Google"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={'single_host_origin'}
				/>

				<p className="pt-5">Don't have an account with us? </p>
				<button className="btn btn_signup"> Sign Up</button>
			</div>
		</Fragment>
	);
};

LoginInfo.propTypes = {
	email: String
};

const mapStateToProps = (state) => ({
	isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps, { login })(LoginInfo);
