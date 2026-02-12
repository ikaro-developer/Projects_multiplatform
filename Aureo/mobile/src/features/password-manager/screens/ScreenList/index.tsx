import React, { useContext, useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { ContextPassword } from "../../context/PasswordContext";
import styles from "./styles";
import PasswordServiceGroup from "../../components/PasswordServiceGroup";
import { useFilterPassword } from "../../utils/FilteredPassword";

const PasswordList = () => {
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
          // onPress={() => setViewMode("form")}
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
          <Text style={styles.tabText}>Todas ({Password.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "compromised" && styles.tabActive,
          ]}
          onPress={() => setActiveTab("compromised")}
        >
          <Text style={styles.tabText}>Atenção ({compromisedCount})</Text>
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
