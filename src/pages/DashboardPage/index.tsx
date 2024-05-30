import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaUser, FaTable } from 'react-icons/fa';
const DashboardPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Small Left Menu */}
      <aside className="bg-gray-800 text-white w-16 p-4">
        {/* Left Menu Content */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold"><FaUser /></h1>
        </div>
        <nav>
          <ul>
            <li className="mb-2">
              <Link className=" hover:underline" to={'/dashboard/recipes'}>
                <FaTable />
              </Link>
            </li>
            {/* Add more menu items */}
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4">
        {/* Header */}
        <header className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-semibold">Welcome to Food Recipes</h1>
          {/* <h2 className="text-2xl font-semibold">Start creating your recipes here.</h2> */}
        </header>

        {/* Main Content */}
        <div className="mt-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
