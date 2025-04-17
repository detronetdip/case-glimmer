import useAuthStore from '@/store/useAuthStore';
import { useState } from 'react';
import './login.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);
    const errorMessage = useAuthStore((state) => state.errorMessage);

    const handleSubmit = (event) => {
        event.preventDefault();
        login(username, password);
        setPassword('');
    };

    return (
        <section className="bg-gray-200 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to <span className="text-effectiv-purple font-bold text-xl mr-6">CMS</span>
                        </h1>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="••••••••"
                                />
                            </div>
                            <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-md">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;