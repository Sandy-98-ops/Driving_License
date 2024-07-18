import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { applyForLL } from '../../utils/api';
import { useCitizenData } from '../../utils/Cookies';
import cookies from 'js-cookie';

const ApplicationForm = () => {

    const navigate = useNavigate();
    const { citizen: initialData } = useCitizenData();

    const [applicationErrors, setApplicationErrors] = useState({});

    const [formData, setFormData] = useState({
        applicant: initialData._id,
        state: '',
        rtoOffice: '',
        firstName: '',
        middleName: '',
        lastName: '',
        relation: '',
        relationFirstName: '',
        relationMiddleName: '',
        relationLastName: '',
        aadharNo: '',
        nprNumber: '',
        fullName: '',
        gender: '',
        dob: '',
        placeOfBirth: '',
        countryOfBirth: '',
        qualification: '',
        bloodGroup: '',
        phone: '',
        email: '',
        mobileNumber: '',
        emergencyMobileNo: '',
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

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const [copyAddress, setCopyAddress] = useState(false);

    const handleCopyAddressChange = (e) => {
        setCopyAddress(e.target.checked);
        if (e.target.checked) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                address: {
                    ...prevFormData.address,
                    permanentState: prevFormData.address.state,
                    permanentDistrict: prevFormData.address.district,
                    permanentTaluka: prevFormData.address.taluka,
                    permanentVillage: prevFormData.address.village,
                    permanentHouseNo: prevFormData.address.houseNo,
                    permanentStreet: prevFormData.address.street,
                    permanentLandMark: prevFormData.address.landMark,
                    permanentPinCode: prevFormData.address.pinCode
                }
            }));
        }
    };

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

    const validateApplication = () => {
        const errors = {};

        if (!formData.state) errors.state = 'State is required';
        if (!formData.rtoOffice) errors.rtoOffice = 'RTO Office is required';
        if (!formData.firstName) errors.firstName = 'First name is required';
        if (!formData.relation) errors.relation = 'Select Relation';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.relationFirstName) errors.relationFirstName = 'Relative First Name is required'
        if (!formData.fullName) errors.fullName = 'Full Name is required'
        if (!formData.gender) errors.gender = 'Gender is required'
        if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of Birth is required'
        if (!formData.qualification) errors.qualification = 'Qualification is required'
        if (!formData.mobileNumber) errors.mobileNumber = 'Mobile Number is required'

        if (formData.address) {
            errors.address = {};

            if (!formData.address?.state) errors.address.state = 'Select State';
            if (!formData.address?.permanentState) errors.address.permanentState = 'Select State';
            if (!formData.address?.district) errors.address.district = 'Select District';
            if (!formData.address?.permanentDistrict) errors.address.permanentDistrict = 'Select District';
            if (!formData.address?.taluka) errors.address.taluka = 'Select Sub-District';
            if (!formData.address?.permanentTaluka) errors.address.permanentTaluka = 'Select Sub-District';
            if (!formData.address?.landMark) errors.address.landMark = 'Location is Required';
            if (!formData.address?.permanentLandMark) errors.address.permanentLandMark = 'Location is Required';
            if (!formData.address?.pinCode) errors.address.pinCode = 'Pincode is Required';
            if (!formData.address?.permanentPinCode) errors.address.permanentPinCode = 'Pincode is Required';
        }
        console.log("Errors", errors)

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateApplication();

        if (Object.keys(errors).length > 0) {
            if (Object.keys(errors.address).length > 0) {
                setApplicationErrors(errors);
                return;
            }
        }

        try {
            const response = await applyForLL(formData);
            if (response.ok) {

                const data = await response.json();
                setFormData({
                    applicant: '',
                    state: '',
                    rtoOffice: '',
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    relation: '',
                    relationFirstName: '',
                    relationMiddleName: '',
                    relationLastName: '',
                    aadharNo: '',
                    nprNumber: '',
                    fullName: '',
                    gender: '',
                    dob: '',
                    placeOfBirth: '',
                    countryOfBirth: '',
                    qualification: '',
                    bloodGroup: '',
                    phone: '',
                    email: '',
                    mobileNumber: '',
                    emergencyMobileNo: '',
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

                console.log(data);
                cookies.set('applicationData',
                    JSON.stringify(data), { path: '/' })

                console.log(cookies.get('applicationData'))
                alert("Application Submitted Successfully");
                navigate('/citizen/payment')

            }  else {
                const errorData = await response.json();
                setShowErrorAlert({ server: errorData.message });
            }

        } catch (error) {
            setShowErrorAlert({ server: `An error occurred. Please try again. ${error}` });
        }
    };


    return (
        <Container className='container-2'>
            <div className="form form-2">
                <h2 className='pb-4'>Application Form for Learners License - General</h2>
                {applicationErrors.server && <Alert variant="danger">{applicationErrors.server}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Container className='border pb-3 pt-3'>
                        <Row className='pb-3'>
                            <h4>Select State and RTO Office</h4>
                        </Row>
                        <Row>
                            <Col sm={3} className='pt-2'>
                                <Form.Label>Select State</Form.Label>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="state">
                                    <Form.Control
                                        as="select"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={`mb-3 ${applicationErrors.state ? 'is-invalid' : ''}`}

                                    >
                                        {/* I'll read states from DB here */}
                                        <option value="">Select State</option>
                                        <option value="state1">State 1</option>
                                        <option value="state2">State 2</option>
                                    </Form.Control>
                                    {applicationErrors.state && <p className="invalid-feedback">{applicationErrors.state}</p>}

                                </Form.Group>

                            </Col>

                            <Col sm={3} className='pt-2'>
                                <Form.Label>Select RTO</Form.Label>
                            </Col>
                            <Col sm={3}>

                                <Form.Group controlId="rto">
                                    <Form.Control
                                        as="select"
                                        name="rtoOffice"
                                        value={formData.rtoOffice}
                                        onChange={handleChange}
                                        className={`mb-3 ${applicationErrors.rtoOffice ? 'is-invalid' : ''}`}

                                    >
                                        {/* I'll read states from DB here */}
                                        <option value="">Select State</option>
                                        <option value="state1">State 1</option>
                                        <option value="state2">State 2</option>
                                    </Form.Control>
                                    {applicationErrors.rtoOffice && <p className="invalid-feedback">{applicationErrors.rtoOffice}</p>}

                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>

                    <Container className='border pt-4'>
                        <Row className='pb-3'>
                            <h4>Personal Details</h4>
                        </Row>
                        <Row className='pt-3'>
                            <Col sm={3} className='pt-2'>
                                <b>Name Of Applicant</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="formFirstName">
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        className={`mb-3 ${applicationErrors.firstName ? 'is-invalid' : ''}`}
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.firstName && <p className="invalid-feedback">{applicationErrors.firstName}</p>}
                                </Form.Group>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="formMiddleName">
                                    <Form.Control
                                        type="text"
                                        name="middleName"
                                        placeholder="Middle Name"
                                        className={`mb-3 ${applicationErrors.middleName ? 'is-invalid' : ''}`}
                                        value={formData.middleName}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.middleName && <p className="invalid-feedback">{applicationErrors.middleName}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3}>
                                <Form.Group controlId="formLastName">
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className={`mb-3 ${applicationErrors.lastName ? 'is-invalid' : ''}`}
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.lastName && <p className="invalid-feedback">{applicationErrors.lastName}</p>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='pt-2'>
                            <Col sm={1} className='pt-2'>
                                <b>Relation</b>
                            </Col>
                            <Col sm={2}>
                                <Form.Group controlId="relation">
                                    <Form.Control
                                        as="select"
                                        name="relation"
                                        value={formData.relation}
                                        onChange={handleChange}
                                        className={`mb-3 ${applicationErrors.relation ? 'is-invalid' : ''}`}

                                    >
                                        <option value="">Select</option>
                                        <option value="state1">State 1</option>
                                        <option value="state2">State 2</option>
                                    </Form.Control>
                                    {applicationErrors.relation && <p className="invalid-feedback">{applicationErrors.relation}</p>}
                                </Form.Group>

                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="formRelationFirstName">
                                    <Form.Control
                                        type="text"
                                        name="relationFirstName"
                                        placeholder="First Name"
                                        className={`mb-3 ${applicationErrors.relationFirstName ? 'is-invalid' : ''}`}
                                        value={formData.relationFirstName}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.relationFirstName && <p className="invalid-feedback">{applicationErrors.relationFirstName}</p>}
                                </Form.Group>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="formRelationMiddleName">
                                    <Form.Control
                                        type="text"
                                        name="relationMiddleName"
                                        placeholder="Middle Name"
                                        className={`mb-3 ${applicationErrors.relationMiddleName ? 'is-invalid' : ''}`}
                                        value={formData.relationMiddleName}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.relationMiddleName && <p className="invalid-feedback">{applicationErrors.relationMiddleName}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3}>
                                <Form.Group controlId="formRelationLastName">
                                    <Form.Control
                                        type="text"
                                        name="relationLastName"
                                        placeholder="Last Name"
                                        className={`mb-3 ${applicationErrors.relationLastName ? 'is-invalid' : ''}`}
                                        value={formData.relationLastName}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.relationLastName && <p className="invalid-feedback">{applicationErrors.relationLastName}</p>}
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row className='pt-2'>
                            <Col sm={3} className='pt-2'>
                                <b>Aaddhar Number</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="formFirstName">
                                    <Form.Control
                                        type="text"
                                        name="aadharNo"
                                        placeholder="Aadhar No"
                                        className={`mb-3 ${applicationErrors.aadharNo ? 'is-invalid' : ''}`}
                                        value={formData.aadharNo}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.aadharNo && <p className="invalid-feedback">{applicationErrors.aadharNo}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>NPR Number</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="formMiddleName">
                                    <Form.Control
                                        type="text"
                                        name="nprNumber"
                                        placeholder="NPR Number"
                                        className={`mb-3 ${applicationErrors.nprNumber ? 'is-invalid' : ''}`}
                                        value={formData.nprNumber}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.nprNumber && <p className="invalid-feedback">{applicationErrors.nprNumber}</p>}
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row className='pt-2'>
                            <Col sm={3} className='pt-2'>
                                <b>Full Name as per Records</b>
                            </Col>
                            <Col sm={9}>
                                <Form.Group controlId="formFirstName">
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        className={`mb-3 ${applicationErrors.fullName ? 'is-invalid' : ''}`}
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.fullName && <p className="invalid-feedback">{applicationErrors.fullName}</p>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='pt-2'>
                            <Col sm={3} className='pt-2'>
                                <b>Gender</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="gender">
                                    <Form.Control
                                        as="select"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        {/* I'll read states from DB here */}
                                        <option value="">Select</option>
                                        <option value="state1">State 1</option>
                                        <option value="state2">State 2</option>
                                    </Form.Control>
                                    {applicationErrors.gender && <p className="invalid-feedback">{applicationErrors.gender}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>Date Of Birth</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Control
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    isInvalid={!!applicationErrors.dateOfBirth}
                                    className="large-input"
                                    placeholder='Date of Birth'
                                />
                                <Form.Control.Feedback type="invalid">
                                    {applicationErrors.dateOfBirth}
                                </Form.Control.Feedback>
                            </Col>

                        </Row>


                        <Row className='pt-3'>
                            <Col sm={3} className='pt-4'>
                                <b>Place Of Birth</b>
                            </Col>
                            <Col sm={3} className='pt-2'>
                                <Form.Group controlId="formFirstName">
                                    <Form.Control
                                        type="text"
                                        name="placeOfBirth"
                                        placeholder="Place Of Birth"
                                        className={`mb-3 ${applicationErrors.placeOfBirth ? 'is-invalid' : ''}`}
                                        value={formData.placeOfBirth}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.placeOfBirth && <p className="invalid-feedback">{applicationErrors.placeOfBirth}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-3'>
                                <b>Country Of Birth</b>
                            </Col>
                            <Col sm={3} className='pt-2'>
                                <Form.Group controlId="formMiddleName">
                                    <Form.Control
                                        type="text"
                                        name="countryOfBirth"
                                        placeholder="Country"
                                        className={`mb-3 ${applicationErrors.countryOfBirth ? 'is-invalid' : ''}`}
                                        value={formData.countryOfBirth}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.countryOfBirth && <p className="invalid-feedback">{applicationErrors.countryOfBirth}</p>}
                                </Form.Group>
                            </Col>

                        </Row>

                        <Row className='pt-2'>
                            <Col sm={3} className='pt-2'>
                                <b>Qualification</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="formFirstName">
                                    <Form.Control
                                        type="text"
                                        name="qualification"
                                        placeholder="Qualification"
                                        className={`mb-3 ${applicationErrors.qualification ? 'is-invalid' : ''}`}
                                        value={formData.qualification}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.qualification && <p className="invalid-feedback">{applicationErrors.qualification}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>Blood Group</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="formMiddleName">
                                    <Form.Control
                                        type="text"
                                        name="bloodGroup"
                                        placeholder="Blood Group"
                                        className={`mb-3 ${applicationErrors.bloodGroup ? 'is-invalid' : ''}`}
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.bloodGroup && <p className="invalid-feedback">{applicationErrors.bloodGroup}</p>}
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row className='pt-2'>
                            <Col sm={3} className='pt-2'>
                                <b>Phone Number</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="formFirstName">
                                    <Form.Control
                                        type="number"
                                        name="phone"
                                        placeholder="Phone Number"
                                        className={`mb-3 ${applicationErrors.phone ? 'is-invalid' : ''}`}
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.phone && <p className="invalid-feedback">{applicationErrors.phone}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>Email Id</b>
                            </Col>
                            <Col sm={3}>
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
                            </Col>
                        </Row>

                        <Row className='pt-2'>
                            <Col sm={3} className='pt-2'>
                                <b>Mobile Number</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="mobileNumber">
                                    <Form.Control
                                        type="number"
                                        name="mobileNumber"
                                        placeholder="Mobile No"
                                        className={`mb-3 ${applicationErrors.mobileNumber ? 'is-invalid' : ''}`}
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.mobileNumber && <p className="invalid-feedback">{applicationErrors.mobileNumber}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>Emergency Mobile Number</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="formMiddleName">
                                    <Form.Control
                                        type="text"
                                        name="emergencyMobileNo"
                                        placeholder="Emergency Mobile No"
                                        className={`mb-3 ${applicationErrors.emergencyMobileNo ? 'is-invalid' : ''}`}
                                        value={formData.emergencyMobileNo}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.emergencyMobileNo && <p className="invalid-feedback">{applicationErrors.emergencyMobileNo}</p>}
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row className='pt-2'>
                            <Col sm={3} className='pt-2'>
                                <b>Identification Marks 1</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="identificationMarks_1">
                                    <Form.Control
                                        type="text"
                                        name="identificationMarks_1"
                                        placeholder="IdentificationMarks 1"
                                        className={`mb-3 ${applicationErrors.identificationMarks_1 ? 'is-invalid' : ''}`}
                                        value={formData.identificationMarks_1}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.identificationMarks_1 && <p className="invalid-feedback">{applicationErrors.identificationMarks_1}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>Identification Marks 2</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="identificationMarks_1">
                                    <Form.Control
                                        type="text"
                                        name="identificationMarks_2"
                                        placeholder="IdentificationMarks 2"
                                        className={`mb-3 ${applicationErrors.identificationMarks_2 ? 'is-invalid' : ''}`}
                                        value={formData.identificationMarks_2}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.identificationMarks_2 && <p className="invalid-feedback">{applicationErrors.identificationMarks_2}</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>


                    <Container className='border pt-3 pb-3'>
                        <Row>
                            <h4>Address</h4>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <b>Present Address</b>
                            </Col>
                            <Col sm={6}>
                                <b>Permanent Address</b>
                            </Col>
                        </Row>

                        <Row className='pt-3'>
                            <Col sm={3} className='pt-2'>
                                <b>State</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="state">
                                    <Form.Control
                                        as="select"
                                        name="address.state"
                                        className={`mb-3 ${applicationErrors.address?.state ? 'is-invalid' : ''}`}
                                        value={formData.address.state}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select State</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                    </Form.Control>
                                    {applicationErrors?.address?.state && <p className="invalid-feedback">{applicationErrors.address.state}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>State</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="gender">
                                    <Form.Control
                                        as="select"
                                        name="address.permanentState"
                                        value={formData.address.permanentState}
                                        className={`mb-3 ${applicationErrors.address?.permanentState ? 'is-invalid' : ''}`}
                                        onChange={handleChange}
                                    >
                                        {/* I'll read states from DB here */}
                                        <option value="">Select  State</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Maharashtra">Maharashtra</option>
                                    </Form.Control>
                                    {applicationErrors?.address?.permanentState && <p className="invalid-feedback">{applicationErrors.address.permanentState}</p>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='pt-3'>
                            <Col sm={3} className='pt-2'>
                                <b>District</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="state">
                                    <Form.Control
                                        as="select"
                                        name="address.district"
                                        value={formData.address.district}
                                        className={`mb-3 ${applicationErrors.address?.district ? 'is-invalid' : ''}`}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="state1">State 1</option>
                                        <option value="state2">State 2</option>
                                    </Form.Control>
                                    {applicationErrors?.address?.district && <p className="invalid-feedback">{applicationErrors.address.district}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>District</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="permanentDistrict">
                                    <Form.Control
                                        as="select"
                                        name="address.permanentDistrict"
                                        value={formData.address.permanentDistrict}
                                        className={`mb-3 ${applicationErrors.address?.permanentDistrict ? 'is-invalid' : ''}`}
                                        onChange={handleChange}
                                    >
                                        {/* I'll read states from DB here */}
                                        <option value="">Select</option>
                                        <option value="state1">State 1</option>
                                        <option value="state2">State 2</option>
                                    </Form.Control>
                                    {applicationErrors?.address?.permanentDistrict && <p className="invalid-feedback">{applicationErrors.address.permanentDistrict}</p>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='pt-3'>
                            <Col sm={3} className='pt-2'>
                                <b>Sub District</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="taluka">
                                    <Form.Control
                                        as="select"
                                        name="address.taluka"
                                        value={formData.address.taluka}
                                        className={`mb-3 ${applicationErrors.address?.taluka ? 'is-invalid' : ''}`}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select</option>
                                        <option value="state1">State 1</option>
                                        <option value="state2">State 2</option>
                                    </Form.Control>
                                    {applicationErrors.address?.taluka && <p className="invalid-feedback">{applicationErrors.address.taluka}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>Sub District</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="permanentTaluka">
                                    <Form.Control
                                        as="select"
                                        name="address.permanentTaluka"
                                        className={`mb-3 ${applicationErrors.address?.permanentTaluka ? 'is-invalid' : ''}`}
                                        value={formData.address.permanentTaluka}
                                        onChange={handleChange}
                                    >
                                        {/* I'll read states from DB here */}
                                        <option value="">Select</option>
                                        <option value="state1">State 1</option>
                                        <option value="state2">State 2</option>
                                    </Form.Control>
                                    {applicationErrors.address?.permanentTaluka && <p className="invalid-feedback">{applicationErrors.address.permanentTaluka}</p>}
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row className='pt-3'>
                            <Col sm={3} className='pt-2'>
                                <b>Village/Town</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="identificationMarks_1">
                                    <Form.Control
                                        type="text"
                                        name="address.village"
                                        placeholder="Village / Town"
                                        className={`mb-3 ${applicationErrors.address?.village ? 'is-invalid' : ''}`}
                                        value={formData.address.village}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.address?.village && <p className="invalid-feedback">{applicationErrors.address.village}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>Village/Town</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="identificationMarks_1">
                                    <Form.Control
                                        type="text"
                                        name="address.permanentVillage"
                                        placeholder="Village / Town"
                                        className={`mb-3 ${applicationErrors.address?.permanentVillage ? 'is-invalid' : ''}`}
                                        value={formData.address.permanentVillage}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.address?.permanentVillage && <p className="invalid-feedback">{applicationErrors.address.permanentVillage}</p>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='pt-3'>
                            <Col sm={3} className='pt-2'>
                                <b>House/Door/Flat No (Address Line 1)</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="identificationMarks_1">
                                    <Form.Control
                                        type="text"
                                        name="address.houseNo"
                                        placeholder="House / Door / Flat No"
                                        className={`mb-3 ${applicationErrors.address?.houseNo ? 'is-invalid' : ''}`}
                                        value={formData.address.houseNo}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.address?.houseNo && <p className="invalid-feedback">{applicationErrors.address.houseNo}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>House/Door/Flat No (Address Line 1)</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="identificationMarks_1">
                                    <Form.Control
                                        type="text"
                                        name="address.permanentHouseNo"
                                        placeholder="House / Door / Flat No"
                                        className={`mb-3 ${applicationErrors.address?.permanentHouseNo ? 'is-invalid' : ''}`}
                                        value={formData.address.permanentHouseNo}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.address?.permanentHouseNo && <p className="invalid-feedback">{applicationErrors.address.permanentHouseNo}</p>}
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row className='pt-3'>
                            <Col sm={3} className='pt-2'>
                                <b>Street/Locality (Address Line 2)</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="identificationMarks_1">
                                    <Form.Control
                                        type="text"
                                        name="address.street"
                                        placeholder="Street/Locality"
                                        className={`mb-3 ${applicationErrors.address?.street ? 'is-invalid' : ''}`}
                                        value={formData.address.street}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.address?.street && <p className="invalid-feedback">{applicationErrors.address.street}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>Street/Locality (Address Line 2)</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="identificationMarks_1">
                                    <Form.Control
                                        type="text"
                                        name="address.permanentStreets"
                                        placeholder="Street/Locality"
                                        className={`mb-3 ${applicationErrors.address?.permanentStreet ? 'is-invalid' : ''}`}
                                        value={formData.address.permanentStreet}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.address?.permanentStreet && <p className="invalid-feedback">{applicationErrors.address.permanentStreet}</p>}
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row className='pt-3'>
                            <Col sm={3} className='pt-2'>
                                <b>Location (Address Line 3)</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="identificationMarks_1">
                                    <Form.Control
                                        type="text"
                                        name="address.landMark"
                                        placeholder="Location"
                                        className={`mb-3 ${applicationErrors.address?.landMark ? 'is-invalid' : ''}`}
                                        value={formData.address.landMark}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.address?.landMark && <p className="invalid-feedback">{applicationErrors.address.landMark}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>Location (Address Line 3)</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="permanentLandMark">
                                    <Form.Control
                                        type="text"
                                        name="address.permanentLandMark"
                                        placeholder="Location"
                                        className={`mb-3 ${applicationErrors.address?.permanentLandMark ? 'is-invalid' : ''}`}
                                        value={formData.address.permanentLandMark}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.address?.permanentLandMark && <p className="invalid-feedback">{applicationErrors.address.permanentLandMark}</p>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='pt-3'>
                            <Col sm={3} className='pt-2'>
                                <b>Pin Code</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="pinCode">
                                    <Form.Control
                                        type="text"
                                        name="address.pinCode"
                                        placeholder="Pincode"
                                        className={`mb-3 ${applicationErrors.address?.pinCode ? 'is-invalid' : ''}`}
                                        value={formData.address.pinCode}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.address?.pinCode && <p className="invalid-feedback">{applicationErrors.address.pinCode}</p>}
                                </Form.Group>
                            </Col>

                            <Col sm={3} className='pt-2'>
                                <b>Pin Code</b>
                            </Col>
                            <Col sm={3}>
                                <Form.Group controlId="pinCode">
                                    <Form.Control
                                        type="text"
                                        name="address.permanentPinCode"
                                        placeholder="Pincode"
                                        className={`mb-3 ${applicationErrors.address?.permanentPinCode ? 'is-invalid' : ''}`}
                                        value={formData.address.permanentPinCode}
                                        onChange={handleChange}
                                    />
                                    {applicationErrors.address?.permanentPinCode && <p className="invalid-feedback">{applicationErrors.address.permanentPinCode}</p>}
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className='pt-3'>
                            <Col sm={3}>

                            </Col>
                            <Col sm={4}>
                                <Form.Check
                                    type="checkbox"
                                    label="Same as Present Address"
                                    checked={copyAddress}
                                    onChange={handleCopyAddressChange}
                                />
                            </Col>
                            <Col sm={3}>
                            </Col>
                        </Row>

                        {applicationErrors.server && (
                            <div className="alert alert-danger">
                                {applicationErrors.server}
                            </div>
                        )}
                        <Row className='pt-5'>
                            <Col>
                                <Button variant="primary" type="submit" className="signup-button-2 mb-3">
                                    Submit
                                </Button>
                            </Col>
                        </Row>

                    </Container>


                </Form>
            </div>
        </Container>
    );
};

export default ApplicationForm;
