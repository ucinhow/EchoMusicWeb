import Page from "./pages";
import { GlobalProvider, Player, Aside } from "./features";
import { Toast } from "./common/components";

function App() {
  return (
    <GlobalProvider>
      <Page />
      <Player />
      <Toast />
      <Aside />
    </GlobalProvider>
  );
}

export default App;
