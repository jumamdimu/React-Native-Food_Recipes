import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, SafeAreaView, FlatList, Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import styles from "./styles";
import { getCategoryName, getRecipesByRecipeName, getRecipesByCategoryName, getRecipesByIngredientName } from "../../data/MockDataAPI";
import { TextInput } from "react-native-gesture-handler";

const Search = (props) =>{
    const { navigation } = props;

    const [value, setValue] = React.useState("");
    const [data, setData] = React.useState([]);
  
    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerLeft: () => <View />,
        headerTitle: () => (
          <View style={styles.searchContainer}>
             <Image style={styles.searchIcon} source={require("../../../assets/icons/search.png")} />
             <TextInput
              style={styles.searchInput}
              onChangeText={handleSearch}
              value={value}
            />
            
            <Pressable onPress={() => handleSearch("")}>
            <Image style={styles.searchIcon} source={require("../../../assets/icons/close.png")} />
            </Pressable> 
          </View>
        ),
        headerRight: () => <View />,
      });
    }, [value]);
  
    React.useEffect(() => {}, [value]);
  
    const handleSearch = (text) => {
      setValue(text);
      var recipeArray1 = getRecipesByRecipeName(text);
      var recipeArray2 = getRecipesByCategoryName(text);
      var recipeArray3 = getRecipesByIngredientName(text);
      var aux = recipeArray1.concat(recipeArray2);
      var recipeArray = [...new Set(aux)];
  
      if (text == "") {
        setData([]);
      } else {
        setData(recipeArray);
      }
    };
  
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
            <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={data} renderItem={renderRecipes} keyr={(item) => `${item.recipeId}`} />
          </SafeAreaView>
        </LinearGradient>
    )
  }

  export default Search