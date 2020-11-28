import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
