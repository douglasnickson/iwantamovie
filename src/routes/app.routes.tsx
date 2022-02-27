import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

import Dashboard from '@screens/Dashboard';
import MovieDetail from '@screens/MovieDetail';

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#169ddb',
        height: 48,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Buscar Filme"
      component={Dashboard}
      options={{ title: 'Buscar Filme' }}
    />
    <HomeStack.Screen
      name="MovieDetail"
      component={MovieDetail}
      options={{ title: 'Filme Indicado' }}
    />
  </HomeStack.Navigator>
);

const AppRoutes: React.FC = () => <HomeStackScreen />;

export default AppRoutes;
