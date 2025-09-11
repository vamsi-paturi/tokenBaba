// components/NoteCard.js

import React, { useState } from "react";

const NoteCard = ({ note, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copyStatus, setCopyStatus] = useState(''); // 'copied', 'error', or ''

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this token?")) return;
    
    setIsDeleting(true);
    await onDelete(note.id);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(note.body);
      setCopyStatus('copied');
      
      // Reset status after 2 seconds
      setTimeout(() => {
        setCopyStatus('');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopyStatus('error');
      
      // Fallback method for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = note.body;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopyStatus('copied');
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
      
      setTimeout(() => {
        setCopyStatus('');
      }, 2000);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "Just now";
    
    try {
      const date = timestamp.toDate();
      const now = new Date();
      const diffInHours = (now - date) / (1000 * 60 * 60);
      
      if (diffInHours < 1) return "Just now";
      if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
      
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch (error) {
      return "Just now";
    }
  };

  const truncateText = (text, limit = 150) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  return (
    <div className="group bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-slate-800 group-hover:text-primary-600 transition-colors duration-200 break-words overflow-wrap-anywhere flex-1 pr-4">
            {note.title}
          </h3>
          
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
            {/* Copy Button */}
            <button
              onClick={handleCopyToClipboard}
              className={`p-2 rounded-lg transition-all duration-200 relative ${
                copyStatus === 'copied' 
                  ? 'text-green-600 bg-green-50' 
                  : copyStatus === 'error'
                  ? 'text-red-500 bg-red-50'
                  : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'
              }`}
              title={copyStatus === 'copied' ? 'Copied!' : 'Copy token to clipboard'}
            >
              {copyStatus === 'copied' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : copyStatus === 'error' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
            
            {/* Delete Button */}
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
              title="Delete token"
            >
              {isDeleting ? (
                <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Copy Status Toast */}
        {copyStatus && (
          <div className={`mb-4 p-3 rounded-lg flex items-center space-x-2 animate-bounce-subtle ${
            copyStatus === 'copied' 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {copyStatus === 'copied' ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">Token copied to clipboard!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-sm font-medium">Failed to copy. Please try manual selection.</span>
              </>
            )}
          </div>
        )}

        <div className="text-slate-600 text-sm leading-relaxed mb-4">
          <div className="break-words overflow-wrap-anywhere whitespace-pre-wrap max-w-full overflow-hidden">
            {isExpanded ? note.body : truncateText(note.body)}
          </div>
          
          {note.body && note.body.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-600 hover:text-primary-700 font-medium mt-2 transition-colors duration-200 block"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="truncate">{formatDate(note.createdAt)}</span>
          </div>
          
          <div className="flex items-center space-x-1 flex-shrink-0">
            <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
            <span className="text-xs text-slate-500 font-medium">Saved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;