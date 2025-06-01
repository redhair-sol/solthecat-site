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

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const zoneResp = await fetch("https://api.cloudflare.com/client/v4/zones", {
          headers: {
            Authorization: "Bearer _4qyq9Kr8yLsGdle_yFD3P6U3NY_RanN9wUO_uKn",
          },
        });

        const zoneData = await zoneResp.json();
        const solZone = zoneData.result.find((z) => z.name === "solthecat.com");

        if (solZone) {
          const analyticsResp = await fetch(
            `https://api.cloudflare.com/client/v4/zones/${solZone.id}/analytics/dashboard?since=-7d&continuous=true`,
            {
              headers: {
                Authorization: "Bearer _4qyq9Kr8yLsGdle_yFD3P6U3NY_RanN9wUO_uKn",
              },
            }
          );

          const analyticsData = await analyticsResp.json();
          const views = analyticsData.result.totals.uniques || 0;
          setTotalViews(views);
        }
      } catch (error) {
        console.error("Cloudflare API error:", error);
      }
    };

    fetchViews();
  }, []);

  return (
    <PageContainer>
      <Title>📈 SOL Website Dashboard</Title>
      <Stat>
        🔹 Views (last 7 days):{" "}
        <strong>{totalViews !== null ? totalViews : "Loading..."}</strong>
      </Stat>
      <Stat style={{ marginTop: "2rem", fontStyle: "italic" }}>
        Real-time data from Cloudflare API. Private access only.
      </Stat>
    </PageContainer>
  );
}
