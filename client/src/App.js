import styles from "./index.css" // needed for tailwindcss
import Heatmap from "./components/Heatmap";
import Navbar from "./components/Navbar";
import HomePage from './pages/HomePage';
import BlocksPage from './pages/BlocksPage';
import PropertyPage from './pages/PropertyPage';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from "@mui/material/styles";
import blue from '@mui/material/colors/blue';


export const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    }
  },
});

export default function App() {
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/blocks" element={<BlocksPage />} />
          <Route path="/property" element={<PropertyPage />} />
        </Routes>
        </BrowserRouter>
        </ThemeProvider>
    </div>
  );
}
