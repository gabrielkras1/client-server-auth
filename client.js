// Função principal que simula o cliente
async function autenticar() {

    // Dados do usuário
    const dados = {
        id: "1",
        login: "kras",
        senha: "gabriel",
        token: ""
    };

    console.log("Primeira tentativa...");

    // Primeira requisição
    let resposta = await fetch("http://localhost:3000/auth", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(dados)

    });

    let resultado = await resposta.json();

    console.log("Resposta servidor:", resultado);

    // Se servidor retornou token
    if (resultado.status === "token_inexistente") {

        console.log("Segunda tentativa com token...");

        // Atualiza token
        dados.token = resultado.token;

        resposta = await fetch("http://localhost:3000/auth", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(dados)

        });

        resultado = await resposta.json();

        console.log("Resposta servidor:", resultado);

    }

}

// Executa o cliente
autenticar();