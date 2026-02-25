// import { useState, useEffect } from "react";
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
//     ScrollView,
// } from "react-native";

// //COMPONENTS
// import Slider from "@react-native-community/slider";

// //ICONS
// import { Copy, RefreshCw, Check, Settings2 } from "lucide-react-native";

// //TYPE
// import type { GeneratorSettings } from "@/features/password-manager/types/passwordTypes";

// //UTILS
// // import {  handleCopy} from "@/features/password-manager/utils/HandleCopy";
// import { usePasswordGenerator } from "@/features/password-manager/utils/GeneratePassword";
// import { calculateStrengthPassWord } from "@/features/password-manager/utils/StrengthPassword";

// export default function PasswordGenerator() {
//     const { generatePassword, setSettings, settings } = usePasswordGenerator();
//     const [password, setPassword] = useState("");
//     const [copied, setCopied] = useState(false);

//     const strength = calculateStrengthPassWord(password, settings);

//     const updateSetting = (
//         key: keyof GeneratorSettings,
//         value: number | boolean
//     ) => {
//         setSettings((prev) => ({ ...prev, [key]: value }));
//     };

//     function initialization() {
//         const newPassword = generatePassword();
//         setPassword(newPassword);
//         setCopied(false);
//     }

//     useEffect(() => {
//         initialization();
//     }, [settings]);

//     const getStrengthColor = () => {
//         if (strength.percent <= 25) return "#ef4444";
//         if (strength.percent <= 50) return "#eab308";
//         if (strength.percent <= 75) return "#22c55e";
//         return "#10b981";
//     };

//     return (
//         <ScrollView style={styles.container}>
//             <View style={styles.content}>
//                 {/* Generated Password Card */}
//                 <View style={styles.card}>
//                     <View style={styles.cardContent}>
//                         {/* Password Display */}
//                         <View style={styles.passwordContainer}>
//                             <View style={styles.passwordBox}>
//                                 <Text style={styles.passwordText}>{password}</Text>
//                             </View>
//                         </View>

//                         {/* Action Buttons */}
//                         <View style={styles.buttonContainer}>
//                             <TouchableOpacity
//                                 onPress={initialization}
//                                 style={styles.buttonOutline}
//                             >
//                                 <RefreshCw color="#fff" size={16} />
//                                 <Text style={styles.buttonOutlineText}>Gerar Nova</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 onPress={() => {
//                                     //   handleCopy(password, "Senha");
//                                     setCopied(true);
//                                     setTimeout(() => setCopied(false), 2000);
//                                 }}
//                                 style={styles.buttonPrimary}
//                             >
//                                 {copied ? (
//                                     <>
//                                         <Check color="#000" size={16} />
//                                         <Text style={styles.buttonPrimaryText}>Copiado!</Text>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Copy color="#000" size={16} />
//                                         <Text style={styles.buttonPrimaryText}>Copiar</Text>
//                                     </>
//                                 )}
//                             </TouchableOpacity>
//                         </View>

//                         {/* Strength Indicator */}
//                         <View style={styles.strengthContainer}>
//                             <View style={styles.strengthHeader}>
//                                 <Text style={styles.strengthLabel}>Força da senha</Text>
//                                 <View style={styles.strengthInfo}>
//                                     <View style={styles.badge}>
//                                         <Text style={styles.badgeText}>{strength.bits} bits</Text>
//                                     </View>
//                                     <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
//                                         {strength.label}
//                                     </Text>
//                                 </View>
//                             </View>

//                             <View style={styles.strengthBar}>
//                                 <View
//                                     style={[
//                                         styles.strengthProgress,
//                                         {
//                                             width: `${strength.percent}%`,
//                                             backgroundColor: getStrengthColor(),
//                                         },
//                                     ]}
//                                 />
//                             </View>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Settings Card */}
//                 <View style={[styles.card, styles.settingsCard]}>
//                     <View style={styles.cardHeader}>
//                         <Settings2 color="#fff" size={20} />
//                         <Text style={styles.cardTitle}>Configurações</Text>
//                     </View>

//                     <View style={styles.settingsContent}>
//                         {/* Length Slider */}
//                         <View style={styles.settingSection}>
//                             <View style={styles.settingHeader}>
//                                 <Text style={styles.settingLabel}>Comprimento</Text>
//                                 <View style={styles.badge}>
//                                     <Text style={styles.badgeText}>{settings.length}</Text>
//                                 </View>
//                             </View>

