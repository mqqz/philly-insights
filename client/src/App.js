import styles from "./index.css" // needed for tailwindcss
import Heatmap from "./components/Heatmap";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
      A data-driven look at the City of Brotherly Love
      </header>
      <Heatmap />
    </div>
  );
}
