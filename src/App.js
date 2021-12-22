import { AppProvider } from "./context";
import Snake from "./components/Snake";
import Food from "./components/Food";
import PlayingField from "./components/PlayingField";
import Controllers from "./components/Controllers";

function App() {
  return (
    <AppProvider>
      <main className="main">
        <PlayingField />
        <Food />
        <Snake />
        <Controllers />
      </main>
    </AppProvider>
  );
}

export default App;
