import React from "react";
import App from "./components/App.jsx";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
// ReacDom.render(

//     <App />


//     , document.getElementById("root"));
