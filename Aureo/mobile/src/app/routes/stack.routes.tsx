import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ScreenDetails, ScreenList, Screenform } from "@/features/password-manager/screens";
import DrawerRoutes from "./drawer.routes";
import {
  ContextPassword,
} from "@/features/password-manager/context/PasswordContext";
import useSupabasePassword from "@/features/password-manager//services/SupabasePassword";
import StackRoutesPassword from "@/features/password-manager/routes/stack.routes";
const Stack = createStackNavigator();
const StackRoutesContent = () => {
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
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={DrawerRoutes} />
            <Stack.Screen name=" PasswordManager" component={StackRoutesPassword} />
        </Stack.Navigator>
    );
};

const StackRoutes = () => {
    return (
        <StackRoutesContent />
    );
};

export default StackRoutes;
