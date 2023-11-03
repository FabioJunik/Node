import { describe, expect } from '@jest/globals';
import Editora from '../../models/editora';

describe('Teste do model Enditade', () => {
  const objectoEditora = {
    nome: 'FJ',
    cidade: 'Luanda',
    email: 'fjeditora@gmail.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objectoEditora);

    expect(editora).toBeInstanceOf(Editora);
    expect(editora).toEqual(
      expect.objectContaining(objectoEditora),
    );
  });

  it('Deve salvar editora no banco de dados', async () => {
    const editora = new Editora(objectoEditora);

    const dados = await editora.salvar();
    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objectoEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
