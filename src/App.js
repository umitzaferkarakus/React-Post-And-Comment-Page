import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail"

function App() {
  return (
    <div>
      <Router>
        <div className="main_container">
          <header></header>
          <div className="ui raised very padded text container segment">
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}



export default App;
