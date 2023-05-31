import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Testa o componente <About.js />', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);

    expect(screen.getByRole('img', '')).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
