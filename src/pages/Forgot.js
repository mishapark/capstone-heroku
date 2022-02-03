import React from "react";

function Forgot() {
  return <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center">CAPSTONE PROJECT</h2>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Forgot your password?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <p>
              Enter your email and we'll send you instructions on how to reset your password.
              </p>
            </p>
          </div>
          <form method="POST">
            <input
              aria-label="Enter your email address"
              className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
              type="text"
              placeholder="Email address"
            />
            <div className="flex items-center justify-between"></div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
  </>;
}

export default Forgot;
