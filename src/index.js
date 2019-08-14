import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';

export default function meetappmobile() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#402845" />
      <Routes />
    </>
  );
}
