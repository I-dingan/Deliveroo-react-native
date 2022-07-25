import { Provider } from 'react-redux'
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
const Stack = createNativeStackNavigator();
import {store} from './store'
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';


export default function App() {
  return (
    <Provider store={store}>
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* screens */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen name="Basket" component={BasketScreen} 
          options={{presentation:"modal", headerShown:false}}/>
          <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen} 
          options={{presentation:"fullScreenModal", headerShown:false}}/>
           <Stack.Screen name="Delivery" component={DeliveryScreen} 
          options={{presentation:"fullScreenModal", headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
    </Provider>
  );
}
