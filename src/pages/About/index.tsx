import { FC } from "react";
import Header from "../../components/Header/header";
import Container from 'react-bootstrap/Container';
import "./index.css";



const About: FC = () => {
    return (
        <>
            <Header active="About"></Header>
            <div className="bg-light">
                <Container>
                    <p className="my-4">This application was made by <a href="https://github.com/Enzo-PsK/">Enzo Borges</a>.</p>
                    <p > Any commercial use is forbidden.</p>
                </Container>
            </div>
        </>
    )
}

export default About