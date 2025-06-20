import styled from "styled-components";
import { Link } from "react-router-dom";

const SolButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  background-color: #c187d8;
  color: white;
  text-decoration: none;
  border-radius: 16px;
  font-weight: bold;
  display: inline-block;
  box-shadow: 0 4px 10px rgba(170, 77, 200, 0.3);
  transition: transform 0.2s ease-in-out;
  margin-top: 1rem;
  align-self: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export default SolButton;
