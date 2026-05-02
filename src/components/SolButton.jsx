import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors, shadows } from "../theme.js";

const SolButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  background-color: ${colors.accentLight};
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 16px;
  font-weight: bold;
  display: inline-block;
  box-shadow: ${shadows.button};
  transition: transform 0.2s ease-in-out;
  margin-top: 1rem;
  align-self: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export default SolButton;
