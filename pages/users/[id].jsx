import React, { useContext, useEffect, useState } from 'react';
import UserService from '@/app/services/UserService';
import { useRouter } from 'next/router';
import { RootStoreContext } from '@/app/provider/rootStoreProvider';
import Navbar from '@/components/Navbar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const UserPage = () => {
    const router = useRouter();
    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;
    const { id } = router.query;
    const [user, setUser] = useState({
        id: id,
        username: null,
        email: null,
        bio: null,
        image: null,
        friends: null
    });
    const [loading, setLoading] = useState(true);
    const [isFriend, setIsFriend] = useState(false);
    const isOwnProfile = (user.id === userStore.user.id);

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                try {
                    const pageOfFriend = await UserService.isFriend(id);
                    setIsFriend(pageOfFriend);
                    const userData = await UserService.getUser(id);
                    setUser(userData);
                    let friendsList = await UserService.getFriends(id);
                    friendsList.filter(friend => friend.id !== userStore.user.id);
                    friendsList.sort((a, b) => a.name.localeCompare(b.name));
                    setUser(prevState => ({ ...prevState, friends: friendsList }));
                } catch (error) {
                    console.error('Error fetching user data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchUser();
    }, [router.query]);

    const handleActionFriend = async (friendId, isFriend, e) => {
        if (isFriend) {
            await UserService.removeFriend(friendId);
        } else {
            await UserService.addFriend(friendId);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 mt-10">
                <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6">
                    <div className="w-full lg:w-1/3 border border-foreground2 bg-background shadow-xl rounded-lg p-6">
                        <div className="mb-4">
                            <div className="relative rounded-full overflow-hidden h-32 w-32 mx-auto">
                                <img
                                    src={user.image}
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-neutral-500">Username</label>
                                <div className="mt-1 block w-full rounded-md bg-background2 p-2">
                                    {user.username  || 'None'}
                                </div>
                            </div>
                            <div>
                                <label className="text-neutral-500">Email</label>
                                <div className="mt-1 block w-full rounded-md bg-background2 p-2">
                                    {user.email  || 'None'}
                                </div>
                            </div>
                            <div>
                                <label className="text-neutral-500">Bio</label>
                                <div className="mt-1 block w-full rounded-md bg-background2 p-2">
                                    {user.bio || 'None'}
                                </div>
                            </div>
                            <div>
                                {isOwnProfile ? (
                                    <Link href={`/users/${user.id}/settings`} passHref>
                                        <Button variant="ghost" className="w-full">Edit Profile</Button>
                                    </Link>
                                ) : isFriend ? (
                                    <div onClick={() => handleActionFriend(user.id, true)} variant="ghost" className="flex justify-center items-center w-full hover:bg-red-500 mb-2 hover:text-white p-3 rounded-lg">
                                        Remove Friend
                                    </div>
                                ) : (
                                    <div onClick={() => handleActionFriend(user.id, false)} variant="ghost" className="flex justify-center items-center w-full hover:bg-green-500 mb-2 hover:text-white p-3 rounded-lg">
                                        Add Friend
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3">
                        <div className="border border-foreground2 bg-background shadow-xl rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-neutral-500 mb-4">Friends</h3>
                            {user.friends?.length > 0 ? (
                                <ScrollArea>
                                    <div className="space-y-2">
                                        {user.friends.map(friend => (
                                            <div className="flex mb-4 items-center justify-between border rounded-lg p-2">
                                                <Link key={friend.id} href={`/users/${friend.id}`} passHref className='cursor-grab'>
                                                    <div className="flex items-center gap-4">
                                                        <img src={friend.image} alt={friend.name} className="h-10 w-10 rounded-full object-cover" />
                                                        <div className="text-sm font-medium">{friend.name}</div>
                                                    </div>
                                                </Link>
                                                <div>
                                                    {userStore.user.id === friend.id ? (
                                                        <></>
                                                    ) : friend.isFriend ? (
                                                        <div onClick={() => handleActionFriend(friend.id, true)} variant="ghost" className="w-full hover:bg-red-500 mb-2 hover:bg-red-500 hover:text-white p-3 rounded-lg">
                                                            Remove Friend
                                                        </div>
                                                    ) : (
                                                        <div onClick={() => handleActionFriend(friend.id, false)} variant="ghost" className="w-full hover:bg-green-500 mb-2 hover:bg-red-500 hover:text-white p-3 rounded-lg">
                                                            Add Friend
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            ) : (
                                <div className="text-center">This user does not have friends yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserPage;