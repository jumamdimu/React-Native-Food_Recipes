import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, FlatList, Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { getRecipes, getCategoryName } from "../../data/MockDataAPI";
import Ionicons from 'react-native-vector-icons/Ionicons';

const RecipesList = (props) =>{
    const { navigation, route } = props;

    const item = route?.params?.category;
    const recipesArray = getRecipes(item.id);
  
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
        headerRight: () => (<View />),
        headerTitleStyle: {
          fontSize: 16,
        },
      });
    }, []);
  
    const onPressRecipe = (item) => {
      navigation.navigate("Recipe", { item });
    };
  
    const renderRecipes = ({ item }) => (
      <TouchableOpacity underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo_url }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
        </View>
      </TouchableOpacity>
    );

    return(
        <LinearGradient colors={[ '#fff1f2', '#fecdd3', 'transparent']} >
          <SafeAreaView>
            <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipesArray} renderItem={renderRecipes} key={(item) => `${item.recipeId}`} />
          </SafeAreaView>
        </LinearGradient>
    )
  }

  export default RecipesList