import React from "react";
import { View, KeyboardAvoidingView, ScrollView } from "react-native";
import {
  Text,
  Avatar,
  Card,
  IconButton,
  Paragraph,
  Title,
  Button,
  TextInput,
} from "react-native-paper";
import { api } from "../../services/api";
import { Context } from "../../context";

import { Container } from "./styled";

export const Comments = ({ route, navigation }) => {
  const {
    loading,
    setLoading,
    isLogin,
    setIsLogin,
    setUsuario,
    usuario,
  } = React.useContext(Context);

  const [comments, setComments] = React.useState([]);
  const [comentario, setComentario] = React.useState("");
  const { itemId, otherParam } = route.params;
  React.useEffect(() => {
    getComments();
  }, []);

  async function getComments() {
    const response = await api.get(`/feeds/${itemId}/comments`);
    setComments(response.data);
  }

  async function Comment() {
    console.log(usuario);
    const response = await api.post(`/feeds/${itemId}/comments`, {
      name: usuario?.name,
      comment: comentario,
    });

    return response;
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            {comments.map((item) => {
              console.log(item);
              return (
                <Card.Content>
                  <Title>{item.name}</Title>
                  <Paragraph>{item.comment}</Paragraph>
                </Card.Content>
              );
            })}
            <TextInput
              style={{ width: "100%" }}
              onChangeText={(text) => {
                console.log(text);
                setComentario(text);
              }}
            />
            <Button
              onPress={() => {
                Comment();
                getComments();
              }}
            >
              Comentar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
