import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <NotFound.js />', () => {
  it('Testa se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFound).toBeInTheDocument();
  });

  it('Testa se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const notFound = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });
    expect(notFound).toBeInTheDocument();
    expect(notFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
