
import React, { useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import * as Clipboard from "expo-clipboard";
import { format } from "date-fns";

// Ícones do react-native-vector-icons (FontAwesome ou Feather)

import { MaterialIcons, Feather } from "@expo/vector-icons";

// CONTEXT
import { ContextPassword } from "@/features/password-manager/context/PasswordContext";

import styles from "./styles";

// TYPE
import type { Password } from "@/features/password-manager/types/passwordTypes";

interface PasswordDetailsProps {
    password: Password;
}

const getStrengthColor = (strength: Password["strength"]) => {
    switch (strength) {
        case "weak":
            return "#ef4444"; // red
        case "medium":
            return "#facc15"; // yellow
        case "strong":
            return "#22c55e"; // green
        case "very-strong":
            return "#10b981"; // emerald
    }
};

const getStrengthLabel = (strength: Password["strength"]) => {
    switch (strength) {
        case "weak":
            return "Fraca";
        case "medium":
            return "Média";
        case "strong":
            return "Forte";
        case "very-strong":
            return "Muito Forte";
    }
};

const getStrengthPercent = (strength: Password["strength"]) => {
    switch (strength) {
        case "weak":
            return 25;
        case "medium":
            return 50;
        case "strong":
            return 75;
        case "very-strong":
            return 100;
    }
};

import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationTypeStack } from "../../types/navigation";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "@/components/Toast";
type ScreenListNavigationProp = StackNavigationProp<NavigationTypeStack, 'ScreenDetails'>;
export default function PasswordDetails() {
    const { showToast } = useToast();

    const navigation = useNavigation<ScreenListNavigationProp>();
    const [showPassword, setShowPassword] = useState(false);

    const { selectedPassword } = useContext(ContextPassword);
    const handleCopy = async (text: string, label: string) => {
        await Clipboard.setStringAsync(text);
        showToast({
            message: `${label} copiada para a área de transferência`,
            type: 'success',
            duration: 4000,
        });
    };
    const handleBack = async () => {
        await navigation.navigate("ScreenList");

    };



    const getFaviconUrl = (url?: string) => {
        if (!url) return null;
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
        } catch {
            return null;
        }
    };

    const faviconUrl = getFaviconUrl(selectedPassword!.url);
    const strengthPercent = getStrengthPercent(selectedPassword!.strength);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Feather name="arrow-left" size={20} />
                    <Text style={styles.backText}>Voltar</Text>
                </TouchableOpacity>

                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.editButton}>
                        <Feather name="edit-2" size={20} color="#000" />
                        <Text>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton}>
                        <Feather name="trash-2" size={20} color="#fff" />
                        <Text style={{ color: "#fff" }}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Info Card */}
            <View style={styles.card}>
                <View style={styles.mainInfo}>
                    <View style={styles.iconContainer}>
                        {faviconUrl ? (
                            <Image
                                source={{ uri: faviconUrl }}
                                style={styles.favicon}
                                resizeMode="contain"
                            />
                        ) : (
                            <Feather name="globe" size={40} color="#888" />
                        )}
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{selectedPassword!.name}</Text>
                        {selectedPassword!.url && (
                            <TouchableOpacity onPress={() => Linking.openURL(selectedPassword!.url)}>
                                <Text style={styles.urlText}>{selectedPassword!.url}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>

            {/* Credentials Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Credenciais</Text>

                {/* Username */}
                <View style={styles.field}>
                    <Text style={styles.label}>
                        <Feather name="user" size={16} /> Usuário / Email
                    </Text>
                    <View style={styles.fieldRow}>
                        <Text style={styles.code}>{selectedPassword!.username}</Text>
                        <TouchableOpacity onPress={() => handleCopy(selectedPassword!.username, "Usuário")}>
                            <Feather name="copy" size={22} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Password */}
                <View style={styles.field}>
                    <Text style={styles.label}>
                        <Feather name="key" size={16} /> Senha
                    </Text>
                    <View style={styles.fieldRow}>
                        <Text style={styles.code}>
                            {showPassword ? selectedPassword!.password : "••••••••••••••••"}
                        </Text>
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Feather name={showPassword ? "eye-off" : "eye"} size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleCopy(selectedPassword!.password, "Senha")}>
                            <Feather name="copy" size={22} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Strength */}
                <View style={styles.field}>
                    <Text style={styles.label}>Força da Senha</Text>
                    <View style={styles.strengthRow}>
                        <Text style={[styles.strengthLabel, { color: getStrengthColor(selectedPassword!.strength) }]}>
                            {getStrengthLabel(selectedPassword!.strength)}
                        </Text>
                        <Text>{strengthPercent}%</Text>
                    </View>
                    <View style={styles.strengthBar}>
                        <View
                            style={[
                                styles.strengthFill,
                                {
                                    width: `${strengthPercent}%`,
                                    backgroundColor: getStrengthColor(selectedPassword!.strength),
                                },
                            ]}
                        />
                    </View>
                </View>
            </View>

            {/* Details Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Detalhes</Text>
                <View style={styles.detailsRow}>
                    <View>
                        <Text style={styles.label}>Criado em</Text>
                        <Text>{format(new Date(selectedPassword!.created_at), "dd/MM/yyyy")}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Atualizado em</Text>
                        <Text>{format(new Date(selectedPassword!.updated_at), "dd/MM/yyyy")}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

