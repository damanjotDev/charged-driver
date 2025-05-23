import { SplashScreen, Stack } from 'expo-router';
import './globals.css';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

// Redux & Persist
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { ToastComponent } from '@/components/toast';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    normal: require('../assets/fonts/Roboto-Regular.ttf'),
    medium: require('../assets/fonts/Roboto-Medium.ttf'),
    bold: require('../assets/fonts/Roboto-Bold.ttf'),
    italic: require('../assets/fonts/Roboto-Italic.ttf'),
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {/* For Ios change the status base text color */}
            <StatusBar barStyle="dark-content" />
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(main)" options={{ headerShown: false }} />
            </Stack>
          </KeyboardAvoidingView>
          <ToastComponent />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
