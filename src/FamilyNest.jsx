/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const C = {
  bg: "#FFF7F0", card: "#FFFFFF", primary: "#D96A3C", primaryLight: "#F5E6DE",
  secondary: "#5A9E7A", secondaryLight: "#E3F2EB", accent: "#E8A830",
  accentLight: "#FDF3DC", purple: "#8B6FBA", purpleLight: "#EDE8F5",
  text: "#2C1A0E", muted: "#9A7B66", border: "#F0DDD1", white: "#FFFFFF",
};

const ACTIVITIES = [
  { title: "Appreciation Circle", desc: "Each person shares one genuine thing they love about another family member.", emoji: "💛", min: 5 },
  { title: "Childhood Story", desc: "Someone tells a funny or meaningful story from their childhood that the family hasn't heard.", emoji: "📖", min: 10 },
  { title: "Breathe Together", desc: "Breathe in for 4 counts, hold 4, exhale 6 — repeat 5 times as a family.", emoji: "🌬️", min: 5 },
  { title: "Cook Together", desc: "Make something simple together — a snack, smoothie, or a quick treat. Everyone picks one ingredient!", emoji: "🍳", min: 20 },
  { title: "Question Round", desc: "Pull a conversation card and ask everyone the same question. No wrong answers!", emoji: "💬", min: 10 },
  { title: "Family Dance Party", desc: "Play your all-time favourite family song and dance together in the living room.", emoji: "🕺", min: 5 },
  { title: "Dream Sharing", desc: "Each person shares one dream or goal they have — big or small, anything goes.", emoji: "⭐", min: 10 },
];

const CARDS = {
  "Fun": ["If our family were a sports team, what sport and team name would we be?","What animal secretly represents each person in our family?","If we had a family band, what would our name and music genre be?","What would the title of a reality show about our family be?","If our family had a coat of arms, what would be on it?"],
  "Dreams": ["Where would you love for us to travel together someday?","What's one thing you want to learn or achieve this year?","If money were no concern, what would our family do together?","Describe your life 10 years from now — what does it look like?","What dream feels too big to say out loud?"],
  "Life Lessons": ["What is the most important lesson life has taught you so far?","Who outside our family has inspired you the most?","What mistake led to your biggest lesson?","What advice would you give your younger self?","What does success truly mean to you?"],
  "Gratitude": ["What is your happiest memory from our family life?","What do you most admire about another person in this family?","What small everyday thing are you most grateful for?","What's something someone in this family did that made you really proud?","What's something you never say thank you for enough?"],
  "Funny": ["If aliens visited our home, what would confuse them the most?","What is the most embarrassing family moment you remember?","If you could swap lives with one family member for a day, who would it be?","What weird habit does someone in this family have?","If our family were a pizza, what toppings would represent each person?"],
  "Memories": ["What family tradition means the most to you and why?","What's a funny memory from a family holiday or trip?","What's the most memorable meal we've ever had together?","What's something we used to do as a family that you really miss?","What moment from our family life will you never forget?"],
};

const GOALS_POOL = [
  { title: "Dinner Together", desc: "Eat dinner as a family 4× this week", emoji: "🍽️", target: 4 },
  { title: "Weekly Walk", desc: "Go on a family walk together once a week", emoji: "🚶", target: 4 },
  { title: "Game Night", desc: "Play a game together every Friday this month", emoji: "🎮", target: 4 },
  { title: "Daily Hugs", desc: "Give everyone a proper hug each day this week", emoji: "🤗", target: 7 },
  { title: "Screen-Free Hour", desc: "One screen-free hour as a family each evening", emoji: "📵", target: 7 },
  { title: "Read Together", desc: "Read or listen to a story together this week", emoji: "📚", target: 3 },
];

const BADGES = [
  { id: "first", emoji: "🌟", title: "First Step", desc: "Completed your first family activity" },
  { id: "grateful", emoji: "💛", title: "Gratitude Champion", desc: "Posted 3 gratitude messages" },
  { id: "storyteller", emoji: "📖", title: "Storytelling Star", desc: "Built a story together" },
  { id: "mindful", emoji: "🕊️", title: "Peace Keeper", desc: "Completed 3 mindfulness exercises" },
  { id: "goalmaster", emoji: "🏆", title: "Goal Achiever", desc: "Completed a family goal" },
  { id: "memory", emoji: "📸", title: "Memory Maker", desc: "Added 3 family memories" },
  { id: "meeting", emoji: "🗓️", title: "Team Player", desc: "Completed a weekly family meeting" },
];

const MENTAL = [
  { id: "breath", emoji: "🌬️", title: "2-Min Breathing", desc: "Breathe in 4, hold 4, exhale 6. Do this together as a family — close your eyes and just breathe.", dur: 120 },
  { id: "med", emoji: "🧘", title: "Family Meditation", desc: "Sit quietly together, close your eyes, and focus on the sounds around you for 3 peaceful minutes.", dur: 180 },
  { id: "grat", emoji: "💛", title: "Gratitude Reflection", desc: "Each family member names 3 things they're grateful for today — big, small, or silly.", dur: 300 },
  { id: "affirm", emoji: "✨", title: "Affirmations Round", desc: "Take turns completing: 'I am proud of myself because...' Let everyone share without interruption.", dur: 240 },
];

const MEMORY_EMOJIS = ["🐶", "🌺", "🎸", "🍕", "⚡", "🦋", "🎨", "🌙", "🏆", "🦁", "🌈", "🎯"];

const TRIVIA_Q = [
  "What is your favourite colour?","What food could you eat every single day?","What's your hidden talent that nobody knows?","What song gets stuck in your head most often?","What would you choose as your perfect birthday meal?","What is one thing that always makes you laugh?","What is your earliest memory?","What would be your dream job as a child?",
];

const MOODS = [
  { label: "Happy", emoji: "😄", col: C.accent, sug: "Dance Party" },
  { label: "Okay", emoji: "😊", col: C.secondary, sug: "Conversation Cards" },
  { label: "Stressed", emoji: "😤", col: C.purple, sug: "Breathing Exercise" },
  { label: "Sad", emoji: "😔", col: "#6A9EB8", sug: "Appreciation Circle" },
];

