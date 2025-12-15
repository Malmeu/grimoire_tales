import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ooevpxkcftpemofjantd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZXZweGtjZnRwZW1vZmphbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3Njg3ODYsImV4cCI6MjA4MTM0NDc4Nn0.rbUanSpOKtwqcSs71eCLw_K2ywpuWSfG9Ae88hBmu6M';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    username?: string;
  };
}

export default function AuthButtons() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Check current session
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setMenuOpen(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] animate-pulse"></div>
    );
  }

  if (!user) {
    return (
      <>
        <a 
          href="/login" 
          className="hidden sm:inline text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
        >
          Connexion
        </a>
        <a 
          href="/register" 
          className="hidden sm:inline px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
        >
          S'inscrire
        </a>
      </>
    );
  }

  const username = user.user_metadata?.username || user.email?.split('@')[0] || 'User';

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white font-semibold text-sm">
          {username.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:inline text-[var(--text-primary)] text-sm max-w-[100px] truncate">
          {username}
        </span>
        <svg 
          className={`w-4 h-4 text-[var(--text-secondary)] transition-transform ${menuOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {menuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setMenuOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-56 py-2 bg-[var(--bg-secondary)] border border-[var(--card-border)] rounded-xl shadow-xl z-50">
            <div className="px-4 py-3 border-b border-[var(--card-border)]">
              <p className="text-[var(--text-primary)] font-medium truncate">{username}</p>
              <p className="text-[var(--text-secondary)] text-sm truncate">{user.email}</p>
            </div>
            
            <div className="py-2">
              <a 
                href="/dashboard" 
                className="flex items-center gap-3 px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--accent-primary)]/10 hover:text-[var(--accent-primary)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
              </a>
              
              <a 
                href="/profile" 
                className="flex items-center gap-3 px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--accent-primary)]/10 hover:text-[var(--accent-primary)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mon profil
              </a>
              
              <a 
                href="/write" 
                className="flex items-center gap-3 px-4 py-2 text-[var(--text-primary)] hover:bg-[var(--accent-primary)]/10 hover:text-[var(--accent-primary)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Écrire
              </a>
            </div>
            
            <div className="border-t border-[var(--card-border)] pt-2">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
