import { useState, useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import {
  gql,
  useApolloClient,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import { isLoggedIn, userInfo } from "../cache";
import { GET_MY_INFO } from "../graphql/queries";

export const useForm = (initialState = {}) => {
  const [state, setState] = useState(initialState);
  const onChange = (e, el) => {
    const { name, value, checked, type } = e.target;
    const input = type === "checkbox" ? checked : value;
    if (el) {
      return setState({
        ...state,
        [el]: {
          ...state[el],
          [name]: input,
        },
      });
    }
    setState({
      ...state,
      [name]: input,
    });
  };
  return [state, onChange, setState];
};

export const useToken = () => {
  const [refresh, { data, loading }] = useLazyQuery(
    gql`
      query refreshToken($refreshToken: String!) {
        refreshToken(refreshToken: $refreshToken)
      }
    `,
    { variables: { refreshToken: localStorage.getItem("refreshToken") } }
  );
  const refreshAccesToken = useCallback(() => {
    if (!isLoggedIn()) return;
    refresh();
    if (data) sessionStorage.setItem("accessToken", data.refreshToken);
  }, [data, refresh]);
  useEffect(() => {
    refreshAccesToken();
  }, [refreshAccesToken]);
  return loading;
};

export const useGetMyInfo = () => {
  const [getMyInfoQuery, { data, loading, error }] = useLazyQuery(GET_MY_INFO);
  const getData = useCallback(() => {
    if (!isLoggedIn()) return;
    getMyInfoQuery();
    if (data && !loading) userInfo(data.getMyInfo);
  }, [data, getMyInfoQuery, loading]);
  useEffect(() => {
    getData();
  }, [getData]);
  return loading;
};

export const useLogAuth = (MUTATION, input, setErrors) => {
  const history = useHistory();
  const [callBack, { loading }] = useMutation(MUTATION, {
    update(_, { data }) {
      if (data?.Register) {
        const { Register } = data;
        sessionStorage.setItem("accessToken", Register.accessToken);
        localStorage.setItem("refreshToken", Register.refreshToken);
      }
      if (data?.Login) {
        const { Login } = data;
        sessionStorage.setItem("accessToken", Login.accessToken);
        localStorage.setItem("refreshToken", Login.refreshToken);
      }
      isLoggedIn(true);
      history.push("/dashboard/search");
    },
    onError({ graphQLErrors }) {
      setErrors({});
      if (!graphQLErrors) return;
      const exception = graphQLErrors[0]?.extensions;
      exception?.validationErrors?.map((e) => {
        return setErrors((p) => ({ ...p, [e.property]: e.constraints }));
      });
      exception?.exception?.validationErrors?.map((e) => {
        return setErrors((p) => ({ ...p, [e.property]: e.constraints }));
      });
      if (exception?.errors)
        setErrors((p) => ({ ...p, ...exception["errors"] }));
      if (exception?.keyPattern)
        Object.keys(exception.keyPattern).map((el) =>
          setErrors((p) => ({ ...p, [el]: 1 }))
        );
      if (exception?.exception?.keyPattern)
        Object.keys(exception.exception.keyPattern).map((el) =>
          setErrors((p) => ({ ...p, [el]: 1 }))
        );
    },
  });
  const submit = async (e) => {
    e.preventDefault();
    await callBack({ variables: { input } });
  };
  return { submit, loading };
};

export const useTabValue = (array, mainPath = "/") => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [value, setValue] = useState(0);
  const pathArray = pathname.split("/");

  function handleChange(_, nextEvent) {
    setValue(nextEvent);
    history.push(`${mainPath}/${array[nextEvent]}`);
  }

  const findDefaultValue = useCallback(() => {
    return array.forEach((el) => {
      if (pathArray.indexOf(el) > 0) {
        setValue(array.indexOf(el));
        return;
      }
    });
  }, [pathArray, array]);

  useEffect(() => {
    findDefaultValue();
  }, [findDefaultValue]);
  return {
    handleChange,
    value,
  };
};

export const useLogout = () => {
  const client = useApolloClient();
  const { push } = useHistory();
  function logout() {
    client.cache.evict({ fieldName: "me" });
    client.cache.gc();
    localStorage.clear();
    isLoggedIn(false);
    push("/");
  }
  return logout;
};
