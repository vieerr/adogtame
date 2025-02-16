"use client";

import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { signIn, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    data: session,
  } = useSession();

  return (
    <div>
      {session ? (
        <div className="card max-w-md shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-lg md:text-xl">Sign In</h2>
            <p className="text-xs md:text-sm">
              Enter your email below to login to your account
            </p>
            <div className="form-control space-y-4 mt-4">
              <div>
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="password"
                  autoComplete="password"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember" className="label cursor-pointer">
                  <span className="label-text">Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  await signIn.email({ email, password });
                  setLoading(false);
                }}
              >
                {loading ? <FaSpinner className="animate-spin" /> : "Login"}
              </button>
            </div>
          </div>
          <div className="card-footer border-t">
            <p className="text-center text-xs text-neutral-500 w-full">
              Powered by{" "}
              <Link
                href="https://better-auth.com"
                className="underline"
                target="_blank"
              >
                <span className="text-orange-500">better-auth.</span>
              </Link>
            </p>
          </div>
        </div>
      ) : (
        redirect("/perros")
      )}{" "}
    </div>
  );
}
