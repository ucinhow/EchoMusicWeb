import Page from "./pages";
import { GlobalProvider, Player, Aside } from "./features";
import { Toast } from "./common/components";
import { useIsMobile } from "./common/hooks";
import { useEffect } from "react";
function App() {
  const isMobile = useIsMobile();
  useEffect(() => {
    if (isMobile) alert("本网站为PC网站，请用电脑进行正常体验");
  }, [isMobile]);
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
