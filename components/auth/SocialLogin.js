"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { signIn } from "@/lib/auth-client";

export default function SocialLogin({ redirectTo = "/" }) {
  const [loading, setLoading] = useState(null);

  const handle = async (provider) => {
    setLoading(provider);
    const { error } = await signIn.social({
      provider,
      callbackURL: redirectTo,
      errorCallbackURL: "/login?error=social",
    });
    if (error) {
      toast.error(error.message || `Couldn't sign in with ${provider}. Try email and password instead.`);
      setLoading(null);
    }
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button type="button" className="btn btn-outline" onClick={() => handle("google")} disabled={!!loading}>
        {loading === "google" ? <span className="loading loading-spinner loading-sm" /> : <FcGoogle className="h-5 w-5" />}
        Google
      </button>
      <button type="button" className="btn btn-outline" onClick={() => handle("github")} disabled={!!loading}>
        {loading === "github" ? <span className="loading loading-spinner loading-sm" /> : <FaGithub className="h-5 w-5" />}
        GitHub
      </button>
    </div>
  );
}
