const express = require('express');
const database = require('../config/database');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [users] = await database.query(
            'SELECT id, name, email, avatar_url, last_seen_at FROM users'
        );
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro interno' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await database.query(
            'SELECT id, name, email, avatar_url, last_seen_at FROM users WHERE id = ?',
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: 'Erro interno' });
    }
});

router.post('/', async (req, res) => {
    const { name, email, password_hash, avatar_url, last_seen_at } = req.body;
    if (!name || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    }
  
    try {
      const result = await database.query('INSERT INTO users (name, email, password_hash, avatar_url, last_seen_at) VALUES (?, ?, ?, ?, ?)', [name, email, password_hash, avatar_url, last_seen_at]);
      res.status(201).json({ id: Number(result.insertId), name, email });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro interno' });
    }
});

router.put('/:id', async (req, res) => {
    const { name, email, avatar_url, last_seen_at } = req.body;
    if (!name || !email) {
        return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
    }
  
    try {
      const result = await database.query('UPDATE users SET name = ?, email = ?, avatar_url = ?, last_seen_at = ? WHERE id = ?', [name, email, avatar_url, last_seen_at, req.params.id]);
      if (result.affectedRows === 0) return res.status(404).json({ erro: 'Não encontrado' });
      res.json({ id: Number(req.params.id), name });
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro interno' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
      await database.query('DELETE FROM users WHERE id = ?', [req.params.id]);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: 'Erro interno' });
    }
  });

module.exports = router;