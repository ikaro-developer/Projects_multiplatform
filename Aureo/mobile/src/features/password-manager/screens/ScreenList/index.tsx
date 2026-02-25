import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { ContextPassword } from "@/features/password-manager/context/PasswordContext";
import styles from "./styles";
import PasswordServiceGroup from "@/features/password-manager/components/PasswordServiceGroup";
import { useFilterPassword } from "@/features/password-manager/utils/FilteredPassword";


import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationTypeStack } from "../../types/navigation";
import { Context } from "@/context/Context";
type ScreenListNavigationProp = StackNavigationProp<NavigationTypeStack, 'ScreenList'>;
const PasswordList = () => {
  const navigation = useNavigation<ScreenListNavigationProp>();
  const { setNavigationOpenHeader } = useContext(Context);
  const { Password } = useContext(ContextPassword);
  const {
    activeTab,
    setActiveTab,
    filteredPasswords,
    searchQuery,
    setSearchQuery,
    compromisedCount,
  } = useFilterPassword();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Feather name="shield" size={28} color="#4f46e5" />
          <Text style={styles.title}>Cofre de Senhas</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
          navigation.navigate("ScreenForm" )
          setNavigationOpenHeader(false);
          }}
        >
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.buttonText}>Nova Senha</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#999" />
        <TextInput
          placeholder="Buscar senhas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
      </View>

      {/* Tabs Customizadas */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "all" && styles.tabActive]}
          onPress={() => setActiveTab("all")}
        >
          <Text style={[styles.tabText, activeTab === "all" && { color: "#fff" }]}>Todas ({Password.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "compromised" && styles.tabActive,
          ]}
          onPress={() => setActiveTab("compromised")}
        >
          <Text style={[styles.tabText, activeTab === "compromised" && { color: "#fff" }]}>Atenção ({compromisedCount})</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <FlatList

        data={[{ key: "content" }]}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        renderItem={() =>
          filteredPasswords.length === 0 ? (
            <View style={styles.emptyState}>
              <Feather name="lock" size={40} color="#999" />
              <Text style={styles.emptyTitle}>Nenhuma senha encontrada</Text>
              <Text style={styles.emptySubtitle}>
                {searchQuery
                  ? "Tente uma busca diferente"
                  : "Adicione sua primeira senha"}
              </Text>
            </View>
          ) : (
            <PasswordServiceGroup passwords={filteredPasswords} />
          )
        }
      />
    </View>
  );
};

export default PasswordList;
