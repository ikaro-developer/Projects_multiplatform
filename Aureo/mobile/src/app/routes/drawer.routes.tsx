import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Octicons from "@expo/vector-icons/Octicons";

import { Context } from "@/context/Context";

//Routes
import TabRoutesFinance from "@/features/finance-manager/routes/tabs.routes";
import StackRoutesPassword from "@/features/password-manager/routes/stack.routes";
const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  const { navigationOpenHeader } = useContext(Context);
  return (
    <Drawer.Navigator screenOptions={{ title: "", headerShown: navigationOpenHeader }}>

      <Drawer.Screen
        name="PasswordManager"
        component={StackRoutesPassword}
        options={{
          drawerLabel: "Senhas",
          drawerIcon: ({ color, size }) => (
            <Octicons name="key" size={size} color={color} />
          ),
        }}

      />
      <Drawer.Screen
        name="FinanceManager"
        component={TabRoutesFinance}
        options={{
          drawerLabel: "Finanças",
          drawerIcon: ({ color, size }) => (
            <Octicons name="credit-card" size={size} color={color} />
          ),
        }}
      />



    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
