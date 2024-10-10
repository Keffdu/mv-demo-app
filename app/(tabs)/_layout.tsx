import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function TabLayout() {
    return (
<Tabs
  screenOptions={{
    tabBarActiveTintColor: '#279FD0',
    headerStyle: {
      backgroundColor: '#25292e',
    },
    headerShadowVisible: false,
    headerTintColor: '#fff',
    tabBarStyle: {
    backgroundColor: '#25292e',
    },
  }}
>
    <Tabs.Screen
            name="index"
            options={{
            title: 'Scoring',
            tabBarIcon: ({ color, focused }) => (
                <MaterialCommunityIcons name={focused ? 'scoreboard' : 'scoreboard-outline'} color={color} size={24} />
        ),
            }}
        />
    <Tabs.Screen
        name="about"
        options={{
        title: 'Profile',
        tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} color={color} size={24}/>
        ),
        }}
    />
    </Tabs>
);
}
