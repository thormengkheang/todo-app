import { NavigationContainer } from "@react-navigation/native";
import MainStackScreen from "./navigation/MainStackScreen";
import { TodoProvider } from "./Todo.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Linking from "expo-linking";
import { Text } from "react-native";

const prefix = Linking.createURL("/");

export default function App() {
  const linking = {
    prefixes: [prefix, 'nham24app://'],
    config: {
      screens: {
        AddTodo: "todo/add/:title?",
        EditTodo: "todo/edit/:id",
      },
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TodoProvider>
        <NavigationContainer
          linking={linking}
          fallback={<Text>Loading...</Text>}
        >
          <MainStackScreen />
        </NavigationContainer>
      </TodoProvider>
    </GestureHandlerRootView>
  );
}
