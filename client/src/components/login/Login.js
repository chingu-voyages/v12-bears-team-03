import React from 'react';

import styled from 'styled-components';
import LoginInfo from './LoginInfo';
import LoginGraphic from './LoginGraphic';

const Login = () => {
	return (
		<LoginWrapper>
			<div className="container-fluid login-container ">
				<div className="row text-center d-flex align-items-center" style={{ height: '100vh' }}>
				 <LoginGraphic/>
					<LoginInfo />
				</div>
			</div>
		</LoginWrapper>
	);
};

const LoginWrapper = styled.div`
	h3 {
		color: var(--mainBlue);
	}

	.btn {
		border: none;
		outline: none;
		width: 18rem;
	}

	.btn_signin {
		background: var(--mainBlue);
		color: var(--mainWhite);
	}

	.btn_signup {
		border: 1px var(--mainBlue) solid;
		color: var(--mainBlue);
	}
	.input {
		border: none;
		box-shadow: 0px 2px 3px 2px rgba(0, 0, 0, 0.1);
		width: 18rem;
	}
`;

export default Login;
