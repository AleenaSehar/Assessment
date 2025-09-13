import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function UserDetail() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchUser = async () => {
      try {
        setLoading(true)
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        if (!res.ok) throw new Error('User not found')
        const data = await res.json()
        if (mounted) setUser(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
    return () => (mounted = false)
  }, [id])

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '0 1rem'
    },
    backBtn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '25px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
      marginBottom: '2rem'
    },
    profileCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '2rem',
      paddingBottom: '1.5rem',
      borderBottom: '2px solid #f0f0f0'
    },
    avatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white',
      boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)'
    },
    userName: {
      margin: 0,
      fontSize: '2rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    username: {
      color: '#666',
      margin: '0.5rem 0 0 0',
      fontWeight: '500'
    },
    infoGrid: {
      display: 'grid',
      gap: '1.5rem',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    },
    infoItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      padding: '1.25rem',
      background: 'linear-gradient(135deg, #f8f9ff, #f0f4ff)',
      borderRadius: '15px',
      borderLeft: '4px solid #667eea',
      transition: 'all 0.3s ease'
    },
    addressItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      padding: '1.25rem',
      background: 'linear-gradient(135deg, #f8f9ff, #f0f4ff)',
      borderRadius: '15px',
      borderLeft: '4px solid #667eea',
      transition: 'all 0.3s ease',
      gridColumn: '1 / -1'
    },
    icon: {
      fontSize: '1.5rem',
      flexShrink: 0,
      marginTop: '0.25rem'
    },
    label: {
      display: 'block',
      fontWeight: '600',
      color: '#667eea',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      letterSpacing: '1px'
    },
    value: {
      margin: 0,
      color: '#333',
      fontWeight: '500',
      lineHeight: '1.5'
    },
    loadingCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      borderRadius: '20px',
      padding: '3rem 2rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    },
    errorCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fee, #fdd)',
      borderRadius: '20px',
      padding: '3rem 2rem',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      borderLeft: '4px solid #e74c3c'
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid #f0f0f0',
      borderTop: '4px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '1rem'
    }
  }

  // Add CSS animation keyframes
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .info-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
        background: linear-gradient(135deg, #f0f4ff, #e8f0ff) !important;
      }
      .back-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  if (loading) return (
    <div style={styles.container}>
      <div style={styles.loadingCard}>
        <div style={styles.spinner}></div>
        <p>Loading user...</p>
      </div>
    </div>
  )
  
  if (error) return (
    <div style={styles.container}>
      <div style={styles.errorCard}>
        <span style={{fontSize: '2rem', marginBottom: '1rem'}}>⚠️</span>
        <p>Error: {error}</p>
      </div>
    </div>
  )
  
  if (!user) return (
    <div style={styles.container}>
      <div style={styles.errorCard}>No user found</div>
    </div>
  )

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.backBtn} className="back-btn">
        <span style={{fontSize: '1.2rem'}}>←</span> Back to users
      </Link>
      
      <div style={styles.profileCard}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>{user.name.charAt(0)}</div>
          <div>
            <h1 style={styles.userName}>{user.name}</h1>
            <p style={styles.username}>@{user.username}</p>
          </div>
        </div>

        <div style={styles.infoGrid}>
          <div style={styles.infoItem} className="info-item">
            <span style={styles.icon}>📧</span>
            <div>
              <label style={styles.label}>Email</label>
              <p style={styles.value}>{user.email}</p>
            </div>
          </div>

          <div style={styles.infoItem} className="info-item">
            <span style={styles.icon}>📱</span>
            <div>
              <label style={styles.label}>Phone</label>
              <p style={styles.value}>{user.phone}</p>
            </div>
          </div>

          <div style={styles.infoItem} className="info-item">
            <span style={styles.icon}>🌐</span>
            <div>
              <label style={styles.label}>Website</label>
              <p style={styles.value}>{user.website}</p>
            </div>
          </div>

          <div style={styles.infoItem} className="info-item">
            <span style={styles.icon}>🏢</span>
            <div>
              <label style={styles.label}>Company</label>
              <p style={styles.value}>{user.company?.name}</p>
            </div>
          </div>

          <div style={styles.addressItem} className="info-item">
            <span style={styles.icon}>📍</span>
            <div>
              <label style={styles.label}>Address</label>
              <p style={styles.value}>
                {user.address?.suite}, {user.address?.street}<br/>
                {user.address?.city} — {user.address?.zipcode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}