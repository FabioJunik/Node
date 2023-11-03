import Autor from '../models/autor.js';

class AutoresController {
  static listarAutores = async (_, res) => {
    try {
      const resultado = await Autor.pegarAutores();
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static listarAutorPorId = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await Autor.pegarPeloId(params.id);
      return res.status(200).json(resultado);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static cadastrarAutor = async (req, res) => {
    const { body } = req;
    const autor = new Autor(body);
    try {
      const resposta = await autor.salvar(autor);
      return res.status(201).json({ message: 'autor criado', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static atualizarAutor = async (req, res) => {
    const { params } = req;
    const { body } = req;
    try {
      const autorAtual = await Autor.pegarPeloId(params.id);
      const novoAutor = new Autor({ ...autorAtual, ...body });
      const resposta = await novoAutor.salvar(novoAutor);
      return res.status(200).json({ message: 'autor atualizado', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static excluirAutor = async (req, res) => {
    const { params } = req;
    try {
      await Autor.excluir(params.id);
      return res.status(200).json({ message: 'autor excluído' });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };

  static listarLivrosPorAutor = async (req, res) => {
    const { params } = req;
    try {
      const resultado = await Autor.pegarPeloId(params.id);
      const listaLivros = await Autor.pegarLivrosPorAutor(params.id);
      return res.status(200).json({ autor: resultado[0], livros: listaLivros });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };
}

export default AutoresController;
