import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../screens/home";
import WorkoutScreen from "../screens/workout";

const screens = {
  home: {
    screen: HomeScreen
  },
  workout: {
    screen: WorkoutScreen
  }
};

const navigationOptions = { header: { visible: false } };

const mainStack = createStackNavigator(screens);

export default createAppContainer(mainStack);
