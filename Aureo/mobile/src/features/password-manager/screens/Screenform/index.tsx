// import { View, Text } from "react-native";
// import React, { useContext, useEffect } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { NavigationTypeStack } from "@/features/password-manager/types/navigation";
// import { Context } from "@/context/Context";



// const Screenform = () => {
//   type ScreenListNavigationProp = StackNavigationProp<NavigationTypeStack, 'ScreenList'>;
//     const navigation = useNavigation<ScreenListNavigationProp>();
//     const { setNavigationOpenHeader } = useContext(Context);
//   useEffect(() => {
//     const unsubscribe = navigation.addListener("beforeRemove", (e) => {
//       setNavigationOpenHeader(true);

//     });

//     return unsubscribe;
//   }, [navigation]);

//   return (
//     <View>
//       <Text>Screenform</Text>
//     </View>
//   );
// };

// export default Screenform;
// COMPONENTS
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PasswordGenerator, PasswordFormComponent } from '@/features/password-manager/components';

// ICONS

// CONTEXT
import { useContext, useEffect, useState } from 'react';
import { Context } from '@/context/Context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationTypeStack } from '@/features/finance-manager/types/navigation';



export default function PasswordForm() {
  const [activeTab, setActiveTab] = useState<'Nova Senha' | 'Gerador Senha'>('Nova Senha');
  type ScreenListNavigationProp = StackNavigationProp<NavigationTypeStack, 'ScreenForm'>;
  const navigation = useNavigation<ScreenListNavigationProp>();
  const { setNavigationOpenHeader } = useContext(Context);
  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      setNavigationOpenHeader(true);
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabsList}>
        <TouchableOpacity
          style={[
            styles.tabTrigger,
            activeTab === 'Nova Senha' && styles.tabTriggerActive
          ]}
          onPress={() => setActiveTab('Nova Senha')}
        >
          <Text
            style={[
              styles.tabTriggerText,
              activeTab === 'Nova Senha' && styles.tabTriggerTextActive
            ]}
          >
            Nova Senha
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabTrigger,
            activeTab === 'Gerador Senha' && styles.tabTriggerActive
          ]}
          onPress={() => setActiveTab('Gerador Senha')}
        >
          <Text
            style={[
              styles.tabTriggerText,
              activeTab === 'Gerador Senha' && styles.tabTriggerTextActive
            ]}
          >
            Gerador de Senha
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {activeTab === 'Nova Senha' && <PasswordFormComponent />}
        {activeTab === 'Gerador Senha' && <PasswordGenerator />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  tabsList: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(161, 161, 170, 0.2)',
    borderRadius: 6,
    marginTop: 16,
  },
  tabTrigger: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  tabTriggerActive: {
    backgroundColor: 'hsl(42, 86%, 55%)',
  },
  tabTriggerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  tabTriggerTextActive: {
    color: '#000',
  },
  tabContent: {
    flex: 1,
    // marginTop: 16,
  },
});