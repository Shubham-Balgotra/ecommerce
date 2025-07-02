import { Routes, Route } from "react-router-dom";
import "./App.css";

import CustomerRouters from "./Routes/CustomerRouter";
import AdminRouter from "./Routes/AdminRouter";
function App() {
  return (
    <>
      {/*For Admin Routes */}
      {/*For Customer Routes */}
      <Routes>
        <Route path="/*" element={<CustomerRouters />}></Route>
        <Route path="/admin/*" element={<AdminRouter/>}></Route>
      </Routes>
    </>
  );
}

export default App;
