import React from 'react';
import AppBar from 'material-ui/AppBar';
import NavigationMenu from './navigation-menu';

export default function Header() {

  const titleStyle = {
    color: 'gold'
  };

  return (
    <AppBar title={"Yo, Where We Stuck?"} 
            titleStyle={titleStyle}
            showMenuIconButton={false}
    >
      <NavigationMenu />
    </AppBar>
  );
}