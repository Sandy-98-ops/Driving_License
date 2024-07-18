import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { sendOTPForLLApply, verifyOtpAndLogin } from '../../utils/api';
import cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LLAppAuthentication = () => {
    const navigate = useNavigate();

    const [loginErrors, setLoginErrors] = useState({});
    const [loginData, setLoginData] = useState({ email: '', otp: '' });
    const [otpSent, setOtpSent] = useState(false);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const validateLogin = () => {
        const errors = {};
        if (!loginData.email) errors.email = 'Email is required';
        if (otpSent && !loginData.otp) errors.otp = 'OTP is required';
        return errors;
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const errors = validateLogin();
        if (Object.keys(errors).length > 0) {
            setLoginErrors(errors);
            return;
        }
        setLoginErrors({});
        try {
            const response = await sendOTPForLLApply({ email: loginData.email });
            if (response.ok) {
                setOtpSent(true);
            } else if (response.status === 401) {
                setLoginErrors({ server: 'Wrong credentials. Please try again.' });
            } else {
                const errorData = await response.json();
                setLoginErrors({ server: errorData.message });
            }
        } catch (err) {
            setLoginErrors({ server: `An error occurred. Please try again. ${err}` });
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        // Assuming you have a function to verify OTP and login the user
        try {
            const response = await verifyOtpAndLogin({ email: loginData.email, otp: loginData.otp });
            if (response.ok) {
                const result = await response.json();
                const citizen = result.citizen;

                cookies.set('citizenData', JSON.stringify(citizen), { path: '/' });

                console.log(cookies.get('citizenData'));

                navigate('/citizen'); // Redirect to citizen layout
            } else {
                const errorData = await response.json();
                setLoginErrors({ server: errorData.message });
            }
        } catch (err) {
            setLoginErrors({ server: `An error occurred. Please try again. ${err}` });
        }
    };

    return (
        <div>
            <Container className='container-2'>
                <div className='form form-1'>
                    {loginErrors.server && <Alert variant="danger">{loginErrors.server}</Alert>}

                    {!otpSent ? (
                        <Form onSubmit={handleLoginSubmit}>
                            <Form.Group controlId="formEmail">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    className={`mb-3 ${loginErrors.email ? 'is-invalid' : ''}`}
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                />
                                {loginErrors.email && <p className="invalid-feedback">{loginErrors.email}</p>}
                            </Form.Group>
                            <Button variant="primary" type="submit" className="signup-button-2 mb-3">
                                Get OTP
                            </Button>
                        </Form>
                    ) : (
                        <Form onSubmit={handleOtpSubmit}>
                            <Form.Group controlId="formOtp">
                                <Form.Control
                                    type="text"
                                    name="otp"
                                    placeholder="Enter OTP"
                                    className={`mb-3 ${loginErrors.otp ? 'is-invalid' : ''}`}
                                    value={loginData.otp}
                                    onChange={handleLoginChange}
                                />
                                {loginErrors.otp && <p className="invalid-feedback">{loginErrors.otp}</p>}
                            </Form.Group>
                            <Button variant="primary" type="submit" className="signup-button-1">
                                Verify
                            </Button>
                        </Form>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default LLAppAuthentication;
