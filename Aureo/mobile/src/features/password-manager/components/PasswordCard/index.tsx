import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { ContextPassword } from "../../context/PasswordContext";
import { Password } from "../../types/passwordTypes";
import { getStrengthInfo } from "../../utils/StrengthPassword";
import styles from "./styles";

interface PasswordCardProps {
  password: Password;
  favicon: string;
}

export default function PasswordCard({ password, favicon }: PasswordCardProps) {
  const { setSelectedPassword } = useContext(ContextPassword);

  const [showPassword, setShowPassword] = useState(false);

  const { label, color: strengthColor } = getStrengthInfo(password.strength);

  async function handleCopy() {
    await Clipboard.setStringAsync(password.password);
    Alert.alert("Copiado", "Senha copiada para a área de transferência");
  }

  function handlePasswordClick() {
    setSelectedPassword(password);
    // setViewMode("details");
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePasswordClick}
      style={styles.card}
    >
      {/* Barra superior de força */}
      {(password.strength === "weak" || password.strength === "medium") && (
        <View
          style={[
            styles.strengthBar,
            password.strength === "weak" ? styles.weak : styles.medium,
          ]}
        />
      )}

      <View style={styles.content}>
        {/* Ícone/Favicon */}
        <View style={styles.iconContainer}>
          {favicon ? (
            <Image source={{ uri: favicon }} style={styles.favicon} />
          ) : (
            <Feather name="globe" size={22} color="#666" />
          )}
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {password.name}
          </Text>

          <Text style={styles.username} numberOfLines={1}>
            {password.username}
          </Text>

          {/* Password Preview */}
          <View style={styles.passwordRow}>
            <Text style={styles.passwordPreview} numberOfLines={1}>
              {showPassword ? password.password : "••••••••••••"}
            </Text>

            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation?.();
                setShowPassword(!showPassword);
              }}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={18}
                color="#444"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation?.();
                handleCopy();
              }}
            >
              <Feather name="copy" size={18} color="#444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View
          style={[
            styles.badge,
            strengthColor === "weak"
              ? styles.badgeWeak
              : strengthColor === "medium"
              ? styles.badgeMedium
              : styles.badgeStrong,
          ]}
        >
          <MaterialIcons name="security" size={14} color="#fff" />
          <Text style={styles.badgeText}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