const MEMBER_EMOJIS = ["👦", "👧", "👨", "👩", "👴", "👵", "🧒", "👱"];

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  app: { minHeight: "100vh", background: C.bg, fontFamily: "'Nunito', 'Segoe UI', sans-serif", maxWidth: 480, margin: "0 auto", position: "relative", overflowX: "hidden" },
  card: { background: C.card, borderRadius: 20, padding: "18px 20px", boxShadow: "0 2px 16px rgba(44,26,14,0.07)", marginBottom: 12 },
  pill: (bg, col) => ({ background: bg, color: col, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 800, display: "inline-block" }),
  btn: (bg, col, full) => ({ width: full ? "100%" : "auto", padding: "14px 20px", borderRadius: 14, background: bg, color: col, border: "none", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", display: "block", textAlign: "center" }),
  input: { width: "100%", padding: "12px 16px", borderRadius: 12, border: `2px solid ${C.border}`, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: C.white, color: C.text },
  row: { display: "flex", alignItems: "center", gap: 12 },
  listBtn: { width: "100%", display: "flex", alignItems: "center", gap: 14, background: C.card, borderRadius: 18, padding: "16px 20px", marginBottom: 10, border: "none", cursor: "pointer", boxShadow: "0 2px 10px rgba(44,26,14,0.06)", textAlign: "left", fontFamily: "inherit" },
  iconBox: (col) => ({ width: 54, height: 54, borderRadius: 14, background: col + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }),
  back: { background: "none", border: "none", cursor: "pointer", color: C.primary, fontWeight: 800, fontSize: 15, fontFamily: "inherit", marginBottom: 16, padding: 0 },
  section: { padding: "20px 16px 110px" },
  hero: (bg) => ({ background: bg, padding: "28px 20px 32px", borderRadius: "0 0 28px 28px", marginBottom: 20 }),
};

// ─── Setup ────────────────────────────────────────────────────────────────────
function Setup({ onDone }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);
  const [mName, setMName] = useState(""); const [mAge, setMAge] = useState("");

  const addMember = () => {
    if (mName && mAge) { setMembers([...members, { name: mName, age: +mAge, emoji: MEMBER_EMOJIS[members.length % 8] }]); setMName(""); setMAge(""); }
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${C.bg} 0%, #FFE8D6 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Nunito', sans-serif" }}>
      {step === 0 ? (
        <div style={{ width: "100%", maxWidth: 400, textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 30, fontWeight: 900, color: C.text, margin: "0 0 8px" }}>Welcome to FamilyNest</h1>
          <p style={{ color: C.muted, marginBottom: 32, fontSize: 16, lineHeight: 1.5 }}>Your family's cosy space for connection, joy & meaningful moments</p>
          <input style={{ ...s.input, marginBottom: 12, fontSize: 17 }} placeholder="Your family name (e.g. The Johnsons)" value={name} onChange={e => setName(e.target.value)} />
          <button style={{ ...s.btn(`linear-gradient(135deg, ${C.primary}, #F08050)`, C.white, true) }} onClick={() => name && setStep(1)}>Let's begin →</button>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: 400 }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: C.text, marginBottom: 4 }}>Add Family Members</h2>
          <p style={{ color: C.muted, marginBottom: 20 }}>Add everyone in your household</p>
          {members.map((m, i) => (
            <div key={i} style={{ ...s.row, background: C.card, borderRadius: 12, padding: "12px 16px", marginBottom: 8 }}>
              <span style={{ fontSize: 28 }}>{m.emoji}</span>
              <div><div style={{ fontWeight: 800, color: C.text }}>{m.name}</div><div style={{ color: C.muted, fontSize: 13 }}>Age {m.age}</div></div>
              <button onClick={() => setMembers(members.filter((_, j) => j !== i))} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: C.muted, fontSize: 18 }}>×</button>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input style={{ ...s.input, flex: 1 }} placeholder="Name" value={mName} onChange={e => setMName(e.target.value)} />
            <input style={{ ...s.input, width: 80 }} placeholder="Age" type="number" value={mAge} onChange={e => setMAge(e.target.value)} />
          </div>
          <button onClick={addMember} style={{ width: "100%", padding: "13px", borderRadius: 12, background: C.primaryLight, color: C.primary, border: `2px dashed ${C.primary}`, fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", marginBottom: 12 }}>+ Add member</button>
          {members.length >= 1 && <button style={{ ...s.btn(`linear-gradient(135deg, ${C.primary}, #F08050)`, C.white, true) }} onClick={() => onDone({ name, members })}>Start FamilyNest! 🏠</button>}
        </div>
      )}
    </div>
  );
}

// ─── Screen Free ─────────────────────────────────────────────────────────────
function ScreenFree({ activity, onReturn }) {
  const [sec, setSec] = useState(900);
  useEffect(() => { const t = setInterval(() => setSec(s => s > 0 ? s - 1 : 0), 1000); return () => clearInterval(t); }, []);
  const m = Math.floor(sec / 60), s2 = sec % 60;
  return (
    <div style={{ minHeight: "100vh", background: "#1A0E08", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center", fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ fontSize: 72, marginBottom: 20 }}>🌙</div>
      <h1 style={{ fontSize: 26, fontWeight: 900, color: "#FFE8D6", marginBottom: 10 }}>Now enjoy this moment together</h1>
      <p style={{ color: "#C4956A", fontSize: 17, marginBottom: 8 }}>Put the phone face-down and enjoy:</p>
      <p style={{ color: "#FFE8D6", fontSize: 19, fontWeight: 800, marginBottom: 32 }}>{activity}</p>
      <div style={{ fontSize: 52, fontWeight: 900, color: C.accent, marginBottom: 6 }}>{m}:{s2.toString().padStart(2, "0")}</div>
      <p style={{ color: "#8B6E5A", marginBottom: 40 }}>Come back in {m} minute{m !== 1 ? "s" : ""} ✨</p>
      <button style={{ ...s.btn(C.primary, C.white) }} onClick={onReturn}>We're back! ✅</button>
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function HomeTab({ family, todayAct, done, setDone, addPts, earnBadge, gwall, onScreenFree }) {
  const [mood, setMood] = useState(null);
  const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
  return (
    <div style={{ paddingBottom: 110 }}>
      <div style={{ ...s.hero(`linear-gradient(135deg, ${C.primary} 0%, #F0855A 100%)`) }}>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{day}'s Activity</p>
        <h2 style={{ color: C.white, fontSize: 22, fontWeight: 900, margin: 0 }}>Hello, {family.name}! 🏠</h2>
      </div>

      <div style={{ padding: "0 16px" }}>
        {/* Daily Card */}
        <div style={s.card}>
          <div style={{ ...s.pill(C.primaryLight, C.primary), marginBottom: 10 }}>TODAY'S ACTIVITY</div>
          <h3 style={{ fontSize: 19, fontWeight: 900, color: C.text, margin: "0 0 6px" }}>{todayAct.emoji} {todayAct.title}</h3>
          <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.5, margin: "0 0 14px" }}>{todayAct.desc}</p>
          <div style={{ ...s.pill(C.accentLight, C.accent), marginBottom: 14 }}>⏱ {todayAct.min} min</div>
          {!done ? (
            <button style={{ ...s.btn(`linear-gradient(135deg, ${C.primary}, #F08050)`, C.white, true) }}
              onClick={() => { onScreenFree(todayAct.title); addPts(10); setDone(true); earnBadge("first"); }}>
              Start Activity 🚀
            </button>
          ) : (
            <div style={{ background: C.secondaryLight, borderRadius: 12, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 22 }}>✅</span>
              <span style={{ color: C.secondary, fontWeight: 800 }}>Done! +10 points earned</span>
            </div>
          )}
        </div>

        {/* Mood */}
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 15, fontWeight: 900, color: C.text, marginBottom: 10 }}>How is the family feeling today?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {MOODS.map(m => (
              <button key={m.label} onClick={() => setMood(m)} style={{ background: mood?.label === m.label ? m.col + "30" : C.card, borderRadius: 14, padding: "12px 6px", border: `2px solid ${mood?.label === m.label ? m.col : C.border}`, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 26 }}>{m.emoji}</span>
                <span style={{ fontSize: 10, fontWeight: 800, color: mood?.label === m.label ? C.text : C.muted, fontFamily: "inherit" }}>{m.label}</span>
              </button>
            ))}
          </div>
          {mood && (
            <div style={{ marginTop: 10, ...s.card, margin: "10px 0 0" }}>
              <p style={{ color: C.muted, fontSize: 14, margin: 0 }}>Feeling <strong style={{ color: C.text }}>{mood.label}</strong>? Try: <strong style={{ color: C.primary }}>{mood.sug}</strong> 💛</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ background: `linear-gradient(135deg, ${C.accent}, #D49020)`, borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: C.white }}>{gwall.length}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>Gratitude messages</div>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${C.secondary}, #3A7E5A)`, borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: C.white }}>{done ? 1 : 0}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontWeight: 700 }}>Activities today</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Play ─────────────────────────────────────────────────────────────────────
function GuessWho({ family, onBack }) {
  const [revealed, setRevealed] = useState(false);
  const [target, setTarget] = useState(family.members[0]);
  const [clue, setClue] = useState("");
  const next = () => { setRevealed(false); setClue(""); setTarget(family.members[Math.floor(Math.random() * family.members.length)]); };
  return (
    <div style={s.section}>
      <button style={s.back} onClick={onBack}>← Back</button>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>🎭 Guess Who?</h2>
      <p style={{ color: C.muted, marginBottom: 20 }}>One person sees the name and gives clues — others guess!</p>
      <div style={s.card}>
        <div style={{ ...s.pill(C.purpleLight, C.purple), marginBottom: 12 }}>SECRET FAMILY MEMBER</div>
        {!revealed ? (
          <button onClick={() => setRevealed(true)} style={{ width: "100%", padding: "20px", borderRadius: 14, background: C.purpleLight, border: `2px dashed ${C.purple}`, color: C.purple, fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
            👁️ Tap to reveal (show only to one person!)
          </button>
        ) : (
          <div style={{ textAlign: "center", background: "#F5F0FC", borderRadius: 14, padding: "20px" }}>
            <div style={{ fontSize: 48 }}>{target.emoji}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: C.purple }}>{target.name}</div>
          </div>
        )}
      </div>
      <div style={s.card}>
        <p style={{ color: C.muted, fontSize: 13, fontWeight: 700, marginBottom: 8 }}>YOUR CLUES (don't say the name!)</p>
        <textarea value={clue} onChange={e => setClue(e.target.value)} placeholder="e.g. 'This person always laughs first and loves chocolate...'" style={{ ...s.input, minHeight: 100, resize: "none" }} />
      </div>
      <button style={{ ...s.btn(C.purple, C.white, true) }} onClick={next}>🔀 New Random Member</button>
    </div>
  );
}

function FamilyTrivia({ family, onBack }) {
  const [qIdx, setQIdx] = useState(0); const [mIdx, setMIdx] = useState(0);
  const [ans, setAns] = useState(""); const [shown, setShown] = useState(false);
  const member = family.members[mIdx % family.members.length];
  const q = TRIVIA_Q[qIdx % TRIVIA_Q.length];
  return (
    <div style={s.section}>
      <button style={s.back} onClick={onBack}>← Back</button>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>🧠 Family Trivia</h2>
      <p style={{ color: C.muted, marginBottom: 20 }}>Who knows each other best?</p>
      <div style={{ background: `linear-gradient(135deg, ${C.accent}, #D49020)`, borderRadius: 20, padding: "24px 20px", marginBottom: 14, textAlign: "center" }}>
        <div style={{ fontSize: 44 }}>{member.emoji}</div>
        <h3 style={{ color: C.white, fontSize: 20, fontWeight: 900, margin: "4px 0" }}>{member.name}</h3>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 17, margin: 0 }}>{q}</p>
      </div>
      {!shown ? (
        <>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 8 }}>Others guess first — then {member.name} reveals the real answer:</p>
          <input value={ans} onChange={e => setAns(e.target.value)} placeholder={`What does ${member.name} say?`} style={{ ...s.input, marginBottom: 12 }} />
          <button style={{ ...s.btn(C.primary, C.white, true) }} onClick={() => setShown(true)}>Reveal {member.name}'s Answer! 🎉</button>
        </>
      ) : (
        <>
          <div style={{ ...s.card, textAlign: "center" }}>
            <p style={{ color: C.muted, fontSize: 13 }}>{member.name}'s answer:</p>
            <p style={{ fontSize: 20, fontWeight: 900, color: C.text }}>{ans || "(no answer)"}</p>
          </div>
          <button style={{ ...s.btn(C.accent, C.white, true) }} onClick={() => { setShown(false); setAns(""); setQIdx(q => q + 1); setMIdx(m => m + 1); }}>Next Question →</button>
        </>
      )}
    </div>
  );
}

function MemoryGame({ onBack, addPts }) {
  const [phase, setPhase] = useState("ready");
  const [items, setItems] = useState([]);
  const [sec, setSec] = useState(5);
  const [picked, setPicked] = useState([]);
  useEffect(() => {
    if (phase !== "show") return;
    const t = setInterval(() => setSec(s => { if (s <= 1) { clearInterval(t); setPhase("guess"); return 0; } return s - 1; }), 1000);
    return () => clearInterval(t);
  }, [phase]);
  const start = () => { setItems([...MEMORY_EMOJIS].sort(() => Math.random() - 0.5).slice(0, 6)); setPicked([]); setPhase("show"); setSec(5); };
  const score = picked.filter(p => items.includes(p)).length;
  return (
    <div style={s.section}>
      <button style={s.back} onClick={onBack}>← Back</button>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>🃏 Memory Game</h2>
      <p style={{ color: C.muted, marginBottom: 20 }}>Remember the items before they disappear!</p>
      {phase === "ready" && <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>🃏</div>
        <p style={{ color: C.muted, marginBottom: 24 }}>You'll see 6 items for 5 seconds — then try to recall them all!</p>
        <button style={{ ...s.btn(C.secondary, C.white) }} onClick={start}>Start Game!</button>
      </div>}
      {phase === "show" && <>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 48, fontWeight: 900, color: C.primary }}>{sec}</div>
          <p style={{ color: C.muted }}>Memorise these items!</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {items.map((e, i) => <div key={i} style={{ ...s.card, textAlign: "center", fontSize: 40, padding: "18px 0" }}>{e}</div>)}
        </div>
      </>}
      {phase === "guess" && <>
        <p style={{ color: C.text, fontWeight: 800, marginBottom: 12 }}>Which items were shown? Tap all you remember:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 14 }}>
          {MEMORY_EMOJIS.map((e, i) => <button key={i} onClick={() => setPicked(p => p.includes(e) ? p.filter(x => x !== e) : [...p, e])} style={{ borderRadius: 14, padding: "18px 0", textAlign: "center", fontSize: 36, border: `2px solid ${picked.includes(e) ? C.secondary : C.border}`, background: picked.includes(e) ? C.secondaryLight : C.card, cursor: "pointer" }}>{e}</button>)}
        </div>
        <button style={{ ...s.btn(C.secondary, C.white, true) }} onClick={() => { setPhase("done"); addPts(score * 2); }}>Check my answers!</button>
      </>}
      {phase === "done" && <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 72, marginBottom: 10 }}>{score >= 5 ? "🏆" : score >= 3 ? "⭐" : "💪"}</div>
        <h3 style={{ fontSize: 26, fontWeight: 900, color: C.text, marginBottom: 8 }}>You got {score}/6!</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
          {items.map((e, i) => <div key={i} style={{ background: C.secondaryLight, borderRadius: 14, padding: "14px 0", textAlign: "center", fontSize: 32 }}>{e}</div>)}
        </div>
        <button style={{ ...s.btn(C.secondary, C.white) }} onClick={start}>Play again!</button>
      </div>}
    </div>
  );
}

