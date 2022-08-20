import { FC } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/header";
import Container from 'react-bootstrap/Container';
import "./index.css";
import monitor from '../../assets/monitor.svg'
import mouse from '../../assets/mouse.svg'
import mousepad from '../../assets/mousepad.svg'
import keyboard from '../../assets/keyboard.svg'
import Button from "react-bootstrap/esm/Button";

interface PartsProps {

}

const Parts: FC<PartsProps> = () => {
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('name');
    const type = new URLSearchParams(search).get('type');
    const price = new URLSearchParams(search).get('price');
    let iconSource;
    if(type === "Mouse") iconSource = mouse;
    if(type === "Monitor") iconSource = monitor;
    if(type === "Mousepad") iconSource = mousepad;
    if(type === "Keyboard") iconSource = keyboard;

    function handleClick(){
        alert("Thank you for you purchase!");
        window.location.href="/"
    }
    return (
        <>
            <Header active="Parts"></Header>
            <div className="bg-light">
                <Container>
                    <div className="my-4 text-center">
                        <img width="200" height="200" src={iconSource}></img> 
                        <p>{name}</p>
                        <p>{type}</p>
                        <p>{price}</p>
                        <Button variant="primary" onClick={handleClick}>Order Now</Button>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Parts