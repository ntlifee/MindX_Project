import { ROUTES } from './utils/consts';
import AdminPage from './pages/Admin/Admin';
import Home from './pages/Home/Home';
import CarouselGame from './pages/CarouselGame/CarouselGame';
import Lobby from './pages/Lobby/Lobby';
import SquareGame from './pages/SquareGame/SquareGame';

export const PUBLIC_ROUTES = [
	{
		path: ROUTES.HOME_ROUTE,
		Component: Home,
	},
	{
		path: ROUTES.CAROUSEL_ROUTE,
		Component: Lobby,
		type: 'carousel',
	},
	{
		path: ROUTES.SQUARE_ROUTE,
		Component: Lobby,
		type: 'square',
	},
	{
		path: `${ROUTES.CAROUSEL_ROUTE}/:id`,
		Component: CarouselGame,
	},
	{
		path: `${ROUTES.SQUARE_ROUTE}/:id`,
		Component: SquareGame,
	},
];

export const AUTH_ROUTES = [
	{
		path: ROUTES.ADMIN_ROUTE,
		Component: AdminPage,
	},
];
