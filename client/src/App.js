import './styles/main.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BurgerMenu from './components/BurgerMenu/BurgerMenu';
import AppRouter from './components/AppRouter';

function App() {
	const [isActiveBurger, setIsActiveBurger] = useState(false);
	return (
		<div className='App'>
			<BrowserRouter>
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
}

export default App;
