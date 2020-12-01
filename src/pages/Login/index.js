import React from "react";
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { TextInput, Button, Card, Snackbar } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from "./styled";

import { Context } from "../../context";

import logo from "./../../../assets/instagram.png";
import { api } from "../../services/api";

export const Login = () => {
  const {
    loading,
    setLoading,
    isLogin,
    setIsLogin,
    setUsuario,
  } = React.useContext(Context);
  const navigation = useNavigation();

  const [login, setLogin] = React.useState({
    email: "",
    password: "",
  });

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  async function onLogin() {
    const response = await api.get("/user");

    let user = response.data.find((user) => user.email === `${login.email}`);
    let password = response.data.find(
      (user) => user.password === `${login.password}`
    );

    console.log(user);

    if (user && password) {
      console.log("pode logar ");
      setIsLogin(true);
      setUsuario({ ...login, ...user });
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      console.log("não pode logar");
      console.log(loading);
      setIsLogin(false);
      onToggleSnackBar();
      setLoading(false);
    }
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
            <Image style={{ width: 200, height: 58 }} source={logo} />

            <Title>Faça seu logon</Title>

            <TextInput
              label="Usuário"
              style={{ width: "100%" }}
              onChangeText={(text) => setLogin({ ...login, email: text })}
            />
            <TextInput
              label="Senha"
              style={{ width: "100%" }}
              onChangeText={(text) => setLogin({ ...login, password: text })}
            />

            <Button colo="#fff" onPress={() => onLogin()}>
              Entrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Undo",
          onPress: () => {
            // Do something
          },
        }}
      >
        Algo aconteceu.
      </Snackbar>

      <CreateAccountButton onPress={() => navigation.navigate("SignUp")}>
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};
