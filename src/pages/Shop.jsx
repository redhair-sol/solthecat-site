// src/pages/Shop.jsx

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useLanguage } from "../context/LanguageContext.jsx";

const PageContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  text-align: center;

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 2rem;
  font-family: "Poppins", sans-serif;
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
  margin-bottom: 0.5rem;
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
  const { language } = useLanguage();

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  return (
    <>
      <Helmet>
        <title>{language === "en" ? "SOLicious Delights – SolTheCat" : "Επιλογές SOL – SolTheCat"}</title>
        <link rel="canonical" href="https://solthecat.com/shop" />
      </Helmet>

      <PageContainer>
        <h1
          style={{
            fontSize: "2rem",
            color: "#6a1b9a",
            marginBottom: "0.5rem",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
          }}
        >
          {language === "en" ? "Sol’s Shop" : "Το Κατάστημα της Sol"}
        </h1>

        <Subtitle>
          {language === "en"
            ? "Every feline deserves treats"
            : "Κάθε γάτα αξίζει λιχουδιές"}
        </Subtitle>

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
    </>
  );
} 
