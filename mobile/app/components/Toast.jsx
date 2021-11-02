import {ToastAndroid} from "react-native";

const Toast = (msg) => {
  return ToastAndroid.showWithGravity(
    msg,
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};

export default Toast;
