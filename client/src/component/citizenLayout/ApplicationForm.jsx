import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ApplicationForm = () => {

    const [applicationErrors, setApplicationErrors] = useState({});

    const [formData, setFormData] = useState({
        applicant: '',
        state: '',
        rtoOffice: '',
        firstName: '',
        middleName: '',
        lastName: '',
        relationFirstName: '',
        relationMiddleName: '',
        relationLastName: '',
        gender: '',
        dob: '',
        placeOfBirth: '',
        countryOfBirth: '',
        qualification: '',
        bloodGroup: '',
        email: '',
        mobileNumber: '',
        identificationMarks_1: '',
        identificationMarks_2: '',
        address: {
            state: '',
            district: '',
            taluka: '',
            village: '',
            town: '',
            houseNo: '',
            street: '',
            landMark: '',
            pinCode: '',
            permanentState: '',
            permanentDistrict: '',
            permanentTaluka: '',
            permanentVillage: '',
            permanentTown: '',
            permanentHouseNo: '',
            permanentStreet: '',
            permanentLandMark: '',
            permanentPinCode: ''
        },
        classOfVehicle: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const nameParts = name.split('.');
        if (nameParts.length === 1) {
            setFormData({ ...formData, [name]: value });
        } else {
            setFormData({
                ...formData,
                [nameParts[0]]: {
                    ...formData[nameParts[0]],
                    [nameParts[1]]: value
                }
            });
        }
    };

    const handleClassOfVehicleChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevFormData) => {
            const updatedClassOfVehicle = checked
                ? [...prevFormData.classOfVehicle, value]
                : prevFormData.classOfVehicle.filter((vehicleClass) => vehicleClass !== value);
            return { ...prevFormData, classOfVehicle: updatedClassOfVehicle };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post('/api/applications', formData);
            // console.log('Application submitted:', response.data);
            // Clear the form
            setFormData({
                applicant: '',
                state: '',
                rtoOffice: '',
                firstName: '',
                middleName: '',
                lastName: '',
                relationFirstName: '',
                relationMiddleName: '',
                relationLastName: '',
                gender: '',
                dob: '',
                placeOfBirth: '',
                countryOfBirth: '',
                qualification: '',
                bloodGroup: '',
                email: '',
                mobileNumber: '',
                identificationMarks_1: '',
                identificationMarks_2: '',
                address: {
                    state: '',
                    district: '',
                    taluka: '',
                    village: '',
                    town: '',
                    houseNo: '',
                    street: '',
                    landMark: '',
                    pinCode: '',
                    permanentState: '',
                    permanentDistrict: '',
                    permanentTaluka: '',
                    permanentVillage: '',
                    permanentTown: '',
                    permanentHouseNo: '',
                    permanentStreet: '',
                    permanentLandMark: '',
                    permanentPinCode: ''
                },
                classOfVehicle: []
            });
        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };

    return (
        <Container className='container-2'>

            <div className="form form-2">
                <h2 className='pb-4'>Application Form for Learners License - General</h2>
                {applicationErrors.server && <Alert variant="danger">{applicationErrors.server}</Alert>}
                <Form onSubmit={handleSubmit}>

                    <Row>
                        <Col sm={3}>
                            <Form.Control as="select" value={formData.state} onChange={handleChange}>
                                <option value="">Select Month</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Form.Group controlId="formEmail">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email address"
                            className={`mb-3 ${applicationErrors.email ? 'is-invalid' : ''}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {applicationErrors.email && <p className="invalid-feedback">{applicationErrors.email}</p>}
                    </Form.Group>

                    <Button variant="primary" type="submit" className="signup-button-2 mb-3">
                        Submit
                    </Button>
                </Form>
            </div>

        </Container>
    );
};

export default ApplicationForm;
