import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Test1,Test2 } from "../screens";

type TabParamList = {
  ScreenHomeFinance: undefined;
  ScreenDashboardFinance: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabRoutesContent = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="ScreenHomeFinance"
        component={Test1}
        options={{ title: "Home" }}
      />
      
      <Tab.Screen
        name="ScreenDashboardFinance"
        component={Test2}
        options={{ title: "Dashboard" }}
      />
    </Tab.Navigator>
  );
};


const TabRoutes = () => {
  return (
    <TabRoutesContent />
  );
}

export default TabRoutes;


