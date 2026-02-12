import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#4f46e5",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 8,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: "#4f46e5",
  },
  tabText: {
    color: "#000",
  },
  emptyState: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  emptySubtitle: {
    color: "#666",
    marginTop: 4,
  },
});
