import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import SolBrand from "../components/SolBrand";
import episodes from "../data/episodes.json";
import dressAssets from "../data/dressAssets.json";

const PageContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #aa4dc8;
  text-align: center;
`;

const Selector = styled.select`
  margin: 1rem auto;
  display: block;
  padding: 0.5rem;
  font-size: 1rem;
`;

const Canvas = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 2rem auto;
`;

const SolImage = styled.img`
  width: 100%;
  height: auto;
`;

const Accessory = styled.img`
  position: absolute;
  width: 80px;
  cursor: grab;
  z-index: 2;
`;

export default function DressTheQueen() {
  const [city, setCity] = useState("");
  const [accessories, setAccessories] = useState([]);
  const [positions, setPositions] = useState({});
  const dragItem = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  const availableCities = episodes.filter((e) => e.visible).map((e) => e.city);

  useEffect(() => {
    if (city) {
      const assets = dressAssets[city] || dressAssets["default"];
      setAccessories(assets);
      const initialPositions = {};
      assets.forEach((url, index) => {
        initialPositions[url] = { x: 10 + index * 90, y: 10 };
      });
      setPositions(initialPositions);
    }
  }, [city]);

  const handleMouseDown = (e, url) => {
    dragItem.current = url;
    offset.current = {
      x: e.clientX - positions[url].x,
      y: e.clientY - positions[url].y,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragItem.current) return;
    const url = dragItem.current;
    const newPos = {
      ...positions,
      [url]: {
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      },
    };
    setPositions(newPos);
  };

  const handleMouseUp = () => {
    dragItem.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <PageContainer>
      <SolBrand />
      <Title>🎩 Dress the Queen</Title>

      <Selector value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Select a city...</option>
        {availableCities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Selector>

      {city && (
        <Canvas>
          <SolImage src="/images/sol-menu.png" alt="Sol the Cat" />
          {accessories.map((url, index) => (
            <Accessory
              key={url}
              src={url}
              alt={`Accessory ${index}`}
              style={{
                left: `${positions[url]?.x || 0}px`,
                top: `${positions[url]?.y || 0}px`,
              }}
              onMouseDown={(e) => handleMouseDown(e, url)}
            />
          ))}
        </Canvas>
      )}
    </PageContainer>
  );
}
