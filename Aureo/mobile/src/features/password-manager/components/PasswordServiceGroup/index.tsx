import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  UIManager,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { Password } from "@/features/password-manager/types/passwordTypes";
import { getFaviconUrl } from "@/features/password-manager/utils/GetFavIconURL";
import styles from "./styles";
import { useGroupPassword } from "../../utils/GroupPassword";
import PasswordCard from "../PasswordCard";

// Habilitar animação no Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function PasswordServiceGroup({
  passwords,
}: {
  passwords: Password[];
}) {
  const { grouped, openGroups, toggleGroup } = useGroupPassword(passwords);

  return (
    <View style={styles.container}>
      {Object.entries(grouped).map(([serviceName, list]) => {
        const isOpen = openGroups[serviceName] || false;
        const faviconUrl = getFaviconUrl(list[0].url);
        const hasCompromised = list.some((p) => p.strength === "weak");

        const usernames = list.map((p) => p.username).join(", ");
        const shortUsernames =
          usernames.length > 40
            ? usernames.substring(0, 40) + "..."
            : usernames;

        return (
          <View key={serviceName} style={styles.card}>
            {/* HEADER */}
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => toggleGroup(serviceName)}
            >
              <View style={styles.leftContent}>
                {faviconUrl ? (
                  <Image source={{ uri: faviconUrl }} style={styles.favicon} />
                ) : (
                  <View style={styles.fallbackIcon}>
                    <Feather name="globe" size={18} color="#4f46e5" />
                  </View>
                )}

                <View>
                  <View style={styles.titleRow}>
                    <Text style={styles.serviceName}>{serviceName}</Text>

                    <View style={styles.badge}>
                      <MaterialIcons name="group" size={14} color="#333" />
                      <Text style={styles.badgeText}>{list.length} contas</Text>
                    </View>
                  </View>

                  <Text style={styles.usernameText}>{shortUsernames}</Text>
                </View>
              </View>

              <View style={styles.rightContent}>
                {hasCompromised && (
                  <View style={styles.warningBadge}>
                    <Text style={styles.warningText}>Atenção</Text>
                  </View>
                )}

                <Feather
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#666"
                />
              </View>
            </TouchableOpacity>

            {/* CONTENT */}
            {isOpen && (
              <View style={styles.collapsibleContent}>
                {list.map((password) => (
                  <PasswordCard
                    key={password.id}
                    password={password}
                    favicon={faviconUrl}
                  />
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
