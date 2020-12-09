import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { api } from "../../services/api";
import { AntDesign } from "@expo/vector-icons";

export default function Like({ like }) {
  const [likes, setLikes] = React.useState();
  const [deuLike, setDeuLike] = React.useState(false);

  React.useEffect(() => {
    getComment();
  }, []);

  async function getComment() {
    const response = await api.get(`/likes/${like}`);
    setLikes(response.data);
  }

  async function putLike(l) {
    const response = await api.put(`/likes/${like}`, {
      curtida: deuLike ? l - 1 : l + 1,
    });
    setTimeout(() => {
      getComment();
    }, 400);
    return response;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        setDeuLike(!deuLike);
        putLike(likes?.curtida);
        console.log(deuLike);
      }}
      style={{ marginTop: 10, marginLeft: 10 }}
    >
      <AntDesign
        name="heart"
        size={30}
        color={deuLike ? "red" : "black"}
        style={{ padding: 10 }}
      />
      <Text style={{ fontSize: 12, marginLeft: 10 }}>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Likes</Text>{" "}
        {likes?.curtida}
      </Text>
    </TouchableOpacity>
  );
}
