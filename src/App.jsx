import { useMemo, useState } from 'react';
import AuthView from './components/AuthView.jsx';
import Navbar from './components/Navbar.jsx';
import SubscriptionGuard from './components/SubscriptionGuard.jsx';
import MediaPanels from './components/MediaPanels.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [page, setPage] = useState('auth'); // auth | home | music | video | jokes | playlist | profile
  const [playlist, setPlaylist] = useState([]);

  const handleAuthenticated = (info) => {
    setUser(info);
    setPage('home');
  };

  const addToPlaylist = (item) => {
    setPlaylist((prev) => {
      if (prev.find((p) => p.id === item.id && p.kind === item.kind)) return prev;
      return [...prev, item];
    });
  };

  const removeFromPlaylist = (idx) => {
    setPlaylist((prev) => prev.filter((_, i) => i !== idx));
  };

  const resetSession = () => {
    setUser(null);
    setIsSubscribed(false);
    setPage('auth');
    setPlaylist([]);
  };

  const PageTitle = useMemo(() => {
    switch (page) {
      case 'home': return 'Home';
      case 'music': return 'Music';
      case 'video': return 'Videos';
      case 'jokes': return 'Jokes';
      case 'playlist': return 'Your Playlist';
      case 'profile': return 'Profile';
      default: return '';
    }
  }, [page]);

  if (!user || page === 'auth') {
    return <AuthView onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <Navbar
        current={page}
        onNavigate={setPage}
        isSubscribed={isSubscribed}
        onSubscribe={() => setIsSubscribed(true)}
        user={user}
        onLogout={resetSession}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{PageTitle}</h1>
          <p className="text-white/70 mt-1">
            {page === 'home' && 'Explore music, videos, and jokes — subscribe to unlock everything.'}
            {page === 'profile' && 'Manage your account and subscription.'}
            {['music','video','jokes','playlist'].includes(page) && 'Premium area'}
          </p>
        </div>

        {page === 'home' && (
          <section className="grid md:grid-cols-3 gap-4">
            <Card
              title="Music"
              desc="Handpicked tracks to match your mood."
              cta="Browse Music"
              onClick={() => setPage('music')}
              color="indigo"
            />
            <Card
              title="Videos"
              desc="Soothing visuals and inspiring clips."
              cta="Watch Videos"
              onClick={() => setPage('video')}
              color="rose"
            />
            <Card
              title="Jokes"
              desc="Daily laughs for brighter days."
              cta="Read Jokes"
              onClick={() => setPage('jokes')}
              color="emerald"
            />
          </section>
        )}

        {page === 'profile' && (
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-lg">Account</h3>
              <div className="mt-4 space-y-2 text-white/80">
                <p><span className="text-white/60">Name:</span> {user.name}</p>
                <p><span className="text-white/60">Email:</span> {user.email}</p>
                <p><span className="text-white/60">Status:</span> {isSubscribed ? 'Premium Member' : 'Free Member'}</p>
              </div>
              {!isSubscribed && (
                <button onClick={() => setIsSubscribed(true)} className="mt-6 px-5 h-11 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-medium">Upgrade to Premium</button>
              )}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-lg">Preferences</h3>
              <p className="mt-2 text-white/70">Personalize your experience. More options coming soon.</p>
            </div>
          </section>
        )}

        {page === 'music' && (
          <SubscriptionGuard isSubscribed={isSubscribed} onSubscribe={() => setIsSubscribed(true)} title="Music">
            <MediaPanels type="music" onAddToPlaylist={addToPlaylist} />
          </SubscriptionGuard>
        )}

        {page === 'video' && (
          <SubscriptionGuard isSubscribed={isSubscribed} onSubscribe={() => setIsSubscribed(true)} title="Videos">
            <MediaPanels type="video" onAddToPlaylist={addToPlaylist} />
          </SubscriptionGuard>
        )}

        {page === 'jokes' && (
          <SubscriptionGuard isSubscribed={isSubscribed} onSubscribe={() => setIsSubscribed(true)} title="Jokes">
            <MediaPanels type="jokes" onAddToPlaylist={addToPlaylist} />
          </SubscriptionGuard>
        )}

        {page === 'playlist' && (
          <SubscriptionGuard isSubscribed={isSubscribed} onSubscribe={() => setIsSubscribed(true)} title="Your Playlist">
            <section className="bg-white/5 border border-white/10 rounded-2xl p-6">
              {playlist.length === 0 ? (
                <p className="text-white/70">No items in your playlist yet. Add some from Music, Videos, or Jokes.</p>
              ) : (
                <ul className="divide-y divide-white/10">
                  {playlist.map((item, idx) => (
                    <li key={`${item.kind}-${item.id}`} className="py-3 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium truncate">{item.title}</p>
                        <p className="text-sm text-white/60">{item.kind}</p>
                      </div>
                      <button onClick={() => removeFromPlaylist(idx)} className="px-3 h-9 rounded-lg bg-white/10 hover:bg-white/20">Remove</button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </SubscriptionGuard>
        )}
      </main>
    </div>
  );
}

function Card({ title, desc, cta, onClick, color = 'indigo' }) {
  const colorMap = {
    indigo: 'from-indigo-600/30 to-indigo-400/10 hover:from-indigo-600/40 hover:to-indigo-400/20',
    rose: 'from-rose-600/30 to-rose-400/10 hover:from-rose-600/40 hover:to-rose-400/20',
    emerald: 'from-emerald-600/30 to-emerald-400/10 hover:from-emerald-600/40 hover:to-emerald-400/20',
  };
  return (
    <button onClick={onClick} className={`text-left rounded-2xl border border-white/10 bg-gradient-to-br ${colorMap[color]} p-6 transition w-full`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-white/70 mt-1">{desc}</p>
      <span className="inline-block mt-4 px-3 h-9 rounded-lg bg-white/10">{cta}</span>
    </button>
  );
}

export default App;
