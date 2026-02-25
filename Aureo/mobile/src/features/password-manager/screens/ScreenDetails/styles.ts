import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff"
    },
    header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
    backButton: { flexDirection: "row", alignItems: "center" },
    backText: { marginLeft: 4 },
    headerActions: { flexDirection: "row", gap: 8 },
    editButton: { flexDirection: "row", alignItems: "center", padding: 8, borderWidth: 1, borderColor: "#000", borderRadius: 8 },
    deleteButton: { flexDirection: "row", alignItems: "center", padding: 8, backgroundColor: "#ef4444", borderRadius: 8 },
    card: { padding: 16, marginBottom: 16, borderRadius: 12, backgroundColor: "#f3f4f6" },
    mainInfo: { flexDirection: "row", alignItems: "center" },
    iconContainer: { width: 80, height: 80, borderRadius: 24, backgroundColor: "#e5e7eb", justifyContent: "center", alignItems: "center", marginRight: 16 },
    favicon: { width: 48, height: 48 },
    title: { fontSize: 20, fontWeight: "bold" },
    urlText: { color: "#3b82f6", marginTop: 4 },
    cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
    field: { marginBottom: 12 },
    label: { fontSize: 14, marginBottom: 4 },
    fieldRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    code: { flex: 1, backgroundColor: "#e5e7eb", padding: 8, borderRadius: 8, fontFamily: "monospace" },
    strengthRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    strengthLabel: { fontWeight: "bold" },
    strengthBar: { height: 8, backgroundColor: "#e5e7eb", borderRadius: 4, overflow: "hidden", marginTop: 4 },
    strengthFill: { height: "100%" },
    detailsRow: { flexDirection: "row", justifyContent: "space-between" },
});
