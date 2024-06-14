import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from '../Screens/settings';
import Help from '../Screens/help';
import About from '../Screens/about';
import Profile from "../Screens/profile"
import HomeTabs from './BottomTabs';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="Help" component={Help} />
            <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
    )
};
export default DrawerNavigator