//                             <Slider
//                                 style={styles.slider}
//                                 value={settings.length}
//                                 onValueChange={(v) => updateSetting("length", Math.round(v))}
//                                 minimumValue={20}
//                                 maximumValue={200}
//                                 step={1}
//                                 minimumTrackTintColor="hsl(42, 86%, 55%)"
//                                 maximumTrackTintColor="#3f3f46"
//                                 thumbTintColor="hsl(42, 86%, 55%)"
//                             />

//                             <View style={styles.sliderLabels}>
//                                 <Text style={styles.sliderLabel}>20</Text>
//                                 <Text style={styles.sliderLabel}>200</Text>
//                             </View>
//                         </View>

//                         {/* Character Options */}
//                         <View style={styles.optionsGrid}>
//                             <ToggleOption
//                                 label="Maiúsculas"
//                                 description="A-Z"
//                                 checked={settings.uppercase}
//                                 onToggle={(v) => updateSetting("uppercase", v)}
//                             />

//                             <ToggleOption
//                                 label="Minúsculas"
//                                 description="a-z"
//                                 checked={settings.lowercase}
//                                 onToggle={(v) => updateSetting("lowercase", v)}
//                             />

//                             <ToggleOption
//                                 label="Números"
//                                 description="0-9"
//                                 checked={settings.numbers}
//                                 onToggle={(v) => updateSetting("numbers", v)}
//                             />

//                             <ToggleOption
//                                 label="Símbolos"
//                                 description="!@#$%..."
//                                 checked={settings.symbols}
//                                 onToggle={(v) => updateSetting("symbols", v)}
//                             />
//                         </View>

//                         <ToggleOption
//                             label="Excluir ambíguos"
//                             description="l, 1, O, 0"
//                             checked={settings.excludeAmbiguous}
//                             onToggle={(v) => updateSetting("excludeAmbiguous", v)}
//                             fullWidth
//                         />
//                     </View>
//                 </View>
//             </View>
//         </ScrollView>
//     );
// }

// // Toggle Option Component
// interface ToggleOptionProps {
//     label: string;
//     description: string;
//     checked: boolean;
//     onToggle: (value: boolean) => void;
//     fullWidth?: boolean;
// }

// function ToggleOption({
//     label,
//     description,
//     checked,
//     onToggle,
//     fullWidth = false,
// }: ToggleOptionProps) {
//     return (
//         <View style={[styles.toggleOption, fullWidth && styles.toggleOptionFull]}>
//             <View>
//                 <Text style={styles.toggleLabel}>{label}</Text>
//                 <Text style={styles.toggleDescription}>{description}</Text>
//             </View>

