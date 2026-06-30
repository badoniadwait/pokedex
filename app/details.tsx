import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;

    other: {
      home: {
        front_default: string;
        front_shiny: string;
      };
      ["official-artwork"]: {
        front_default: string;
        front_shiny: string;
      };
    };
  };

  types: PokemonType[];
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export default function Details() {
  const params = useLocalSearchParams();

  useEffect(() => {fetchPokemon(params.name)}, []);
  const [pokemon, setPokemon] = useState<Pokemon>(); 

  async function fetchPokemon(name: string) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + name;
    try{
      const res = await fetch(url);
      const data = await res.json();
      setPokemon(data);
      console.log(data.sprites.front_shiny);
      return (res);
    }
    catch(e){
      console.log(e);
    }
  }
  
  const typeColor =
  pokemon?.types
    ? colorByType[pokemon.types[0].type.name as keyof typeof colorByType]
    : "#f3f3f3";

return (
  <ScrollView
    contentContainerStyle={{
      backgroundColor: "white",
      padding: 20,
      alignItems: "center",
      gap: 20,
    }}
  >
    <Image
      source={{ uri: pokemon?.sprites.front_shiny }}
      style={{
        width: 200,
        height: 200,
        backgroundColor: typeColor,
        margin: 10,
        borderRadius: 16,
      }}
    />

    <Image
      source={{ uri: pokemon?.sprites.back_shiny }}
      style={{
        width: 200,
        height: 200,
        backgroundColor: typeColor,
        margin: 10,
        borderRadius: 16,
      }}
    />

    <Image
      source={{ uri: pokemon?.sprites.other.home.front_default }}
      style={{
        width: 200,
        height: 200,
        backgroundColor: typeColor,
        margin: 10,
        borderRadius: 16,
      }}
    />

    <Image
      source={{
        uri: pokemon?.sprites.other["official-artwork"].front_default,
      }}
      style={{
        width: 300,
        height: 300,
        backgroundColor: typeColor,
        margin: 10,
        borderRadius: 16,
      }}
    />
  </ScrollView>
);
}

const styles = StyleSheet.create({
  
});

const colorByType = {
  normal:   "rgb(214, 214, 196)",
  fighting: "rgb(234, 143, 139)",
  flying:   "rgb(205, 192, 250)",
  poison:   "rgb(213, 164, 212)",
  ground:   "rgb(243, 223, 168)",
  rock:     "rgb(219, 206, 137)",
  bug:      "rgb(208, 224, 132)",
  ghost:    "rgb(181, 164, 208)",
  steel:    "rgb(220, 220, 232)",
  fire:     "rgb(248, 184, 131)",
  water:    "rgb(164, 192, 248)",
  grass:    "rgb(177, 225, 149)",
  electric: "rgb(252, 231, 138)",
  psychic:  "rgb(252, 165, 194)",
  ice:      "rgb(197, 236, 234)",
  dragon:   "rgb(170, 143, 252)",
  dark:     "rgb(170, 153, 143)",
  fairy:    "rgb(236, 190, 215)",
}