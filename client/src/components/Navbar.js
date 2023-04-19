import React from 'react';
import { BsBell } from 'react-icons/bs';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-between flex-wrap p-6 divide-x-2">
      <div className="flex items-center flex-shrink-0 text-white mr-3">
        <BsBell className="h-8 w-8 mr-2" />
        <span className="font-semibold text-xl tracking-tight">Philly Insights</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow text-center">
          <a className="block m-0 lg:inline-block lg:mt-0 text-lg text-gray-500 mr-4">
            Home
          </a>
          <a href="blocks" className="block m-0 lg:inline-block text-lg text-white hover:text-gray-400 mr-4">
            Blocks
          </a>
          <a href="property" className="block m-0 lg:inline-block  text-lg text-white hover:text-gray-400 mr-4">
            Property
          </a>
        </div>
      </div>
    </nav>
  );
}
