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
            Create, store, and organize your tokens from SAM without any Login
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
    <p className="text-slate-600">
      All your saved tokens are displayed below in chronological order.
    </p>
    <div className="mt-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold text-slate-700 mb-2">
        How to Use
      </h3>
      <ol className="list-decimal list-inside text-slate-600 space-y-2">
        <li>
          **In SAM Tool:** Open this page inside your Saviynt SAM tool browser session.
        </li>
        <li>
          **Copy Token:** In the same session, go to **Admin > Webservice Conf** and copy your token.
        </li>
        <li>
          **Paste Token:** Paste the token into the field on this page.
        </li>
        <li>
          **Local Use:** Open this exact page on your local browser and copy the token for Postman or other tools.
        </li>
      </ol>
    </div>
    <p className="mt-4 text-slate-600">
      For Security Reasons, Please **CLEAR YOUR TOKEN** AFTER COPYING.
    </p>
  </div>
</div>
            <NoteList key={refresh} />
          </div>
        </div>
      </div>
    </Layout>
  );

}

