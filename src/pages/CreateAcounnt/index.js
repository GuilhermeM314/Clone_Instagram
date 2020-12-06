import React from "react";
import * as Facebook from "expo-facebook";
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { Context } from "../../context";

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

import logo from "./../../../assets/instagram.png";
import { api } from "../../services/api";

export const CreateAcounnt = () => {
  const { loading, setLoading, isLogin, setIsLogin } = React.useContext(
    Context
  );

  const [newUser, setNewUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const navigation = useNavigation();

  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: `415847546111397`,
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );

        console.log(await response.json());
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error =>: ${message}`);
    }
  }

  async function getUserAsync() {
    const { name } = await requestAsync("me");
    console.log(`Hello ${name} 👋`);
  }

  async function createAcount() {
    const response = await api.post("/user", {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    });
    onToggleSnackBar();
    navigation.navigate("SignUp");
    return response;
  }

  // Request data from the Facebook Graph API.
  // Learn more https://developers.facebook.com/docs/graph-api/using-graph-api/
  async function requestAsync(path, token) {
    let resolvedToken = token;
    if (!token) {
      const auth = await Facebook.getAuthenticationCredentialAsync();
      if (!auth) {
        throw new Error(
          "User is not authenticated. Ensure `logInWithReadPermissionsAsync` has successfully resolved before attempting to use the FBSDK Graph API."
        );
      }
      resolvedToken = auth.token;
    }
    const response = await fetch(
      `https://graph.facebook.com/${path}?fields=birthday,email,address,name&access_token=${encodeURIComponent(
        resolvedToken
      )}`
    );
    const body = await response.json();
    console.log(body);
    return body;
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

            <Title>Crie sua Conta</Title>

            <TextInput
              label="Nome"
              style={{ width: "100%" }}
              onChangeText={(text) => setNewUser({ ...newUser, name: text })}
            />
            <TextInput
              label="Email"
              style={{ width: "100%" }}
              onChangeText={(text) => setNewUser({ ...newUser, email: text })}
            />
            <TextInput
              label="Senha"
              style={{ width: "100%" }}
              onChangeText={(text) =>
                setNewUser({ ...newUser, password: text })
              }
            />

            <Button colo="#fff" onPress={() => createAcount()}>
              Cadastrar
            </Button>
            <Button colo="#fff" onPress={() => logIn()}>
              Facebook
            </Button>
            <Button colo="#fff" onPress={() => getUserAsync()}>
              Facebook User
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
        Hey there! I'm a Snackbar.
      </Snackbar>

      <CreateAccountButton onPress={() => navigation.navigate("SignIn")}>
        <CreateAccountButtonText>Já tenho uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};
