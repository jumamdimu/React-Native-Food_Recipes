import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Screens
import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import RecipeScreen from '../screens/Recipe/RecipeScreen';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
import IngredientScreen from '../screens/Ingredient/IngredientScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';

const Stack = createNativeStackNavigator();
function MainNavigator() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
            }
        }}    
    >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Categories' component={CategoriesScreen}/>
        <Stack.Screen name='Recipe' component={RecipeScreen}/>
        <Stack.Screen name='RecipesList' component={RecipesListScreen} />
        <Stack.Screen name='Ingredient' component={IngredientScreen} />
        <Stack.Screen name='Search' component={SearchScreen} />
        <Stack.Screen name='IngredientsDetails' component={IngredientsDetailsScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function BottomTabs() {
    return (
      <Tab.Navigator
            initialRouteName="Main"
            screenOptions={{
            tabBarActiveTintColor: '#e91e63',
            headerShown: true,
        }}      
      >
        <Tab.Screen 
            name="Main"
            component={MainNavigator}
            options={{
                headerShown: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }}
            
            />

            <Tab.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{
                    tabBarLabel: 'Categories',
                    tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="category" color={color} size={size} />
                    ),
                    //tabBarBadge: 3,
                }}
            />

            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="archive-search" color={color} size={size} />
                    ),
                }}
            />
      </Tab.Navigator>
    );
  }

const AppContainer = () =>{
  return(
    <NavigationContainer>
        <BottomTabs />
    </NavigationContainer>
  )
}

export default AppContainer