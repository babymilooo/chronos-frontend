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
import { Button } from './ui/button';
// import { useRouter } from 'next/router';
// import UserService from '@/app/services/UserService';

const Navbar = () => {
    // const router = useRouter();
    const rootStore = useContext(RootStoreContext);
    const { userStore, holidaysStore } = rootStore;

    // useEffect(() => {
    //     const { id } = router.query;

    //     const fetchUser = async () => {
    //         if (id) {
    //             try {
    //                 const userData = await UserService.getUser(id);
    //                 userStore.setUser(userData);
    //             } catch (error) {
    //                 console.error('Error fetching user data:', error);
    //             }
    //         }
    //     }

    //     fetchUser();
    // }, [userStore.user]);

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
                            <Avatar className="cursor-pointer">
                                <AvatarImage src={userStore.user.image} alt="User avatar" />
                                <AvatarFallback>CN</AvatarFallback> 
                            </Avatar>
                        </MyPopoverTrigger>
                        <MyPopoverContent className="rounded-3xl border border-foreground2 shadow-lg" align="start">
                            <div className="bg-background2">
                                <div className="flex items-center rounded-t-3xl p-4">
                                    <Avatar>
                                        <AvatarImage src={userStore.user.image} alt="User avatar" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Link href={`/users/${userStore.user.id}`} className="ml-2">
                                        <p className="font-bold text-lg">{userStore.user.username}</p>
                                        <p className="text-neutral-500">{userStore.user.email}</p>
                                    </Link>
                                </div>
                                <div className="p-4">
                                    <Link href={`/users/${userStore.user.id}/friends`} className="block mb-2 text-blue-600 hover:bg-blue-50 hover:text-blue-600 p-2 rounded-md">
                                        Friends
                                    </Link>
                                    <Link href={`/users/${userStore.user.id}/settings`} className="block mb-2 text-blue-600 hover:bg-blue-50 hover:text-blue-600 p-2 rounded-md">
                                        Settings
                                    </Link>
                                    <Button
                                        className="w-full text-red-600 hover:bg-red-50 hover:text-red-600 p-2 rounded-md"
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
        </nav>
    );
};

export default Navbar;