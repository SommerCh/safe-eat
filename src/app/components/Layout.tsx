import { Outlet, useLocation } from 'react-router';
import { BottomNav } from './BottomNav';

export function Layout() {
  const location = useLocation();
  
  // Skjul BottomNav på onboarding og result sider
  const hideNav = location.pathname === '/' || location.pathname === '/result';

  return (
    <>
      <Outlet />
      {!hideNav && <BottomNav />}
    </>
  );
}
