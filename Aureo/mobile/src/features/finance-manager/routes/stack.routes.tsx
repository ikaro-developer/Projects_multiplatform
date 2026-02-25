import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Screenform } from "@/features/password-manager/screens";
// import {
//   ContextPassword,
//   ContextPasswordProvider,
// } from "../context/PasswordContext";
import { NavigationTypeStack } from "../types/navigation";

const Stack = createStackNavigator<NavigationTypeStack>();
const StackRoutesContent = () => {
  // const { setPassword } = useContext(ContextPassword);
  // const { getPassword } = useSupabasePassword();

  // useEffect(() => {
  //   async function load() {
  //     const data = await getPassword();
  //     setPassword(data);
  //   }
  //   load();
  // }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="ScreenList" component={ScreenList} /> */}
      <Stack.Screen name="ScreenForm" component={Screenform} />
      {/* <Stack.Screen name="ScreenDetails" component={ScreenDetails}  /> */}
    </Stack.Navigator>
  );
};

const StackRoutes = () => {
  return (
    // <ContextPasswordProvider>
      <StackRoutesContent />
    // </ContextPasswordProvider>
  );
};

export default StackRoutes;
