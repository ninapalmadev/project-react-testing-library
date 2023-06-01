import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <Pokedex.js />', () => {
  const nextPokemon = 'next-pokemon';
  const pokemonName = 'pokemon-name';
  const pokemonType = 'pokemon-type';

  it('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('Testa ee é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByTestId(nextPokemon);
    userEvent.click(nextBtn);
    const nextPokemonOfList = screen.getByText(/Charmander/i);
    expect(nextPokemonOfList).toBeInTheDocument();
  });

  it('O botão deve conter o texto Próximo Pokémon', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByTestId(nextPokemon);
    userEvent.click(nextBtn);
    expect(nextBtn).toHaveTextContent('Próximo Pokémon');
  });

  it('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByTestId(nextPokemon);
    const namePokemon = screen.getByTestId(pokemonName);

    userEvent.click(nextBtn);
    expect(namePokemon).toHaveTextContent('Charmander');

    userEvent.click(nextBtn);
    expect(namePokemon).toHaveTextContent('Caterpie');
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByTestId(nextPokemon);
    const namePokemon = screen.getAllByTestId(pokemonName);

    userEvent.click(nextBtn);

    expect(namePokemon).toHaveLength(1);
  });

  test('Testa se a Pokédex tem os botões de filtro - Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    renderWithRouter(<App />);
    const classPokemonBtns = screen.getAllByTestId('pokemon-type-button');
    expect(classPokemonBtns).toHaveLength(7);
  });

  test('Testa A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByTestId(nextPokemon);
    const btnAll = screen.getByText('All');
    const typeFire = screen.getByText('Fire');
    const typeBug = screen.getByText('Bug');
    const typePsychic = screen.getByText('Psychic');

    userEvent.click(typeFire);
    const fireOne = screen.getByText(/Charmander/);
    expect(fireOne).toBeInTheDocument();
    userEvent.click(nextBtn);

    const fireTwo = screen.getByText(/Rapidash/);
    expect(fireTwo).toBeInTheDocument();

    userEvent.click(typePsychic);
    const psychicOne = screen.getByText(/Alakazam/);
    expect(psychicOne).toBeInTheDocument();
    userEvent.click(nextBtn);

    const psychicTwo = screen.getByText(/Mew/);
    expect(psychicTwo).toBeInTheDocument();
    userEvent.click(typeBug);

    const pokeBug = screen.getByText(/Caterpie/);
    expect(pokeBug).toBeInTheDocument();

    userEvent.click(btnAll);

    const pokeFirst = screen.getByText(/Pikachu/);
    expect(pokeFirst).toBeInTheDocument();
  });

  it('Testa se texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    renderWithRouter(<App />);
    const typeOfPokemon = screen.getByTestId(pokemonType);
    const typePokemonFireBtn = screen.getByText('Fire');

    userEvent.click(typePokemonFireBtn);

    expect(typeOfPokemon).toHaveTextContent('Fire');
    expect(typeOfPokemon).not.toHaveTextContent('Poison');

    const btnAll = screen.getByText('All');
    expect(btnAll).toBeInTheDocument();
  });

  it('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId(pokemonName);

    const btnAll = screen.getByText('All');
    expect(btnAll).toHaveTextContent('All');

    userEvent.click(btnAll);
    expect(namePokemon).toHaveTextContent(/Pikachu/);
    expect(btnAll).toBeInTheDocument();
  });

  test('A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado;', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByText('All');
    const nextBtn = screen.getByTestId(nextPokemon);

    userEvent.click(btnAll);

    const firstAll = screen.getByText(/Pikachu/);
    expect(firstAll).toBeInTheDocument();

    userEvent.click(nextBtn);

    const secondAll = screen.getByText(/Charmander/);
    expect(secondAll).toBeInTheDocument();
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All.', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByText('All');

    expect(btnAll).toBeInTheDocument();
  });
});
