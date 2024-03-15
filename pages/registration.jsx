import { useContext, useState } from "react";
import Link from "next/link";
import { RootStoreContext } from "@/app/provider/rootStoreProvider";
import { Button, Image, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "@/app/components/images/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/app/components/images/EyeFilledIcon";
import Router from "next/router";

const registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const handleRegistration = async () => {
        Router.push('/activateAccount');
        const result = await userStore.registration(email, password);
        if (result) {
            localStorage.setItem('emailForActivation', email);
        } else {
            console.error('Ошибка регистрации');
        }
    }
    return (
        <div className="bg-gradient-to-r from-rose-500 to-purple-900 h-screen flex items-end">
            <div className="w-1/3 h-3/4 bg-bkg text-content rounded-t-[45px] mt-auto ml-15p">
                <div className="flex items-center mt-10 ml-10">
                    <Image
                        width={40}
                        height={40}
                        alt="Logo"
                        src="/images/logo.svg"
                        className="border-2 border-solid border-black bg-white rounded-xl"
                    />
                    <p className="ml-2 text-xl font-bold">Calendar</p>
                </div>
                <p className="flex items-center justify-center text-4xl font-bold mt-10">Sign Up</p>
                <div className="flex flex-col items-center justify-center h-auto mt-10">
                    <Input
                        isClearable
                        type="email"
                        label="Email"
                        variant="bordered"
                        placeholder="Enter your email"
                        defaultValue="junior@nextui.org"
                        onClear={() => console.log("input cleared")}
                        className="max-w-xs"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        variant="bordered"
                        placeholder="Enter your password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="max-w-xs mt-4"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button color="default" variant="bordered" onClick={handleRegistration} className="mt-4 hover:border-content">
                        Sign Up
                    </Button>
                    <p className="mt-3"> Already have an account?
                        <Link href="/login" className=" hover:underline font-bold ml-1">
                            Login
                        </Link>
                    </p>
                    <Link href="/activateAccount">asdasd</Link>
                </div>
            </div>
        </div>
    );
};

export default registration;