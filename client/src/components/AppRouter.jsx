import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PUBLIC_ROUTES,AUTH_ROUTES} from '../routes';
import { ROUTES } from '../utils/consts';
import { Context } from '../index';

const AppRouter = () => {
  const {user} = useContext(Context);
  return (
    <Routes>
      {PUBLIC_ROUTES.map(({ path, Component, type }) => 
        <Route key={path} path={path} element={type ? <Component type={type}/> : <Component />} />
      )}
      {/* user.isAuth */ true && AUTH_ROUTES.map(({ path, Component }) => 
        <Route key={path} path={path} element={<Component />} />
      )}
      <Route path="*" element={<Navigate to={ROUTES.HOME_ROUTE} />} />
    </Routes>
  );
}

export default AppRouter;
