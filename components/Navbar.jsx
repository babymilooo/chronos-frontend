import { useContext, useEffect } from 'react';
import { ModeToggle } from './ThemeSwitcher';
import {
    Popover as MyPopover,
    PopoverContent as MyPopoverContent,
    PopoverTrigger as MyPopoverTrigger
} from '@/components/MyPopover';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { RootStoreContext } from '@/app/provider/rootStoreProvider';
import Link from 'next/link';
import Router from 'next/router';
import UserService from '@/app/services/UserService';
import { observer } from 'mobx-react-lite';

const Navbar = observer(() => {
    const rootStore = useContext(RootStoreContext);
    const { userStore, holidaysStore } = rootStore;
    const id = userStore.user.id;

    const handleLogout = async () => {
        await userStore.logout();
        await holidaysStore.clearHolidays();
    }

    return (
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-background text-foreground border-b border-foreground2 lg:py-2 px-4 lg:px-8">
            <div className="flex w-full flex-wrap items-center justify-between">
                <Link href="/calendar" passHref>
                    <div className="cursor-pointer flex items-center">
                        <img
                            className="me-2 bg-white rounded-xl border-2 border-solid border-black"
                            src="/images/logo.svg"
                            alt="Calendar Logo"
                            style={{ height: '40px', width: '40px' }}
                            loading="lazy"
                        />
                        <h1 className="text-xl font-bold">Calendar</h1>
                    </div>
                </Link>
                <div className="flex gap-4">
                    <ModeToggle />
                    <MyPopover>
                        <MyPopoverTrigger asChild>
                            <img src={`http://localhost:5001/api/user/avatar/${userStore.user.image}`} alt={userStore.user.name} className="h-10 w-10 rounded-full object-cover" />
                        </MyPopoverTrigger>
                        <MyPopoverContent className="rounded-3xl border border-foreground2 shadow-lg mr-8" align="start">
                            <Link href={`/users/${userStore.user.id}`} className="flex items-center bg-background2 rounded-t-3xl border-b border-foreground2 p-4">
                                <img src={`http://localhost:5001/api/user/avatar/${userStore.user.image}`} alt={userStore.user.name} className="h-10 w-10 rounded-full object-cover" />
                                <div className='ml-3'>
                                    <p className="font-bold text-lg">{userStore.user.username}</p>
                                    <p className="text-neutral-500">{userStore.user.email}</p>
                                </div>
                            </Link>

                            <div className="p-4">
                                <Link href={`/users/${userStore.user.id}/friends`} className="block mb-2 hover:bg-background2 p-3 rounded-lg">
                                    Friends
                                </Link>
                                <Link href={`/users/${userStore.user.id}/settings`} className="block mb-2 hover:bg-background2 p-3 rounded-lg">
                                    Settings
                                </Link>

                                <div onClick={handleLogout} className="flex items-start w-full mb-2 hover:bg-red-500 hover:text-white p-3 rounded-lg">
                                    Logout
                                </div>
                            </div>

                        </MyPopoverContent>
                    </MyPopover>
                </div>
            </div>
        </nav >
    );
});

export default Navbar;