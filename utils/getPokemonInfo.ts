import { pokeApi } from '../api';
import { Pokemon, SinglePokemon } from '../interfaces/pokemon-full';

export const getPokemonInfo = async ( nameOrId: string): Promise<SinglePokemon | null>  => {
    
    try {
        
        const { data } = await pokeApi.get<Pokemon>(`/pokemon/${ nameOrId }`);
    
        return {
            id: data.id,
            name: data.name,
            sprites: data.sprites
        }

    } catch (error) {
        
        return null
    }

}