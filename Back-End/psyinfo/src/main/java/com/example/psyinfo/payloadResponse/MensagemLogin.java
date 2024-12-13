package com.example.psyinfo.payloadResponse;

public class MensagemLogin {
    String mensagem;
    Boolean status;

    // Getters e Setters
    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }


    public MensagemLogin(String mensagem, Boolean status) {
        this.mensagem = mensagem;
        this.status = status;
    }

    public MensagemLogin() {
    }

    @Override
    public String toString() {
        return "MensagemLogin{" +
                "mensagem='" + mensagem + '\'' +
                ", status=" + status +
                  '\'' +
                '}';
    }
}

