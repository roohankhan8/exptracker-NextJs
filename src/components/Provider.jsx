"use client";
import { SessionProvider } from "next-auth/react";
import StoreProvider from ".";
const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <StoreProvider>{children}</StoreProvider>
    </SessionProvider>
  );
};

export default Provider;
