import React from "react";
/* import Feed from "./src/pages/Feed"; */
import { Routes } from "./router";
import { UserContext } from "./src/context";

export default App = () => {
  React.useEffect(() => {
    async function getUpdate() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          alert("Você tem uma nova atualização");
          await Updates.fetchUpdateAsync();
          // ... notify user of update ...
          await Updates.reloadAsync();
        }
      } catch (e) {
        /* alert("Não foi possivel atualizar seu aplicativo"); */
      }
    }

    getUpdate();
  }, []);

  return (
    <UserContext>
      <Routes />
    </UserContext>
  );
};
