import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import "../Styles/private.css";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/usuarios/criar", {
                username: username,
                password: password,
            });
            navigate("/login");
            alert(response.data); // Mensagem de sucesso
        } catch (error) {
            if (error.response) {
                // Erro do servidor
                alert(`Erro: ${error.response.data}`);
            } else if (error.request) {
                // Sem resposta do servidor
                alert("Erro: Sem resposta do servidor. Verifique a conexão.");
            } else {
                // Erro desconhecido
                alert(`Erro: ${error.message}`);
            }
        }
    };

    return (
        <div className="signup-container">
            <h2>Cadastro</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-item">
                    <label>Nome de Usuário:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="signup-item">
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

export default Signup;
