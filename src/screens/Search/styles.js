import { StyleSheet, Dimensions } from "react-native";
import { RecipeCard } from "../../AppStyles";

const screen_width = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  btnIcon: {
    height: 14,
    width: 14,
  },
  searchContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#EDEDED", 
    borderRadius: 10, 
    width: screen_width - 30,
    height: 50,
    //justifyContent: "space-around",
    paddingLeft: 5
  },
  searchIcon: { 
    width: 20, 
    height: 20, 
    tintColor: 'grey' 
  },
  searchInput: {
    backgroundColor: "#EDEDED",
    color: "black",
    width: screen_width - 87,
    height: 40,
    marginLeft: 7
  }
});

export default styles;
