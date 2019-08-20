import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Subscription from './pages/Subscription';
import Profile from './pages/Profile';

import colors from '~/styles/colors';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Subscription,
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: `${colors.inactive}`,
              style: {
                backgroundColor: `${colors.secondaryBackground}`,
                height: 60,
              },
              tabStyle: {
                paddingTop: 15,
                paddingBottom: 10,
              },
              labelStyle: {
                fontSize: 13,
                paddingTop: 5,
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
