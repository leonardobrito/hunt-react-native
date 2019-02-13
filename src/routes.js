import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import Main from "./pages/main";
import Product from "./pages/product";

export default createAppContainer(
  createSwitchNavigator({
    App: createStackNavigator(
      {
        Main,
        Product
      },
      {
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: "#da552f"
          },
          headerTintColor: "#fff"
        }
      }
    )
  })
);
