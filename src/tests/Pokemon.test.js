import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const details = 'More details';

describe('Testa o componente <Pokemon.js />', () => {
  test('Testa se é renderizado o card do pokemon corretamente', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    const typePokemon = screen.getByTestId('pokemon-type');
    const weightPokemon = screen.getByTestId('pokemon-weight');
    const imagePokemon = screen.getByRole('img', { name: 'Pikachu sprite' });

    expect(namePokemon).toHaveTextContent('Pikachu');
    expect(typePokemon).toHaveTextContent('Electric');
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');
    expect(imagePokemon).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: details });
    expect(moreDetails).toHaveAttribute('href', '/pokemon/25');
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: details });
    userEvent.click(moreDetails);
    const pokeDetails = screen.getByText('Pikachu Details');
    expect(pokeDetails).toBeInTheDocument();
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: details });
    userEvent.click(moreDetails);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
