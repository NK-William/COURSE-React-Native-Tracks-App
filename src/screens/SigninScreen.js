import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { context } from "../context/AuthContext";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(context);

  useEffect(() => {
    // Emitted when the screen goes out of focus
    const listener = navigation.addListener("blur", () => {
      clearErrorMessage;
    });

    // The returned function below will be invoked only when the instance of this screen is not on a stack
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign in to your account"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign up instead"
      />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    header: null,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});

export default SigninScreen;