//             <TouchableOpacity
//                 onPress={() => onToggle(!checked)}
//                 style={[styles.switch, checked && styles.switchActive]}
//             >
//                 <View style={[styles.switchThumb, checked && styles.switchThumbActive]} />
//             </TouchableOpacity>
//         </View>
//     );
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#0f0f11",
//     },
//     content: {
//         marginTop: 32,
//         paddingHorizontal: 16,
//     },
//     card: {
//         backgroundColor: "#18181b",
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: "rgba(250, 204, 21, 0.2)",
//         marginBottom: 24,
//     },
//     cardContent: {
//         padding: 24,
//     },
//     passwordContainer: {
//         marginBottom: 16,
//     },
//     passwordBox: {
//         backgroundColor: "rgba(0, 0, 0, 0.8)",
//         padding: 24,
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: "#27272a",
//     },
//     passwordText: {
//         color: "#fff",
//         fontSize: 20,
//         textAlign: "center",
//     },
//     buttonContainer: {
//         flexDirection: "row",
//         justifyContent: "center",
//         marginBottom: 16,
//     },
//     buttonOutline: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 20,
//         paddingVertical: 12,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: "#3f3f46",
//         marginRight: 12,
//     },
//     buttonOutlineText: {
//         color: "#fff",
//         fontSize: 14,
//         fontWeight: "500",
//         marginLeft: 6,
//     },
//     buttonPrimary: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 20,
//         paddingVertical: 12,
//         borderRadius: 8,
//         backgroundColor: "#facc15",
//     },
//     buttonPrimaryText: {
//         color: "#000",
//         fontSize: 14,
//         fontWeight: "500",
//         marginLeft: 6,
//     },
//     strengthContainer: {
//         marginTop: 8,
//     },
//     strengthHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 8,
//     },
//     strengthLabel: {
//         color: "#a1a1aa",
//         fontSize: 14,
//     },
//     strengthInfo: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     badge: {
//         backgroundColor: "#27272a",
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//         borderRadius: 4,
//         marginRight: 8,
//     },
//     badgeText: {
//         color: "#fff",
//         fontSize: 12,
//     },
//     strengthText: {
//         fontSize: 14,
//         fontWeight: "500",
//     },
//     strengthBar: {
//         height: 12,
//         backgroundColor: "#27272a",
//         borderRadius: 20,
//         overflow: "hidden",
//     },
//     strengthProgress: {
//         height: "100%",
//     },
//     settingsCard: {
//         paddingVertical: 16,
//     },
//     cardHeader: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 24,
//         paddingBottom: 16,
//     },
//     cardTitle: {
//         color: "#fff",
//         fontSize: 18,
//         fontWeight: "600",
//         marginLeft: 8,
//     },
//     settingsContent: {
//         paddingHorizontal: 24,
//     },
//     settingSection: {
//         marginBottom: 24,
//     },
//     settingHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 12,
//     },
//     settingLabel: {
//         color: "#fff",
//         fontSize: 14,
//         fontWeight: "500",
//     },
//     slider: {
//         width: "100%",
//         height: 40,
//     },
//     sliderLabels: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     sliderLabel: {
//         color: "#a1a1aa",
//         fontSize: 12,
//     },
//     optionsGrid: {
//         marginBottom: 16,
//     },
//     toggleOption: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: 12,
//         borderRadius: 8,
//         backgroundColor: "rgba(39, 39, 42, 0.5)",
//         marginBottom: 12,
//     },
//     toggleOptionFull: {
//         width: "100%",
//     },
//     toggleLabel: {
//         color: "#fff",
//         fontSize: 14,
//         fontWeight: "500",
//     },
//     toggleDescription: {
//         color: "#a1a1aa",
//         fontSize: 12,
//         marginTop: 2,
//     },
//     switch: {
//         width: 44,
//         height: 24,
//         borderRadius: 12,
//         backgroundColor: "#3f3f46",
//         padding: 2,
//         justifyContent: "center",
//     },
//     switchActive: {
//         backgroundColor: "#facc15",
//     },
//     switchThumb: {
//         width: 20,
//         height: 20,
//         borderRadius: 10,
//         backgroundColor: "#fff",
//         alignSelf: "flex-start",
//     },
//     switchThumbActive: {
//         alignSelf: "flex-end",
//     },
// });
import { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Switch,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Copy, RefreshCw, Check, Settings2 } from "lucide-react-native";

import type { GeneratorSettings } from "@/features/password-manager/types/passwordTypes";
import { calculateStrengthPassWord } from "@/features/password-manager/utils/StrengthPassword";
import { handleCopy } from "@/features/password-manager/utils/HandleCopy";
import { usePasswordGenerator } from "@/features/password-manager/utils/GeneratePassword";

import { useToast } from "@/components/Toast";
import * as Clipboard from "expo-clipboard";

