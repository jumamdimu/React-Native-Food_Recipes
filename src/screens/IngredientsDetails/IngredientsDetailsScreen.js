import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { getIngredientName, getAllIngredients } from "../../data/MockDataAPI";
import Ionicons from 'react-native-vector-icons/Ionicons';

const IngredientsDetails = (props) =>{
    const { navigation, route } = props;

    const item = route.params?.ingredients;
    const ingredientsArray = getAllIngredients(item);
  
    React.useLayoutEffect(() => {
      navigation.setOptions({
        title: route.params?.title,
        headerTransparent: "true",
        headerLeft: () => (
          <View style={{ paddingLeft: 4, marginRight: 10 }}>
            <Ionicons 
              name="arrow-back-circle" size={30} 
              color="#900" 
              onPress={() => {
                  navigation.goBack();
              }}
            />
          </View>
        ),
        headerRight: () => (<View></View>),
        headerTitleStyle: {
          fontSize: 16,
        },
      });
    }, []);
  
    const onPressIngredient = (item) => {
      let name = getIngredientName(item.ingredientId);
      let ingredient = item.ingredientId;
      navigation.navigate("Ingredient", { ingredient, name });
    };

    const renderIngredient = ({ item }) => (
        <TouchableOpacity underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressIngredient(item[0])}>
          <View style={styles.container}>
            <Image style={styles.photo} source={{ uri: item[0].photo_url }} />
            <Text style={styles.title}>{item[0].name}</Text>
            <Text style={{ color: "grey" }}>{item[1]}</Text>
          </View>
        </TouchableOpacity>
      );

    return(       
        <View>
            <LinearGradient colors={[ '#fff1f2', '#fecdd3', 'transparent']}>
                <FlatList vertical 
                        showsVerticalScrollIndicator={false} numColumns={3} 
                        data={ingredientsArray} 
                        renderItem={renderIngredient} 
                        key={(item) => `${item.recipeId}`} />
            </LinearGradient>
        </View>
    )
  }

  export default IngredientsDetails