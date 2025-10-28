import React from "react"

interface AuthLayoutProps {
  title: string,
  subtitle?: string,
  children: React.ReactNode,
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 transform transition-all hover:scale-[1.02]">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-center text-gray-500 mb-6">{subtitle}</p>
        )}

        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </div>
  )
}
