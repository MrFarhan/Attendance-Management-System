import React from 'react';

import AppbarBody from './AppbarBody';
import { MainAppbar } from './MainAppbar';


export default function MenuAppBar() {

  return (
    // complete dashboard page
    <div  className="dashboardMain">
      <MainAppbar />
      <AppbarBody />
    </div>
  );
}
