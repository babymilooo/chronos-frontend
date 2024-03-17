import React, { useContext, useEffect, useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem, Image } from "@nextui-org/react";
import ThemeSwitcher from './ThemeSwitcher';
import { RootStoreContext } from '../provider/rootStoreProvider';
import Router from 'next/router';

const MyNavbar = () => {
    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;

    if (userStore.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Navbar className="bg-bkg text-content border-b-1">
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
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src={userStore.user.image}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        {/* <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold text-lg">{userStore.user.username}</p>
                            <p className="font-semibold text-neutral-600">{userStore.user.email}</p>
                        </DropdownItem> */}
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        <DropdownItem key="team_settings" onClick={() => { Router.push('/users/friends') }}>Friends</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>

        </Navbar>
    );
};

export default MyNavbar;