import React from "react";
import { Text } from "react-native";
import { api } from "../../services/api";
import { AntDesign } from "@expo/vector-icons";

export default function Like({ like }) {
  const [likes, setLikes] = React.useState();

  React.useEffect(() => {
    getComment();
  }, []);

  async function getComment() {
    const response = await api.get(`/likes/${like}`);
    setLikes(response.data);
  }

  async function putLike(l) {
    const response = await api.put(`/likes/${like}`, {
      curtida: Number(l) + 1,
    });
    setTimeout(() => {
      getComment();
    }, 400);
    return response;
  }
  return (
    <>
      <AntDesign
        onPress={() => {
          putLike(likes?.curtida);
        }}
        style={{ marginTop: 10, marginLeft: 10 }}
      >
        <AntDesign
          name="heart"
          size={30}
          style={{ padding: 10 }}
          onPress={() => console.log("aaaaa")}
        />
        <Text style={{ fontSize: 20, marginLeft: 10 }}>{likes?.curtida}</Text>
      </AntDesign>
    </>
  );
}