function StoryBuilder({ family, onBack, addPts, earnBadge }) {
  const [lines, setLines] = useState([]);
  const [cur, setCur] = useState("");
  const [mIdx, setMIdx] = useState(0);
  const member = family.members[mIdx % family.members.length];
  const add = () => {
    if (!cur.trim()) return;
    const next = [...lines, { text: cur, name: member.name, emoji: member.emoji }];
    setLines(next); setCur(""); setMIdx(i => i + 1);
    if (next.length === 5) { addPts(20); earnBadge("storyteller"); }
  };
  return (
    <div style={s.section}>
      <button style={s.back} onClick={onBack}>← Back</button>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>📖 Story Builder</h2>
      <p style={{ color: C.muted, marginBottom: 20 }}>Build a family story one sentence at a time!</p>
      {lines.length > 0 && <div style={s.card}>
        <div style={{ ...s.pill(C.primaryLight, C.primary), marginBottom: 10 }}>THE STORY SO FAR</div>
        {lines.map((l, i) => <p key={i} style={{ color: C.text, margin: "0 0 6px", fontSize: 15, lineHeight: 1.5 }}><span style={{ color: C.muted, fontSize: 12 }}>{l.emoji} {l.name}: </span><em>"{l.text}"</em></p>)}
        {lines.length >= 5 && <div style={{ marginTop: 10, ...s.pill(C.secondaryLight, C.secondary) }}>🎉 Amazing story! +20 points earned!</div>}
      </div>}
      <div style={{ background: `linear-gradient(135deg, ${C.primary}, #F08050)`, borderRadius: 16, padding: "16px 20px", marginBottom: 12, textAlign: "center" }}>
        <div style={{ fontSize: 32 }}>{member.emoji}</div>
        <p style={{ color: C.white, fontWeight: 800, margin: "4px 0 2px" }}>{member.name}'s turn!</p>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, margin: 0 }}>Add the next sentence to the story:</p>
      </div>
      <textarea value={cur} onChange={e => setCur(e.target.value)} placeholder={lines.length === 0 ? "Start the story... (e.g. 'Once upon a time, our family discovered...')" : "Continue the story..."} style={{ ...s.input, minHeight: 100, resize: "none", marginBottom: 12 }} />
      <button style={{ ...s.btn(C.primary, C.white, true) }} onClick={add}>Add to story ✍️</button>
    </div>
  );
}