export default function PasswordGenerator() {

    const { showToast } = useToast();
    const { generatePassword, setSettings, settings } = usePasswordGenerator();
    const [password, setPassword] = useState("");
    const [copied, setCopied] = useState(false);

    const strength = calculateStrengthPassWord(password, settings);

    const updateSetting = (
        key: keyof GeneratorSettings,
        value: number | boolean
    ) => {
        setSettings((prev: GeneratorSettings) => ({
            ...prev,
            [key]: value,
        }));
    };

    function initialization() {
        const newPassword = generatePassword();
        setPassword(newPassword);
        setCopied(false);
    }

    useEffect(() => {
        initialization();
    }, [settings]);

    const getStrengthColor = () => {
        if (strength.percent <= 25) return "#ef4444";
        if (strength.percent <= 50) return "#eab308";
        if (strength.percent <= 75) return "#22c55e";
        return "#10b981";
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* PASSWORD CARD */}
            <View style={styles.card}>
                <Text style={styles.passwordText}>{password}</Text>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.outlineButton} onPress={initialization}>
                        <RefreshCw size={16} color="#fff" />
                        <Text style={styles.outlineText}> Gerar Nova</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={async () => {
                            await Clipboard.setStringAsync(password);
                            showToast({
                                message: "Senha copiada para a área de transferência",
                                type: 'success',
                                duration: 4000,
                            });
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                        }}
                    >
                        {copied ? (
                            <>
                                <Check size={16} color="#000" />
                                <Text style={styles.primaryText}> Copiado!</Text>
                            </>
                        ) : (
                            <>
                                <Copy size={16} color="#000" />
                                <Text style={styles.primaryText}> Copiar</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                {/* STRENGTH */}
                <View style={styles.strengthContainer}>
                    <View style={styles.strengthHeader}>
                        <Text style={styles.muted}>Força da senha</Text>
                        <View style={styles.row}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{strength.bits} bits</Text>
                            </View>
                            <Text style={{ color: getStrengthColor() }}>
                                {strength.label}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.strengthBar}>
                        <View
                            style={[
                                styles.strengthProgress,
                                {
                                    width: `${strength.percent}%`,
                                    backgroundColor: getStrengthColor(),
                                },
                            ]}
                        />
                    </View>
                </View>
            </View>

            {/* SETTINGS CARD */}
            <View style={styles.card}>
                <View style={styles.settingsHeader}>
                    <Settings2 size={18} color="#fff" />
                    <Text style={styles.title}> Configurações</Text>
                </View>

                {/* LENGTH */}
                <View style={styles.section}>
                    <View style={styles.spaceBetween}>
                        <Text style={styles.label}>Comprimento</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{settings.length}</Text>
                        </View>
                    </View>

                    <Slider
                        value={settings.length}
                        onValueChange={(v) => updateSetting("length", Math.round(v))}
                        minimumValue={20}
                        maximumValue={200}
                        step={1}
                        minimumTrackTintColor="#facc15"
                        maximumTrackTintColor="#3f3f46"
                        thumbTintColor="#facc15"
                    />

                    <View style={styles.spaceBetween}>
                        <Text style={styles.mutedSmall}>20</Text>
                        <Text style={styles.mutedSmall}>200</Text>
                    </View>
                </View>

                {/* SWITCH OPTIONS */}
                {[
                    ["uppercase", "Maiúsculas", "A-Z"],
                    ["lowercase", "Minúsculas", "a-z"],
                    ["numbers", "Números", "0-9"],
                    ["symbols", "Símbolos", "!@#$%..."],
                ].map(([key, label, desc]) => (
                    <View key={key} style={styles.switchRow}>
                        <View>
                            <Text style={styles.label}>{label}</Text>
                            <Text style={styles.mutedSmall}>{desc}</Text>
                        </View>
                        <Switch
                            value={settings[key as keyof GeneratorSettings] as boolean}
                            onValueChange={(v) =>
                                updateSetting(key as keyof GeneratorSettings, v)
                            }
                        />
                    </View>
                ))}

                <View style={styles.switchRow}>
                    <View>
                        <Text style={styles.label}>Excluir ambíguos</Text>
                        <Text style={styles.mutedSmall}>l, 1, O, 0</Text>
                    </View>
                    <Switch
                        value={settings.excludeAmbiguous}
                        onValueChange={(v) =>
                            updateSetting("excludeAmbiguous", v)
                        }
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0f0f11" },
    content: { padding: 20 },
    card: {
        backgroundColor: "#18181b",
        padding: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    passwordText: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    outlineButton: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#3f3f46",
        padding: 10,
        borderRadius: 8,
        marginRight: 10,
    },
    outlineText: { color: "#fff" },
    primaryButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#facc15",
        padding: 10,
        borderRadius: 8,
    },
    primaryText: { color: "#000" },
    strengthContainer: { marginTop: 10 },
    strengthHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    strengthBar: {
        height: 10,
        backgroundColor: "#27272a",
        borderRadius: 10,
        overflow: "hidden",
    },
    strengthProgress: { height: "100%" },
    badge: {
        backgroundColor: "#27272a",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginRight: 6,
    },
    badgeText: { color: "#fff", fontSize: 12 },
    muted: { color: "#a1a1aa" },
    mutedSmall: { color: "#a1a1aa", fontSize: 12 },
    row: { flexDirection: "row", alignItems: "center" },
    settingsHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    title: { color: "#fff", fontSize: 18, fontWeight: "600" },
    section: { marginBottom: 20 },
    label: { color: "#fff", fontWeight: "500" },
    spaceBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
});
