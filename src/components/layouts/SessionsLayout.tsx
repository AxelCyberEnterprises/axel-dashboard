import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from '../session/TopNav';

const SessionsLayout: React.FC = () => {
    return (
        <div className='flex flex-col overflow-y-hidden h-screen w-screen'>
            <div className="h-auto">
                <TopNav />
            </div>
            <div className="flex-1 w-full overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default SessionsLayout;