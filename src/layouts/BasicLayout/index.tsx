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
          placeholder="搜索方案"
          variant="borderless"
        />
        <PlusCircleFilled
          style={{
            color: token.colorPrimary,
            fontSize: 24,
          }}
        />
      </div>
    );
  };

  interface Props{
    children: React.ReactNode
  }
  
  export default function BasicLayout ({children}:Props) {
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
      fixSiderbar: true,
      layout: 'mix',
      splitMenus: true,
    });
  
    const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1');
    const [num, setNum] = useState(40);
    if (typeof document === 'undefined') {
      return <div />;
    }
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
                if (typeof window === 'undefined') return [];
                return [
                  props.layout !== 'side' && document.body.clientWidth > 1400 ? (
                    <SearchInput />
                  ) : undefined,
                  <InfoCircleFilled key="InfoCircleFilled" />,
                  <QuestionCircleFilled key="QuestionCircleFilled" />,
                  <GithubFilled key="GithubFilled" />,
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
              menuItemRender={(item, dom) => (
                <div
                  onClick={() => {
                    setPathname(item.path || '/welcome');
                  }}
                >
                  {dom}
                </div>
              )}
            >
              {children}
            </ProLayout>
      </div>
    );
  };