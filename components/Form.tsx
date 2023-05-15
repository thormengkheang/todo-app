import React, { useState } from "react";
import { Todo } from "../types";
import { TextInput, View, StyleSheet, Text, Button, Alert } from "react-native";
import Checkbox from "expo-checkbox";

interface Props {
  data?: Todo;
  submitLabel: string;
  onSubmit: (todo: Todo) => void;
}

function generateRandomId() {
  return Math.floor(Math.random() * 10000);
}

export default function Form(props: Props) {
  const { data, submitLabel, onSubmit } = props;
  const [formData, setFormData] = useState<Todo>(data);

  function handleOnSubmit() {
    if (!formData?.title) {
      Alert.alert("Title is required");
      return;
    }
    if (data?.id) {
      onSubmit(formData);
    } else {
      onSubmit({ id: generateRandomId(), ...formData });
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.titleInput}
        value={formData?.title}
        onChangeText={(t) => {
          setFormData({ ...formData, title: t });
        }}
        autoFocus
      />
      <TextInput
        placeholder="Description"
        style={styles.descriptionInput}
        multiline
        numberOfLines={10}
        value={formData?.description}
        onChangeText={(t) => setFormData({ ...formData, description: t })}
      />
      <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: 10 }}>
        <Checkbox
          value={formData?.done}
          onValueChange={(v) => setFormData({ ...formData, done: v })}
        />
        <Text style={{ paddingLeft: 10 }}>Done</Text>
      </View>
      <Button title={submitLabel} onPress={handleOnSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  titleInput: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
  descriptionInput: {
    backgroundColor: "#FFFFFF",
    marginVertical: 10,
    padding: 10,
    height: 200,
    textAlignVertical: "top",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
});
