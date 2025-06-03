import styled from "styled-components";
import SolBrand from "../components/SolBrand";
import { Link } from "react-router-dom";

const PageContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #aa4dc8;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 2rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  text-decoration: none;
  color: #d35ca3;
  font-weight: bold;
`;

export default function PuzzleMapGame() {
  return (
    <PageContainer>
      <SolBrand />
      <Title>🧩 SOL's Puzzle Map</Title>
      <Description>Coming soon: Rearrange the pieces to reveal where Sol has been!</Description>
      <BackLink to="/games">← Back to games</BackLink>
    </PageContainer>
  );
}
