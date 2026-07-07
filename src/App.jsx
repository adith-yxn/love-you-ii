import React, { useMemo, useState } from 'react';

const moodOptions = [
  {
    id: 'pain',
    title: 'In Pain ⚡',
    emoji: '🫶',
    message: 'You do not have to be brave right now, sweetheart. I am here, I am soft, and I am sending you a little cloud of comfort and a giant cuddle. '
  },
  {
    id: 'sad',
    title: 'Sad/Low 😢',
    emoji: '🌙',
    message: 'Your heart is allowed to be tender today. I love the way you care so deeply, and I promise this moment will pass like a tiny storm. '
  },
  {
    id: 'angry',
    title: 'Angry 🌋',
    emoji: '💗',
    message: 'You can be fiery and still be lovable. Let the steam out, then come back to your soft side — I will still be your favorite calm place. '
  },
  {
    id: 'hug',
    title: 'Need a Hug ❤️',
    emoji: '🤗',
    message: 'Cuddle mission activated. I am wrapping you in a thousand tiny hugs, one silly joke, and a warm blanket of love. '
  }
];

const compliments = [
  'You are effortlessly beautiful, even in your softest moments.',
  'Your kindness feels like sunlight in a room that needed warmth.',
  'You are so incredibly thoughtful, and it shows in everything you do.',
  'You make ordinary days feel gentler just by being in them.',
  'You are strong, sweet, and so deeply lovable.'
];

const giftCoupons = [
  '1x Free Foot Massage',
  '1x Late Night Ice Cream Delivery',
  '1x Get Out of Any Argument Free card'
];

const bubbleLabels = Array.from({ length: 6 }, (_, index) => index);

