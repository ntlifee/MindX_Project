import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PUBLIC_ROUTES,AUTH_ROUTES} from '../routes';
import { ROUTES } from '../utils/consts';

const AppRouter = () => {
  const isAuth = true;

  return (
    <Routes>
      {PUBLIC_ROUTES.map(({ path, Component, type }) => 
        <Route key={path} path={path} element={type ? <Component type={type}/> : <Component />} />
      )}
      {isAuth && AUTH_ROUTES.map(({ path, Component }) => 
        <Route key={path} path={path} element={<Component />} />
      )}
      <Route path="*" element={<Navigate to={ROUTES.HOME_ROUTE} />} />
    </Routes>
  );
}

export default AppRouter;
