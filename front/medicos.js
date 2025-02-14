const cadastro = document.getElementById('cadastro');
cadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    const corpo = {
        nome: cadastro.nome.value,
        crm: cadastro.crm.value,
        especialidade: cadastro.especialidade.value,
        telefone: cadastro.telefone.value,
        email: cadastro.email.value
    }
    fetch('http://localhost:4000/medicos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    })
        .then(response => response.status)
        .then(status => {
            if (status === 201) {
                msg3('Médico cadastrado com sucesso');
            } else {
                msg3('Erro ao cadastrar médico');
            }
        });
});

fetch('http://localhost:4000/medicos')
    .then(response => response.json())
    .then(medicos => {
        const tabela = document.getElementById('medicos');
        medicos.forEach((medico) => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
            <td data-label="Id:">${medico.id_medico}</td>
            <td data-label="Nome:" contenteditable="true">${medico.nome}</td>
            <td data-label="CRM:" contenteditable="true">${medico.crm}</td>
            <td data-label="Especialidade:" contenteditable="true">${medico.especialidade}</td>
            <td data-label="Telefone:" contenteditable="true">${medico.telefone}</td>
            <td data-label="Email:" contenteditable="true">${medico.email}</td>
            <td><button onclick="alterar(this)">*</button><button onclick="excluir(${medico.id_medico})">-</button></td>
        `;
            tabela.appendChild(linha);
        });
    });

function alterar(e) {
    const id = e.parentNode.parentNode.children[0].textContent
    const corpo = {
        nome: e.parentNode.parentNode.children[1].textContent,
        crm: e.parentNode.parentNode.children[2].textContent,
        especialidade: e.parentNode.parentNode.children[3].textContent,
        telefone: e.parentNode.parentNode.children[4].textContent,
        email: e.parentNode.parentNode.children[5].textContent
    }
    fetch(`http://localhost:4000/medicos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpo)
    })
        .then(response => response.status)
        .then(status => {
            if (status === 200) {
                msg3('Médico alterado com sucesso');
            } else {
                msg3('Erro ao alterar médico');
            }
        });
}

function excluir(id_medico) {
    fetch(`http://localhost:4000/medicos/${id_medico}`, {
        method: 'DELETE'
    })
        .then(response => response.status)
        .then(status => {
            if (status === 200) {
                msg3('Médico excluído com sucesso');
            } else {
                msg3('Erro ao excluir médico');
            }
        });
}

function msg3(mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = mensagem;
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}