function PlayTab({ family, addPts, earnBadge, onScreenFree }) {
  const [game, setGame] = useState(null);
  const games = [
    { id: "guess", title: "Guess Who?", emoji: "🎭", desc: "Describe a family member without saying their name", col: C.purple },
    { id: "trivia", title: "Family Trivia", emoji: "🧠", desc: "Answer questions about each other — who knows the family best?", col: C.accent },
    { id: "memory", title: "Memory Game", emoji: "🃏", desc: "Memorise items before they disappear!", col: C.secondary },
    { id: "story", title: "Story Builder", emoji: "📖", desc: "Build a family story one sentence at a time", col: C.primary },
  ];
  if (game === "guess") return <GuessWho family={family} onBack={() => setGame(null)} />;
  if (game === "trivia") return <FamilyTrivia family={family} onBack={() => setGame(null)} />;
  if (game === "memory") return <MemoryGame onBack={() => setGame(null)} addPts={addPts} />;
  if (game === "story") return <StoryBuilder family={family} onBack={() => setGame(null)} addPts={addPts} earnBadge={earnBadge} />;
  return (
    <div style={s.section}>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>Family Games 🎮</h2>
      <p style={{ color: C.muted, marginBottom: 20 }}>Designed for everyone together in one room</p>
      {games.map(g => (
        <button key={g.id} onClick={() => setGame(g.id)} style={s.listBtn}>
          <div style={s.iconBox(g.col)}>{g.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: C.text, marginBottom: 2 }}>{g.title}</div>
            <div style={{ fontSize: 13, color: C.muted }}>{g.desc}</div>
          </div>
          <span style={{ color: C.muted, fontSize: 20 }}>›</span>
        </button>
      ))}
    </div>
  );
}

