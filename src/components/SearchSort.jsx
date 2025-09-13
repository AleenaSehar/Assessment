import React, { useState } from 'react'

export default function SearchSort({ search, onSearch, sort, onSort }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const clearSearch = () => {
    onSearch('')
  }

  const sortOptions = [
    { value: 'az', label: 'Title: A → Z' },
    { value: 'za', label: 'Title: Z → A' }
  ]

  const handleSortSelect = (value) => {
    onSort(value)
    setIsDropdownOpen(false)
  }

  const currentSortLabel = sortOptions.find(option => option.value === sort)?.label || 'Title: A → Z'

  return (
    <div style={{
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      marginBottom: '2rem'
    }}>
      {/* Search Input */}
      <div style={{
        flex: '2',
        minWidth: '250px'
      }}>
        <label style={{
          fontSize: '0.9rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem',
          display: 'block'
        }}>
          Search Posts
        </label>
        <div style={{ position: 'relative' }}>
          <input
            style={{
              width: '100%',
              padding: '1rem 3rem 1rem 1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '1rem',
              background: '#ffffff',
              color: '#374151',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            placeholder="Type to search posts by title..."
            value={search}
            onChange={e => onSearch(e.target.value)}
            onFocus={e => {
              e.target.style.borderColor = '#667eea'
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.2)'
            }}
            onBlur={e => {
              e.target.style.borderColor = '#e5e7eb'
              e.target.style.boxShadow = 'none'
            }}
          />
          {search && (
            <button 
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background 0.2s ease'
              }}
              onClick={clearSearch}
              title="Clear search"
              onMouseEnter={e => e.target.style.background = '#dc2626'}
              onMouseLeave={e => e.target.style.background = '#ef4444'}
            >
              ×
            </button>
          )}
        </div>
        
        {search && (
          <div style={{
            marginTop: '0.5rem',
            fontSize: '0.85rem',
            color: '#6b7280'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '15px',
              fontSize: '0.8rem',
              fontWeight: '500'
            }}>
              Filtering by: "{search}"
            </span>
          </div>
        )}
      </div>

      {/* Custom Sort Dropdown */}
      <div style={{
        flex: '1',
        minWidth: '200px',
        position: 'relative'
      }}>
        <label style={{
          fontSize: '0.9rem',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '0.5rem',
          display: 'block'
        }}>
          Sort Order
        </label>
        <div 
          style={{
            position: 'relative',
            width: '100%'
          }}
        >
          <button
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '1rem',
              background: '#ffffff',
              color: '#374151',
              cursor: 'pointer',
              outline: 'none',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onFocus={e => {
              e.target.style.borderColor = '#764ba2'
              e.target.style.boxShadow = '0 4px 15px rgba(118, 75, 162, 0.2)'
            }}
            onBlur={e => {
              if (!isDropdownOpen) {
                e.target.style.borderColor = '#e5e7eb'
                e.target.style.boxShadow = 'none'
              }
            }}
          >
            <span>{currentSortLabel}</span>
            <span style={{
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}>▼</span>
          </button>
          
          {isDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#ffffff',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              marginTop: '4px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              overflow: 'hidden'
            }}>
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: 'none',
                    background: sort === option.value ? '#f3f4f6' : '#ffffff',
                    color: '#374151',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '1rem',
                    transition: 'background 0.2s ease'
                  }}
                  onClick={() => handleSortSelect(option.value)}
                  onMouseEnter={e => {
                    if (sort !== option.value) {
                      e.target.style.background = '#f9fafb'
                    }
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = sort === option.value ? '#f3f4f6' : '#ffffff'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}