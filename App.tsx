import { NavigationContainer } from "@react-navigation/native";
import MainStackScreen from "./navigation/MainStackScreen";
import { TodoProvider } from "./Todo.context";

export default function App() {
  return (
    <TodoProvider>
      <NavigationContainer>
        <MainStackScreen />
      </NavigationContainer>
    </TodoProvider>
  );
}
