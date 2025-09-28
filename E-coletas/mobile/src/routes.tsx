import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Detail, Home, Points } from "@/pages";

export type AppStackParamList = {
  Home: undefined;
  Points: undefined;
  Detail: undefined;
};
const AppStack = createNativeStackNavigator<AppStackParamList>();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#f0f0f5" },
        }}
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Points" component={Points} />
        <AppStack.Screen name="Detail" component={Detail} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
