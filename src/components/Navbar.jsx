import { Home, Music, Video, Smile, ListMusic, User, LogOut, Crown } from 'lucide-react';

export default function Navbar({ current, onNavigate, isSubscribed, onSubscribe, user, onLogout }) {
  const NavButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => onNavigate(id)}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg transition ${
        current === id ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 text-white">
          <Crown className="w-5 h-5 text-yellow-400" />
          <span className="font-semibold">MediaHub</span>
        </div>
        <nav className="flex-1 flex items-center gap-2">
          <NavButton id="home" label="Home" icon={Home} />
          <NavButton id="music" label="Music" icon={Music} />
          <NavButton id="video" label="Videos" icon={Video} />
          <NavButton id="jokes" label="Jokes" icon={Smile} />
          <NavButton id="playlist" label="Playlist" icon={ListMusic} />
        </nav>
        <div className="flex items-center gap-2">
          {!isSubscribed && (
            <button
              onClick={onSubscribe}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              <Crown className="w-4 h-4" />
              <span className="hidden sm:inline">Subscribe</span>
            </button>
          )}
          <button onClick={() => onNavigate('profile')} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">{user?.name || 'Profile'}</span>
          </button>
          <button onClick={onLogout} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white/80 hover:bg-white/10">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
