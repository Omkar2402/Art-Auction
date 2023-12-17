import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
// Styling
import './css/home.css';
// Components
import Board from './Board';
import Alert from './Alert';
import { Link } from 'react-router-dom';

const Home = (props) => {
  // Check if user is logged
  if (!props.isAuth) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='home'>
      <div className='nav__display'>
        {/* Add your navigation component here */}
        
      </div>
      <div className='alert__display'>
        <Alert />
      </div>
      <div className='product__board'>
        <Board />
      </div>
    </div>
  );
};

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

// Add the Navigation component inside the Home component
<div className='nav__display'>
  <Navigation />
</div>

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);
