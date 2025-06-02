import { useEffect, useState } from "react";
import styled from "styled-components";
import SolBrand from "../components/SolBrand";

const PageContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  min-height: 100vh;
  font-family: "Poppins", sans-serif;

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #aa4dc8;
  margin-bottom: 2rem;
  text-align: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: #ffffffee;
  border-radius: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

const ProductName = styled.h2`
  font-size: 1.25rem;
  color: #d47eb4;
`;

const ProductFlavor = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  font-size: 0.95rem;
  color: #444;
`;

const StatusLabel = styled.span`
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  border-radius: 999px;
  background-color: ${(props) =>
    props.status === "coming_soon"
      ? "#ffe0b2"
      : props.status === "available"
      ? "#c8e6c9"
      : "#ef9a9a"};
  color: #333;
`;

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const lang = localStorage.getItem("language") || "en";
    setLanguage(lang);
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <PageContainer>
      <div style={{ textAlign: "center" }}>
        <SolBrand size="2.5rem" />
      </div>
      <Title>
        {language === "en" ? "SOLicious Delights" : "Νόστιμες Επιλογές SOL"}
      </Title>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.nameEN} />
            <ProductName>
              {language === "en" ? product.nameEN : product.nameGR}
            </ProductName>
            <ProductFlavor>
              {language === "en" ? product.flavor.en : product.flavor.gr}
            </ProductFlavor>
            <ProductDescription>
              {language === "en"
                ? product.description.en
                : product.description.gr}
            </ProductDescription>
            <StatusLabel status={product.status}>
              {product.status === "coming_soon"
                ? language === "en"
                  ? "Coming Soon"
                  : "Σύντομα διαθέσιμο"
                : product.status === "available"
                ? language === "en"
                  ? "Available"
                  : "Διαθέσιμο"
                : language === "en"
                ? "Sold Out"
                : "Εξαντλήθηκε"}
            </StatusLabel>
          </ProductCard>
        ))}
      </ProductGrid>
    </PageContainer>
  );
}
