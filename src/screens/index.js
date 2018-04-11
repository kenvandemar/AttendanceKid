import { Navigation } from 'react-native-navigation';

import HomeScreen from './HomeScreen';
import ClassScreen from './ClassScreen';
import StudentsScreen from './StudentsScreen';
import CameraScreen from './CameraScreen';
import PreviewScreen from './PreviewScreen';
import FinalScreen from './FinalScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('app.HomeScreen', () => HomeScreen);
  Navigation.registerComponent('app.ClassScreen', () => ClassScreen);
  Navigation.registerComponent('app.StudentsScreen', () => StudentsScreen);
  Navigation.registerComponent('app.CameraScreen', () => CameraScreen);
  Navigation.registerComponent('app.PreviewScreen', () => PreviewScreen);
  Navigation.registerComponent('app.FinalScreen', () => FinalScreen);
}