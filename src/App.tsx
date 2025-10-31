import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { RoutePrefetcher } from "./components/utils/RoutePrefetcher";
import { Top } from "./components/layout/Top";
import { PageWrapper, ContentWrapper } from "./App.styles";

function App() {
  return (
    <PageWrapper>
      <Top />
      <ContentWrapper>
        <RoutePrefetcher />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default App;
