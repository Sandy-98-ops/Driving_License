import React, { useState } from 'react'
import { useApplicationData } from '../../utils/Cookies'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { updateLLApplicationById } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Payment = () => {

    const navigate = useNavigate();
    const [applicationErrors, setApplicationErrors] = useState({});
    const { applicationData: initialData } = useApplicationData();
    console.log("Apllication Data from Cookie: ", initialData);

    const [data, setData] = useState({
        applicant: initialData._id,
        utrNo: ''
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const validateApplication = () => {
        const errors = {};

        if (!data.utrNo) errors.utrNo = "UTR No is required";

        return errors;
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const errors = validateApplication();

        if (Object.keys(errors).length > 0) {
            setApplicationErrors(errors);
            return;
        }

        try {
            const response = await updateLLApplicationById(data);

            if (response.ok) {
                alert("Payment Details updated Successfully");
                navigate('/citizen/uploadDocuments');
            } else {
                const errorData = await response.json();
                setApplicationErrors({ server: errorData.message });
            }

        } catch (error) {
            setApplicationErrors({ server: `An error occurred. Please try again. ${error}` });
        }
    }


    return (
        <div>
            <Container className='container-2'>
                <Form onSubmit={handleSubmit}>
                    <div className='form-3 form'>
                        <Row>
                            <h2>Payment Details</h2>
                            {applicationErrors.server && <Alert variant="danger">{applicationErrors.server}</Alert>}

                        </Row>
                        <Row>
                            <Col>
                                Enter UTR Number:
                            </Col>

                            <Col sm={6}>
                                <Form.Group controlId="utrNo">
                                    <Form.Control
                                        type="text"
                                        name="utrNo"
                                        placeholder="UTR Number"
                                        className={`mb-3 ${applicationErrors.utrNo ? 'is-invalid' : ''}`}
                                        value={data.utrNo}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.utrNo && <p className="invalid-feedback">{applicationErrors.utrNo}</p>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='pt-5'>
                            <Col>
                                <Button variant="primary" type="submit" className="signup-button-2 mb-3">
                                    Proceed
                                </Button>
                            </Col>
                        </Row>
                    </div>

                </Form>
            </Container>
        </div>
    )
}

export default Payment
