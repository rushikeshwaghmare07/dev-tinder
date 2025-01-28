import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Feed from "./components/Feed";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/"> 
          <Routes>
            <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
