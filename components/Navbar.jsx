import { useContext } from 'react';
import { ModeToggle } from './ThemeSwitcher';
import {
    Popover as MyPopover,
    PopoverContent as MyPopoverContent,
    PopoverTrigger as MyPopoverTrigger
} from '@/components/MyPopover';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { RootStoreContext } from '@/app/provider/rootStoreProvider';
import Link from 'next/link';
import { Button } from './ui/button';
import Router from 'next/router';

const Navbar = () => {
    const rootStore = useContext(RootStoreContext);
    const { userStore, holidaysStore } = rootStore;

    const handleLogout = async () => {
        await userStore.logout();
        await holidaysStore.clearHolidays();
    }

    return (
        <nav
            className="relative flex w-full flex-wrap items-center justify-between bg-background text-foreground border-b border-foreground2 lg:py-2">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                <div onClick={() => { Router.push('/calendar') }} className="cursor-pointer mx-2 my-1 flex items-center lg:mb-0 lg:mt-0 ">
                    <img
                        className="me-2 bg-white rounded-xl border-2 border-solid border-black"
                        src="images/logo.svg"
                        style={{ height: '40px' }} // Corrected style attribute
                        alt="TE Logo"
                        loading="lazy" />
                    <h1 className="text-xl font-bold">Calendar</h1>
                </div>
                <div className="ms-2 flex gap-4 mr-8">
                    <ModeToggle />
                    <div className='rounded-t-3xl'>
                        <MyPopover>
                            <MyPopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={userStore.user.image} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </MyPopoverTrigger>
                            <MyPopoverContent className="w-auto p-0 rounded-3xl border" align="start">
                                <div>
                                    <div className="flex items-center bg-background2 rounded-t-3xl border-b border-foreground2 p-4">
                                        <Avatar>
                                            <AvatarImage src={userStore.user.image} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-2">
                                            <p className="font-bold text-lg">{userStore.user.username}</p>
                                            <p className="text-neutral-500">{userStore.user.email}</p>
                                        </div>
                                    </div>
                                    <div className="m-4">
                                        <Link href="/users/friends" className="block mb-2">Friends</Link>
                                        <Link href="/users/settings" className="block mb-2">Settings</Link>
                                        <Button
                                            className="w-full"
                                            onClick={handleLogout}
                                        >
                                            Log Out
                                        </Button>
                                    </div>
                                </div>
                            </MyPopoverContent>
                        </MyPopover>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;