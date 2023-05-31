import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <FavoritePokemon.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemon />);

    const noFavorite = screen.getByText('No favorite Pokémon found');
    expect(noFavorite).toBeInTheDocument();
  });

  it('verifica se são exibidos na tela apenas os Pokémon favoritados', () => {
    const pokemonFav = [{
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    }, {
      id: 143,
      name: 'Snorlax',
      type: 'Normal',
      image: 'https://archives.bulbagarden.net/media/upload/4/40/Spr_5b_143.png',
      averageWeight: {
        value: '460.0',
        measurementUnit: 'kg',
      },
    }];

    renderWithRouter(<FavoritePokemon pokemonList={ pokemonFav } />);

    const firstPokemon = screen.getByText('Charmander');
    expect(firstPokemon).toBeInTheDocument();

    const secondPokemon = screen.getByText('Snorlax');
    expect(secondPokemon).toBeInTheDocument();
  });
});
