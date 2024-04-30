import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNav from "./components/MyNav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ArticleDetail from "./components/ArticleDetail";
import AddArticle from "./components/AddArticle";

function App() {
  return (
    <BrowserRouter>
      <div>
        <MyNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/add-article" element={<AddArticle />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
