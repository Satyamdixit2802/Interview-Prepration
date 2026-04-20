import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const LogIn = () => {
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await handleLogin({ email, password })
      navigate('/')
    } catch (error) {
      toast.error("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Toaster />
      {loading ? (
        <div className="mx-auto flex min-h-[16rem] w-full max-w-sm items-center justify-center rounded-[2rem] border border-white/10 bg-slate-950/40 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-400/90 border-t-transparent" />
        </div>
      ) : (
        <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 shadow-[0_28px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative hidden overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,63,134,0.28),_transparent_38%),linear-gradient(180deg,_rgba(19,24,39,0.94),_rgba(11,16,27,0.98))] p-8 lg:flex lg:flex-col lg:justify-between xl:p-10">
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl" />
            <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-pink-200/80">
                Resume Shortner
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-white">
                Step back into your
                <span className="mt-2 block bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
                  interview command center
                </span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-8 text-slate-300">
                Organize your resume, match it against real job descriptions,
                and generate a sharper preparation plan before the next round.
              </p>
            </div>


          </div>

          <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="mx-auto w-full max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-200/80">
                Welcome Back
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                Log In
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Continue where you left off and generate your next custom
                interview plan.
              </p>

              <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-100">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Enter your email address"
                    className="rounded-2xl border border-white/8 bg-slate-800/90 px-4 py-3.5 text-sm text-white outline-none transition hover:border-white/15 focus:border-pink-400/40 focus:ring-4 focus:ring-pink-500/15"
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-100">Password</label>
                  <input
                    type="password"
                    name="pass"
                    id="pass"
                    required
                    placeholder="Enter password"
                    className="rounded-2xl border border-white/8 bg-slate-800/90 px-4 py-3.5 text-sm text-white outline-none transition hover:border-white/15 focus:border-pink-400/40 focus:ring-4 focus:ring-pink-500/15"
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                </div>

                <button className="mt-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 px-5 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_16px_34px_rgba(255,63,134,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(255,63,134,0.34)] active:translate-y-0.5 active:scale-[0.985]">
                  Log In
                </button>
              </form>

              <p className="mt-6 text-sm text-slate-300 sm:text-base">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-pink-200 transition hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,63,134,0.35)] active:text-pink-100"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LogIn
