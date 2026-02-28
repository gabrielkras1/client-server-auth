// Importa o framework Express para criar o servidor
const express = require("express");

// Importa o módulo de leitura de arquivos do Node
const fs = require("fs");

// Cria a aplicação Express
const app = express();

// Define a porta do servidor
const PORT = 3000;

// Permite receber JSON nas requisições
app.use(express.json());


// Estrutura que guarda tokens em memória
const tokens = {};


// ===============================
// Função que valida TOKEN
// ===============================
function validarToken(id, token) {

    // verifica se existe token armazenado
    if (!tokens[id]) {
        return false;
    }

    // compara token recebido com token salvo
    if (tokens[id] === token) {
        return true;
    }

    return false;
}


// ===============================
// Função que valida LOGIN e SENHA
// ===============================
function validarUsuario(login, senha) {

    // Lê o arquivo usuarios.txt
    const dados = fs.readFileSync("login.txt", "utf8");

    // Divide por linhas
    const linhas = dados.split("\n");

    // Percorre cada linha
    for (let linha of linhas) {

        // Ignora linhas vazias
        if (linha.trim() === "") continue;

        // Separa os campos
        const [id, usuarioArquivo, senhaArquivo] = linha.split(",");

        const usuario = usuarioArquivo.trim();
        const senhaTxt = senhaArquivo.trim();

        // Verifica credenciais
        if (usuario === login && senhaTxt === senha) {

            return {
                id: id.trim(),
                login: usuario
            };

        }
    }

    return null;
}


// ===============================
// Função que gera TOKEN simples
// ===============================
function gerarToken() {

    return Math.random().toString(36).substring(2);
}


// ===============================
// ROTA DE AUTENTICAÇÃO
// ===============================
app.post("/auth", (req, res) => {

    // Recebe dados enviados pelo cliente
    const { id, login, senha, token } = req.body;

    // 1️⃣ Verifica se token é válido
    const tokenValido = validarToken(id, token);

    if (!tokenValido) {

        console.log("Token inexistente ou inválido para usuário:", login);

        const novoToken = gerarToken();

        // Salva token
        tokens[id] = novoToken;

        return res.json({
            status: "token_inexistente",
            token: novoToken
        });
    }

    // 2️⃣ Se token existe, valida login e senha
    const usuario = validarUsuario(login, senha);

    if (!usuario) {

        console.log("Login inválido:", login);

        return res.json({
            status: "erro",
            mensagem: "Login ou senha inválidos"
        });
    }

    console.log("Login autorizado:", usuario);

    return res.json({
        status: "ok",
        usuario: usuario
    });

});


// Inicia o servidor
app.listen(PORT, () => {

    console.log(`Servidor rodando em http://localhost:${PORT}`);

});