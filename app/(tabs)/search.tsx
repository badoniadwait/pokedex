import { router } from "expo-router";
import { useState } from "react";
import { Button, TextInput } from "react-native";

export default function Search() {
  const [search, setSearch] = useState("");

  async function fetchPokemon(name: string) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + name;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      alert("Pokémon not found!");
      return;
    }

    const data = await res.json();

    router.push({
      pathname: "/details",
      params: {
        name: data.name,
      },
    });

  } catch (e) {
    console.log(e);
  }
}

  return (
    <>
      <TextInput
        placeholder="Search Pokémon..."
        value={search}
        onChangeText={setSearch}
        style={{
          height: 50,
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 12,
          paddingHorizontal: 15,
          margin: 16,
          backgroundColor: "white",
        }}
      />

      <Button
        title="Search"
        onPress={() => fetchPokemon(search.toLowerCase())}
      />
    </>
  );
}