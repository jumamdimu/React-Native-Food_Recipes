import React from 'react'
import { SafeAreaView, FlatList, Text, View, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { recipes } from "../../data/dataArrays";
import { getCategoryName } from "../../data/MockDataAPI";
import styles from "./styles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = (props) =>{
    const { navigation } = props;

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <View style={{ paddingLeft: 10, marginRight: 15 }}>
              <MaterialCommunityIcons name="home" size={24} color="#900" />
            </View>
          ),
          headerRight: () => (
            <View style={{ paddingRight: 10}}>
              <Text style = {{ fontWeight: "bold", fontSize: 19 }}>Food Recipe</Text>
            </View>
          ),      
        });
      }, []);

    const onPressRecipe = (item) => { navigation.navigate("Recipe", { item }) }

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
        <LinearGradient colors={[ '#fff1f2', '#fecdd3', 'transparent']}>
          <SafeAreaView>
              <FlatList vertical 
                showsVerticalScrollIndicator={false} 
                numColumns={2} 
                data={recipes} 
                renderItem={renderRecipes} 
                key={(item) => `${item.recipeId}`} />
          </SafeAreaView>
        </LinearGradient>
    )
  }

  export default HomeScreen