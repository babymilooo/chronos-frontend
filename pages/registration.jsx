import { useContext, useState } from "react";
import { Context } from "./_app";
import Link from "next/link";
import { RootStoreContext } from "@/app/provider/rootStoreProvider";

const registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const rootStore = useContext(RootStoreContext);
    const { userStore } = rootStore;

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

            <button className="border border-gray-900" onClick={() => userStore.registration(email, password)}>reg</button>
            <Link href="/login" className="underline text-lg mr-2">
                Login
            </Link>
        </div>
    );
};

export default registration;