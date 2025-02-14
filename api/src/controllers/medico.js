const con = require('../connect');

function create(req, res) {
    const { nome, crm, especialidade, telefone, email } = req.body;

    const query = `INSERT INTO medicos (nome, crm, especialidade, telefone, email) 
                   VALUES ('${nome}', '${crm}', '${especialidade}', '${telefone}', '${email}')`;

    con.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao cadastrar médico');
        } else {
            res.status(201).send('Médico cadastrado com sucesso');
        }
    });
}


function read(req, res) {
    con.query('SELECT * FROM medicos', (err, result) => {
        if (err) {
            res.status(500).send('Erro ao listar medicos');
        } else {
            res.status(200).send(result);
        }
    });
}

function update(req, res) {
    const { nome, crm, especialidade, telefone, email } = req.body;
    const { id } = req.params;

    console.log('ID recebido:', id);

    if (!id) {
        return res.status(400).send('ID é obrigatório');
    }

    const query = `UPDATE medicos SET nome = '${nome}', crm = '${crm}', especialidade = '${especialidade}', telefone = '${telefone}', email = '${email}' WHERE id_medico = ${id}`;

    con.query(query, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar médico:', err);
            res.status(500).send('Erro ao atualizar médico');
        } else if (result.affectedRows === 0) {
            res.status(404).send('Médico não encontrado');
        } else {
            res.status(200).send('Médico atualizado com sucesso');
        }
    });
}


function del(req, res) {
    const { id } = req.params;
    con.query(`DELETE FROM medicos WHERE id_medico = ${id}`, (err, result) => {
        if (err) {
            res.status(500).send('Erro ao remover médico');
        } else {
            res.status(200).send('Médico removido com sucesso');
        }
    });
}

module.exports = {
    create,
    read,
    update,
    del
}