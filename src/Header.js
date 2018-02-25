import React from 'react';
import AppBar from 'material-ui/AppBar';

export default function Header() {

  const style = {
    textAlign: 'center',
    background: '#a91e20',
  };

  const titleStyle = {
    color: 'gold'
  };

  return (
    <AppBar showMenuIconButton={false} 
            title={"Yo, Where We Stuck?"} 
            titleStyle={titleStyle} 
            style={style}>
    </AppBar>
  );
}

