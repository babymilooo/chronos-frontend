import { RootStoreContext } from '@/app/provider/rootStoreProvider';
import AuthService from '@/app/services/AuthService';
import { InputOTPPattern } from '@/components/MyInputOTP';
import { Button } from '@/components/ui/button';
import Router from 'next/router';
import React, { useContext, useState } from 'react';

const ActivateAccount = () => {
    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;

    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('emailForActivation');
        try {
            const response = await AuthService.activateAccount(email, password);
            if (response && response.status === 200) {
                Router.push('/calendar');
                userStore.isLoading = false;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex flex-col h-screen justify-center items-center bg-bkg text-content">
            <div className='flex items-center border-2 border-solid border-content rounded-2xl p-2 mb-2'>
                {/* <Image
                    width={40}
                    height={40}
                    alt="Logo"
                    src="/images/logo.svg"
                    className="border-2 border-solid border-black bg-white rounded-xl"
                /> */}
                <p className="ml-2 text-xl font-bold">Calendar</p>
            </div>
            <p className="text-4xl font-bold">Activate Account</p>
            <div className="flex flex-col items-center">

                <p className="text-center mt-4 mb-5">Check your email and enter the code we just sent to you</p>
            </div>
            <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                <InputOTPPattern onChange={(value) => setPassword(value)} />
                <div className="flex items-center justify-center mt-4">
                    <p>Didn't receive the code?</p>
                    <p className="text-content hover:underline cursor-pointer ml-1 font-bold">Resend</p>
                </div>
                <Button color="default" variant="bordered" type='submit' className="mt-4 hover:border-content">
                    Activate
                </Button>
            </form>
        </div>
    );
};

export default ActivateAccount;
