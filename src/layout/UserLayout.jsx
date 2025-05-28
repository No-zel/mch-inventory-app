// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import {
//   Image,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const UserLayout = ({
//   title,
//   showNav = true,
//   closeBtn,
//   closeLink,
//   children,
// }) => {
//   const navigation = useNavigation();

//   function goTo(screen_name) {
//     navigation.navigate(screen_name ? screen_name : "Profile");
//   }

//   const bottomNavLinks = [
//     {
//       name: "Home",
//     //   icon: require("../assets/tabs/dashboard.png"),
//     //   iconActive: require("../assets/tabs/dashboard-active.png"),
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.userLayoutWrapper}>
//       <View style={styles.userLayoutScreenTitle}>
//         {closeBtn && (
//           <Text
//             onPress={() => goTo(closeLink)}
//             style={[
//               styles.userLayoutScreenTitleTxt,
//               styles.userLayoutScreenTitleClose,
//             ]}
//           >
//             &times;
//           </Text>
//         )}
//         {title && <Text style={styles.userLayoutScreenTitleTxt}>{title}</Text>}
//       </View>
//       {children}
//       {showNav ? (
//         <View style={styles.userLayoutBottomNav}>
//           {bottomNavLinks.map((item) => (
//             <TouchableOpacity
//               onPress={() => goTo(item.name)}
//               style={styles.userLayoutBottomNavLink}
//               key={item.name}
//             >
//               <Image
//                 style={styles.userLayoutBottomNavLinkIcon}
//                 source={item.icon}
//               />
//               <Text style={styles.userLayoutBottomNavLinkText}>
//                 {item.name}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       ) : (
//         <View></View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default UserLayout;

// const styles = StyleSheet.create({
//   userLayoutWrapper: {
//     flex: 1,
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: StatusBar.currentHeight || 0,
//     paddingLeft: 10,
//     paddingRight: 10,
//   },
//   userLayoutScreenTitle: {
//     marginTop: 5,
//     marginLeft: 30,
//     flexDirection: "row",
//     gap: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   userLayoutScreenTitleTxt: {
//     fontSize: 20,
//     fontWeight: "900",
//     color: "#691212",
//   },
//   userLayoutScreenTitleClose: {
//     fontSize: 30,
//   },
//   userLayoutBottomNav: {
//     borderTopWidth: 0.2,
//     borderColor: "maroon",
//     width: "100%",
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
//   userLayoutBottomNavLink: {
//     justifyContent: "center",
//     alignItems: "center",
//     paddingTop: 15,
//     paddingBottom: 15,
//     width: "30%",
//     gap: 5,
//   },
//   userLayoutBottomNavLinkIcon: { height: 15, width: 15 },
//   userLayoutBottomNavLinkText: {
//     color: "maroon",
//     fontWeight: "900",
//   },
// });
