import { useNavigate, useLocation } from 'react-router-dom';

import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg';
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const fillActive = '#2c2c2c';
  const fillInactive = '#8f8f8f';

  const handleRouteChangeFill = (route) => {
    return pathname === route ? fillActive : fillInactive;
  }

  return (
    <footer className='navbar'>
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={() => navigate('/')}>
            <ExploreIcon fill={handleRouteChangeFill('/')} width='36px' height='36px' />
            <p className='navbarListItemName'
              style={{ color: handleRouteChangeFill('/') }}>
              Explore
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/offers')}>
            <OfferIcon fill={handleRouteChangeFill('/offers')} width='36px' height='36px' />
            <p className='navbarListItemName'
              style={{ color: handleRouteChangeFill('/offers') }}>
              Offers
            </p>
          </li>
          <li className="navbarListItem" onClick={() => navigate('/profile')}>
            <PersonOutlineIcon fill={handleRouteChangeFill('/profile')} width='36px' height='36px' />
            <p className='navbarListItemName'
              style={{ color: handleRouteChangeFill('/profile') }}>
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Navbar;
