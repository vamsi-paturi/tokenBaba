// pages/index.js

import Layout from "../components/Layout";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import React from "react";

export default function Home() {
  const [refresh, setRefresh] = React.useState(false);
  
  const handleNoteAdded = () => {
    setRefresh(!refresh); // trigger NoteList refresh
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Manage Your{" "}
            <span className="bg-gradient-to-r from-primary-600 via-purple-600 to-accent-600 bg-clip-text text-transparent">
              Tokens
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Create, store, and organize your Notes from any device. 
            Real-time synchronization keeps everything up to date across all your devices.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="xl:col-span-1">
            <div className="sticky top-24">
              <NoteForm onNoteAdded={handleNoteAdded} />
              
              {/* Stats Card */}
              <div className="mt-6 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
                      <span className="text-accent-600 font-medium">Live</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Last Sync</span>
                    <span className="text-slate-800 font-medium">Just now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="xl:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Tokens & Notes</h2>
              <p className="text-slate-600 mb-4">All your saved Notes/Tokens are displayed below in chronological order.</p>
              
              {/* Instructions Card */}
              <div className="mt-4 p-6 border border-slate-200 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-700 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How to Use
                </h3>
                <ol className="list-decimal list-inside text-slate-600 space-y-2 text-sm leading-relaxed">
                  <li>
                    <strong>In SAM Tool:</strong> Open this page inside your remote device browser session.
                  </li>
                  <li>
                    <strong>Copy Token:</strong> In the same session, navigate to your page from which the note need to be Copied.
                  </li>
                  <li>
                    <strong>Paste Token:</strong> Paste the Note/Token into the field on this page.
                  </li>
                  <li>
                    <strong>Local Use:</strong> Open this exact page on your Local browser or a Mobile Device and copy the Note for your personal use.
                  </li>
                </ol>
                
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start">
                  <svg className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p className="text-orange-800 font-medium text-sm">Security Notice</p>
                    <p className="text-orange-700 text-sm mt-1">
                      For security reasons, please <strong>CLEAR YOUR NOTE</strong> after copying it to your tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <NoteList key={refresh} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
