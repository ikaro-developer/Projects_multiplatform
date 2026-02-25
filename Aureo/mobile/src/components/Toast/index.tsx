import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
const { width } = Dimensions.get('window');

type ToastType =
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'default'
  | 'dark'
  | 'light';

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
  icon?: React.ReactNode;
  showIcon?: boolean;
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextProps {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextProps>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

const MAX_VISIBLE = 3;
const MAX_QUEUE = 10;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    ({
      message,
      type = 'info',
      duration = 3000,
      icon,
      showIcon = true,
    }: ToastOptions) => {
      const id = Date.now().toString();

      setToasts((prev) => {
        const updated = [
          ...prev,
          { id, message, type, duration, icon, showIcon },
        ];
        return updated.slice(-MAX_QUEUE);
      });

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <View style={styles.container}>
        {toasts.map((toast, index) => {
          const reverseIndex = toasts.length - 1 - index;
          if (reverseIndex >= MAX_VISIBLE) return null;

          return (
            <Toast
              key={toast.id}
              toast={toast}
              stackIndex={reverseIndex}
            />
          );
        })}
      </View>
    </ToastContext.Provider>
  );
};

const getDefaultIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return <Feather name="check-circle" size={18} color="#fff" />;
    case 'error':
      return <Feather name="x-circle" size={18} color="#fff" />;
    case 'warning':
      return <Feather name="alert-triangle" size={18} color="#fff" />;
    case 'info':
      return <Feather name="info" size={18} color="#fff" />;
    case 'dark':
      return <Feather name="moon" size={18} color="#fff" />;
    case 'light':
      return <Feather name="sun" size={18} color="#111" />;
    default:
      return null;
  }
};

const Toast: React.FC<{
  toast: ToastItem;
  stackIndex: number;
}> = ({ toast, stackIndex }) => {
  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(width)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 0,
        duration: toast.duration || 3000,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const scale = 1 - stackIndex * 0.06;
  const extraOffset = stackIndex * 12;
  const fade = 1 - stackIndex * 0.2;

  const iconToRender =
    toast.showIcon === false
      ? null
      : toast.icon
      ? toast.icon
      : getDefaultIcon(toast.type || 'default');

  return (
    <Animated.View
      style={[
        styles.toast,
        styles[toast.type || 'default'],
        {
          bottom: 40 + extraOffset,
          transform: [{ translateY }, { scale }],
          opacity: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, fade],
          }),
          zIndex: 100 - stackIndex,
        },
      ]}
    >
      <View style={styles.row}>
        {iconToRender && (
          <View style={styles.iconContainer}>
            {iconToRender}
          </View>
        )}

        <Text
          style={[
            styles.text,
            toast.type === 'light' && { color: '#111' },
          ]}
        >
          {toast.message}
        </Text>
      </View>

      <Animated.View
        style={[
          styles.progressBar,
          {
            width: progress,
            backgroundColor:
              toast.type === 'light'
                ? 'rgba(0,0,0,0.2)'
                : 'rgba(255,255,255,0.4)',
          },
        ]}
      />
    </Animated.View>
  );
};
