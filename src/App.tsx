import { useState } from "react";
import MiniDrawer from "./components/MiniDrawer";
import Login from "./screens/Login";

function App() {
  const [isLogin, setLogin] = useState(false);

  return <>{isLogin ? <MiniDrawer /> : <Login setLogin={setLogin} />}</>;
}

export default App;
