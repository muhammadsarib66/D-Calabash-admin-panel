import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './feature/slicer/store.ts';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
    </ThemeProvider>
)
