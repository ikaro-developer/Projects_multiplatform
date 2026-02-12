import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    overflow: "hidden",
  },
  strengthBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  weak: {
    backgroundColor: "#dc2626",
  },
  medium: {
    backgroundColor: "#f59e0b",
  },
  content: {
    flexDirection: "row",
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  favicon: {
    width: 32,
    height: 32,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  username: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  passwordPreview: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontFamily: "monospace",
  },
  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  badgeWeak: {
    backgroundColor: "#dc2626",
  },
  badgeMedium: {
    backgroundColor: "#f59e0b",
  },
  badgeStrong: {
    backgroundColor: "#16a34a",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
});