// ─── Talk ─────────────────────────────────────────────────────────────────────
function TalkTab() {
  const cats = Object.keys(CARDS);
  const [cat, setCat] = useState(cats[0]);
  const [idx, setIdx] = useState(0);
  const cards = CARDS[cat];
  return (
    <div style={s.section}>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>Conversation Cards 💬</h2>
      <p style={{ color: C.muted, marginBottom: 14 }}>Meaningful questions for the whole family</p>
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10, marginBottom: 20, scrollbarWidth: "none" }}>
        {cats.map(c => <button key={c} onClick={() => { setCat(c); setIdx(0); }} style={{ padding: "7px 15px", borderRadius: 20, border: `2px solid ${cat === c ? C.primary : C.border}`, background: cat === c ? C.primary : C.card, color: cat === c ? C.white : C.muted, fontSize: 13, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", flexShrink: 0 }}>{c}</button>)}
      </div>
      <div style={{ background: `linear-gradient(145deg, ${C.primary} 0%, #E08050 100%)`, borderRadius: 24, padding: "44px 28px", textAlign: "center", marginBottom: 18, minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "center", boxShadow: `0 8px 32px ${C.primary}44` }}>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 800, marginBottom: 14, letterSpacing: 1.5, textTransform: "uppercase" }}>{cat}</p>
        <p style={{ color: C.white, fontSize: 20, fontWeight: 700, lineHeight: 1.6, margin: 0 }}>"{cards[idx]}"</p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 16 }}>{idx + 1} / {cards.length}</p>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setIdx(i => i > 0 ? i - 1 : cards.length - 1)} style={{ ...s.btn(C.card, C.primary), flex: 1, border: `2px solid ${C.border}` }}>← Prev</button>
        <button onClick={() => setIdx(i => (i + 1) % cards.length)} style={{ ...s.btn(C.primary, C.white), flex: 1 }}>Next →</button>
      </div>
    </div>
  );
}

// ─── Reflect ─────────────────────────────────────────────────────────────────
function MentalPeace({ onBack, addPts, earnBadge, pCount, setPCount }) {
  const [active, setActive] = useState(null);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if (!running) return;
    if (timer <= 0) { setRunning(false); setFinished(true); addPts(15); const nc = pCount + 1; setPCount(nc); if (nc >= 3) earnBadge("mindful"); return; }
    const t = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timer]);
  if (active) {
    const m = Math.floor(timer / 60), s2 = (timer % 60).toString().padStart(2, "0");
    return <div style={s.section}>
      <button style={s.back} onClick={() => { setActive(null); setRunning(false); setFinished(false); }}>← Back</button>
      <div style={{ background: `linear-gradient(135deg, ${C.purple}, #6B4CA0)`, borderRadius: 24, padding: "36px 24px", textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>{active.emoji}</div>
        <h3 style={{ color: C.white, fontSize: 20, fontWeight: 900, marginBottom: 8 }}>{active.title}</h3>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, lineHeight: 1.5, margin: "0 0 20px" }}>{active.desc}</p>
        {running ? <div style={{ fontSize: 52, fontWeight: 900, color: C.white }}>{m}:{s2}</div> : null}
      </div>
      {finished ? <div style={{ ...s.card, textAlign: "center" }}><div style={{ fontSize: 40, marginBottom: 6 }}>✅</div><p style={{ color: C.secondary, fontWeight: 800 }}>Well done! +15 points earned</p></div>
        : !running ? <button style={{ ...s.btn(C.purple, C.white, true) }} onClick={() => setRunning(true)}>Start Exercise 🧘</button> : null}
    </div>;
  }
  return <div style={s.section}>
    <button style={s.back} onClick={onBack}>← Back</button>
    <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>🧘 Mental Peace</h2>
    <p style={{ color: C.muted, marginBottom: 20 }}>Simple activities for family calm and wellbeing</p>
    {MENTAL.map(ex => <button key={ex.id} onClick={() => { setActive(ex); setTimer(ex.dur); setRunning(false); setFinished(false); }} style={s.listBtn}>
      <div style={s.iconBox(C.purple)}>{ex.emoji}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 16, fontWeight: 900, color: C.text, marginBottom: 2 }}>{ex.title}</div>
        <div style={{ fontSize: 13, color: C.muted }}>{Math.floor(ex.dur / 60)} minutes</div>
      </div>
      <span style={{ color: C.muted, fontSize: 20 }}>›</span>
    </button>)}
  </div>;
}

function WeeklyMeeting({ onBack, family, step, setStep, notes, setNotes, addPts, earnBadge }) {
  const STEPS = [
    { title: "What Went Well", emoji: "✨", q: "Each person shares one thing that went well for them this week..." },
    { title: "Challenges", emoji: "💪", q: "Did anyone face a challenge this week? How did you handle it?" },
    { title: "Plans for Next Week", emoji: "📅", q: "What are we looking forward to or planning for next week?" },
    { title: "Appreciation Round", emoji: "💛", q: "Thank someone in the family for something specific they did this week." },
  ];
  return <div style={s.section}>
    <button style={s.back} onClick={onBack}>← Back</button>
    <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>🗓️ Weekly Family Meeting</h2>
    <p style={{ color: C.muted, marginBottom: 14 }}>A guided 10-minute family check-in</p>
    <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
      {STEPS.map((_, i) => <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i <= step && step < STEPS.length ? C.primary : C.border }} />)}
    </div>
    {step < STEPS.length ? <>
      <div style={{ background: `linear-gradient(135deg, ${C.secondary}, #3A7E5A)`, borderRadius: 20, padding: "24px 20px", marginBottom: 14, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>{STEPS[step].emoji}</div>
        <h3 style={{ color: C.white, fontSize: 19, fontWeight: 900, marginBottom: 6 }}>Step {step + 1}: {STEPS[step].title}</h3>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, margin: 0 }}>{STEPS[step].q}</p>
      </div>
      <textarea placeholder="Notes..." value={notes[step]} onChange={e => { const n = [...notes]; n[step] = e.target.value; setNotes(n); }} style={{ ...s.input, minHeight: 100, resize: "none", marginBottom: 12 }} />
      <button style={{ ...s.btn(C.primary, C.white, true) }} onClick={() => { if (step < STEPS.length - 1) setStep(s => s + 1); else { setStep(STEPS.length); addPts(30); earnBadge("meeting"); } }}>
        {step < STEPS.length - 1 ? "Next Step →" : "Complete Meeting! 🎉"}
      </button>
    </> : <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ fontSize: 64, marginBottom: 12 }}>🎉</div>
      <h3 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 8 }}>Meeting Complete!</h3>
      <p style={{ color: C.muted, marginBottom: 24 }}>Wonderful, {family.name}! You earned 30 points 🌟</p>
      <button style={s.btn(C.primary, C.white)} onClick={() => { setStep(0); onBack(); }}>Done</button>
    </div>}
  </div>;
}

