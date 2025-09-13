import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'
import AddPostForm from './AddPostForm'
import SearchSort from './SearchSort'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('az')

  useEffect(() => {
    let mounted = true
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (!res.ok) throw new Error('Failed to load posts')
        const data = await res.json()
        if (mounted) setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
    return () => (mounted = false)
  }, [])

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      .post-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      }
      .add-form-card:hover {
        box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
      }
      .controls-card:hover {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const handleAddPost = newPost => {
    setPosts(prev => [newPost, ...prev])
  }

  const filtered = posts
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'az') return a.title.localeCompare(b.title)
      return b.title.localeCompare(a.title)
    })

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: '0 0 0.5rem 0'
    },
    subtitle: {
      color: '#666',
      fontSize: '1.1rem',
      margin: 0
    },
    addFormCard: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    controlsCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '1.5rem',
      marginBottom: '2rem',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(0, 0, 0, 0.05)'
    },
    statsBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f8f9ff, #f0f4ff)',
      padding: '1rem 1.5rem',
      borderRadius: '10px',
      marginBottom: '2rem',
      border: '1px solid #e0e6ff'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    statNumber: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#667eea'
    },
    statLabel: {
      color: '#666',
      fontSize: '0.9rem',
      fontWeight: '500'
    },
    postsGrid: {
      display: 'grid',
      gap: '1.5rem',
      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))'
    },
    loadingCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'white',
      borderRadius: '20px',
      padding: '4rem 2rem',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      minHeight: '300px'
    },
    errorCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fee, #fdd)',
      borderRadius: '20px',
      padding: '3rem 2rem',
      boxShadow: '0 10px 30px rgba(231, 76, 60, 0.2)',
      textAlign: 'center',
      borderLeft: '5px solid #e74c3c'
    },
    spinner: {
      width: '50px',
      height: '50px',
      border: '5px solid #f0f0f0',
      borderTop: '5px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '1.5rem'
    },
    loadingText: {
      color: '#666',
      fontSize: '1.1rem',
      fontWeight: '500'
    },
    errorIcon: {
      fontSize: '3rem',
      marginBottom: '1rem'
    },
    noResults: {
      textAlign: 'center',
      padding: '4rem 2rem',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
      color: '#666'
    },
    noResultsIcon: {
      fontSize: '4rem',
      marginBottom: '1rem',
      opacity: '0.5'
    }
  }

  if (loading) return (
    <div style={styles.container}>
      <div style={styles.loadingCard}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading posts...</p>
      </div>
    </div>
  )

  if (error) return (
    <div style={styles.container}>
      <div style={styles.errorCard}>
        <span style={styles.errorIcon}>⚠️</span>
        <h3 style={{margin: '0 0 1rem 0', color: '#e74c3c'}}>Oops! Something went wrong</h3>
        <p style={{margin: 0, color: '#666'}}>Error: {error}</p>
      </div>
    </div>
  )

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Posts</h1>
        <p style={styles.subtitle}>Share your thoughts with the world</p>
      </div>

      {/* Add Post Form */}
      <div style={styles.addFormCard} className="add-form-card">
        <AddPostForm onAdd={handleAddPost} />
      </div>

      {/* Stats Bar */}
      <div style={styles.statsBar}>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>{posts.length}</span>
          <span style={styles.statLabel}>Total Posts</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statNumber}>{filtered.length}</span>
          <span style={styles.statLabel}>Showing</span>
        </div>
        {search && (
          <div style={styles.statItem}>
            <span style={{...styles.statLabel, color: '#667eea', fontWeight: '600'}}>
              📍 Filtered by: "{search}"
            </span>
          </div>
        )}
      </div>

      {/* Search & Sort Controls */}
      <div style={styles.controlsCard} className="controls-card">
        <SearchSort
          search={search}
          onSearch={setSearch}
          sort={sort}
          onSort={setSort}
        />
      </div>

      {/* Posts Grid */}
      {filtered.length > 0 ? (
        <div style={styles.postsGrid}>
          {filtered.map((post, index) => (
            <div 
              key={post.id} 
              className="post-card"
              style={{
                animation: `fadeInUp 0.6s ease forwards ${index * 0.1}s`,
                opacity: 0
              }}
            >
              <PostItem post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.noResults}>
          <div style={styles.noResultsIcon}>🔍</div>
          <h3 style={{margin: '0 0 1rem 0', color: '#333'}}>No posts found</h3>
          <p style={{margin: 0, color: '#666'}}>
            {search ? `No posts match "${search}"` : 'No posts available'}
          </p>
        </div>
      )}
    </div>
  )
}