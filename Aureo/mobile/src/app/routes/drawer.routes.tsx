import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Octicons from "@expo/vector-icons/Octicons";
import TabRoutes from "@/features/password-manager/routes/tab.routes";
const Drawer = createDrawerNavigator();

const DrawerRoutes = () => {
  return (
    <Drawer.Navigator screenOptions={{ title: "" }}>
      <Drawer.Screen
        name="PasswordManager"
        component={TabRoutes}
        options={{
          drawerLabel: "Senhas",
          drawerIcon: ({ color, size }) => (
            <Octicons name="key" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
