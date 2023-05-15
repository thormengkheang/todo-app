import React from "react";
import { useTodo } from "../Todo.context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { MainStackParamList } from "../navigation/MainStackScreen";
import Form from "../components/Form";

export default function EditTodoScreen() {
  const navigation = useNavigation();
  const { todos, updateTodo } = useTodo();
  const route = useRoute<RouteProp<MainStackParamList, "EditTodo">>();
  const id = route.params.id;
  const editedTodo = todos.find((todo) => todo.id === id);

  function onSubmit(updatedTodo) {
    updateTodo(updatedTodo);
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return <Form data={editedTodo} submitLabel="Save" onSubmit={onSubmit} />;
}
