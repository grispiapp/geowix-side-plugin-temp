import { GrispiProvider } from "./contexts/grispi-context";
import { StoreProvider } from "./contexts/store-context";
import { ScreenManager } from "./screens/screen-manager";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <StoreProvider>
      <GrispiProvider>
        <ScreenManager />
      </GrispiProvider>
      <Toaster />
    </StoreProvider>
  );
};

export default App;
