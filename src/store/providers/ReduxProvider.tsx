"use client";
import { store } from "@/store/store";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <div>{children}</div>
    </Provider>
  );
};

export default ReduxProvider;
