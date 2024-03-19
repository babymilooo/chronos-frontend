import React, { useContext, useEffect, useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, Image } from "@nextui-org/react";
import ThemeSwitcher from './ThemeSwitcher';
import { RootStoreContext } from '../provider/rootStoreProvider';
import Router from 'next/router';
import AuthService from '../services/AuthService';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/popover/popover';


const MyNavbar = () => {
    const rootStore = useContext(RootStoreContext);
    const { userStore, holidaysStore } = rootStore;

    const handleLogout = async () => {
        await userStore.logout();
        await holidaysStore.clearHolidays();
    }

    return (
        <Navbar className="bg-bkg text-content border-b-1 border-content2">
            <NavbarBrand onClick={() => { Router.push('/calendar') }} className="cursor-pointer">
                <Image
                    width={40}
                    height={40}
                    alt="Logo"
                    src="/images/logo.svg"
                    className="border-2 border-solid border-black bg-white rounded-xl cursor-pointer"
                />
                <p className="ml-2 text-xl font-bold cursor-pointer">Calendar</p>
            </NavbarBrand>

            <NavbarContent justify="end">
                <ThemeSwitcher />

                <Popover side="bottom" align="end" sideOffset={10}>
                    <PopoverTrigger>
                        <Avatar
                            className="cursor-pointer"
                            color="secondary"
                            size="sm"
                            src={userStore.user.image}
                        />
                    </PopoverTrigger>
                    <PopoverContent className="rounded-3xl">
                        <div>
                            <div className="flex items-center bg-bkg2 rounded-t-3xl border-b border-content2 p-4">
                                <Avatar
                                    className="cursor-pointer"
                                    color="secondary"
                                    size="sm"
                                    src={userStore.user.image}
                                />
                                <div className="ml-2">
                                    <p className="font-bold text-lg">{userStore.user.username}</p>
                                    <p className="text-neutral-500">{userStore.user.email}</p>
                                </div>
                            </div>
                            <div className="m-4">
                                <Link href="/users/friends" className="block mb-2">Friends</Link>
                                <Link href="/users/settings" className="block mb-2">Settings</Link>
                                <Button
                                    color="error"
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </NavbarContent>

        </Navbar>
    );
};

export default MyNavbar;