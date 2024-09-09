import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth !bg-transparent">
      {children}
    </main>
  )
}

export default Layout