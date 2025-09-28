import {
  View,
  Text,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Home_Backgorund, Logo } from "@/assets";

import { RectButton, TextInput } from "react-native-gesture-handler";

import { Feather as Icon } from "@expo/vector-icons";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { NavigationProps } from "@/types/navigation";

//ROUTES

export type RootStackParamList = {
  Home: undefined;
  Points: { uf: string; city: string };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");
  function handleNavigationPoints() {
    navigation.navigate("Points", { uf, city });
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ImageBackground
        source={Home_Backgorund}
        imageStyle={{ width: 274, height: 368 }}
        style={styles.container}
      >
        <View style={styles.main}>
          <Image source={Logo} />

          <Text style={styles.title}>
            Seu marketplace de coleta de residuos
          </Text>
          <Text style={styles.description}>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
          </Text>
        </View>

        <View style={styles.footer}>
          <TextInput
            style={styles.input}
            placeholder="Digite a UF"
            maxLength={2}
            autoCapitalize="characters"
            value={uf}
            autoCorrect={false}
            onChangeText={setUf}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite a Cidade"
            autoCorrect={false}
            value={city}
            onChangeText={setCity}
          />
          <RectButton style={styles.button} onPress={handleNavigationPoints}>
            <View style={styles.buttIcon}>
              <Text>
                <Icon name="arrow-right" color={"#fff"} size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;
