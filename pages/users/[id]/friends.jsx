import React, { useContext, useEffect, useState, useCallback } from 'react';
import UserService from '@/app/services/UserService';
import Navbar from '@/components/Navbar';
import { RootStoreContext } from '@/app/provider/rootStoreProvider';
import { debounce } from 'lodash';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { ScrollArea } from '@/components/ui/scroll-area';
import CustomToastContainer from '@/components/CustomToastContainer';
import { toast } from 'react-toastify';

const FriendsPage = observer(() => {
    const { userStore } = useContext(RootStoreContext);
    const [potentialFriends, setPotentialFriends] = useState([]);
    const [displayedFriends, setDisplayedFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPotentialFriends = useCallback(async () => {
        try {
            let response = await UserService.getPotentialFriends(userStore.user.id);
            setPotentialFriends(response);
            setDisplayedFriends(response);
        } catch (error) {
            console.error('Error getting potential friends:', error);
        }
    }, [userStore.user.id]);

    useEffect(() => {
        setLoading(true);
        fetchPotentialFriends();
        setLoading(false);
    }, []);

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, []);

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        debouncedSearch(term);
    };

    const debouncedSearch = useCallback(
        debounce((term) => {
            if (!term.trim()) {
                setDisplayedFriends(potentialFriends);
                return;
            }
            const filteredFriends = potentialFriends.filter(user =>
                user.username.toLowerCase().includes(term.toLowerCase())
            );
            setDisplayedFriends(filteredFriends);
        }, 300),
        [potentialFriends]
    );

    const handleAddFriend = async (userId) => {
        try {
            const name = displayedFriends.find(user => user.id === userId).username;
            await UserService.addFriend(userId);
            toast.success(`Friend ${name} added successfully`);
            fetchPotentialFriends();
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <CustomToastContainer />
            <div className="container mx-auto p-4 mt-10">
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-4xl border border-gray-300 shadow-xl rounded-lg p-4">
                        <input
                            type="text"
                            value={searchTerm}
                            placeholder="Search for new friends..."
                            className="w-full p-2 border-b mb-4 rounded focus:outline-none focus:border-indigo-700"
                            onChange={handleSearchChange}
                        />
                        <div className='overflow-auto'>
                            <ScrollArea>
                                {displayedFriends.map(user => (
                                    <div key={user.id} className="flex items-center justify-between p-2 border-b">
                                    <Link href={`/users/${user.id}`} passHref>
                                        <div className="flex items-center gap-4">
                                            <img src={`http://localhost:5001/api/user/avatar/${user.image || 'default.png'}`} alt={user.username} className="h-10 w-10 rounded-full object-cover" />
                                            <div className="text-sm font-medium">{user.username}</div>
                                        </div>
                                    </Link>
                                    <button onClick={() => handleAddFriend(user.id)} className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded">
                                        Add Friend
                                    </button>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default FriendsPage;