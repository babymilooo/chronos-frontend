import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Avatar } from './ui/avatar';

// Эти стили применят Tailwind классы через CSS переменные
const SelectUsers = ({ users, setUsers }) => {
    console.log(users);
    // Состояние для хранения текущей темы
    const [theme, setTheme] = useState(localStorage.getItem('active') || 'dark');

    useEffect(() => {
        // Функция для обновления темы
        const handleThemeChange = () => {
            const newTheme = localStorage.getItem('theme') || 'light';
            setTheme(newTheme);
        };

        // Подписка на событие 'storage', которое срабатывает, когда что-то меняется в localStorage
        window.addEventListener('storage', handleThemeChange);

        // Вызов функции на случай, если тема была изменена в другой вкладке
        handleThemeChange();

        // Отписка от события при размонтировании компонента
        return () => {
            window.removeEventListener('storage', handleThemeChange);
        };
    }, []);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? 'rgb(10, 10, 10)' : 'white',
            color: theme === 'dark' ? 'rgb(204, 204, 204)' : 'rgb(10, 10, 10)',
            // Другие стили...
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? 'rgb(10, 10, 10)' : 'white',
            // Другие стили...
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
                ? (theme === 'dark' ? 'rgb(51, 51, 51)' : 'rgb(230, 230, 230)')
                : (theme === 'dark' ? 'rgb(10, 10, 10)' : 'white'),
            color: theme === 'dark' ? 'rgb(204, 204, 204)' : 'rgb(10, 10, 10)',

            // Другие стили...
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: theme === 'dark' ? 'rgb(51, 51, 51)' : 'rgb(230, 230, 230)', // Пример для темной и светлой темы
            color: theme === 'dark' ? 'white' : 'black',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: theme === 'white', // Здесь ваш кастомный цвет текста
        }),
        // Дополнительные стили для других составляющих, если это необходимо
    };

    const formatOptionLabel = ({ value, label, avatarUrl, email }) => (
        // <div style={{ display: 'flex', alignItems: 'center' }}>
        //     <img src={`http://localhost:5001/api/user/avatar/${avatarUrl || "default.png"}`} alt={label} style={{ width: '20px', height: '20px', marginRight: '10px' }} />
        //     <span>{label}</span>
        //     <span>{email}</span>
        // </div>
        <div className="flex items-center rounded-xl mt-1 hover:bg-foreground2 p-1">
            <Avatar>
                <img src={`http://localhost:5001/api/user/avatar/${avatarUrl || "default.png"}`} alt={label} />
            </Avatar>
            <p className="ml-2 font-bold">{label}</p>
        </div>
    );

    const handleChange = (selectedOptions) => {
        // Вызов функции setCoOwners, предоставленной родительским компонентом
        setUsers(selectedOptions.map(option => option.value) || []); // Если ничего не выбрано, передайте пустой массив
    }

    return (
        <Select
            isMulti
            name="colors"
            options={users}
            styles={customStyles}
            onChange={handleChange}
            classNamePrefix="select"
            formatOptionLabel={formatOptionLabel}
        />
    );
};


export default SelectUsers;
