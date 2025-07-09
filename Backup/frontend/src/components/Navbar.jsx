import { Link } from 'react-router-dom';

function Navbar() {
  const isLoggedIn = !!localStorage.getItem('access');

  return (
    <nav style={{
      padding: '10px',
      backgroundColor: '#282c34',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/upload" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Upload</Link>
        {isLoggedIn && (
          <Link to="/dashboard" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        )}
      </div>
      <div>
        {isLoggedIn ? (
          <Link to="/logout" style={{ color: 'white', textDecoration: 'none' }}>Logout</Link>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '15px', color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