export default function App() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [poppedBubbles, setPoppedBubbles] = useState([]);
  const [rewardUnlocked, setRewardUnlocked] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [complimentIndex, setComplimentIndex] = useState(0);

  const activeMood = useMemo(() => moodOptions.find((mood) => mood.id === selectedMood) || null, [selectedMood]);

  const handleBubbleToggle = (index) => {
    if (poppedBubbles.includes(index)) return;
    const next = [...poppedBubbles, index].sort((a, b) => a - b);
    setPoppedBubbles(next);
    if (next.length === bubbleLabels.length) {
      setRewardUnlocked(true);
    }
  };

  const handleComplimentClick = () => {
    setComplimentIndex((prev) => (prev + 1) % compliments.length);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-shell">
        <div className="app-card">
          <header className="hero-card neu-card">
            <div>
              <p className="eyebrow">for your favorite girl</p>
              <h1>LoveYouII</h1>
              <p className="subtitle">Your Safe Space, Sweetheart 🌸</p>
            </div>
            <div className="sparkles">✨💖✨</div>
          </header>

          <section className="card-grid">
            {moodOptions.map((mood) => (
              <button
                key={mood.id}
                className="mood-card neu-card"
                onClick={() => setSelectedMood(mood.id)}
              >
                <span className="mood-emoji">{mood.emoji}</span>
                <span className="mood-title">{mood.title}</span>
              </button>
            ))}
          </section>

          <section className="content-grid">
            <div className="neu-card game-card">
              <div className="section-heading">
                <h2>Stress Pop</h2>
                <p>A tiny ritual for a calmer day.</p>
              </div>
              <div className="bubble-grid">
                {bubbleLabels.map((b) => {
                  const popped = poppedBubbles.includes(b);
                  return (
                    <button
                      key={b}
                      className={`bubble ${popped ? 'popped' : ''}`}
                      onClick={() => handleBubbleToggle(b)}
                      aria-label={popped ? 'Popped bubble' : 'Pop bubble'}
                    />
                  );
                })}
              </div>
              {rewardUnlocked && (
                <div className="reward-card">
                  <div className="confetti">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <span key={index} className={`confetti-piece piece-${index % 4}`} />
                    ))}
                  </div>
                  <h3>Stress Popped! Reward unlocked</h3>
                  <p>Unlimited cuddles and a chocolate on the way! 🍫✨</p>
                </div>
              )}
            </div>

            <div className="neu-card gift-card">
              <div className="section-heading">
                <h2>Virtual Treat Box</h2>
                <p>Open for a little sweet surprise.</p>
              </div>
              <button className={`gift-box ${giftOpen ? 'open' : ''}`} onClick={() => setGiftOpen((prev) => !prev)}>
                <div className="gift-lid" />
                <div className="gift-body" />
                <span className="gift-label">{giftOpen ? 'Opened!' : 'Tap to open'}</span>
              </button>
              {giftOpen && (
                <div className="coupon-grid">
                  {giftCoupons.map((coupon) => (
                    <div key={coupon} className="coupon-card">
                      {coupon}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="compliment-card neu-card">
            <div className="section-heading">
              <h2>Boost My Mood 💖</h2>
              <p>One lovely compliment at a time.</p>
            </div>
            <div className="compliment-display">{compliments[complimentIndex]}</div>
            <button className="boost-btn" onClick={handleComplimentClick}>Show another one</button>
          </section>
        </div>

        {activeMood && (
          <div className="modal-overlay" onClick={() => setSelectedMood(null)}>
            <div className="modal-card neu-card" onClick={(event) => event.stopPropagation()}>
              <div className="modal-emoji">{activeMood.emoji}</div>
              <h3>{activeMood.title}</h3>
              <p>{activeMood.message}</p>
              <button className="boost-btn" onClick={() => setSelectedMood(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const styles = `
  :root {
    color-scheme: light;
    font-family: 'Poppins', 'Quicksand', sans-serif;
    background: linear-gradient(135deg, #f8ecef 0%, #f4e9e9 100%);
    color: #5d4d62;
  }

  * { box-sizing: border-box; }
  body { margin: 0; background: linear-gradient(135deg, #f8ecef 0%, #f4e9e9 100%); }
  button { font: inherit; }

  .app-shell {
    min-height: 100vh;
    padding: 20px;
    background: linear-gradient(135deg, #f8ecef 0%, #f4e9e9 100%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .app-card {
    width: min(1100px, 100%);
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .neu-card {
    background: linear-gradient(145deg, #f7eeef, #efe2e5);
    border-radius: 28px;
    box-shadow: 12px 12px 24px rgba(196, 166, 171, 0.35), -12px -12px 24px rgba(255,255,255,0.9);
    transition: all 300ms ease-in-out;
  }

  .neu-card:active {
    box-shadow: inset 6px 6px 12px rgba(196, 166, 171, 0.25), inset -6px -6px 12px rgba(255,255,255,0.9);
  }

  .hero-card {
    padding: 24px 24px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.3em;
    font-size: 0.72rem;
    color: #a48796;
    margin: 0 0 6px;
  }

  h1 {
    margin: 0;
    font-family: 'Quicksand', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    color: #6f5367;
  }

  .subtitle {
    margin: 6px 0 0;
    color: #8b6f7d;
    font-size: 1rem;
  }

  .sparkles {
    font-size: 1.6rem;
    padding: 10px 12px;
    border-radius: 50%;
    box-shadow: inset 3px 3px 6px rgba(196,166,171,0.2), inset -3px -3px 6px rgba(255,255,255,0.8);
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
  }

  .mood-card {
    border: 0;
    padding: 18px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 140px;
    cursor: pointer;
    color: #6f5367;
  }

  .mood-card:hover {
    transform: translateY(-2px);
    box-shadow: 14px 14px 24px rgba(196, 166, 171, 0.35), -12px -12px 24px rgba(255,255,255,0.95);
  }

  .mood-emoji { font-size: 1.8rem; margin-bottom: 8px; }
  .mood-title { font-weight: 600; text-align: center; }

  .content-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 16px;
  }

  .game-card, .gift-card, .compliment-card {
    padding: 20px;
  }

  .section-heading h2 {
    margin: 0;
    font-size: 1.15rem;
    color: #6f5367;
  }

  .section-heading p {
    margin: 4px 0 0;
    color: #967d8c;
    font-size: 0.9rem;
  }

  .bubble-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 16px;
  }

  .bubble {
    width: 58px;
    height: 58px;
    border-radius: 50%;
    border: 0;
    background: linear-gradient(145deg, #f6ecef, #eee2e5);
    box-shadow: 8px 8px 16px rgba(196, 166, 171, 0.25), -8px -8px 16px rgba(255,255,255,0.8);
    transition: all 300ms ease-in-out;
    cursor: pointer;
    justify-self: center;
  }

  .bubble:hover { transform: scale(1.04); }
  .bubble.popped {
    box-shadow: inset 6px 6px 12px rgba(196,166,171,0.2), inset -6px -6px 12px rgba(255,255,255,0.75);
    background: linear-gradient(145deg, #ecd9de, #f5ebee);
    transform: scale(0.96);
  }

  .reward-card {
    margin-top: 16px;
    padding: 14px;
    border-radius: 20px;
    background: linear-gradient(145deg, #fdf3f6, #f6e4e7);
    text-align: center;
    position: relative;
    overflow: hidden;
    animation: floatIn 500ms ease-out;
  }

  .reward-card h3 { margin: 4px 0 6px; color: #704e5f; }
  .reward-card p { margin: 0; color: #856574; }

  .confetti { position: absolute; inset: 0; pointer-events: none; }
  .confetti-piece {
    position: absolute;
    width: 8px;
    height: 14px;
    top: -10px;
    animation: fall 1000ms ease-out forwards;
  }
  .piece-0 { left: 10%; background: #ffb4c7; animation-delay: 0ms; }
  .piece-1 { left: 26%; background: #cbb3ff; animation-delay: 70ms; }
  .piece-2 { left: 44%; background: #ffd7a8; animation-delay: 120ms; }
  .piece-3 { left: 62%; background: #bde7c2; animation-delay: 190ms; }

  .gift-box {
    margin-top: 16px;
    width: 100%;
    max-width: 220px;
    height: 180px;
    border: 0;
    background: transparent;
    position: relative;
    cursor: pointer;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .gift-lid, .gift-body {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 18px;
    box-shadow: 8px 8px 16px rgba(196,166,171,0.25), -8px -8px 16px rgba(255,255,255,0.8);
    transition: all 400ms ease-in-out;
  }

  .gift-lid {
    top: 20px;
    width: 150px;
    height: 48px;
    background: linear-gradient(145deg, #f6dce1, #efc6cf);
    transform-origin: center 0;
  }

  .gift-body {
    bottom: 24px;
    width: 170px;
    height: 110px;
    background: linear-gradient(145deg, #f8ebed, #e8d4d8);
  }

  .gift-label {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    color: #7b5d6b;
    font-weight: 600;
  }

  .gift-box.open .gift-lid {
    transform: translateX(-50%) rotate(-10deg) translateY(-10px);
  }

  .gift-box.open .gift-body {
    transform: translateX(-50%) translateY(8px) scale(1.02);
  }

  .coupon-grid {
    display: grid;
    gap: 10px;
    margin-top: 16px;
  }

  .coupon-card {
    padding: 12px 14px;
    border-radius: 16px;
    background: linear-gradient(145deg, #fdeff2, #f4e6e8);
    box-shadow: inset 4px 4px 8px rgba(196,166,171,0.16), inset -4px -4px 8px rgba(255,255,255,0.8);
    color: #725766;
    text-align: center;
    animation: fadeIn 400ms ease-out;
  }

  .compliment-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }

  .compliment-display {
    padding: 14px 18px;
    border-radius: 18px;
    background: linear-gradient(145deg, #fdf5f7, #f0e2e5);
    box-shadow: inset 4px 4px 8px rgba(196,166,171,0.18), inset -4px -4px 8px rgba(255,255,255,0.8);
    text-align: center;
    color: #6f5367;
    width: 100%;
    max-width: 720px;
  }

  .boost-btn {
    border: 0;
    padding: 10px 16px;
    border-radius: 999px;
    background: linear-gradient(145deg, #f9e9eb, #e9d7db);
    color: #6f5367;
    box-shadow: 8px 8px 16px rgba(196,166,171,0.22), -8px -8px 16px rgba(255,255,255,0.85);
    cursor: pointer;
    transition: all 300ms ease-in-out;
  }

  .boost-btn:hover { transform: translateY(-1px); }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(97, 76, 85, 0.28);
    backdrop-filter: blur(4px);
    display: grid;
    place-items: center;
    padding: 16px;
    z-index: 20;
  }

  .modal-card {
    padding: 24px;
    max-width: 420px;
    text-align: center;
    animation: fadeIn 300ms ease-out;
  }

  .modal-emoji { font-size: 2rem; margin-bottom: 8px; }
  .modal-card h3 { margin: 0 0 8px; color: #6f5367; }
  .modal-card p { color: #815f71; line-height: 1.6; margin-bottom: 12px; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes floatIn {
    from { opacity: 0; transform: translateY(10px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes fall {
    to { transform: translateY(170px) rotate(360deg); opacity: 0; }
  }

  @media (max-width: 860px) {
    .card-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .content-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 560px) {
    .app-shell { padding: 12px; }
    .hero-card, .game-card, .gift-card, .compliment-card { padding: 16px; }
    .hero-card { flex-direction: column; align-items: flex-start; }
    .bubble { width: 50px; height: 50px; }
    .card-grid { grid-template-columns: 1fr; }
  }
`;
