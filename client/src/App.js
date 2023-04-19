import Heatmap from "./components/Heatmap";
import styles from "./index.css"

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">Philly Insights</h1>
        A data-driven look at the City of Brotherly Love
      </header>
      <Heatmap />
    </div>
  );
}
