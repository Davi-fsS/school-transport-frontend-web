import { useState } from "react";
import NavBar from "../navBar/NavBar";
import styles from "./style.module.scss";
import Row from "../../components/row/Row";
import Input from "../../components/input/Input";

const RegisterDriver = () => {
    const [name, setName] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
    };

    return <>
        <NavBar optionSelected={2}/>
        <div className={styles.container}>
            <h3 className={styles.title}>Cadastro Motorista</h3>

            <div className={styles.fieldContainer}>
                <Row>
                    <Input labelName="Nome" placeholder="Digite o nome" handleOnChange={handleName} value={name}/>
                    <Input labelName="Nome" placeholder="Digite o nome" handleOnChange={handleName} value={name}/>
                </Row>      
                <Row>
                    <Input labelName="Nome" placeholder="Digite o nome" handleOnChange={handleName} value={name}/>
                    <Input labelName="Nome" placeholder="Digite o nome" handleOnChange={handleName} value={name}/>
                </Row>    
                <Row>
                    <Input labelName="Nome" placeholder="Digite o nome" handleOnChange={handleName} value={name}/>
                    <Input labelName="Nome" placeholder="Digite o nome" handleOnChange={handleName} value={name}/>
                </Row>              
            </div>
        </div>
    </>
};

export default RegisterDriver;