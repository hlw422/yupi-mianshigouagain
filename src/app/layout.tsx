"use client";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import BasicLayout from "@/layouts/BasicLayout";
import { useCallback, useEffect } from "react";
import { Provider } from "react-redux";
import store from "@/stores";
import AccessLayout from "@/access/AccessLayout";

const InitLayout: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = ({ children }) => {
  const doInit = useCallback(() => {
    console.log("doInit");
  }, []);

  useEffect(() => {
    doInit();
  });
  return children;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const doInit = useCallback(() => {
    console.log("doInit");
  }, []);

  useEffect(() => {
    doInit();
  });
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <InitLayout>
              <BasicLayout>
                <AccessLayout>{children}</AccessLayout>
              </BasicLayout>
            </InitLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
