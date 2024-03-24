import React from 'react';
import { ModeToggle } from './ThemeSwitcher';
const Navbar = () => {
    return (
        <nav
            className="relative flex w-full flex-wrap items-center justify-between bg-background text-foreground border-b border-foreground2 lg:py-4">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                <div>
                    <a className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0">
                        <img
                            className="me-2 bg-white rounded-xl border-2 border-solid border-black"
                            src="images/logo.svg"
                            style={{ height: '20px' }} // Corrected style attribute
                            alt="TE Logo"
                            loading="lazy" />
                    </a>
                </div>
                <div className="ms-2">
                    <span className="text-xl font-medium text-black dark:text-white">Navbar</span>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;