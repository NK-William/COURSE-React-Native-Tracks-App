import { AsyncStorage } from "react-native";
import CreateDataContext from "./CreateDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

// this functiona will be called only by react directly whenever we call the dispatch function
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("TrackList");
  } else {
    navigate("loginFlow");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    // Make api request to sign up with the provided email and password
    // If sign up is successful, we have to modify the state(isSignedIn)
    // If sign up fails, reflect an error message
    try {
      const response = await trackerApi.post("/signup", {
        email: email,
        password: password,
      });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signup", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "something went wrong with sign up",
      });
    }
  };
};

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    // Try to signin
    // Handle success by updating state
    // Handle failure by showing error message
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "something went wrong with sign in",
      });
    }
  };

const signout = (dispatch) => {
  return async () => {
    // sign out
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("loginFlow");
  };
};

export const { Provider, Context } = CreateDataContext(
  authReducer,
  { signin, signup, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
