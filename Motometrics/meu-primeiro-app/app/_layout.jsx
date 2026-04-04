import { Stack } from "expo-router";
import { MotoProvider } from "./MotoContext"; 

export default function Layout() {
  return (
    <MotoProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </MotoProvider>
  );
}
