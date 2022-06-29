import { useState, useEffect } from 'react';

import { NextPage } from 'next/types'

import { FavoritePokemons } from '../../components/pokemon/';
import { Layout } from '../../components/layouts'
import { localFavorites } from '../../utils';
import { NoFavorites } from '../../components/ui';

const FavoritesPage: NextPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons( localFavorites.pokemons() );
  }, []);
  
  return (
    <Layout title='Pokémons - Favoritos'>
      {
        favoritePokemons.length === 0
          ? (<NoFavorites />)
          : (<FavoritePokemons pokemons={favoritePokemons}/>)
      } 
    </Layout>
  )
}

export default FavoritesPage;