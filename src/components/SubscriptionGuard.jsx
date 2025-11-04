export default function SubscriptionGuard({ isSubscribed, onSubscribe, children, title = 'Premium Content' }) {
  if (isSubscribed) return children;
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-lg mx-auto text-center bg-white/5 border border-white/10 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2 text-white/70">You need an active subscription to access this section.</p>
        <button
          onClick={onSubscribe}
          className="mt-6 px-6 h-11 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
        >
          Upgrade to Premium
        </button>
      </div>
    </div>
  );
}
