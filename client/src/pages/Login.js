import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';
import Modal from 'react-modal';

const handleLogin = async (username, password) => {
    const response = await fetch(`http://localhost:8000/api/login?username=${username}&password=${password}`);
    if (response.status === 200) {
        return true;
    }
    return false;
}

const handleRegister = async (username, password) => {
    const response = await fetch(`http://localhost:8000/api/register?username=${username}&password=${password}`, {method: "POST"});
    console.log(response);
    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password).then((response) => {
        if (response) {
            // Navigate to the "/home" route on successful login
            navigate('/home');
        } else {
            alert('Login failed!');
        }
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    handleRegister(username, password).then((response) => {
      if (response) {
        setShowModal(false);
      } else {
        alert('Username already taken!');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Username
              </label>
              <input
                id="email-address"
                name="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-white hover:text-blue-200">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
            <div className="text-sm text-center mt-4">
        <span className="text-white">Don't have an account?</span>
        <a href="#" className="font-medium text-white ml-1 hover:text-blue-200" onClick={() => setShowModal(true)}>
          Register
        </a>
      </div>
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} className="fixed inset-0 z-50 overflow-y-auto" ariaHideApp={false}>
  <div className="flex items-center justify-center min-h-screen">
    <div className="bg-white rounded-lg w-full sm:w-3/4 lg:w-1/2">
      <div className="flex justify-between px-4 py-2 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Register</h2>
        <button className="text-gray-700 hover:text-gray-900" onClick={() => setShowModal(false)}>
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M6.002 6l11.996 12m0-12L6.002 18"></path>
          </svg>
        </button>
      </div>
      <div className="px-4 py-6">
        <form onSubmit={handleRegisterSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="border rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border rounded-md px-4 py-2 w-full" />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Register</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</Modal>
          </form>
        </div>
      </div>
    )
  }