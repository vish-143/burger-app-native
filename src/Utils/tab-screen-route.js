import Icon from 'react-native-vector-icons/Ionicons';
import Home from "../Screens/home";
import Categories from "../Screens/categories";
import Orders from "../Screens/orders";
import Tracking from "../Screens/tracking";

const tabScreens = [
    {
        name: "Home",
        component: Home,
        options: {
            headerShown: false,
            tabBarIcon: () => <Icon name="home-sharp" color={"black"} size={25} />
        }
    },
    {
        name: "Categories",
        component: Categories,
        options: {
            headerShown: false,
            tabBarIcon: () => <Icon name="list" color={"black"} size={25} />
        }
    },
    {
        name: "Orders",
        component: Orders,
        options: {
            headerShown: false,
            tabBarIcon: () => <Icon name="bag-handle" color={"black"} size={25} />
        }
    },
    {
        name: "Tracking",
        component: Tracking,
        options: {
            headerShown: false,
            tabBarIcon: () => <Icon name="navigate-circle" color={"black"} size={25} />
        }
    }
];

export default tabScreens