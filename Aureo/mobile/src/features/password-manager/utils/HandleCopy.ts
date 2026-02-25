import { useToast } from "@/components/Toast";
import * as Clipboard from "expo-clipboard";


async function handleCopy(text: string, label: string, timer: number = 4000) {
  const { showToast } = useToast();

  await Clipboard.setStringAsync(text);
  showToast({
    message: `${label} copiada para a área de transferência`,
    type: 'success',
    duration: timer,
  });
}

export { handleCopy };