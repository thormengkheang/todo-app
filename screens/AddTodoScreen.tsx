import React from "react";
import { useTodo } from "../Todo.context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Form from "../components/Form";
import { Todo } from "../types";
import { MainStackParamList } from "../navigation/MainStackScreen";

function AddTodoScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<MainStackParamList, "AddTodo">>();
  const title = route.params?.title;
  const { addTodo } = useTodo();

  function onSubmit(newTodo: Todo) {
    addTodo(newTodo);
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return <Form data={{ title }} submitLabel="Add Todo" onSubmit={onSubmit} />;
}

export default AddTodoScreen;
