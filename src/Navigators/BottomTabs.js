import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import tabScreens from "../Utils/tab-screen-route";
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarLabelPosition: "below-icon",
            tabBarActiveBackgroundColor: "#D5F0C1",
            tabBarLabelStyle: { fontWeight: "bold", fontSize: 14, color: "black" }
        }}
    >
        {tabScreens.map((screen, index) => (
            <Tab.Screen
                key={index}
                name={screen.name}
                component={screen.component}
                options={screen.options}
            />
        ))}
    </Tab.Navigator>
);

export default HomeTabs