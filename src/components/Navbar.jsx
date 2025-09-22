import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'relative',
      top: '0',
      zIndex: '50',
      background: scrolled 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
        : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      transition: 'all 0.5s ease',
      boxShadow: scrolled 
        ? '0 10px 30px rgba(0,0,0,0.3)' 
        : '0 5px 20px rgba(0,0,0,0.2)',
      backdropFilter: 'blur(10px)',
      borderBottom: '2px solid rgba(255,255,255,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        height: '70px'
      }}>
        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              background: isActive('/') 
                ? 'rgba(255,255,255,0.25)' 
                : 'transparent',
              color: 'white',
              border: '2px solid',
              borderColor: isActive('/') 
                ? 'rgba(255,255,255,0.4)' 
                : 'transparent',
              backdropFilter: 'blur(10px)',
              boxShadow: isActive('/') 
                ? '0 8px 25px rgba(0,0,0,0.2)' 
                : 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.3)'
              e.target.style.transform = 'translateY(-2px) scale(1.05)'
              e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)'
              e.target.style.borderColor = 'rgba(255,255,255,0.6)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isActive('/') ? 'rgba(255,255,255,0.25)' : 'transparent'
              e.target.style.transform = 'translateY(0) scale(1)'
              e.target.style.boxShadow = isActive('/') ? '0 8px 25px rgba(0,0,0,0.2)' : 'none'
              e.target.style.borderColor = isActive('/') ? 'rgba(255,255,255,0.4)' : 'transparent'
            }}
          >
            <span style={{ fontSize: '20px' }}>👥</span>
            <span>Users</span>
            {isActive('/') && (
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#4ecdc4',
                borderRadius: '50%',
                marginLeft: '4px',
                boxShadow: '0 0 10px #4ecdc4'
              }}></div>
            )}
          </Link>

          <Link
            to="/posts"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              background: isActive('/posts') 
                ? 'rgba(255,255,255,0.25)' 
                : 'transparent',
              color: 'white',
              border: '2px solid',
              borderColor: isActive('/posts') 
                ? 'rgba(255,255,255,0.4)' 
                : 'transparent',
              backdropFilter: 'blur(10px)',
              boxShadow: isActive('/posts') 
                ? '0 8px 25px rgba(0,0,0,0.2)' 
                : 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.3)'
              e.target.style.transform = 'translateY(-2px) scale(1.05)'
              e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)'
              e.target.style.borderColor = 'rgba(255,255,255,0.6)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isActive('/posts') ? 'rgba(255,255,255,0.25)' : 'transparent'
              e.target.style.transform = 'translateY(0) scale(1)'
              e.target.style.boxShadow = isActive('/posts') ? '0 8px 25px rgba(0,0,0,0.2)' : 'none'
              e.target.style.borderColor = isActive('/posts') ? 'rgba(255,255,255,0.4)' : 'transparent'
            }}
          >
            <span style={{ fontSize: '20px' }}>📝</span>
            <span>Posts</span>
            {isActive('/posts') && (
              <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#ff6b6b',
                borderRadius: '50%',
                marginLeft: '4px',
                boxShadow: '0 0 10px #ff6b6b'
              }}></div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}