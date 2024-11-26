  'use client';
import {
    CaretDownFilled,
    DoubleRightOutlined,
    GithubFilled,
    InfoCircleFilled,
    LogoutOutlined,
    PlusCircleFilled,
    QuestionCircleFilled,
    SearchOutlined,
  } from '@ant-design/icons';
  import type { ProSettings } from '@ant-design/pro-components';
  import {
    PageContainer,
    ProCard,
    ProConfigProvider,
    ProLayout,
    SettingDrawer,
  } from '@ant-design/pro-components';
  import {
    Button,
    ConfigProvider,
    Divider,
    Dropdown,
    Input,
    Popover,
    theme,
  } from 'antd';
  import React, { useState } from 'react';
  import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
  
  const Item: React.FC<{ children: React.ReactNode }> = (props) => {
    const { token } = theme.useToken();
    return (
      <div
        className={css`
          color: ${token.colorTextSecondary};
          font-size: 14px;
          cursor: pointer;
          line-height: 22px;
          margin-bottom: 8px;
          &:hover {
            color: ${token.colorPrimary};
          }
        `}
        style={{
          width: '33.33%',
        }}
      >
        {props.children}
        <DoubleRightOutlined
          style={{
            marginInlineStart: 4,
          }}
        />
      </div>
    );
  };
  
  const SearchInput = () => {
    const { token } = theme.useToken();
    return (
      <div
        key="SearchOutlined"
        aria-hidden
        style={{
          display: 'flex',
          alignItems: 'center',
          marginInlineEnd: 24,
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Input
          style={{
            borderRadius: 4,
            marginInlineEnd: 12,
          }}
          prefix={
            <SearchOutlined
            />
          }
          placeholder="搜索题目"
          variant="borderless"
        />
      </div>
    );
  };

  interface Props{
    children: React.ReactNode
  }
  
  export default function BasicLayout ({children}:Props) {
    const pathname=usePathname();
    const [num, setNum] = useState(40);
    return (
      <div
        id="basicLayout"
        style={{
          height: '100vh',
          overflow: 'auto',
        }}
      >
            <ProLayout
            layout='top'
            title='面试狗'
            logo={
                <Image src="/assets/logo.png" alt="logo" width={32} height={32} />
            }
              location={{
                pathname,
              }}
              token={{
                header: {
                  colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
                },
              }}
              avatarProps={{
                src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                size: 'small',
                title: '七妮妮',
                render: (props, dom) => {
                  return (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 'logout',
                            icon: <LogoutOutlined />,
                            label: '退出登录',
                          },
                        ],
                      }}
                    >
                      {dom}
                    </Dropdown>
                  );
                },
              }}
              actionsRender={(props) => {
                if (props.isMobile) return [];
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
              }}
              headerTitleRender={(logo, title, _) => {
                const defaultDom = (
                  <a>
                    {logo}
                    {title}
                  </a>
                );
                if (typeof window === 'undefined') return defaultDom;
                if (document.body.clientWidth < 1400) {
                  return defaultDom;
                }
                if (_.isMobile) return defaultDom;
                return (
                  <>
                    {defaultDom}
                  </>
                );
              }}
              menuFooterRender={(props) => {
                if (props?.collapsed) return undefined;
                return (
                  <div
                    style={{
                      textAlign: 'center',
                      paddingBlockStart: 12,
                    }}
                  >
                    <div>© 2021 Made with love</div>
                    <div>by Ant Design</div>
                  </div>
                );
              }}
              onMenuHeaderClick={(e) => console.log(e)}
              menuDataRender={(menuData) => {

                return [
                  {
                    path: '/welcome',
                    name: '欢迎',
                    icon: <InfoCircleFilled />,
                  },
                  {
                    path: '/problem',
                    name: '题库',
                    icon: <QuestionCircleFilled />,
                  },
                  {
                    path: '/mine',
                    name: '我的',
                    icon: <PlusCircleFilled />,
                  },
                ];
              }
              }
              menuItemRender={(item, dom) => (
                <Link 
                href={item.path||'/'}
                target={item.target}
                >
            {dom}
                </Link>
              )}
            >
              {children}
            </ProLayout>
      </div>
    );
  };