import React, { useState } from 'react'
import { NavLink, Route } from 'react-router-dom'
import '../AdminTemplate/AdminTemplate.module.css'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  CloseCircleOutlined,
  PlusSquareOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  GroupOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import { Dropdown, Layout, Menu, Space } from 'antd';
import { history } from '../../App';

const { Header, Sider, Content } = Layout;

export default function AdminTemplate(props) {
  const items = [
    {
      label: <NavLink to={`/`}>Trang chủ</NavLink>,
      key: '1',
      icon: <HomeOutlined />,
    },
    {
      label: <span onClick={() => {
        localStorage.removeItem('TOKEN')
        history.push('/home')
        localStorage.removeItem('USER_LOGIN')
      }}
      >Đăng xuất</span>,
      key: '2',
      icon: <CloseCircleOutlined />,
    },
    {
      label: <NavLink to={`/profile`}>Cập nhật thông tin người dùng</NavLink>,
      key: '3',
      icon: <UserSwitchOutlined />,
    },
  ];
  const menuProps = {
    items
  }
  const { Component, ...restParams } = props
  const [collapsed, setCollapsed] = useState(false);
  let key = ''
  switch (props.path) {
    case '/admin/showtime': {
      key = '1'
      break
    }
    case '/admin/user': {
      key = '2'
      break
    }
    case '/admin/films': {
      key = '3'
      break
    }
    default:
      key = '/'

  }
  const userLogin = JSON.parse(localStorage.getItem('USER_LOGIN'))

  

  return (
    <Route {...restParams} render={(propsParams) => {
      return (
        <Layout>
          <Sider trigger={null} style={{ height: '100vh' }} collapsible collapsed={collapsed}>
            <div className="logo" style={{ height: '80px', cursor: 'pointer' }} onClick={() => {
              history.push('/home')
            }}>
              <img style={{ width: '100%', height: '100%' }} src='https://static.vecteezy.com/system/resources/thumbnails/009/181/259/small/svg-letter-logo-design-with-polygon-shape-svg-polygon-and-cube-shape-logo-design-svg-hexagon-logo-template-white-and-black-colors-svg-monogram-business-and-real-estate-logo-vector.jpg' alt='im' />
            </div>
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[`${key}`]}
              items={[
                {
                  key: '1',
                  icon: <VideoCameraOutlined />,
                  label: <NavLink to={'/admin/films/showtime/:id/:tenPhim'}>Showtime</NavLink>,
                },
                {
                  key: '2',
                  icon: <UserOutlined />,
                  label:'User',
                  children:[
                    {
                      key:'8',
                      icon:<GroupOutlined />,
                      label: <NavLink to={'/admin/user'}>User</NavLink>
                    },
                    {
                      key:'9',
                      icon:<UserAddOutlined />,
                      label: <NavLink to={'/admin/user/addUser'}>New User</NavLink>
                    }
                  ]
                },
                {
                  key: '3',
                  icon: <i className="fa fa-film"></i>,
                  label: 'Films',
                  children: [
                    {
                      key:'12',
                      icon: <PlusSquareOutlined />,
                      label: <NavLink to={'/admin/films/addnew'}>Add new</NavLink>,
                    },
                    {
                      key:'13',
                      icon: <UnorderedListOutlined />,
                      label: <NavLink to={'/admin/films'}>Films</NavLink>,
                    },
                    
                  ]
                }
              ]}
              style={{ height: '100vh' }}
            />
          </Sider>
          <Layout className="site-layout">
            <Header
              style={{
                padding: 10,
                background: '#fff',
                display:'flex',
                justifyContent:'space-between'
              }}

            >
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
                style: {
                  width: '60px',
                  height: '44px',
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center'                  
                }
              })}
              <Space>
                <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
                  <NavLink to={`/profile`}>{`Hello! ${userLogin.hoTen}`}</NavLink>
                </Dropdown.Button>
              </Space>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: '100vh',
                background: '#fff',
              }}
            >
              <Component {...propsParams} />
            </Content>
          </Layout>
        </Layout>
      )
    }} />
  )
}
