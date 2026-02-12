import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScreenList, Screenform } from "../screens";
import {
  ContextPassword,
  ContextPasswordProvider,
} from "../context/PasswordContext";
import useSupabasePassword from "../services/SupabasePassword";

const Tabs = createBottomTabNavigator();
const TabRoutesContent = () => {
  const { setPassword } = useContext(ContextPassword);
  const { getPassword } = useSupabasePassword();

  useEffect(() => {
    async function load() {
      const data = await getPassword();
      setPassword(data);
    }
    load();
  }, []);

  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="ScreenList" component={ScreenList} />
      <Tabs.Screen name="ScreenForm" component={Screenform} />
    </Tabs.Navigator>
  );
};

const TabRoutes = () => {
  return (
    <ContextPasswordProvider>
      <TabRoutesContent />
    </ContextPasswordProvider>
  );
};

export default TabRoutes;
