import { useContext, useEffect, useState } from 'react';
import UserService from '@/app/services/UserService';
import { useRouter } from 'next/router';
import { RootStoreContext } from '@/app/provider/rootStoreProvider';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import ToastService from '@/app/services/ToastService';
import Link from 'next/link';
import CustomToastContainer from '@/components/CustomToastContainer';
import { Router } from 'lucide-react';
import { set } from 'lodash';

const SettingsPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;
    const id = userStore.user.id;
    const { id: idFromQuery } = router.query;
    const [user, setUser] = useState({
        ...userStore.user,
        image: userStore.user.image ? `http://localhost:5001/api/user/avatar/${userStore.user.image}` : null,
    });

    useEffect(() => {
        if (!id) {
            router.push(`/calendar`);
        } else if(idFromQuery !== id) {
            router.push(`/users/${id}/settings`);
        }
        setLoading(false);
      }, []);

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
        const formData = new FormData();

        if (user.image) {
            formData.append("image", user.imageFile);
        }

        formData.append("username", user.username);
        formData.append("bio", user.bio);

        const updatedUser = await UserService.updateUser(id, formData);
        userStore.setUser(updatedUser);
        ToastService("User data updated successfully", 200);
    };    
    
    if (loading || !userStore.user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <CustomToastContainer />
            <div className="container mx-auto p-4 mt-10">
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-2xl overflow-hidden rounded-lg">
                        <div className="relative border border-foreground2 bg-background rounded-t-lg overflow-hidden p-6">
                            <div className="flex justify-center">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                                    <img className="object-cover w-full h-full" src={user.image} alt="User avatar" />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
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
                                    className="text-lg rounded-md block w-full bg-background2 focus:outline-none p-2" 
                                    onChange={handleUsernameChange} 
                                    placeholder="Enter username" 
                                />
                                <textarea 
                                    value={user.bio}
                                    onChange={handleBioChange} 
                                    className="w-full mt-4 block w-full rounded-md bg-background2 min-h-[3rem] focus:outline-none p-2"
                                    placeholder="Your bio"
                                />
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-center bg-foreground2 p-4">
                            <Link href="/calendar" passHref>
                                <Button variant="outline" className="border-none bg-foreground2">
                                    Back to Calendar
                                </Button>
                            </Link>
                            <Link href={`/users/${user.id}`} passHref>
                                <Button variant="outline" className="border-none bg-foreground2">
                                    My Profile
                                </Button>
                            </Link>
                            <Button onClick={handleSubmit} variant="outline" className="border-none bg-foreground2">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsPage;