export default function Home() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to <span style={{ color: '#aa4dc8' }}>SOLadventures</span>, the journey of a queen</h1>
      <p style={{ fontSize: '1.2rem' }}>Fluffy. Fierce. Fabulous. 🐾🐾🐾</p>
      <button style={{
        marginTop: '1rem',
        padding: '0.8rem 1.5rem',
        fontSize: '1rem',
        borderRadius: '8px',
        backgroundColor: '#aa4dc8',
        color: 'white',
        border: 'none',
        cursor: 'pointer'
      }}>View the Journey</button>
    </div>
  );
}
