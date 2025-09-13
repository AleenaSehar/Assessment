import React, { useState } from 'react'

export default function PostItem({ post }) {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const toggleComments = async () => {
    if (showComments) {
      setShowComments(false)
      return
    }

    if (!comments) {
      try {
        setLoading(true)
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        if (!res.ok) throw new Error('Failed to load comments')
        const data = await res.json()
        setComments(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    setShowComments(true)
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-2px)'
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)'
    }}
    >
      {/* Post Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '28px',
          height: '28px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          borderRadius: '6px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          #{post.id}
        </div>
        
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: '600',
          color: '#1e293b',
          lineHeight: '1.4',
          margin: '0 0 0.75rem 0',
          textTransform: 'capitalize'
        }}>
          {post.title}
        </h3>
        
        <p style={{
          color: '#64748b',
          lineHeight: '1.6',
          fontSize: '0.95rem',
          margin: 0
        }}>
          {post.body}
        </p>
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '1rem',
        borderTop: '1px solid #f1f5f9'
      }}>
        <button 
          onClick={toggleComments} 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.25rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={e => {
            e.target.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.target.style.transform = 'translateY(0)'
          }}
        >
          <span>{showComments ? '👁️' : '💬'}</span>
          {showComments ? 'Hide Comments' : 'View Comments'}
        </button>
        
        {comments && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#64748b',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            <span>💬</span>
            {comments.length} comment{comments.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          gap: '0.75rem',
          color: '#667eea',
          fontSize: '0.9rem'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #f0f0f0',
            borderTop: '2px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Loading comments...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{
          background: '#fef2f2',
          color: '#dc2626',
          padding: '1rem',
          borderRadius: '8px',
          margin: '1rem 0',
          border: '1px solid #fecaca',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.9rem'
        }}>
          <span>⚠️</span>
          <span>Error: {error}</span>
        </div>
      )}

      {/* Comments Section */}
      {showComments && comments && (
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '2px solid #f1f5f9'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1.2rem' }}>💬</span>
            <h4 style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#667eea',
              margin: 0
            }}>
              {comments.length} Comment{comments.length !== 1 ? 's' : ''}
            </h4>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {comments.map((comment) => (
              <div 
                key={comment.id} 
                style={{
                  background: 'linear-gradient(135deg, #f8faff, #f0f4ff)',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  borderLeft: '3px solid #667eea',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.75rem'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style={{
                      fontWeight: '600',
                      color: '#1e293b',
                      fontSize: '0.9rem',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {comment.name}
                    </p>
                    <p style={{
                      color: '#667eea',
                      fontSize: '0.8rem',
                      margin: 0,
                      fontWeight: '500'
                    }}>
                      {comment.email}
                    </p>
                  </div>
                </div>
                <p style={{
                  color: '#475569',
                  lineHeight: '1.5',
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  {comment.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}