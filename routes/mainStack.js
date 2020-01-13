import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from '../screens/home';
import WorkoutScreen from '../screens/workout';
import WorkoutListScreen from '../screens/workoutlist';

const screens = {
    home: {
        screen: HomeScreen,
    },
    list: {
        screen: WorkoutListScreen,
    },
    workout: {
        screen: WorkoutScreen,
    },
};

const mainStack = createStackNavigator(screens, { headerMode: 'none' });

export default createAppContainer(mainStack);
