import React from 'react'
import { ScrollView, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { getIngredientName, getCategoryName, getCategoryById } from "../../data/MockDataAPI";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";

const { width: viewportWidth } = Dimensions.get("window");

const SLIDER_WIDTH = Dimensions.get('window').width + 80
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const Recipe = (props) =>{
    const { navigation, route } = props;

    const [activeSlide, setActiveSlide] = React.useState(0);
    //const [index, setIndex] = React.useState(0)

    const item = route.params?.item;    
    const category = getCategoryById(item.categoryId);
    const title = getCategoryName(category.id);

    const slider1Ref = React.useRef();

    React.useLayoutEffect(() => {
        navigation.setOptions({
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
              <Text style = {{ fontWeight: "bold", fontSize: 19 }}>Food Recipe</Text>
            </View>
          ),      
        });
      }, []);
    
    const renderImage = ({ item }) => (
        <TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: item }} />
          </View>
        </TouchableOpacity>
      );

    return(
        <LinearGradient colors={[ '#fff1f2', '#fecdd3', 'transparent']} >           
            <ScrollView >
                <View style={styles.carouselContainer}>
                    <View style={styles.carousel}>
                                               
                        <Carousel
                            
                            useScrollView={true}
                            ref={slider1Ref}
                            data={item.photosArray}
                            renderItem={renderImage}
                            sliderWidth={viewportWidth}
                            itemWidth={ITEM_WIDTH}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}
                            firstItem={item.photosArray.length-1}
                            loop={true}
                            autoplay={false}
                            autoplayDelay={500}
                            autoplayInterval={3000}
                            onSnapToItem={(index) => setActiveSlide(index)}
                        />
                        <Pagination
                            dotsLength={item.photosArray.length}
                            activeDotIndex={activeSlide}
                            containerStyle={styles.paginationContainer}
                            dotColor="rgba(153, 0, 0, 0.92)"
                            dotStyle={styles.paginationDot}
                            inactiveDotColor="#900"
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            carouselRef={slider1Ref.current}
                            tappableDots={!!slider1Ref.current}
                        />
                    </View>
                </View>
                <View style={styles.infoRecipeContainer}>
                    <Text style={styles.infoRecipeName}>{item.title}</Text>
                    <View style={styles.infoContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("RecipesList", { category, title })}>
                            <Text style={styles.category}>{getCategoryName(item.categoryId).toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoContainer}>
                        <Image style={styles.infoPhoto} source={require("../../../assets/icons/time.png")} />
                        <Text style={styles.infoRecipe}>{item.time} minutes </Text>
                    </View>

                    <View style={styles.infoContainer}>
                      <ViewIngredientsButton
                        onPress={() => {
                          let ingredients = item.ingredients;
                          let title = "Ingredients for " + item.title;
                          navigation.navigate("IngredientsDetails", { ingredients, title });
                        }}
                      />
                    </View>
                    <View style={styles.infoContainer}>
                      <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    )
  }

  export default Recipe