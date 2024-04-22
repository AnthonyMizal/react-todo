import React from "react";
import "./css/App.css";
import { Todo } from "./Todo";
import { Toaster } from "sonner";
function App() {
  return (
    <div className="App">
      <Toaster richColors />
      <Todo />
    </div>
  );
}

export default App;
