import { Outlet, useLocation } from 'react-router';
import Sidebar from '~/shared/components/sidebar';

export default function Layout() {
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean);
  console.log('path', path);
  return (
    <div className="admin-layout">
      <Sidebar
        breadcrumb={{
          title: path[path.length - 1].charAt(0).toUpperCase() + path[path.length - 1].slice(1),
          parents: [],
        }}
      >
        <Outlet />
      </Sidebar>
    </div>
  );
}
