import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import  TaskProvider  from "./context/TaskContext";
import Homepage from "./components/Homepage";
import CompletedTasks from "./components/CompletedTasks";

/* crea router con due pagine */
const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/completed", element: <CompletedTasks /> },
]);

/* definizione del componente App che usa TaskProvider per la gestione dello stato del task
   mentre RouterProvider permette la navigazione tra le pagine */
function App() {
  return (
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  );
};

export default App;

