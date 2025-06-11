// /src\components/PageContainer.jsx

import styled from 'styled-components';
import { motion } from 'framer-motion';

// Κοινός container με props `alignTop` και `noBg`
const PageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ alignTop }) => (alignTop ? 'flex-start' : 'center')};
  min-height: 80vh;
  padding: 2rem;
  text-align: center;
  font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
  background: ${({ noBg }) =>
    noBg
      ? 'transparent'
      : 'linear-gradient(to bottom, #fff1f9, #fce4ec)'};

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

export default PageContainer;
