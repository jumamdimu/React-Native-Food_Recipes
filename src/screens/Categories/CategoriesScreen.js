import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Categories = (props) =>{
    const { navigation } = props;

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => (
          <View style={{ paddingLeft: 10, marginRight: 0 }}>
            <MaterialIcons name="category" size={24} color="#900" />
          </View>
        ),
        headerRight: () => <View />,      
      });
    }, []);    

    const onPressCategory = (item) => {
      const title = item.name;
      const category = item;
      navigation.navigate("RecipesList", { category, title });
    };

    const renderCategory = ({ item }) => (
      <TouchableOpacity underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressCategory(item)}>
        <View style={styles.categoriesItemContainer}>
          <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
          <Text style={styles.categoriesName}>{item.name}</Text>
          <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text>
        </View>
      </TouchableOpacity>
    );

    return(
        <LinearGradient colors={[ '#fff1f2', '#fecdd3', 'transparent']} >
            <FlatList data={categories} renderItem={renderCategory} keyExtractor={(item) => `${item.id}`} />
        </LinearGradient>
    )
  }

  export default Categories