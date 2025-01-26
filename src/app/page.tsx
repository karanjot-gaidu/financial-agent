"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (isLogin) {
      try {
        router.push(`/survey?email=${encodeURIComponent(email)}`);
      } catch (error) {
        console.error("Login failed:", error);
        alert("Failed to log in. Please try again.");
      }
    } else {
      try {
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const phone = formData.get("phone") as string;
        const countryCode = formData.get("countryCode") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        console.log(firstName, lastName, phone, countryCode, confirmPassword);

        // Validate form inputs
        if (!firstName || !lastName || !email || !password || !phone || !countryCode) {
          alert("All fields are required!");
          return;
        }

        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        // Check if the user already exists
        const checkUser = async (email: string) => {
          const response = await fetch("/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "checkUserExists", email }),
          });
        
          const data = await response.json();
          return data.exists;
        };
        
        const userExists = await checkUser(email);
        if (userExists) {
          alert("User with this email already exists!");
          return;
        }

        // insert user into database

        const createUser = async (user: {
          firstName: string;
          lastName: string;
          email: string;
          password: string;
          phone: string;
          countryCode: string;
        }) => {
          const response = await fetch("/api/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "createUser", ...user }),
          });
        
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Failed to create user");
          }
        
          return data.message;
        };
        
        await createUser({
          firstName,
          lastName,
          email,
          password,
          phone,
          countryCode
        });

        alert("Account created successfully! Please log in.");
        setIsLogin(true); // Switch to login form
      } catch (error) {
        console.error("Sign up failed:", error);
        alert("Failed to create an account. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-100 mb-4">
          {isLogin ? "Login" : "Create Account"}
        </h1>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-md ${
              !isLogin
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-md ${
              isLogin
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-400"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-400"
                >
                  Phone Number
                </label>
                <div className="flex space-x-2">
                  <select
                    id="countryCode"
                    name="countryCode"
                    className="block w-20 rounded-md border border-gray-600 bg-gray-700 px-2 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="+1">+1</option>
                    <option value="+91">+91</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                    <option value="+81">+81</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="123-456-7890"
                    className="flex-1 rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-400"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••"
                className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 shadow-sm text-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
