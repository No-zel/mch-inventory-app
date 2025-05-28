import HomeScreen from "../screens/home";
import ScannerScreen from "../screens/scannerScreen";

const auth_protected_routes = [
  {
    name: "Home",
    component: HomeScreen,
  },
  {
    name: "Scanner",
    component: ScannerScreen,
  },
];

export default auth_protected_routes;
