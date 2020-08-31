import React from 'react';
import {Text, View } from 'react-native';
import Routes from './src/Routes'
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer',
	  'VirtualizedList-backed',]);

const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
export default function App() {
  return (

      <Routes/>

  );
}

