import { useState, useEffect } from 'react';

import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";
import { ParsedUrlQuery } from 'querystring';
import confetti from 'canvas-confetti';

import { getPokemonInfo, localFavorites } from "../../utils";
import { Layout } from "../../components/layouts";
import { pokeApi } from "../../api";
import { PokemonListResponse, SinglePokemon } from "../../interfaces";

interface Props {
  pokemon: SinglePokemon
}

interface Params extends ParsedUrlQuery {
  name: string;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const [ isInFavorites, setIsInFavorites ] = useState( false );

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites( !isInFavorites );

    if(isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    });
  }  

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites( pokemon.id ))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <Layout title={ pokemon.name }>
        
      <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
        <Grid xs={ 12 } sm={ 4 }>
          <Card hoverable css={{ padding: '30px' }}>
              <Card.Body>
                <Card.Image 
                  src={ pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                  alt={ pokemon.name }
                  width="100%"
                  height={ 200 }
                />
              </Card.Body>
          </Card>
        </Grid>

        <Grid xs={ 12 } sm={ 8 }>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Grid.Container gap={ 2 }>
                <Grid  xs={ 12 } sm={ 6 }>
                  <Text h1 transform='capitalize'>{ pokemon.name }</Text>
                </Grid>
                <Grid  xs={ 12 } sm={ 6 }>
                  <Button
                    color="gradient"
                    ghost={ !isInFavorites }
                    onClick={onToggleFavorite}
                    css={{ justifyContent: 'center', alignItems: 'center'}}
                    >
                    { isInFavorites ? 'En Favoritos' : 'Guardar en favoritos' }
                  </Button>
                </Grid>
              </Grid.Container>
            </Card.Header>


            <Card.Body>

              <Text size={30}>Sprites:</Text>

              <Container direction="row" display="flex" gap={ 0 }>
                <Image 
                  src={ pokemon.sprites.front_default }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image 
                  src={ pokemon.sprites.back_default }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image 
                  src={ pokemon.sprites.front_shiny }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
                <Image 
                  src={ pokemon.sprites.back_shiny }
                  alt={ pokemon.name }
                  width={ 100 }
                  height={ 100 }
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  

    const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);

    const paths = data.results.map(({name}) => ({
        params: { name }
    }))

    return {
        paths,
        fallback: false
    }
}


export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {

  const { name } = ctx.params!;
  const pokemon = await getPokemonInfo( name );

  if( !pokemon ) {
    return { 
      redirect: {
        destination: '/',
        premanent: false // Si pongo true los bots de google borran permanente esa ruta y no vovleran a entrar
      },
      notFound: true
    }
  }

  return { props: { pokemon }, revalidate: 86400}
}


export default PokemonByNamePage;