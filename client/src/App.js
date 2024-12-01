import './styles/main.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BurgerMenu from './components/BurgerMenu/BurgerMenu';
import AppRouter from './components/AppRouter';
import Loading from './components/Loading/Loading';
import { observer } from 'mobx-react-lite';
import { Context } from './index.js';
import { API } from './http/API';

const App = observer(() => {
	const [isActiveBurger, setIsActiveBurger] = useState(false);
	const { user } = useContext(Context);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
    API.user.check().then(data => {
			user.setUser(data);
			user.setIsAuth(true);
		}).catch((error) => {

		}).finally(() => {
			setLoading(false);
		});
  }, []);
	return (
		<div className='App'>
			<BrowserRouter>
				{loading ? <Loading /> : <></>}
				<BurgerMenu
					isActiveBurger={isActiveBurger}
					setIsActiveBurger={setIsActiveBurger}
				/>
				<Navbar
					isActiveBurger={isActiveBurger}
					setIsActiveBurger={setIsActiveBurger}
				/>
				<AppRouter />
				<Footer />
			</BrowserRouter>
		</div>
	);
});

export default App;
