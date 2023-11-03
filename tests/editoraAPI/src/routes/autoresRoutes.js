import express from 'express';
import AutoresController from '../controllers/autoresController.js';

const router = express.Router();

router
  .get('/autores', AutoresController.listarAutores)
  .get('/autores/:id', AutoresController.listarAutorPorId)
  .get('/autores/:id/livros', AutoresController.listarLivrosPorAutor)
  .post('/autores', AutoresController.cadastrarAutor)
  .put('/autores/:id', AutoresController.atualizarAutor)
  .delete('/autores/:id', AutoresController.excluirAutor);

export default router;
