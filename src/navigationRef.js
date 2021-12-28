import { NavigationActions } from "react-navigation";
let navigator;

// Why we created this? Because we are trying to navigate from somehwere outside of a react component (from AuthContext)
export const setNavigation = (nav) => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName: routeName,
      params: params,
    })
  );
};
