import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

import gm from '../../utils/Apply_Instructions.png';
import { useNavigate } from 'react-router-dom';
const LLApplication = () => {

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/LLAppAuth");
    }

    return (
        <div>

            <Container className='container-3 form-2'>
                <Row>
                    <img
                        src={gm}
                        width="80"
                        height="370"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Row>
                <Row className='pt-4'>
                    <Col>
                        <Button variant='primary' type="submit" onClick={handleNavigation} className="signup-button-2 mb-3 mr-3 ml-3" >Continue</Button>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default LLApplication
