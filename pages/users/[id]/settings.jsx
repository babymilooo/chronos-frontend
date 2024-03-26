import { use, useContext, useEffect, useState } from 'react';
import UserService from '@/app/services/UserService';
import { useRouter } from 'next/router';
import { RootStoreContext } from '@/app/provider/rootStoreProvider';
import Navbar from '@/components/Navbar';
import ToastService from '@/app/services/ToastService';
import Link from 'next/link';

const SettingsPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({ username: '', email: '', bio: '', image: '' });
    const [isFriend, setIsFriend] = useState(false);
    const [loading, setLoading] = useState(true);

    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;

    useEffect(() => {
        const { id } = router.query;

        const fetchUser = async () => {
            if (id) {
                try {
                    const userData = await UserService.getUser(id);
                    setUser(userData);
                    const friendStatus = await UserService.isFriend(id);
                    setIsFriend(friendStatus.isFriend);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
                setLoading(false);
            }
        };

        if (!userStore.user) {
            ToastService("No user data found");
            return;
        }

        if (userStore.user && id !== userStore.user.id) {
            router.push(`/users/${userStore.user.id}/settings`);
            ToastService("You cannot edit another user's settings.");
        }

        fetchUser();
    }, [router.query, userStore]);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setUser((currentUser) => ({ 
                ...currentUser, 
                image: URL.createObjectURL(file),
                imageFile: file
            }));
        }
    };    

    const handleBioChange = (event) => {
        setUser((currentUser) => ({ ...currentUser, bio: event.target.value }));
    };

    const handleUsernameChange = (event) => {
        setUser((currentUser) => ({ ...currentUser, username: event.target.value }));
    };  

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
    
        if (user.imageFile) {
            formData.append("image", user.imageFile);
        }
    
        formData.append("id", user.id);
        formData.append("username", user.username);
        formData.append("bio", user.bio);
    
        try {
            const updatedUser = await UserService.updateUser(user.id, formData);
            userStore.setUser(updatedUser);
            ToastService("Profile updated successfully", 200);
            router.push(`/users/${user.id}`);
        } catch (e) {
            console.error("Error updating user:", e);
            ToastService("Server error while saving changes");
        }
    };    
    
    if (loading || !userStore.user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4 mt-10">
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-2xl shadow overflow-hidden">
                        <div className="relative overflow-hidden p-6">
                            <div className="flex justify-center">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                                    <img className="object-cover w-full h-full" src={user.image} alt="User avatar" />
                                    <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100">
                                        <span className="text-white text-lg">Change Image</span>
                                    </div>
                                    <input 
                                        id="image-upload" 
                                        type="file" 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                                        onChange={handleFileChange} 
                                        accept="image/*,video/*,.gif"
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <input 
                                    type="text" 
                                    value={user.username}
                                    className="text-lg font-semibold text-gray-800 block w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-indigo-700" 
                                    onChange={handleUsernameChange} 
                                    placeholder="Enter username" 
                                />
                                <textarea 
                                    value={user.bio}
                                    onChange={handleBioChange} 
                                    className="w-full mt-4 p-2 text-gray-700 bg-gray-200 rounded min-h-[3rem]" 
                                    placeholder="Your bio"
                                />
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-4 bg-gray-100">
                            <Link href="/calendar" passHref>
                                <span className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 p-2 rounded-md">
                                    Back to Calendar
                                </span>
                            </Link>
                            <Link href={`/users/${user.id}`} passHref>
                                <span className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 p-2 rounded-md">
                                    My Profile
                                </span>
                            </Link>
                            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
    
export default SettingsPage;