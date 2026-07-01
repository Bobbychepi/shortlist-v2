"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // TODO: connect real auth here
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#08090f] flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
      >
        <h1 className="text-3xl font-bold text-white">Create account</h1>
        <p className="mt-2 text-white/50">Start analyzing resumes with Shortlist.</p>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40"
          />
        </div>

        <button className="mt-6 w-full rounded-xl bg-white px-4 py-3 font-semibold text-black hover:bg-white/90">
          Sign up
        </button>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have an account?{" "}
          <Link href="/signin" className="text-white underline">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}