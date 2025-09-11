import Head from 'next/head';
import React from 'react';

const Layout = ({ children, title = "Token Retriever From SAM" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Token Retriever application for managing notes and tokens" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/60 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                    TOKEN RETRIEVER FROM SAM
                  </h1>
                  <p className="text-sm text-slate-500 hidden sm:block">Manage your tokens efficiently</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600">
                  <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
                  <span>Live</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold">Token Retriever From SAM</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                  A powerful and intuitive platform for managing tokens and notes with real-time synchronization and modern design.
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-slate-400 text-sm mb-2">Built with passion by</p>
                <div className="inline-flex items-center space-x-2 bg-slate-800 rounded-full px-4 py-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">V</span>
                  </div>
                  <span className="text-white font-medium">Developed by Vamsi</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-slate-500 text-sm">
                  © 2025 Token Retriever From SAM. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 sm:mt-0">
                  <span className="text-slate-500 text-sm">Version 2.0</span>
                  <span className="text-slate-500 text-sm">•</span>
                  <span className="text-slate-500 text-sm">Next.js & Firebase</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;