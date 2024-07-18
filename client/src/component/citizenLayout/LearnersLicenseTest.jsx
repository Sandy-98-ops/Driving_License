import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const mockQuestions = [
    {
        id: 1,
        question: "What should you do when you see a 'STOP' sign?",
        options: [
            "A. Slow down and proceed if clear",
            "B. Stop completely and proceed when safe",
            "C. Yield to other vehicles",
            "D. Honk and proceed"
        ],
        answer: "B"
    },
    {
        id: 2,
        question: "What is the minimum age for obtaining a Learner's License in India?",
        options: [
            "A. 16 years",
            "B. 18 years",
            "C. 20 years",
            "D. 21 years"
        ],
        answer: "A"
    },
    {
        id: 3,
        question: "What should you do if you are driving and the traffic signal turns yellow?",
        options: [
            "A. Speed up to cross the signal before it turns red",
            "B. Stop if it is safe to do so",
            "C. Continue driving at the same speed",
            "D. Honk to alert other drivers"
        ],
        answer: "B"
    },
    {
        id: 4,
        question: "When is it appropriate to use your car's horn?",
        options: [
            "A. To greet a friend",
            "B. To alert another driver of your presence",
            "C. To express frustration",
            "D. In a no-horn zone"
        ],
        answer: "B"
    },
    {
        id: 5,
        question: "Which of the following is not allowed while driving?",
        options: [
            "A. Using hands-free devices for calling",
            "B. Listening to music at a low volume",
            "C. Drinking water",
            "D. Sending text messages"
        ],
        answer: "D"
    },
    {
        id: 6,
        question: "What should you do if your vehicle starts to skid?",
        options: [
            "A. Accelerate immediately",
            "B. Brake hard and steer in the opposite direction",
            "C. Take your foot off the accelerator and steer in the direction of the skid",
            "D. Honk continuously"
        ],
        answer: "C"
    },
    {
        id: 7,
        question: "What is the purpose of a 'Zebra Crossing'?",
        options: [
            "A. For vehicles to speed up",
            "B. For parking vehicles",
            "C. For pedestrians to cross the road",
            "D. For cyclists to ride"
        ],
        answer: "C"
    },
    {
        id: 8,
        question: "What is the legal blood alcohol concentration (BAC) limit for drivers in India?",
        options: [
            "A. 0.02%",
            "B. 0.03%",
            "C. 0.05%",
            "D. 0.08%"
        ],
        answer: "B"
    },
    {
        id: 9,
        question: "What does a solid white line on the road indicate?",
        options: [
            "A. You can change lanes",
            "B. You cannot change lanes",
            "C. You must stop",
            "D. You can park your vehicle"
        ],
        answer: "B"
    },
    {
        id: 10,
        question: "Which of the following statements is true about seat belts?",
        options: [
            "A. Seat belts are only necessary for long trips",
            "B. Seat belts should be worn by the driver and front-seat passenger only",
            "C. Seat belts are not necessary if your car has airbags",
            "D. Seat belts should be worn by all occupants of the vehicle"
        ],
        answer: "D"
    }
];

const LearnersLicenseTest = () => {
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);

    const handleChange = (e, questionId) => {
        const { value } = e.target;
        setUserAnswers({
            ...userAnswers,
            [questionId]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let correctAnswers = 0;
        mockQuestions.forEach((question) => {
            if (userAnswers[question.id] === question.answer) {
                correctAnswers += 1;
            }
        });
        setScore(correctAnswers);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Container className='container-2'>
                    <div className='form-2'>
                        <Row>
                            <h3>Learner's License Mock Interview Questions</h3>
                        </Row>
                        {mockQuestions.map((question) => (
                            <Row className='pt-4' key={question.id} style={{ textAlign: 'left', paddingLeft: '10%', marginBottom: '10px' }} >
                                <Col sm={10}>
                                    <Row className='pt-2'>
                                        <h4>{question.id}.  {question.question}</h4>
                                        {question.options.map((option, index) => (
                                            <div style={{ paddingLeft: '5%' }}>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        value={option[0]}
                                                        checked={userAnswers[question.id] === option[0]}
                                                        onChange={(e) => handleChange(e, question.id)}
                                                    />&nbsp;&nbsp;
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </Row>

                                </Col>
                            </Row>

                        ))}
                        <Row className='pt-4'>
                            <Col>
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                        {score !== null && (
                            <Row className='pt-4'>
                                <h2>Your Score: {score} / {mockQuestions.length}</h2>
                            </Row>
                        )}
                    </div>
                </Container>
            </Form>
        </div>
    );
};

export default LearnersLicenseTest;
