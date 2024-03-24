import { useContext, useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "@/app/provider/rootStoreProvider";

import { Input } from '@/components/ui/input';
import CustomToastContainer from "@/components/CustomToastContainer";
import { Button } from "@/components/ui/button";

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const rootStore = useContext(RootStoreContext);
    const { userStore, holidaysStore } = rootStore;
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const toggleVisibility = () => setIsVisible(!isVisible);

    useEffect(() => {
        if (!userStore.isLoading) {
            holidaysStore.getHolidays(userStore.currentYear);
            Router.push('/calendar');
        } else {
            setIsLoading(false);
        }
    }, [userStore.isLoading]);

    const handleLogin = async () => {
        const result = await userStore.login(email, password); // Ваша функция логина
        if (result) {
            // Если логин успешен, перенаправляем на целевую страницу
            Router.push('/calendar'); // Укажите здесь путь к странице, на которую нужно перенаправить пользователя
        } else {
            // Обработка случая, когда логин неуспешен
            console.error('Ошибка входа');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <CustomToastContainer />
            <div className="bg-gradient-to-r from-rose-500 to-purple-900 h-screen flex items-end">
                <div className="w-1/3 h-3/4 bg-bkg text-content rounded-t-[45px] mt-auto ml-15p">
                    {/* <div className="flex items-center mt-10 ml-10">
                        <Image
                            width={40}
                            height={40}
                            alt="Logo"
                            src="/images/logo.svg"
                            className="border-2 border-solid border-black bg-white rounded-xl"
                        />
                        <p className="ml-2 text-xl font-bold">Calendar</p>
                    </div> */}
                    <p className="flex items-center justify-center text-4xl font-bold mt-10">Login</p>
                    <div className="flex flex-col items-center justify-center h-auto mt-10">
                        <div className="w-1/2 flex flex-col items-center">
                            <Input
                                type="email"
                                label="Email"
                                className="w-full"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Input
                                type="Password"
                                className="w-full mt-4"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Button color="default" variant="bordered" onClick={handleLogin} className="w-full mt-4 hover:border-content px-4 py-2">
                                Login
                            </Button>
                            <p className="mt-3"> Don't have an account?
                                <Link href="/registration" className=" hover:underline font-bold ml-1">Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default observer(login)
