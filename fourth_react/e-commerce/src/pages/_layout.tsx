import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => { 
    return (
        <div>
            <Suspense fallback={"Loading..."}>
                <Outlet />
            </Suspense>
        </div>
    )
}

export default Layout;