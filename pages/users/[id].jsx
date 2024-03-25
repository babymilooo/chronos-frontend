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
    const [user, setUser] = useState({ id: '', username: '', email: '', bio: '', image: '', friends: [] });
    const [loading, setLoading] = useState(true);

    const rootStore = useContext(RootStoreContext);

    useEffect(() => {
        const fetchUser = async () => {
            const { id } = router.query;
            if (id) {
                try {
                    const userData = await UserService.getUser(id);
                    setUser(userData);
                    let friendsList = await UserService.getFriends(id);
                    friendsList = [...friendsList, ...friendsList, ...friendsList, ...friendsList, ...friendsList, ...friendsList, ...friendsList, ...friendsList];
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

    const handleRemoveFriend = async (friendId) => {
        console.log(`Attempting to remove friend with ID: ${friendId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 mt-10">
                <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6">
                    <div className="w-full lg:w-1/3 bg-white shadow-xl rounded-lg p-6">
                        <div className="mb-4">
                            <div className="relative rounded-full overflow-hidden h-32 w-32 mx-auto">
                                <img
                                    src={user.image || 'https://via.placeholder.com/150'}
                                    alt="Profile"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-gray-600">Username</label>
                                <div className="mt-1 block w-full rounded-md bg-gray-100 text-gray-600 p-2">
                                    {user.username  || 'None'}
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-600">Email</label>
                                <div className="mt-1 block w-full rounded-md bg-gray-100 text-gray-600 p-2">
                                    {user.email  || 'None'}
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-600">Bio</label>
                                <div className="mt-1 block w-full rounded-md bg-gray-100 text-gray-600 p-2">
                                    {user.bio || 'None'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white shadow-xl rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Friends</h3>
                            {user.friends?.length > 0 ? (
                                <ScrollArea className="h-[80vh]">
                                    <div className="space-y-2">
                                        {user.friends.map(friend => (
                                            <div key={friend.id} className="flex items-center justify-between p-2">
                                                <Link href={`/users/${friend.id}`} passHref>
                                                    <div className="flex items-center gap-4">
                                                        <img src={friend.image} alt={friend.name} className="h-10 w-10 rounded-full object-cover" />
                                                        <div className="text-sm font-medium">{friend.name}</div>
                                                    </div>
                                                </Link>
                                                <Button onClick={() => handleRemoveFriend(friend.id)}>Remove Friend</Button>
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