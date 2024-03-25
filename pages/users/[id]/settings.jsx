import { useContext, useEffect, useState } from 'react';
import UserService from '@/app/services/UserService';
import { useRouter } from 'next/router';
import { RootStoreContext } from '@/app/provider/rootStoreProvider';
import Navbar from '@/components/Navbar';
import ToastService from '@/app/services/ToastService';

const UserPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({ username: '', email: '', bio: '', image: '' });
    const [isFriend, setIsFriend] = useState(false);
    const [loading, setLoading] = useState(true);

    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;

    useEffect(() => {
        const fetchUser = async () => {
            const { id } = router.query;

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

        fetchUser();
    }, [router.query]);

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
        setLoading(true);
    
        const formData = new FormData();
    
        if (user.imageFile) {
            formData.append("image", user.imageFile);
        }
    
        formData.append("id", user.id);
        formData.append("username", user.username);
        formData.append("bio", user.bio);
    
        try {
            const updatedUser = await UserService.updateUser(user.id, formData);
            rootStore.userStore.setUser(updatedUser);
    
            ToastService("Profile updated successfully", 200);
        } catch (e) {
            console.error("Error updating user:", e);
            ToastService("Server error while saving changes");
        }
    
        setLoading(false);
    };    
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 flex flex-col justify-center items-center lg:items-start">
                        <div className="relative w-48 h-48 bg-gray-200 flex justify-center items-center overflow-hidden rounded-full">
                            <img
                                src={user.image}
                                alt={`${user.username}`}
                                className="object-cover w-full h-full"
                            />
                            <label htmlFor="image-upload" className="absolute inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-25 cursor-pointer">
                                <span className="text-white text-sm">Change Image</span>
                            </label>
                            <input
                                id="image-upload"
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                    <div className="flex flex-col lg:flex-row gap-4 mb-4">
                        <div className="flex-1">
                        <label className="text-gray-600">Username</label>
                        <input
                            type="text"
                            value={user.username}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            onChange={handleUsernameChange}
                        />
                        </div>

                        <div className="flex-1">
                        <label className="text-gray-600">Email</label>
                        <div className="w-full p-2 rounded mt-1">
                            {user.email}
                        </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="text-gray-600">Bio</label>
                        <textarea
                        value={user.bio}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                        onChange={handleBioChange}
                        ></textarea>
                    </div>

                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserPage;