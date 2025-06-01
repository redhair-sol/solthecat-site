import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #aa4dc8;
  margin-bottom: 1rem;
`;

const Stat = styled.div`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

export default function Dashboard() {
  const navigate = useNavigate();
  const [totalViews, setTotalViews] = useState(null);

  useEffect(() => {
    const allowed = window.location.hash === "#solonly";
    if (!allowed) {
      navigate("/");
    }
  }, [navigate]);

  // 🔐 Token and API access removed from public code
  useEffect(() => {
    // Cloudflare API call removed for security
    // You can fetch this privately from your Cloudflare dashboard
    setTotalViews("Access disabled");
  }, []);

  return (
    <PageContainer>
      <Title>📈 SOL Website Dashboard</Title>
      <Stat>
        🔹 Views (last 7 days): <strong>{totalViews}</strong>
      </Stat>
      <Stat style={{ marginTop: "2rem", fontStyle: "italic" }}>
        Data fetching is disabled in public build for security reasons.
      </Stat>
    </PageContainer>
  );
}
