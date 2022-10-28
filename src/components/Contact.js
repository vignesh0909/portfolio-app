import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios from "axios";
import styled, { keyframes, ThemeProvider } from 'styled-components'
import { DarkTheme } from './Themes';
import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import PowerButton from '../subComponents/PowerButton';
import ParticleComponent from '../subComponents/ParticleComponent';
import BigTitle from '../subComponents/BigTitlte'
import conatctImg from '../assets/svg/contact-img.svg'
import astronaut from '../assets/Images/spaceman.png'

const Box = styled.div`
background-color: ${props => props.theme.body};
width: 100vw;
height:100vh;
position: relative;
overflow: hidden;
`
const float = keyframes`
0% { transform: translateY(-10px) }
50% { transform: translateY(15px) translateX(15px) }
100% { transform: translateY(-10px) }

`
const Spaceman = styled.div`
position: absolute;
top: 10%;
right: 5%;
width: 20vw;
animation: ${float} 4s ease infinite;
img{
    width: 100%;
    height: auto;
}
`
const Main = styled.div`
border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  padding: 1rem;
  width: 65vw;
  height: 65vh;
  z-index: 3;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(0.6rem + 1vw);
  backdrop-filter: blur(4px);
  position: absolute;
  left: calc(5rem + 5vw);
  top: 10rem;
  font-family: 'Ubuntu Mono', monospace;
  font-style: italic;
`

const Contact = () => {
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});
    const [formErrors, setFormErrors] = useState({
        nameError: "",
        passwordError: "",
        dobError: "",
        mobileError: "",
        specialityError: "",
        genderError: "",
        emptyFormError: ""
    })

    const onFormUpdate = (category, value) => {
        setFormDetails({ ...formDetails, [category]: value })
    }

    const validateInput = (e) => {
        if (e.target.id === "phone") {
            let mobile = e.target.value;
            if (mobile.length === 10) {
                setFormErrors({ ...formErrors, mobileError: "" })
            } else {
                setFormErrors({ ...formErrors, mobileError: "Phone Number should have 10 digits" });
            }
        } else if (e.target.id === "email") {

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setSuccess("");
        // setMessage("");
        setFormErrors({});
        console.log(formDetails);
        setButtonText("Sending...");
        if (formDetails.firstName === "" || formDetails.lastName === "" || formDetails.email === "" || formDetails.phone === "" || formDetails.message === "") {
            setFormErrors({ ...formErrors, emptyFormError: "Form field cannot be empty" })
        } else {
            axios.post(process.env.REACT_APP_API_URL, formDetails).then((res) => {
                console.log(res);
                let result = res;
                setFormDetails(formInitialDetails);
                setButtonText("Send");
                if (result.status === 200) {
                    setStatus({ success: true, message: 'Message sent successfully!' });
                } else {
                    setStatus({ success: false, message: 'Something went wrong! please try again...' });
                }
            }).catch((err) => {
                console.log(process.env.REACT_APP_API_URL);
                console.log(err);
            })
        }
    }

    return (
        <ThemeProvider theme={DarkTheme}>
            <Box>
                <LogoComponent theme='dark' />
                <SocialIcons theme='dark' />
                <PowerButton />
                <ParticleComponent theme='dark' />

                <Spaceman>
                    <img src={astronaut} alt="spaceman" />
                </Spaceman>

                <Main className='contact'>
                    <section>
                        <Container>
                            <Row className="align-items-center">
                                <Col md={6}>
                                    <Col>
                                        <h2 sm={2}>Get In Touch</h2>
                                    </Col>
                                    <form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col sm={6} className="px-1">
                                                <input id="firstName" type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => {
                                                    setStatus(""); setFormErrors({ ...formErrors, emptyFormError: "" }); onFormUpdate('firstName', e.target.value)
                                                }} />
                                            </Col>
                                            <Col md={6} className='px-1'>
                                                <input id="lastName" type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e) => {
                                                    setStatus(""); setFormErrors({ ...formErrors, emptyFormError: "" }); onFormUpdate('lastName', e.target.value)
                                                }} />
                                            </Col>
                                            <Col md={6} className='px-1'>
                                                <input id="email" type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => {
                                                    setStatus(""); setFormErrors({ ...formErrors, emptyFormError: "" }); validateInput(e); onFormUpdate('email', e.target.value)
                                                }} />
                                            </Col>
                                            <Col md={6} className='px-1'>
                                                <input id="phone" type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => {
                                                    setStatus(""); setFormErrors({ ...formErrors, emptyFormError: "" }); validateInput(e); onFormUpdate('phone', e.target.value)
                                                }} />
                                            </Col>
                                            <Col className='px-1'>
                                                <input type="textarea" value={formDetails.message} placeholder="Message" onChange={(e) => {
                                                    setStatus(""); setFormErrors({ ...formErrors, emptyFormError: "" }); onFormUpdate('message', e.target.value)
                                                }} />
                                                <button type="submit"><span>{buttonText}</span></button>
                                            </Col>

                                        </Row>
                                    </form>
                                </Col>
                                <Col md={6} className="d-none d-md-block">
                                    <img src={conatctImg} alt="contact-img" />
                                </Col>
                                <Col>
                                    <p className='m-1 text-warning'>{formErrors.emptyFormError}</p>
                                    {
                                        status.message &&
                                        <Col >
                                            <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                        </Col>
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </Main>
                <BigTitle text="CONTACT ME" top="80%" left="30%" />
            </Box>
        </ThemeProvider>
    )
}

export default Contact