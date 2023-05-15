import { NavigationContainer } from "@react-navigation/native";
import MainStackScreen from "./navigation/MainStackScreen";
import { TodoProvider } from "./Todo.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <TodoProvider>
        <NavigationContainer>
          <MainStackScreen />
        </NavigationContainer>
      </TodoProvider>
    </GestureHandlerRootView>
  );
}
