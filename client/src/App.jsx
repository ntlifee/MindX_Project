import '@mindx/styles/main.css';

import { BrowserRouter } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import Navbar from '@mindx/components/Navbar/Navbar';
import Footer from '@mindx/components/Footer/Footer';
import BurgerMenu from '@mindx/components/BurgerMenu/BurgerMenu';
import AppRouter from '@mindx/components/AppRouter';
import Loading from '@mindx/components/UI/Loading/Loading';
import { Notify } from '@mindx/components/UI/Toastify/Notify';

import { Context } from '@mindx/index';
import { API } from '@mindx/http/API';

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
			<Notify/>
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
