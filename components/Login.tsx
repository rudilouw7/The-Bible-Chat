import React, { useState } from 'react';

interface LoginProps {
  onLogin: (password: string) => void;
  error: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, error }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-stone-200">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-stone-800 mb-2">The Bible Chat</h1>
          <p className="text-stone-600">Enter password to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition ${
                error ? 'border-red-500' : 'border-stone-300'
              }`}
              placeholder="Enter password"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">
                Incorrect password. Please try again.
              </p>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-stone-500">
            Talk with biblical figures using AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

