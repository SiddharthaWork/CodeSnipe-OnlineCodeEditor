import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { API_BASE_URL } from "../../helper"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isFormFocused, setIsFormFocused] = useState(false)
  const [error, setError] = useState("")
  const nav = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(API_BASE_URL + "signup", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: name,
          password: password
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        nav("/login")
      } else {
        setError(data.message);
      }
    }
    catch (error) {
      toast.error("Server Error Occured");
    }
  }

  // Handle focus events for the entire form
  const handleFocus = () => setIsFormFocused(true)
  const handleBlur = (e) => {
    // Only blur if we're not focusing on another form element
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFormFocused(false)
    }
  }

  // Button animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.2 } },
  }

  return (
    // Changes the Ui of the Login page
    <div className="flex h-full min-h-[80vh] w-full flex-col items-center justify-center bg-black p-4 text-white">
      <div className="relative w-full max-w-md">
        {/* Card with animated border */}
        <div className="relative">
          {/* Card content with border */}
          <div className="relative rounded-xl overflow-hidden">
            {/* Border animation using SVG */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <rect
                width="100%"
                height="100%"
                fill="none"
                rx="12"
                ry="12"
                strokeWidth="6"
                stroke="#38bdf8"
                strokeDasharray="675 1050"
                strokeDashoffset={isFormFocused ? "0" : "1000"}
                style={{
                  transition: "stroke-dashoffset 0.8s ease-in-out",
                }}
              />
            </svg>

            <motion.div
              className="relative rounded-xl bg-[#1a1a1a]/40 p-8 shadow-xl z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              tabIndex="-1" // Make div focusable but not in tab order
            >
              <div className="mb-6">
                <h1 className="text-center text-2xl font-bold text-white">Sign In</h1>
              </div>
              <div>
                {error && (
                  <p className="text-red-500 text-center">{error}</p>
                )}
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="relative">
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                    User Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="name"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-14 w-full rounded-lg bg-[#252525] px-4 text-white placeholder:font-medium placeholder:text-gray-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 w-full rounded-lg bg-[#252525] px-4 text-white placeholder:font-medium placeholder:text-gray-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative">
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 w-full rounded-lg bg-[#252525] px-4 text-white placeholder:font-medium placeholder:text-gray-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Sign In Button with animation */}
                <motion.button
                  type="submit"
                  className="h-14 w-full rounded-lg bg-sky-400 font-medium text-white shadow-lg shadow-sky-400/20"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Sign In
                </motion.button>
              </form>

              <div className="mt-6 flex justify-center">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-400">Create an account</p>
                  <Link to="/login" className="text-sky-400 hover:underline">
                    SignIn
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp

