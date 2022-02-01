import axios from 'axios';
import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Stat from '../components/Stat';

const CATEGORIES = [
  'Todos',
  'Pokémon',
  'Entrenadores',
  'Gimnasios Pokémon',
  'Centros Pokémon',
];

const HomeScreen = () => {
  const [pokemons, setPokemons] = React.useState([]);

  const fetchData = async () => {
    try {
      const responses = await Promise.all(
        Array(20)
          .fill(0)
          .map((_, i) =>
            axios.get(`https://pokeapi.co/api/v2/pokemon/${i + 1}`),
          ),
      );

      setPokemons(responses.map(e => e.data));
    } catch (error) {
      console.log('Ocurrio un error consultando los pokemons', error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView bounces={false} style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pokedex</Text>

          <TouchableOpacity style={styles.searchButton}>
            <IconFA name="search" size={26} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.subTitle}>Cerca a ti</Text>

        <ScrollView
          style={{
            marginBottom: 36,
          }}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {React.Children.toArray(
            CATEGORIES.map((e, i) => (
              <TouchableOpacity>
                <Text
                  style={[
                    styles.category,
                    {
                      color: i === 0 ? '#F8BD1C' : '#4E4F61',
                    },
                  ]}>
                  {e}
                </Text>
              </TouchableOpacity>
            )),
          )}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{}}>
          {React.Children.toArray(
            pokemons.map(pokemon => {
              return (
                <TouchableOpacity style={styles.pokemonCard}>
                  <Image
                    style={styles.pokemonSprite}
                    source={{uri: pokemon.sprites.front_default}}
                  />
                  <Text style={styles.pokemonName}>{pokemon.name}</Text>
                  <View
                    style={[
                      styles.rowSpaceBetween,
                      {marginBottom: 12, justifyContent: 'space-around'},
                    ]}>
                    <Stat title="Height" value={pokemon.height} sufix={'"'} />
                    <Stat title="Weight" sufix="lbs" value={pokemon.weight} />
                  </View>
                  <View style={styles.rowSpaceBetween}>
                    {React.Children.toArray(
                      pokemon.stats
                        .slice(0, 3)
                        .map((e, i) => (
                          <Stat title={e.stat.name} value={e.base_stat} />
                        )),
                    )}
                  </View>
                </TouchableOpacity>
              );
            }),
          )}
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21263E',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  headerTitle: {
    color: '#F8BD1C',
    fontWeight: '800',
    fontSize: 24,
    letterSpacing: 1.2,
  },
  pokemonSprite: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  pokemonCard: {
    marginRight: 24,
    backgroundColor: '#292E4A',
    width: 220,
    paddingHorizontal: 14,
    borderRadius: 28,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  searchButton: {
    backgroundColor: '#F8BD1C',
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  subTitle: {
    color: '#B0B4B7',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.1,
    marginBottom: 16,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 22,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pokemonName: {
    color: '#ADB1B4',
    fontSize: 20,
    fontWeight: '800',
    textTransform: 'capitalize',
    textAlign: 'center',
    marginBottom: 12,
  },
});

export default HomeScreen;
