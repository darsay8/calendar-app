import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import { startChecking } from '../redux/actions/auth';
import { useEffect } from 'react';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5>Loading...</h5>;
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute isAuth={!!uid}>
                <LoginScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute isAuth={!!uid}>
                <CalendarScreen />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};