function Achievements({ onBack, earned, pts }) {
  return <div style={s.section}>
    <button style={s.back} onClick={onBack}>← Back</button>
    <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>🏆 Achievements</h2>
    <div style={{ ...s.pill(`linear-gradient(135deg, ${C.accent}, #D49020)`, C.white), fontSize: 15, marginBottom: 20 }}>⭐ {pts} total points</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {BADGES.map(b => {
        const ok = earned.includes(b.id);
        return <div key={b.id} style={{ background: ok ? C.card : "#F8F4EF", borderRadius: 16, padding: "16px 12px", textAlign: "center", boxShadow: ok ? `0 4px 14px ${C.primary}20` : "none", opacity: ok ? 1 : 0.45 }}>
          <div style={{ fontSize: 36, marginBottom: 8, filter: ok ? "none" : "grayscale(100%)" }}>{b.emoji}</div>
          <div style={{ fontSize: 12, fontWeight: 900, color: C.text, marginBottom: 4 }}>{b.title}</div>
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{b.desc}</div>
          {ok && <div style={{ marginTop: 8, ...s.pill(C.secondaryLight, C.secondary), fontSize: 10 }}>EARNED ✓</div>}
        </div>;
      })}
    </div>
  </div>;
}

function GoalsSection({ goals, setGoals, onBack, addPts, earnBadge }) {
  const [adding, setAdding] = useState(false);
  const inc = (id) => setGoals(goals.map(g => {
    if (g.id !== id) return g;
    const np = Math.min(g.progress + 1, g.target);
    if (np === g.target) { addPts(20); earnBadge("goalmaster"); }
    return { ...g, progress: np };
  }));
  return <div style={s.section}>
    <button style={s.back} onClick={onBack}>← Back</button>
    <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>🎯 Family Goals</h2>
    <p style={{ color: C.muted, marginBottom: 20 }}>Set and track goals as a family</p>
    {goals.map(g => {
      const pct = (g.progress / g.target) * 100; const done = g.progress >= g.target;
      return <div key={g.id} style={s.card}>
        <div style={{ ...s.row, marginBottom: 10 }}>
          <span style={{ fontSize: 30 }}>{g.emoji}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: C.text }}>{g.title}</div>
            <div style={{ fontSize: 12, color: C.muted }}>{g.desc}</div>
          </div>
          {done && <span>🏆</span>}
        </div>
        <div style={{ background: C.border, borderRadius: 8, height: 10, marginBottom: 8, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: done ? C.secondary : C.primary, borderRadius: 8, transition: "width 0.4s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: C.muted }}>{g.progress} / {g.target}</span>
          {!done ? <button onClick={() => inc(g.id)} style={{ padding: "8px 18px", borderRadius: 12, background: C.primary, color: C.white, border: "none", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>+ Log</button>
            : <span style={{ color: C.secondary, fontWeight: 800, fontSize: 13 }}>Complete! ✅</span>}
        </div>
      </div>;
    })}
    <button onClick={() => setAdding(!adding)} style={{ width: "100%", padding: 14, borderRadius: 14, background: adding ? C.border : C.primary, color: adding ? C.muted : C.white, border: adding ? `2px dashed ${C.muted}` : "none", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", marginBottom: 10 }}>
      {adding ? "Cancel" : "+ Add New Goal"}
    </button>
    {adding && GOALS_POOL.filter(t => !goals.find(g => g.title === t.title)).map((t, i) => (
      <button key={i} onClick={() => { setGoals([...goals, { ...t, progress: 0, id: Date.now() }]); setAdding(false); }} style={{ width: "100%", display: "flex", gap: 12, alignItems: "center", padding: "14px 16px", borderRadius: 14, background: C.card, border: `2px solid ${C.border}`, cursor: "pointer", textAlign: "left", fontFamily: "inherit", marginBottom: 8 }}>
        <span style={{ fontSize: 26 }}>{t.emoji}</span>
        <div><div style={{ fontWeight: 800, color: C.text }}>{t.title}</div><div style={{ fontSize: 12, color: C.muted }}>{t.desc}</div></div>
      </button>
    ))}
  </div>;
}

function ReflectTab({ family, pts, earned, earnBadge, addPts, step, setStep, notes, setNotes, goals, setGoals }) {
  const [sec, setSec] = useState("main");
  const [pCount, setPCount] = useState(0);
  const items = [
    { id: "peace", emoji: "🧘", title: "Mental Peace", desc: "Breathing, meditation & gratitude exercises", col: C.purple },
    { id: "meeting", emoji: "🗓️", title: "Weekly Meeting", desc: "Guided 10-minute family check-in", col: C.secondary },
    { id: "goals", emoji: "🎯", title: "Family Goals", desc: "Set and track goals together", col: C.accent },
    { id: "achievements", emoji: "🏆", title: "Achievements", desc: "Badges and family points earned", col: C.primary },
  ];
  if (sec === "peace") return <MentalPeace onBack={() => setSec("main")} addPts={addPts} earnBadge={earnBadge} pCount={pCount} setPCount={setPCount} />;
  if (sec === "meeting") return <WeeklyMeeting onBack={() => setSec("main")} family={family} step={step} setStep={setStep} notes={notes} setNotes={setNotes} addPts={addPts} earnBadge={earnBadge} />;
  if (sec === "goals") return <GoalsSection goals={goals} setGoals={setGoals} onBack={() => setSec("main")} addPts={addPts} earnBadge={earnBadge} />;
  if (sec === "achievements") return <Achievements onBack={() => setSec("main")} earned={earned} pts={pts} />;
  return <div style={s.section}>
    <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>Reflect & Grow 🌱</h2>
    <p style={{ color: C.muted, marginBottom: 20 }}>Tools for family peace, goals & growth</p>
    {items.map(it => <button key={it.id} onClick={() => setSec(it.id)} style={s.listBtn}>
      <div style={s.iconBox(it.col)}>{it.emoji}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 16, fontWeight: 900, color: C.text, marginBottom: 2 }}>{it.title}</div>
        <div style={{ fontSize: 13, color: C.muted }}>{it.desc}</div>
      </div>
      <span style={{ color: C.muted, fontSize: 20 }}>›</span>
    </button>)}
  </div>;
}

// ─── Memories ────────────────────────────────────────────────────────────────
function MemoriesTab({ family, gwall, setGwall, mems, setMems, addPts, earnBadge }) {
  const [sec, setSec] = useState("main");
  const [msg, setMsg] = useState({ from: "", to: "", text: "" });
  const [note, setNote] = useState("");
  if (sec === "gratitude") return <div style={s.section}>
    <button style={s.back} onClick={() => setSec("main")}>← Back</button>
    <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>💛 Gratitude Wall</h2>
    <p style={{ color: C.muted, marginBottom: 16 }}>Share appreciation with your family</p>
    <div style={s.card}>
      <input style={{ ...s.input, marginBottom: 8 }} placeholder="Your name" value={msg.from} onChange={e => setMsg({ ...msg, from: e.target.value })} />
      <input style={{ ...s.input, marginBottom: 8 }} placeholder="Message to (e.g. Mom, Everyone)" value={msg.to} onChange={e => setMsg({ ...msg, to: e.target.value })} />
      <textarea style={{ ...s.input, minHeight: 80, resize: "none", marginBottom: 12 }} placeholder="Your message..." value={msg.text} onChange={e => setMsg({ ...msg, text: e.target.value })} />
      <button style={{ ...s.btn(C.accent, C.white, true) }} onClick={() => {
        if (msg.from && msg.text) { const u = [msg, ...gwall]; setGwall(u); setMsg({ from: "", to: "", text: "" }); addPts(5); if (u.length >= 3) earnBadge("grateful"); }
      }}>Post to Wall 💛</button>
    </div>
    {gwall.map((m, i) => <div key={i} style={s.card}>
      <div style={{ ...s.row, marginBottom: 6 }}>
        <span style={{ fontSize: 18 }}>💛</span>
        <span style={{ fontSize: 13, fontWeight: 900, color: C.primary }}>{m.from}</span>
        {m.to && <span style={{ fontSize: 13, color: C.muted }}>→ {m.to}</span>}
      </div>
      <p style={{ color: C.text, fontSize: 14, margin: 0, lineHeight: 1.5 }}>{m.text}</p>
    </div>)}
  </div>;

  if (sec === "vault") return <div style={s.section}>
    <button style={s.back} onClick={() => setSec("main")}>← Back</button>
    <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>📸 Memory Vault</h2>
    <p style={{ color: C.muted, marginBottom: 16 }}>Store your precious family moments</p>
    <div style={s.card}>
      <textarea style={{ ...s.input, minHeight: 100, resize: "none", marginBottom: 12 }} placeholder="Write a family memory or special note..." value={note} onChange={e => setNote(e.target.value)} />
      <button style={{ ...s.btn(C.secondary, C.white, true) }} onClick={() => {
        if (note) { const u = [{ type: "note", content: note, author: family.members[0]?.name || "Family", date: new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" }) }, ...mems]; setMems(u); setNote(""); addPts(5); if (u.length >= 3) earnBadge("memory"); }
      }}>Save Memory 📸</button>
    </div>
    {mems.map((m, i) => <div key={i} style={s.card}>
      <div style={{ ...s.row, marginBottom: 6 }}>
        <span style={{ fontSize: 18 }}>📝</span>
        <span style={{ fontSize: 12, color: C.muted }}>{m.author} · {m.date}</span>
      </div>
      <p style={{ color: C.text, fontSize: 14, margin: 0, lineHeight: 1.5 }}>{m.content}</p>
    </div>)}
  </div>;

  if (sec === "highlight") return <div style={s.section}>
    <button style={s.back} onClick={() => setSec("main")}>← Back</button>
    <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>🌟 Monthly Highlight</h2>
    <div style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`, borderRadius: 22, padding: "28px 24px", marginBottom: 16, textAlign: "center" }}>
      <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginBottom: 4 }}>MONTHLY HIGHLIGHT</p>
      <h3 style={{ color: C.white, fontSize: 22, fontWeight: 900, marginBottom: 2 }}>{family.name}</h3>
      <p style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>{new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p>
    </div>
    {[{ emoji: "💛", label: "Gratitude messages", val: gwall.length }, { emoji: "📸", label: "Memories saved", val: mems.length }, { emoji: "⭐", label: "Activities done", val: "Today + counting!" }].map((st, i) => (
      <div key={i} style={{ ...s.card, ...s.row }}>
        <span style={{ fontSize: 26 }}>{st.emoji}</span>
        <div style={{ flex: 1, fontWeight: 800, color: C.text }}>{st.label}</div>
        <div style={{ fontSize: 20, fontWeight: 900, color: C.primary }}>{st.val}</div>
      </div>
    ))}
  </div>;

  return <div style={s.section}>
    <h2 style={{ fontSize: 22, fontWeight: 900, color: C.text, marginBottom: 4 }}>Memories & Love 💛</h2>
    <p style={{ color: C.muted, marginBottom: 20 }}>Cherish your family's story</p>
    {[{ id: "gratitude", emoji: "💛", title: "Gratitude Wall", desc: "Share appreciation messages with each other", col: C.accent },
      { id: "vault", emoji: "📸", title: "Memory Vault", desc: "Store notes from special family moments", col: C.secondary },
      { id: "highlight", emoji: "🌟", title: "Monthly Highlight", desc: "Your family's monthly activity summary", col: C.primary }].map(it => (
      <button key={it.id} onClick={() => setSec(it.id)} style={s.listBtn}>
        <div style={s.iconBox(it.col)}>{it.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: C.text, marginBottom: 2 }}>{it.title}</div>
          <div style={{ fontSize: 13, color: C.muted }}>{it.desc}</div>
        </div>
        <span style={{ color: C.muted, fontSize: 20 }}>›</span>
      </button>
    ))}
  </div>;
}

// ─── Profile + AI ──────────────────────────────────────────────────────────────
function ProfileTab({ family, pts, earned }) {
  const [form, setForm] = useState({ ages: family.members.map(m => m.age).join(", "), time: "10", mood: "fun" });
  const [result, setResult] = useState(""); const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true); setResult("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          messages: [{ role: "user", content: `Generate ONE warm, creative family bonding activity for ${family.members.length} family members aged ${form.ages}. Available time: ${form.time} minutes. Mood/vibe: ${form.mood}. Format: Start with a bold activity title on its own line, then 2-3 sentences describing exactly what to do, step by step. Make it fun, practical, and immediately doable at home. No lists. Keep it warm and encouraging.` }]
        })
      });
      const data = await res.json();
      setResult(data.content?.[0]?.text || "Could not generate an activity. Please try again.");
    } catch { setResult("Something went wrong — please check your connection and try again."); }
    setLoading(false);
  };

  return <div style={s.section}>
    <div style={{ background: `linear-gradient(135deg, ${C.primary}, #F08050)`, borderRadius: 22, padding: "28px 24px", marginBottom: 20, textAlign: "center" }}>
      <div style={{ fontSize: 50, marginBottom: 8 }}>🏠</div>
      <h2 style={{ color: C.white, fontSize: 22, fontWeight: 900, margin: "0 0 4px" }}>{family.name}</h2>
      <p style={{ color: "rgba(255,255,255,0.8)", margin: "0 0 14px" }}>{family.members.length} family members</p>
      <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 14, padding: "8px 20px", display: "inline-block" }}>
        <span style={{ color: C.white, fontSize: 17, fontWeight: 900 }}>⭐ {pts} points · {earned.length}/{BADGES.length} badges</span>
      </div>
    </div>

    <h3 style={{ fontSize: 15, fontWeight: 900, color: C.text, marginBottom: 10 }}>Family Members</h3>
    <div style={{ display: "flex", gap: 10, marginBottom: 24, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
      {family.members.map((m, i) => <div key={i} style={{ background: C.card, borderRadius: 16, padding: "14px 12px", textAlign: "center", minWidth: 76, flexShrink: 0 }}>
        <div style={{ fontSize: 30, marginBottom: 4 }}>{m.emoji}</div>
        <div style={{ fontSize: 12, fontWeight: 900, color: C.text }}>{m.name}</div>
        <div style={{ fontSize: 11, color: C.muted }}>Age {m.age}</div>
      </div>)}
    </div>

    <h3 style={{ fontSize: 15, fontWeight: 900, color: C.text, marginBottom: 10 }}>✨ AI Activity Generator</h3>
    <div style={s.card}>
      <label style={{ fontSize: 12, fontWeight: 900, color: C.muted, display: "block", marginBottom: 6 }}>AGES IN FAMILY</label>
      <input style={{ ...s.input, marginBottom: 14 }} value={form.ages} onChange={e => setForm({ ...form, ages: e.target.value })} placeholder="e.g. 8, 12, 40, 42" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 900, color: C.muted, display: "block", marginBottom: 6 }}>TIME</label>
          <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} style={{ ...s.input, padding: "10px 14px" }}>
            <option value="5">5 minutes</option><option value="10">10 minutes</option><option value="20">20 minutes</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 900, color: C.muted, display: "block", marginBottom: 6 }}>MOOD</label>
          <select value={form.mood} onChange={e => setForm({ ...form, mood: e.target.value })} style={{ ...s.input, padding: "10px 14px" }}>
            <option value="fun">Fun & Energetic</option><option value="calm">Calm & Relaxed</option><option value="deep">Deep & Meaningful</option>
          </select>
        </div>
      </div>
      <button style={{ ...s.btn(loading ? C.border : `linear-gradient(135deg, ${C.primary}, ${C.accent})`, loading ? C.muted : C.white, true) }} onClick={generate} disabled={loading}>
        {loading ? "Generating... ✨" : "Generate Custom Activity ✨"}
      </button>
      {result && <div style={{ marginTop: 14, background: C.primaryLight, borderRadius: 14, padding: "16px", border: `1px solid ${C.border}` }}>
        <p style={{ color: C.text, fontSize: 15, lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>{result}</p>
      </div>}
    </div>
  </div>;
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
function Nav({ tab, setTab }) {
  const tabs = [
    { id: "home", label: "Home", e: "🏠" }, { id: "play", label: "Play", e: "🎮" },
    { id: "talk", label: "Talk", e: "💬" }, { id: "reflect", label: "Reflect", e: "🌱" },
    { id: "memories", label: "Memories", e: "💛" }, { id: "profile", label: "Profile", e: "👤" },
  ];
  return (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: C.white, borderTop: `1px solid ${C.border}`, display: "flex", zIndex: 200, paddingBottom: 8 }}>
      {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, border: "none", background: "none", cursor: "pointer", padding: "8px 0 2px" }}>
        <span style={{ fontSize: tab === t.id ? 24 : 20, transition: "font-size 0.15s" }}>{t.e}</span>
        <span style={{ fontSize: 9, fontWeight: tab === t.id ? 900 : 600, color: tab === t.id ? C.primary : C.muted, fontFamily: "inherit" }}>{t.label}</span>
      </button>)}
    </div>
  );
}

