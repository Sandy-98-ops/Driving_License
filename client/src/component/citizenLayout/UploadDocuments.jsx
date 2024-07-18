import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useApplicationData } from '../../utils/Cookies';
import { saveApplicantDocuments } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const UploadDocuments = () => {
    const navigate = useNavigate();
    const { applicationData: initialData } = useApplicationData();
    const [signupErrors, setSignupErrors] = useState({});
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [formData, setFormData] = useState({
        applicant: initialData._id,
        aadharCard: null,
        panCard: null,
        addressProof: null
    });

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (file) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
            if (!validTypes.includes(file.type)) {
                setSignupErrors({ ...signupErrors, [name]: 'Invalid file type. Only JPG, JPEG, PNG, and PDF are allowed.' });
                setFormData({ ...formData, [name]: null });
                return;
            }

            if (file.size > maxSize) {
                setSignupErrors({ ...signupErrors, [name]: 'File size exceeds the limit of 2MB.' });
                setFormData({ ...formData, [name]: null });
                return;
            }

            if (name === 'photo') {
                const img = new Image();
                img.onload = () => {
                    if (img.width !== img.height) {
                        setSignupErrors({ ...signupErrors, [name]: 'Invalid photo dimensions. Photo should be square (passport size).' });
                        setFormData({ ...formData, [name]: null });
                    } else {
                        const { [name]: removedError, ...remainingErrors } = signupErrors;
                        setSignupErrors(remainingErrors);
                        setFormData({ ...formData, [name]: file });
                    }
                };
                img.src = URL.createObjectURL(file);
            } else {
                const { [name]: removedError, ...remainingErrors } = signupErrors;
                setSignupErrors(remainingErrors);
                setFormData({ ...formData, [name]: file });
            }
        }
    };

    const handleViewDocument = (document) => {
        if (document) {
            setSelectedDocument(URL.createObjectURL(document));
            setModalShow(true);
        }
    };

    const DocumentModal = ({ document, show, onHide }) => {
        return (
            <Modal show={show} onHide={onHide} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>View Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <embed src={document} type="application/pdf" width="100%" height="500px" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = new FormData();
        Object.keys(formData).forEach(key => {
            form.append(key, formData[key]);
        });

        try {
            const response = await saveApplicantDocuments(form);

            if (response.ok) {
                setShowSuccessAlert(true);
                setFormData({
                    applicant: initialData._id,
                    aadharCard: null,
                    panCard: null,
                    addressProof: null
                });
                setModalShow(false);
                setShowErrorAlert(false);
                navigate('/citizen/mockQuestions');
            } else {
                setShowErrorAlert(true);
                const errorData = await response.json();
                setSignupErrors({ server: errorData.message });
            }
        } catch (err) {
            setShowErrorAlert(true);
            setSignupErrors({ server: `An error occurred. Please try again. ${err.message}` });
        }
    };

    return (
        <div>
            <Container className='container-2'>
                <Form onSubmit={handleSubmit}>
                    <div className='form-2'>
                        <Row><h4>Upload Documents</h4></Row>
                        <Row className='pt-4'>
                            <Col xs={12} sm={3}>
                                Aadhar:
                            </Col>
                            <Col xs={12} sm={7}>
                                <Form.Group controlId="aadharCard" className="pb-4">
                                    <Form.Control
                                        type="file"
                                        name="aadharCard"
                                        onChange={handleFileChange}
                                        isInvalid={!!signupErrors.aadharCard}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {signupErrors.aadharCard}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={2}>
                                {formData.aadharCard && <Button onClick={() => handleViewDocument(formData.aadharCard)}>View</Button>}
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={3}>
                                Address Proof:
                            </Col>
                            <Col xs={12} sm={7}>
                                <Form.Group controlId="addressProof" className="pb-4">
                                    <Form.Control
                                        type="file"
                                        name="addressProof"
                                        onChange={handleFileChange}
                                        isInvalid={!!signupErrors.addressProof}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {signupErrors.addressProof}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={2}>
                                {formData.addressProof && <Button onClick={() => handleViewDocument(formData.addressProof)}>View</Button>}
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={3}>
                                PAN Card:
                            </Col>
                            <Col xs={12} sm={7}>
                                <Form.Group controlId="panCard" className="pb-4">
                                    <Form.Control
                                        type="file"
                                        name="panCard"
                                        onChange={handleFileChange}
                                        isInvalid={!!signupErrors.panCard}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {signupErrors.panCard}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={2}>
                                {formData.panCard && <Button onClick={() => handleViewDocument(formData.panCard)}>View</Button>}
                            </Col>
                        </Row>

                        {signupErrors.server && <Alert variant="danger">{signupErrors.server}</Alert>}

                        <Row className='pt-4'>
                            <Col>
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Container>

            <DocumentModal
                document={selectedDocument}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default UploadDocuments;
