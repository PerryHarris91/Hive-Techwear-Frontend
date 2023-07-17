import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/HIVETechwear.svg';
import { getUser } from '../../reducks/users/selectors';
import CartLink from './CartLink';
import Search from './Search';
import SignInLink from './SignInLink';
import SignOutLink from './SignOutLink';
import SignUpLink from './SignUpLink';
import cart from '../../assets/images/cart.png';

export default function Header(props) {
	const { totalCart, setSearch, setPage } = props;
	const history = useHistory();
	const { pathname } = history.location;
	const selector = useSelector((state) => state);
	const user = getUser(selector);
	const token = user ? user.token : null;
	
	return (
		<header className="header">
			<Link to="/">
				<img className="logo" src={Logo} alt="HIVETechwear" />
			</Link>
			<div className="nv-logo">
              <a href="/Cart">
                <img src={cart} alt='4' />
                <span className='bag-quantity'>
                <span>0</span>
                </span>
              </a>
           </div>
			<input id="menu__toggle" type="checkbox" />
			<label className="menu__btn" htmlFor="menu__toggle">
				<span></span>
			</label>
			
			
			<ul className="menu__box">
				{pathname === "/sign-in" ? (
					<SignUpLink />
				) : pathname === "/sign-up" ? (
					<SignInLink />
				) : token ? (
					<>
						{setSearch && <Search setSearch={setSearch} setPage={setPage}/>}
						<CartLink totalCart={totalCart} />
						<SignOutLink />
					</>
				) : (
					<>
						<SignInLink />
						<SignUpLink />
					</>
				)}
			</ul>
		</header>
	);
}
