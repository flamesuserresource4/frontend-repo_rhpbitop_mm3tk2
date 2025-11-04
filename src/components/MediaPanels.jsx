import { Play, Music, Video, Smile } from 'lucide-react';

const sampleMusic = [
  { id: 'm1', title: 'Midnight Drive', artist: 'Neon Waves', duration: '3:42' },
  { id: 'm2', title: 'Echoes of You', artist: 'Aether', duration: '4:10' },
  { id: 'm3', title: 'Sunrise Bloom', artist: 'Lumen', duration: '2:58' },
];

const sampleVideos = [
  { id: 'v1', title: 'City Lights Timelapse', by: 'SkyFrame', length: '6:21' },
  { id: 'v2', title: 'Mountains & Mist', by: 'TerraVision', length: '4:47' },
  { id: 'v3', title: 'Ocean Dreams', by: 'BlueRealm', length: '5:03' },
];

const sampleJokes = [
  { id: 'j1', setup: 'Why did the developer go broke?', punchline: 'Because they used up all their cache.' },
  { id: 'j2', setup: 'I would tell you a UDP joke...', punchline: "...but you might not get it." },
  { id: 'j3', setup: 'How many programmers does it take to change a light bulb?', punchline: "None, that's a hardware problem." },
];

export default function MediaPanels({ type, onAddToPlaylist }) {
  if (type === 'music') {
    return (
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleMusic.map((t) => (
          <article key={t.id} className="group bg-white/5 border border-white/10 rounded-xl p-4 text-white hover:bg-white/10 transition">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-indigo-600/30 flex items-center justify-center">
                <Music className="w-6 h-6 text-indigo-300" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium truncate">{t.title}</h3>
                <p className="text-sm text-white/70 truncate">{t.artist} • {t.duration}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button className="px-3 h-9 rounded-lg bg-white/10 hover:bg-white/20"> <Play className="w-4 h-4 inline" /> Play</button>
              <button onClick={() => onAddToPlaylist({ id: t.id, kind: 'music', title: t.title })} className="px-3 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-500">Add to playlist</button>
            </div>
          </article>
        ))}
      </section>
    );
  }

  if (type === 'video') {
    return (
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleVideos.map((v) => (
          <article key={v.id} className="group bg-white/5 border border-white/10 rounded-xl p-4 text-white hover:bg-white/10 transition">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-rose-600/30 flex items-center justify-center">
                <Video className="w-6 h-6 text-rose-300" />
              </div>
              <div className="min-w-0">
                <h3 className="font-medium truncate">{v.title}</h3>
                <p className="text-sm text-white/70 truncate">{v.by} • {v.length}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button className="px-3 h-9 rounded-lg bg-white/10 hover:bg-white/20"> <Play className="w-4 h-4 inline" /> Play</button>
              <button onClick={() => onAddToPlaylist({ id: v.id, kind: 'video', title: v.title })} className="px-3 h-9 rounded-lg bg-rose-600 hover:bg-rose-500">Add to playlist</button>
            </div>
          </article>
        ))}
      </section>
    );
  }

  // jokes
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sampleJokes.map((j) => (
        <article key={j.id} className="group bg-white/5 border border-white/10 rounded-xl p-4 text-white hover:bg-white/10 transition">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-600/30 flex items-center justify-center">
              <Smile className="w-6 h-6 text-emerald-300" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium">{j.setup}</h3>
              <p className="text-white/70 mt-1">{j.punchline}</p>
            </div>
          </div>
          <div className="mt-4">
            <button onClick={() => onAddToPlaylist({ id: j.id, kind: 'joke', title: j.setup })} className="px-3 h-9 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white">Save to playlist</button>
          </div>
        </article>
      ))}
    </section>
  );
}
