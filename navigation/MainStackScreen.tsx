import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TodoListScreen from "../screens/TodoListScreen";
import AddTodoScreen from "../screens/AddTodoScreen";
import EditTodoScreen from "../screens/EditTodoScreen";

export type MainStackParamList = {
  Todo: undefined;
  AddTodo?: { title: string };
  EditTodo: { id: number };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

function MainStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Todo" component={TodoListScreen} />
      <Stack.Screen
        name="AddTodo"
        component={AddTodoScreen}
        options={{ title: "Add Todo" }}
      />
      <Stack.Screen
        name="EditTodo"
        component={EditTodoScreen}
        options={{ title: "Edit Todo" }}
      />
    </Stack.Navigator>
  );
}

export default MainStackScreen;
