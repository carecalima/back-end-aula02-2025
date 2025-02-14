const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar médicos
router.get('/medicos', (req, res) => {
    db.query('SELECT * FROM medicos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Cadastrar médico
router.post('/medicos', (req, res) => {
    const { nome, crm, especialidade, telefone, email } = req.body;
    db.query('INSERT INTO medicos (nome, crm, especialidade, telefone, email) VALUES (?, ?, ?, ?, ?)', [nome, crm, especialidade, telefone, email], (err, results) => {
        if (err) throw err;
        res.status(201).send('Médico cadastrado com sucesso');
    });
});

// Editar médico
router.put('/medicos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, crm, especialidade, telefone, email } = req.body;
    db.query('UPDATE medicos SET nome = ?, crm = ?, especialidade = ?, telefone = ?, email = ? WHERE id = ?', [nome, crm, especialidade, telefone, email, id], (err, results) => {
        if (err) throw err;
        res.status(202).send('Médico alterado com sucesso');
    });
});

// Excluir médico
router.delete('/medicos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM medicos WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.status(204).send('Médico excluído com sucesso');
    });
});

module.exports = router;