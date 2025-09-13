import React, { useState } from 'react'

export default function AddPostForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  // Add CSS animations
  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes bounce {
        0%, 20%, 60%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        80% { transform: translateY(-5px); }
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      .form-input:focus {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.25) !important;
        border-color: #667eea !important;
      }
      .submit-btn:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3) !important;
      }
      .submit-btn:active {
        transform: translateY(0);
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  const validate = () => {
    if (!title.trim()) return 'Title is required'
    if (body.trim().length < 20) return 'Body must be at least 20 characters'
    return ''
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSuccess('')
    const v = validate()
    if (v) {
      setError(v)
      return
    }

    const newPost = {
      title: title.trim(),
      body: body.trim(),
      userId: 1,
      temp: true,
      id: Date.now()
    }

    onAdd(newPost)
    setLoading(true)
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newPost.title, body: newPost.body, userId: newPost.userId })
      })
      if (!res.ok) throw new Error('Failed to create post')
      const data = await res.json()
      setSuccess('Post added successfully!')
      setTitle('')
      setBody('')
    } catch (err) {
      setError('Failed to create post on server. But it remains in the list locally.')
    } finally {
      setLoading(false)
      setTimeout(() => setSuccess(''), 2500)
    }
  }

  const styles = {
    formContainer: {
      position: 'relative'
    },
    formHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '2rem'
    },
    headerIcon: {
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #ffffff, #f8faff)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
    },
    formTitle: {
      fontSize: '1.8rem',
      fontWeight: '800',
      color: 'white',
      margin: 0,
      textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    },
    formGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    inputGroup: {
      position: 'relative',
      animation: 'slideIn 0.5s ease-out'
    },
    inputLabel: {
      display: 'block',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      opacity: '0.9'
    },
    input: {
      width: '100%',
      padding: '1rem 1.5rem',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      fontSize: '1rem',
      background: 'rgba(255, 255, 255, 0.95)',
      color: '#333',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      fontFamily: 'inherit'
    },
    textarea: {
      width: '100%',
      padding: '1rem 1.5rem',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      fontSize: '1rem',
      background: 'rgba(255, 255, 255, 0.95)',
      color: '#333',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      minHeight: '120px',
      resize: 'vertical'
    },
    charCounter: {
      position: 'absolute',
      bottom: '0.75rem',
      right: '1rem',
      fontSize: '0.8rem',
      color: body.length >= 20 ? '#22c55e' : '#f59e0b',
      fontWeight: '600',
      background: 'white',
      padding: '0.25rem 0.5rem',
      borderRadius: '6px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    },
    messageCard: {
      padding: '1rem 1.5rem',
      borderRadius: '10px',
      fontSize: '0.9rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      animation: 'slideIn 0.4s ease-out'
    },
    errorCard: {
      background: 'linear-gradient(135deg, #fecaca, #f87171)',
      color: '#dc2626',
      border: '1px solid #ef4444',
      animation: 'shake 0.5s ease-out'
    },
    successCard: {
      background: 'linear-gradient(135deg, #bbf7d0, #86efac)',
      color: '#166534',
      border: '1px solid #22c55e',
      animation: 'bounce 0.6s ease-out'
    },
    submitBtn: {
      background: loading 
        ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
        : 'linear-gradient(135deg, #ffffff, #f8faff)',
      color: loading ? 'white' : '#667eea',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      padding: '1rem 2rem',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    loadingSpinner: {
      width: '20px',
      height: '20px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTop: '3px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    formStats: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.8rem',
      fontWeight: '500',
      marginTop: '0.5rem'
    },
    progressBar: {
      width: '100%',
      height: '4px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '2px',
      marginTop: '1rem',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #ffffff, #f8faff)',
      borderRadius: '2px',
      transition: 'width 0.3s ease',
      width: `${Math.min(((title.length > 0 ? 1 : 0) + (body.length >= 20 ? 1 : 0)) * 50, 100)}%`
    }
  }

  // Add keyframe for spinner
  React.useEffect(() => {
    const spinStyle = document.createElement('style')
    spinStyle.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
    document.head.appendChild(spinStyle)
    return () => document.head.removeChild(spinStyle)
  }, [])

  return (
    <div style={styles.formContainer}>
      <div style={styles.formHeader}>
        <div style={styles.headerIcon}>✨</div>
        <h3 style={styles.formTitle}>Create New Post</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGrid}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Post Title</label>
            <input 
              style={styles.input}
              className="form-input"
              placeholder="What's your post about?"
              value={title} 
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div style={{...styles.inputGroup, position: 'relative'}}>
            <label style={styles.inputLabel}>Post Content</label>
            <textarea 
              style={styles.textarea}
              className="form-input"
              placeholder="Share your thoughts, ideas, or story..."
              value={body} 
              onChange={e => setBody(e.target.value)}
            />
            {body.length > 0 && (
              <div style={styles.charCounter}>
                {body.length}/20 chars
              </div>
            )}
          </div>

          {error && (
            <div style={{...styles.messageCard, ...styles.errorCard}}>
              <span>⚠️</span>
              {error}
            </div>
          )}

          {success && (
            <div style={{...styles.messageCard, ...styles.successCard}}>
              <span>🎉</span>
              {success}
            </div>
          )}

          <button 
            style={styles.submitBtn}
            className="submit-btn"
            type="submit" 
            disabled={loading}
          >
            {loading ? (
              <>
                <div style={styles.loadingSpinner}></div>
                Adding Post...
              </>
            ) : (
              <>
                <span>🚀</span>
                Add Post
              </>
            )}
          </button>

          <div style={styles.formStats}>
            <span>
              {title.trim() && body.length >= 20 ? '✅ Ready to post!' : '📝 Fill out the form'}
            </span>
            <span>
              {body.length >= 20 ? '✅' : '⏳'} Min. 20 characters
            </span>
          </div>

          <div style={styles.progressBar}>
            <div style={styles.progressFill}></div>
          </div>
        </div>
      </form>
    </div>
  )
}