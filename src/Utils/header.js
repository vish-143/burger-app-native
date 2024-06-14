import {getFocusedRouteNameFromRoute } from "@react-navigation/native";

export default function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    switch (routeName) {
      case "Home":
        return "Home";
      case "Categories":
        return "Categories";
      case "Orders":
        return "Orders";
      case "Tracking":
        return "Tracking";
      default:
        return "Burger King";
    }
  }
  