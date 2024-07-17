import { useState } from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(user);
            if(user) navigate("/homepage");
        }
        catch(error){
            console.log(error);
        }

        setLoading(false);
    };

    return <div className={styles.pageContainer}>
        <div className={styles.pageContent}>
            <h3 className={styles.title}>Login Administrador</h3>
            <div className={styles.loginContent}>
                <input type="text" value={email} placeholder="Digite seu email" onChange={handleEmail}/>
                <input type="text" value={password} placeholder="Digite sua senha" onChange={handlePassword}/>
            </div>
            <button type="submit" style={!(email && password) ? {opacity: 0.5} : null} className={styles.button} onClick={handleLogin} disabled={!(email && password)}>
                {
                    loading ? <ReactLoading color="#fff" type="bubbles" width={"40%"} height={"100%"}/> : "Entrar"
                }
            </button>
        </div>
    </div>
};

export default Login;