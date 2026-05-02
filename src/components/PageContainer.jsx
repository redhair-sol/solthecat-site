import styled from 'styled-components';
import { motion } from 'framer-motion';
import { gradients } from '../theme.js';

// Κοινός container με props `alignTop` και `noBg`
const PageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ alignTop }) => (alignTop ? 'flex-start' : 'center')};
  min-height: 90vh;
  padding: 2rem 2rem 1.5rem 2rem;
  text-align: center;
  font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
  background: ${({ noBg }) => (noBg ? 'transparent' : gradients.pageBg)};

  @media (max-width: 480px) {
    padding: 1.5rem 1rem 1rem 1rem;
  }
`;

export default PageContainer;
