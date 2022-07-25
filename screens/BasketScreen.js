import { View, Text,TouchableOpacity, Image, ScrollView} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import { removeFromBasket, selectBasketItems, selectBasketTotal } from "../slices/basketSlice";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Currency from "react-currency-formatter";
import {
 XCircleIcon
} from "react-native-heroicons/solid"

import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItems, setGroupedItems] = useState([]);
  const dispatch = useDispatch();
  const BasketTotal=useSelector(selectBasketTotal)


  useEffect(() => {
    const groupedItemss = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    },{});
    setGroupedItems(groupedItemss);
  }, [items]);
  console.log(restaurant.long)
  console.log(restaurant.title)

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
          <View>
            <Text className='text-lg-font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-400'>
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity className='rounded-full bg-gray-100 absolute top-3 right-5'
          onPress={navigation.goBack}
          >
          <XCircleIcon color="#00CCBB" height={50} width={50}/>
          </TouchableOpacity>

        </View>
        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
          <Image
          source={{
            uri:"https://links.papareact.com/wru"
          }}
          className='h-7 w-7 bg-gray-300 p-4 rounded-full'
          />
          <Text className='flex-1'>Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className='text-[#00CCBB]'>Change</Text>
          </TouchableOpacity>

        </View>
        <ScrollView>
          {Object.entries(groupedItems).map(([key,items])=>(
            <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
              <Text className='text-["00CCBB"]'>
                {items.length} x
              </Text>
              <Image
              source={{
                uri:urlFor(items[0]?.image).url()
              }}
              className='h-12 w-12 rounded-full'
              />
              <Text className='flex-1'>{items[0]?.name}</Text>
              <Text className='text-gray-600'>
              <Currency quantity={items[0]?.price} currency="GBP" />
            </Text>
            <TouchableOpacity>
              <Text
              className='text-[#00CCBB] text-xs'
              onPress={()=>dispatch(removeFromBasket({id:key}))}>Remove</Text>
            </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className='bg-white mt-5 spacee-y-4'>
          <View className='flex-row justify-between'>
            <Text claassName='text-gray-400'>SubTotal</Text>
            <Text claassName='text-gray-400'>
              <Currency quantity={BasketTotal} currency="GBP" />
            </Text>
          </View>

          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Order Total</Text>
            <Text className='font-extrabold'>
              <Currency quantity={BasketTotal + 5.99} currency="GBP" />
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity className='rounded-lg bg-[#00CCBB] p-4'
      onPress={()=>navigation.navigate("PreparingOrderScreen")}
      >
        <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BasketScreen;
