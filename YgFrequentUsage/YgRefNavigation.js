import {CommonActions} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

var refNavigation;

const InitializeRefNavigation = (ref) => {
  refNavigation = ref;
};

const Navigate = (name, params) => {
  refNavigation.dispatch(
    CommonActions.navigate({
      name: name,
      params: params,
    }),
  );
};

const NavigateAndReset = (routeName, params = {}) => {
  refNavigation.reset({
    index: 0,
    routes: [{name: routeName, params: params}],
  });
};

const Push = (name, params) => {
  refNavigation.dispatch(StackActions.push(name, params));
};

const GoBack = () => {
  refNavigation.dispatch(CommonActions.goBack());
};

export default {
  InitializeRefNavigation,
  Navigate,
  NavigateAndReset,
  Push,
  GoBack,
};
