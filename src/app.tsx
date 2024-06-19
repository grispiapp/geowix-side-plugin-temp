import { GrispiProvider } from "./contexts/grispi-context";
import { StoreProvider } from "./contexts/store-context";
import { ScreenManager } from "./screens/screen-manager";

const App = () => {
  return (
    <StoreProvider>
      <GrispiProvider>
        <ScreenManager />
      </GrispiProvider>
    </StoreProvider>
  );
};

export default App;
