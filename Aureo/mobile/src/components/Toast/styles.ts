import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get('window');
export default StyleSheet.create({
 container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  toast: {
    position: 'absolute',
    width: width - 32,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 25,
    elevation: 15,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
  },

  success: { backgroundColor: '#16a34a' },
  error: { backgroundColor: '#dc2626' },
  info: { backgroundColor: '#2563eb' },
  warning: { backgroundColor: '#f59e0b' },
  default: { backgroundColor: '#334155' },
  dark: { backgroundColor: '#0f172a' },
  light: { backgroundColor: '#f1f5f9' },
});
