import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { RoutePrefetcher } from "./components/utils/RoutePrefetcher";
import { Top } from "./components/layout/Top";

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.01);

  @media (prefers-color-scheme: dark) {
    background-color: rgba(255, 255, 255, 0.02);
  }
`;

const ContentWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 3.5rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

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
