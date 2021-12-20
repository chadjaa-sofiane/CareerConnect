import { InMemoryCache, makeVar } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return isLoggedIn();
        },
        userInfo() {
          return userInfo();
        },
        searchText() {
          return searchText();
        },
      },
    },
  },
});

export const isLoggedIn = makeVar(!!localStorage.getItem("refreshToken"));
export const userInfo = makeVar(null);
export const searchText = makeVar(" ");

export default cache;
