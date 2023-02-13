import { Select, Tabs } from 'antd'

import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
export default function Header() {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { t, i18n } = useTranslation();
    const handleChange = (value) => {
        i18n.changeLanguage(value)
    };
    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button onClick={() => {
                    history.push('/login')
                }} style={{ border: '2px solid white' }} type="button" className="hidden px-6 py-[5px] font-semibold rounded lg:block dark:bg-violet-400 dark:text-gray-900 hover:text-white hover:bg-black transition duration-700 ease-in-out">{t('LogIn')}</button>
                <button onClick={() => {
                    history.push('/register')
                }} style={{ border: '2px solid white' }} type="button" className="hidden px-6 py-[5px] font-semibold rounded lg:block dark:bg-violet-400 dark:text-gray-900 hover:text-white hover:bg-black transition duration-700 ease-in-out">{t('SignUp')}</button>
            </Fragment>
        } else {
            return <Fragment>
                <button onClick={() => {
                    history.push('/profile')
                }} style={{ border: '2px solid white' }} type="button" className="hidden px-6 py-[5px] font-semibold rounded-md lg:block dark:bg-violet-400 dark:text-gray-900 hover:text-white hover:bg-black transition duration-700 ease-in-out">Hello ! {userLogin.taiKhoan}</button>

                <button style={{ marginLeft: '10px', border: '2px solid white' }} className='rounded-md p-[5px] font-semibold hover:text-white hover:bg-black transition duration-700 ease-in-out' onClick={() => {
                    localStorage.removeItem('USER_LOGIN')
                    localStorage.removeItem('TOKEN')
                    history.push('/home')
                    window.location.reload()
                }} >Đăng xuất</button>
            </Fragment>
        }

    }
    return (
        <header className="p-4 bg-purple-400 opacity-70 w-full z-10" style={{
            color: 'black'
        }}>
            <div className="container flex justify-between h-16 mx-auto items-center">
                <img className='rounded-full w-[60px] h-[60]' src='https://picsum.photos/200/200' alt='https://picsum.photos/200/200' />
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <Tabs
                        style={{ color: 'white' }}
                        items={[
                            {
                                label: <NavLink style={{ color: 'white' }} to='/home'>Home</NavLink>,
                                key: '1',
                                className: 'text-pink'
                            },
                            {
                                label: <NavLink style={{ color: 'white' }} to='/contact'>Contact</NavLink>,
                                key: '2',

                            },
                            {
                                label: <NavLink style={{ color: 'white' }} to='/news'>News</NavLink>,
                                key: '3',
                            },
                            {
                                label: <NavLink style={{ color: 'white' }} to='/profile'>Thông tin người dùng</NavLink>,
                                key: '4',
                            },
                        ]}
                    />
                </ul>

                <div className="flex items-center md:space-x-4">
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" title="Search" className="p-1 focus:outline-none focus:ring">
                                <svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-100">
                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                                </svg>
                            </button>
                        </span>
                        <input type="search" name="Search" placeholder="Search..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900" />
                    </div>
                    {renderLogin()}

                </div>
                <button title="Open menu" type="button" className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <Select
                    defaultValue="Viet"
                    style={{
                        width: 100,
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 'chi',
                            label: 'Chinese',
                        },
                        {
                            value: 'en',
                            label: 'English',
                        },
                        {
                            value: 'vi',
                            label: 'VietNamese',
                        },
                    ]}
                />
            </div>
        </header>
    )
}
