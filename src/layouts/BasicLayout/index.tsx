"use client";
import {
  CaretDownFilled,
  DoubleRightOutlined,
  GithubFilled,
  InfoCircleFilled,
  LogoutOutlined,
  PlusCircleFilled,
  QuestionCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import type { ProSettings } from "@ant-design/pro-components";
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from "@ant-design/pro-components";
import {
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
  Input,
  message,
  Popover,
  theme,
} from "antd";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import { menus } from "../../../config/menus";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import getAccessibleMenus from "@/access/menuAccess";
import { log } from "console";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import MdEditor from "@/components/MdEditor";
import MdViewer from "@/components/MdViewer";
import { userLogoutUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUser";
import { DEFAULT_USER } from "@/app/constants/user";
import SearchInput from "./components/SearchInput";

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  /*
  listQuestionBankVoByPageUsingPost({}).then((res) => {
    console.log("layout",res);
});
*/

  const loginUser = useSelector((state: RootState) => state.loginUser);
  const [text, setText] = useState<string>("");
  console.log("loginUserBasicLayout", loginUser);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  /**
   * 用户注销
   */
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("已退出登录");
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
    } catch (e) {
      message.error("操作失败，" + e.message);
    }
    return;
  };

  const pathname = usePathname();
  return (
    <div
      id="basicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        layout="top"
        title="面试狗"
        logo={
          <Image src="/assets/logo.png" alt="logo" width={32} height={32} />
        }
        location={{
          pathname,
        }}
        token={{
          header: {
            colorBgMenuItemSelected: "rgba(0,0,0,0.04)",
          },
        }}
        avatarProps={{
          src: loginUser.userAvatar,
          size: "small",
          title: loginUser.userName,
          render: (props, dom) => {
            if(!loginUser.id){
              return (
                <div onClick={() => {
                    router.push("/user/login");
                }}>{dom}</div>
              )
            }
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: async (event: { key: React.Key }) => {
                    const { key } = event;
                    // 退出登录
                    if (key === "logout") {
                      userLogout();
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          // 添加条件判断，当路径不为/questions时展示SearchInput
          if (pathname!== '/questions') {
              return [
                  <SearchInput key="SearchInput" />,
                  <a
                      key="github"
                      href="https://github.com/ant-design/ant-design-pro"
                      target="_blank"
                  >
                      <GithubFilled key="GithubFilled" />
                  </a>,
              ];
          }
          return [
              <a
                  key="github"
                  href="https://github.com/ant-design/ant-design-pro"
                  target="_blank"
              >
                  <GithubFilled key="GithubFilled" />
              </a>,
          ];
      }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        footerRender={() => {
          return <GlobalFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuDataRender={() => {
          return getAccessibleMenus(loginUser, menus);
        }}
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"} target={item.target}>
            {dom}
          </Link>
        )}
      >
        {children}
      </ProLayout>
    </div>
  );
}
