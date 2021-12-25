import { AppProvider } from "./context";
import Snake from "./components/Snake";
import Food from "./components/Food";
import PlayingField from "./components/PlayingField";
import Controllers from "./components/Controllers";
import { GiSnakeTongue } from "react-icons/gi";

function App() {
  return (
    <AppProvider>
      <main className="main">
        <div className="heading">
          <h1 className="title">SNAKE</h1>
          <GiSnakeTongue className="logo" />
        </div>
        <PlayingField />
        <Food />
        <Snake />
        <Controllers />
      </main>
    </AppProvider>
  );
}

export default App;
