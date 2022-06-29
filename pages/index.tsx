import  { NextPage, GetStaticProps } from 'next';

import { Grid } from '@nextui-org/react';

import { Layout } from '../components/layouts';
import { pokeApi } from '../api';
import { PokemonCard } from '../components/pokemon/PokemonCard';
import { PokemonListResponse, SmallPokemon } from '../interfaces';


interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  
  return (
    <Layout title="Listado de pokemons">

      <Grid.Container gap={ 2 } justify='flex-start'>
        {
          pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id}/>
          ))
        }
      </Grid.Container>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon/?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((poke, key) => ({
    ...poke,
    id: key + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${key + 1}.svg`
  }));

  return {
    props: {
      pokemons
    }
  }
}


export default HomePage;
