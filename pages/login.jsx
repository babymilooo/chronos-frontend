import { useContext, useEffect, useState } from "react";
import { Context } from "./_app";
import Router from "next/router";
import Link from "next/link";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "@/app/provider/rootStoreProvider";

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;

    useEffect(() => {
        if (!userStore.isLoading) {
            Router.push('/calendar');
        }
    }
        , [userStore.isLoading]);

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

    return (
        <div>
            <input
                className="border border-gray-900"
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            <input
                className="border border-gray-900"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
            <button className="border border-gray-900" onClick={handleLogin}>Login</button>
            <Link href="/registration" className="underline text-lg">
                Registration
            </Link>
        </div>
    );
};

export default observer(login);