import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to <span style={{ color: '#aa4dc8' }}>SOLadventures</span>, the journey of a queen</h1>
      <p style={{ fontSize: '1.2rem' }}>Fluffy. Fierce. Fabulous. 🐾🐾🐾</p>
      
      <Link to="/episodes">
        <button style={{
          marginTop: '1rem',
          padding: '0.8rem 1.5rem',
          fontSize: '1rem',
          borderRadius: '8px',
          backgroundColor: '#aa4dc8',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}>
          View the Journey
        </button>
      </Link>

      <div style={{ marginTop: '2rem' }}>
        <a
          href="https://www.instagram.com/solthecat01"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            color: '#aa4dc8',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <img src={`${import.meta.env.BASE_URL}icons/instagram-icon.png`} alt="Instagram" style={{ width: '32px', height: '32px' }} />
          Follow on Instagram
        </a>
      </div>
    </div>
  );
}
