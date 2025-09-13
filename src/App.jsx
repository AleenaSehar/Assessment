import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import UsersList from './components/UsersList'
import UserDetail from './components/UserDetail'
import Posts from './components/Posts'

export default function App() {
  return (
    <div className="app min-h-screen bg-gray-50">
      {/* Navbar at the top */}
      <Navbar />

      <main className="p-6">
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </main>
    </div>
  )
}