// ─── App Root ────────────────────────────────────────────────────────────────
export default function FamilyNest() {
  const [family, setFamily] = useState(null);
  const [tab, setTab] = useState("home");
  const [pts, setPts] = useState(0);
  const [earned, setEarned] = useState([]);
  const [done, setDone] = useState(false);
  const [sfActive, setSfActive] = useState(false);
  const [sfTitle, setSfTitle] = useState("");
  const [gwall, setGwall] = useState([
    { from: "Emma", to: "Mom", text: "Thank you for always making my lunch so special 💛" },
    { from: "Dad", to: "Everyone", text: "I'm so proud of our family every single day 🌟" },
  ]);
  const [mems, setMems] = useState([
    { type: "note", content: "Our beach trip last summer — the best day ever ☀️", author: "Dad", date: "March 2026" },
  ]);
  const [goals, setGoals] = useState([
    { ...GOALS_POOL[0], progress: 2, id: 1 },
    { ...GOALS_POOL[2], progress: 3, id: 2 },
  ]);
  const [mtgStep, setMtgStep] = useState(0);
  const [mtgNotes, setMtgNotes] = useState(["", "", "", ""]);

  const todayAct = ACTIVITIES[new Date().getDay() % ACTIVITIES.length];
  const addPts = (n) => setPts(p => p + n);
  const earnBadge = (id) => { if (!earned.includes(id)) setEarned(e => [...e, id]); };

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch {} };
  }, []);

  if (!family) return <Setup onDone={setFamily} />;
  if (sfActive) return <ScreenFree activity={sfTitle} onReturn={() => setSfActive(false)} />;

  const onSF = (title) => { setSfTitle(title); setSfActive(true); };
  const shared = { family, pts, earned, earnBadge, addPts };

  return (
    <div style={s.app}>
      {tab === "home" && <HomeTab {...shared} todayAct={todayAct} done={done} setDone={setDone} gwall={gwall} onScreenFree={onSF} />}
      {tab === "play" && <PlayTab {...shared} onScreenFree={onSF} />}
      {tab === "talk" && <TalkTab />}
      {tab === "reflect" && <ReflectTab {...shared} step={mtgStep} setStep={setMtgStep} notes={mtgNotes} setNotes={setMtgNotes} goals={goals} setGoals={setGoals} />}
      {tab === "memories" && <MemoriesTab {...shared} gwall={gwall} setGwall={setGwall} mems={mems} setMems={setMems} />}
      {tab === "profile" && <ProfileTab {...shared} />}
      <Nav tab={tab} setTab={setTab} />
    </div>
  );
}
