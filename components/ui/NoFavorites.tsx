import { Container, Text, Image } from '@nextui-org/react';

export const NoFavorites = () => {
  return (
    <Container css={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 100px)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>

        <Text>No hay favoritos</Text>
        <Image 
          alt="ditto-no-favorites"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
          width={250}
          height={250}
          css={{
            opacity: 0.1
          }}
        />
      </Container>
  )
}
