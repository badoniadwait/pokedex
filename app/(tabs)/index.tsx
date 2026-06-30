import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Pokemon {
  name: String;
  image: String;
  imageBack: String;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name:"fairy";
    url:"https://pokeapi.co/api/v2/type/18/";
  }
}

export default function Index() {
  const [pokemons, setPokemon] = useState<Pokemon[]>([]);
  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
      const data = await response.json();

      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            types: details.types,
            image: details.sprites.front_shiny,
            imageBack: details.sprites.back_shiny,
          }
        })
      );

      setPokemon(detailedPokemon);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
      style={{
      backgroundColor: "white"
    }}>
      {
        pokemons.map((pokemon) => (
          <Link key={pokemon.name}
            href={{pathname: "/details", params: {name: pokemon.name}}}
            style={
              {
                alignSelf: "center",
              }
            }
          >
            <View  
              style={{
                backgroundColor: colorByType[pokemon.types[0].type.name],
                padding: 20,
                borderRadius: 35,
              }}
              >
              <Text
                style={styles.name}
                >
                {pokemon.name}
              </Text>
              <Text
                style={styles.type}
                >
                {pokemon.types[0].type.name}
              </Text>
              <View 
                style={{flexDirection: "row",}}
                >
                <Image
                  source={{uri: pokemon.image}}
                  style= { {width: 150 , height: 150 } }
                  />
                <Image
                  source={{uri: pokemon.imageBack}}
                  style= { {width: 150 , height: 150 } }
                  />
              </View>
            </View>
          </Link>
        ))
      }
    </ScrollView>
  );
}

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

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 28,
    fontWeight: "condensed",
    textAlign: "center",
  }
});