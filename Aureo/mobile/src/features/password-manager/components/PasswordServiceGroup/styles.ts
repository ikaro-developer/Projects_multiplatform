import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    flex: 1,
  },
  rightContent: {
    alignItems: "flex-end",
    gap: 6,
  },
  favicon: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  fallbackIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "600",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
  },
  usernameText: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  warningBadge: {
    backgroundColor: "#fee2e2",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  warningText: {
    fontSize: 12,
    color: "#b91c1c",
  },
  collapsibleContent: {
    marginTop: 12,
    gap: 8,
  },
});
