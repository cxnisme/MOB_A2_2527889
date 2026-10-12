import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AboutScreen from '../screens/AboutScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProjectDetailScreen from '../screens/ProjectDetailScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import SkillsScreen from '../screens/SkillsScreen';
import { colors } from '../theme';
import { ProjectsStackParamList, RootStackParamList, TabParamList } from '../types';

const Tab = createBottomTabNavigator<TabParamList>();
const ProjectsStackNav = createNativeStackNavigator<ProjectsStackParamList>();
const Root = createNativeStackNavigator<RootStackParamList>();

const stackHeader = {
  headerStyle: { backgroundColor: colors.bg },
  headerTintColor: colors.text,
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.bg },
};

function ProjectsStack() {
  return (
    <ProjectsStackNav.Navigator screenOptions={stackHeader}>
      <ProjectsStackNav.Screen name="ProjectList" component={ProjectsScreen} options={{ headerShown: false }} />
      <ProjectsStackNav.Screen name="ProjectDetail" component={ProjectDetailScreen} options={{ title: 'Project details' }} />
    </ProjectsStackNav.Navigator>
  );
}

const icons: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ['home', 'home-outline'],
  Skills: ['list', 'list-outline'],
  ProjectsTab: ['briefcase', 'briefcase-outline'],
  Profile: ['person', 'person-outline'],
};

function Tabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.onAccent,
        tabBarActiveBackgroundColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        tabBarItemStyle: { borderRadius: 20, marginHorizontal: 2, paddingVertical: 4 },
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 16 + insets.bottom,
          height: 66,
          borderRadius: 26,
          paddingHorizontal: 4,
          paddingTop: 6,
          paddingBottom: 6,
          backgroundColor: 'rgba(255,255,255,0.96)',
          borderTopWidth: 0,
          elevation: 8,
        },
        tabBarIcon: ({ focused, color }) => (
          <Ionicons name={icons[route.name][focused ? 0 : 1]} size={21} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Skills" component={SkillsScreen} />
      <Tab.Screen name="ProjectsTab" component={ProjectsStack} options={{ title: 'Projects' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.bg, card: colors.bg, border: colors.border, primary: colors.accent },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Root.Navigator screenOptions={stackHeader}>
        <Root.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Root.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
      </Root.Navigator>
    </NavigationContainer>
  );
}
