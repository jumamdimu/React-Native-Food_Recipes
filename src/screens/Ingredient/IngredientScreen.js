import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, FlatList, ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { getIngredientUrl, getRecipesByIngredient, getCategoryName } from "../../data/MockDataAPI";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Ingredient = (props) =>{
    const { navigation, route } = props;

    const ingredientId = route.params?.ingredient;
    const ingredientUrl = getIngredientUrl(ingredientId);
    const ingredientName = route.params?.name;
  
    React.useLayoutEffect(() => {
      navigation.setOptions({
        title: route.params?.name,
        headerTransparent: "true",
        headerLeft: () => (
          <View style={{ paddingLeft: 10, marginRight: 15 }}>
            <Ionicons 
              name="arrow-back-circle" size={30} 
              color="#900" 
              onPress={() => {
                  navigation.goBack();
              }}
            />
          </View>
        ),
        headerRight: () => (
          <View style={{ paddingRight: 10}}>
            <Text style = {{ fontWeight: "bold", fontSize: 19 }}>Recipes</Text>
          </View>
        ),
      });
    }, []);
  
    const onPressRecipe = (item) => {
      navigation.navigate("Recipe", { item });
    };

    const renderRecipes = ({ item }) => (
        <TouchableOpacity onPress={() => onPressRecipe(item)}>
            <View style={styles.container}>
              <Image style={styles.photo} source={{ uri: item.photo_url }} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
            </View>
        </TouchableOpacity>
      );

    return(
        <LinearGradient colors={[ '#fff1f2', '#fecdd3', 'transparent']} >
            <Image style={styles.photoIngredient} source={{ uri: "" + ingredientUrl }} />
            <Text style={styles.ingredientInfo}>Recipes with {ingredientName}:</Text>
            <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={getRecipesByIngredient(ingredientId)} renderItem={renderRecipes} key={(item) => `${item.recipeId}`} />
        </LinearGradient>
    )
  }

  export default Ingredient