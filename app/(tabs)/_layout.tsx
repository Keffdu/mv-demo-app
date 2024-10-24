import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'


export default function TabLayout() {
    return (
<Tabs
  screenOptions={{
    tabBarActiveTintColor: '#00796B',
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
            title: 'Browse',
            tabBarIcon: ({ color, focused }) => (
                <FontAwesome6 name="binoculars" size={24} color={color} />
        ),
            }}
        />
    <Tabs.Screen
        name="saved"
        options={{
        title: 'Saved',
        tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? 'heart' : 'heart-outline'} color={color} size={24}/>
        ),
        }}
    />
    </Tabs>
);
}
