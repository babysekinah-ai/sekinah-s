import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  {
    id: 'sleep',
    label: 'Sleep Pattern',
    emoji: '🌙',
    options: ['Early Bird', 'Moderate', 'Night Owl'],
    comments: {
      'Early Bird': "Up at 5am? Either you're disciplined or deeply boring. Respect. 😌",
      'Moderate': "Balanced sleeper. Very adult of you. Very beige of you. 😐",
      'Night Owl': "3am is when the real ones live. Chaotic but iconic. 🦉",
    },
  },
  {
    id: 'stress',
    label: 'Stress Level',
    emoji: '🧠',
    options: ['Low', 'Moderate', 'High'],
    comments: {
      'Low': "Zen master detected. What's your secret? Therapy? Blissful ignorance? 🧘",
      'Moderate': "Stressed but make it cute. You're managing, mostly. 😅",
      'High': "Living on cortisol and spite. Relatable king/queen. 💀",
    },
  },
  {
    id: 'smoke',
    label: 'Smoking Habits',
    emoji: '🚬',
    options: ['None', 'Occasional', 'Heavy'],
    comments: {
      'None': "Your lungs are thriving! Congratulations on your life choices! 🫁✨",
      'Occasional': "Social smoker? It's giving 'I only drink on weekends' energy. 🤏",
      'Heavy': "A whole personality trait huh. Bold. Literally. 💨",
    },
  },
  {
    id: 'alcohol',
    label: 'Alcohol Consumption',
    emoji: '🍷',
    options: ['None', 'Social', 'Frequent'],
    comments: {
      'None': "Sober and that's valid. You probably remember all your nights out. 😇",
      'Social': "Only drinks when there's a reason to. The reason is always there. 🥂",
      'Frequent': "Wine o'clock comes earlier and earlier... 🕐🍷",
    },
  },
  {
    id: 'activity',
    label: 'Physical Activity',
    emoji: '🏋️',
    options: ['Couch Potato', 'Moderate', 'Gym Rat'],
    comments: {
      'Couch Potato': "Horizontal athlete. Running to the fridge totally counts. 🛋️",
      'Moderate': "Active when motivated. Hero of the people. 🚶",
      'Gym Rat': "PR chaser. You definitely track your macros. 💪",
    },
  },
  {
    id: 'genotype',
    label: 'Genotype',
    emoji: '🧬',
    options: ['AA', 'AS', 'SS', 'AC'],
    comments: {
      'AA': "The genotype of champions! Your cells are living their best life. 🏆",
      'AS': "Carrier status. This one MATTERS for matching. We see you. 👀",
      'SS': "Warrior gene. Strong and complex. Compatibility will be key here. 💛",
      'AC': "Rare one! Not common but we got you. 🌟",
    },
  },
  {
    id: 'blood',
    label: 'Blood Group & Rh Factor',
    emoji: '🩸',
    isBlood: true,
    options: ['A', 'B', 'AB', 'O'],
    rhOptions: ['+', '-'],
    comments: {
      'O+': "Universal donor! Generous even at the cellular level. 🌍",
      'O-': "The rarest gift. Very exclusive, very you. 💎",
      'A+': "Type A personality AND Type A blood. Coincidence? Probably. 📋",
      'A-': "Selective about who you give to. Personality confirmed. 🎯",
      'B+': "B positive! Is that life advice or a blood type? Yes. ✨",
      'B-': "Rare and complex. Love that for you. 🌙",
      'AB+': "Universal receiver! You take from everyone and we respect it. 🎭",
      'AB-': "Rarest of them all. Are you even real? 👾",
    },
  },
  {
    id: 'familyHistory',
    label: 'Family Health History',
    emoji: '🏥',
    isMulti: true,
    options: ['Diabetes', 'Hypertension', 'Heart Disease', 'Cancer', 'Asthma', 'None'],
    comments: {
      default: "Thanks for sharing — this helps paint the full picture. Health history is just data, not destiny. 🧬💛",
    },
  },
];

const calculateScore = (p1, p2) => {
  let score = 60;
  let flags = [];

  // Genotype compatibility
  const genoRisk = { AA: 0, AS: 1, SS: 2, AC: 1 };
  const totalRisk = (genoRisk[p1.genotype] || 0) + (genoRisk[p2.genotype] || 0);
  if (totalRisk >= 4) { score -= 35; flags.push("⚠️ Both SS — high sickle cell risk for children."); }
  else if (totalRisk >= 3) { score -= 20; flags.push("⚠️ SS + AS — 50% chance of SS children."); }
  else if (totalRisk === 2) { score -= 10; flags.push("🟡 AS × AS — 25% chance of SS children."); }
  else { score += 10; }

  // Lifestyle alignment
  if (p1.sleep === p2.sleep) score += 8;
  if (p1.stress === p2.stress) score += 5;
  if (p1.smoke === p2.smoke) score += 5;
  if (p1.alcohol === p2.alcohol) score += 5;
  if (p1.activity === p2.activity) score += 5;

  // Family history overlap
  const shared = (p1.familyHistory || []).filter(h => (p2.familyHistory || []).includes(h) && h !== 'None');
  if (shared.length > 2) { score -= 10; flags.push(`🟡 Shared health risks: ${shared.join(', ')}`); }

  return { score: Math.min(Math.max(score, 5), 100), flags };
};

const getVerdict = (score) => {
  if (score >= 85) return { label: "Cosmic Soulmates", color: "#e91e8c", sub: "The universe shipped you two. Don't waste it. 💫" };
  if (score >= 70) return { label: "Strong Match", color: "#e85d04", sub: "Great chemistry. Water your garden and watch it bloom. 🌸" };
  if (score >= 55) return { label: "Promising Pair", color: "#f48c06", sub: "Potential is there. Communication is your superpower. 🗝️" };
  if (score >= 40) return { label: "Proceed with Care", color: "#6a0572", sub: "Love is beautiful but so is awareness. Eyes open. 👁️" };
  return { label: "High Risk Match", color: "#c1121f", sub: "Medical consultation strongly recommended before planning a family. 🏥" };
};

const generateShipName = (nameA, nameB) => {
  const a = nameA.trim();
  const b = nameB.trim();

  const strategies = [
    // First half of A + second half of B
    () => {
      const half1 = a.slice(0, Math.ceil(a.length / 2));
      const half2 = b.slice(Math.floor(b.length / 2));
      return half1 + half2.toLowerCase();
    },
    // First half of B + second half of A
    () => {
      const half1 = b.slice(0, Math.ceil(b.length / 2));
      const half2 = a.slice(Math.floor(a.length / 2));
      return half1 + half2.toLowerCase();
    },
    // First 3 letters of A + first 3 letters of B (or full if shorter)
    () => a.slice(0, 3) + b.slice(0, 3).toLowerCase(),
    // Last 3 of A + first 3 of B
    () => a.slice(-3) + b.slice(0, 3).toLowerCase(),
  ];

  // Pick strategy based on combined name length for variety
  const idx = (a.length + b.length) % strategies.length;
  const raw = strategies[idx]();
  // Capitalize first letter
  return raw.charAt(0).toUpperCase() + raw.slice(1);
};

const getShipVibes = (score) => {
  if (score >= 85) return { tag: "power couple alert 👑", color: "#e91e8c" };
  if (score >= 70) return { tag: "main character energy ✨", color: "#e85d04" };
  return { tag: "could be something beautiful 🌸", color: "#f48c06" };
};

const pageVariants = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -60, transition: { duration: 0.3 } },
};

const HeartCard = ({ score, verdict, flags, p1, p2, onRestart }) => {
  const [visible, setVisible] = useState(false);
  const [shipVisible, setShipVisible] = useState(false);
  const isCompatible = score >= 55;
  const shipName = isCompatible ? generateShipName(p1.name, p2.name) : null;
  const shipVibes = isCompatible ? getShipVibes(score) : null;

  useEffect(() => {
    setTimeout(() => setVisible(true), 400);
    if (isCompatible) setTimeout(() => setShipVisible(true), 1400);
  }, []);

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a0010 0%, #3d0026 50%, #1a0010 100%)', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      {/* floating hearts bg */}
      {[...Array(12)].map((_, i) => (
        <motion.div key={i} style={{ position: 'absolute', fontSize: `${Math.random() * 20 + 10}px`, opacity: 0.08, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -30, 0], rotate: [0, 15, -15, 0] }} transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}>
          ❤️
        </motion.div>
      ))}

      <AnimatePresence>
        {visible && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>

            {/* Heart shape via clip-path on a wrapper */}
            <div style={{
              background: `radial-gradient(circle at 30% 30%, ${verdict.color}cc, ${verdict.color})`,
              clipPath: 'polygon(50% 100%, 5% 45%, 0% 25%, 10% 10%, 25% 5%, 38% 10%, 50% 22%, 62% 10%, 75% 5%, 90% 10%, 100% 25%, 95% 45%)',
              width: '100%',
              paddingBottom: '95%',
              position: 'relative',
              filter: 'drop-shadow(0 20px 60px rgba(233,30,140,0.5))',
            }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '12%', paddingBottom: '5%', gap: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', fontWeight: 900, color: 'white', lineHeight: 1, fontFamily: "'Playfair Display', serif", textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                  {score}%
                </div>
                <div style={{ fontSize: 'clamp(0.85rem, 3vw, 1.1rem)', color: 'rgba(255,255,255,0.9)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {verdict.label}
                </div>
                <div style={{ fontSize: 'clamp(0.65rem, 2vw, 0.8rem)', color: 'rgba(255,255,255,0.75)', padding: '0 10%', lineHeight: 1.4 }}>
                  {p1.name} ❤️ {p2.name}
                </div>
              </div>
            </div>

            {/* Ship name card */}
            <AnimatePresence>
              {shipVisible && shipName && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                  style={{ margin: '20px 0 0', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', borderRadius: '24px', padding: '22px 24px', border: `1px solid ${shipVibes.color}55`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  {/* shimmer sweep */}
                  <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
                    style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)', pointerEvents: 'none' }} />
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 6px' }}>
                    🚢 your ship name is
                  </p>
                  <motion.p
                    initial={{ opacity: 0, letterSpacing: '0.5em' }}
                    animate={{ opacity: 1, letterSpacing: '0.05em' }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 900, color: 'white', margin: '0 0 8px', textShadow: `0 0 30px ${shipVibes.color}99` }}>
                    {shipName}
                  </motion.p>
                  <p style={{ color: shipVibes.color, fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>
                    {shipVibes.tag}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Info below heart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', borderRadius: '24px', padding: '24px', marginTop: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', marginBottom: '16px', lineHeight: 1.6 }}>
                {verdict.sub}
              </p>
              {flags.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {flags.map((f, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 14px', color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(0.75rem, 2.2vw, 0.875rem)', lineHeight: 1.5 }}>
                      {f}
                    </div>
                  ))}
                </div>
              )}
              <button onClick={onRestart}
                style={{ marginTop: '20px', width: '100%', padding: '14px', borderRadius: '50px', background: 'white', color: verdict.color, fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }}>
                Try Again 🔁
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const QuestionStep = ({ question, form, setForm, onNext, onBack, currentPerson, totalQ, currentQ, sassyComment, setSassyComment }) => {
  const [selected, setSelected] = useState(form[question.id] || (question.isMulti ? [] : null));
  const [rhSelected, setRhSelected] = useState(form.rh || '+');
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (opt) => {
    if (question.isMulti) {
      if (opt === 'None') { setSelected(['None']); return; }
      const prev = selected.filter(s => s !== 'None');
      setSelected(prev.includes(opt) ? prev.filter(s => s !== opt) : [...prev, opt]);
    } else {
      setSelected(opt);
    }
  };

  const handleSubmit = () => {
    if (!selected || (Array.isArray(selected) && selected.length === 0)) return;
    let comment = '';
    if (question.isMulti) {
      comment = question.comments.default;
    } else if (question.isBlood) {
      comment = question.comments[`${selected}${rhSelected}`] || "Rare one! Your blood is one of a kind. 🌟";
    } else {
      comment = question.comments[selected] || '';
    }
    setSassyComment(comment);
    setSubmitted(true);
  };

  const handleContinue = () => {
    const updated = { ...form, [question.id]: question.isMulti ? selected : selected };
    if (question.isBlood) updated.rh = rhSelected;
    setForm(updated);
    setSubmitted(false);
    setSassyComment('');
    onNext(updated);
  };

  const progress = ((currentQ) / totalQ) * 100;

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(160deg, #fff5f7 0%, #ffe0ec 100%)' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onBack} style={{ background: 'rgba(0,0,0,0.06)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e91e8c', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Person {currentPerson} · {currentQ}/{totalQ}
          </span>
          <div style={{ width: '40px' }} />
        </div>
        <div style={{ height: '6px', borderRadius: '99px', background: 'rgba(233,30,140,0.15)', overflow: 'hidden' }}>
          <motion.div animate={{ width: `${progress}%` }} style={{ height: '100%', background: 'linear-gradient(90deg, #e91e8c, #ff6b6b)', borderRadius: '99px' }} transition={{ duration: 0.5 }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px' }}>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="question" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <div style={{ fontSize: 'clamp(3rem, 12vw, 5rem)', marginBottom: '12px' }}>{question.emoji}</div>
                <h2 style={{ fontSize: 'clamp(1.3rem, 5vw, 2rem)', fontWeight: 900, color: '#1a0010', fontFamily: "'Playfair Display', serif", margin: 0 }}>
                  {question.label}
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
                {question.options.map(opt => (
                  <motion.button key={opt} onClick={() => handleSelect(opt)}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '16px 20px', borderRadius: '16px', border: '2px solid',
                      borderColor: (question.isMulti ? selected.includes(opt) : selected === opt) ? '#e91e8c' : 'rgba(0,0,0,0.08)',
                      background: (question.isMulti ? selected.includes(opt) : selected === opt) ? 'linear-gradient(135deg, #e91e8c, #ff6b6b)' : 'white',
                      color: (question.isMulti ? selected.includes(opt) : selected === opt) ? 'white' : '#1a0010',
                      fontWeight: 700, fontSize: 'clamp(0.9rem, 3vw, 1.05rem)', cursor: 'pointer',
                      textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px',
                      boxShadow: (question.isMulti ? selected.includes(opt) : selected === opt) ? '0 8px 24px rgba(233,30,140,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                      transition: 'all 0.2s',
                    }}>
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: (question.isMulti ? selected.includes(opt) : selected === opt) ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', flexShrink: 0 }}>
                      {(question.isMulti ? selected.includes(opt) : selected === opt) ? '✓' : ''}
                    </span>
                    {opt}
                  </motion.button>
                ))}

                {question.isBlood && (
                  <div style={{ marginTop: '4px' }}>
                    <p style={{ fontSize: '0.8rem', color: '#888', fontWeight: 600, marginBottom: '8px' }}>Rh Factor</p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {['+', '-'].map(rh => (
                        <button key={rh} onClick={() => setRhSelected(rh)}
                          style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '2px solid', borderColor: rhSelected === rh ? '#e91e8c' : 'rgba(0,0,0,0.08)', background: rhSelected === rh ? '#e91e8c' : 'white', color: rhSelected === rh ? 'white' : '#1a0010', fontWeight: 800, fontSize: '1.2rem', cursor: 'pointer' }}>
                          {rh}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ maxWidth: '480px', margin: '24px auto 0', width: '100%' }}>
                <motion.button onClick={handleSubmit} whileTap={{ scale: 0.97 }}
                  disabled={!selected || (Array.isArray(selected) && selected.length === 0)}
                  style={{
                    width: '100%', padding: '18px', borderRadius: '50px',
                    background: (!selected || (Array.isArray(selected) && selected.length === 0)) ? '#ddd' : 'linear-gradient(135deg, #e91e8c, #ff6b6b)',
                    color: 'white', fontWeight: 800, fontSize: 'clamp(1rem, 3vw, 1.1rem)', border: 'none', cursor: (!selected || (Array.isArray(selected) && selected.length === 0)) ? 'default' : 'pointer',
                    boxShadow: (!selected || (Array.isArray(selected) && selected.length === 0)) ? 'none' : '0 8px 30px rgba(233,30,140,0.35)',
                  }}>
                  Submit ✨
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="comment" variants={pageVariants} initial="initial" animate="animate" exit="exit"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '24px', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
              <motion.div animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }}
                style={{ fontSize: 'clamp(4rem, 15vw, 6rem)' }}>
                {question.emoji}
              </motion.div>
              <p style={{ fontSize: 'clamp(1rem, 3.5vw, 1.2rem)', color: '#1a0010', fontWeight: 600, lineHeight: 1.6, padding: '0 8px' }}>
                {sassyComment}
              </p>
              <motion.button onClick={handleContinue} whileTap={{ scale: 0.97 }}
                style={{ padding: '16px 48px', borderRadius: '50px', background: 'linear-gradient(135deg, #e91e8c, #ff6b6b)', color: 'white', fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 8px 30px rgba(233,30,140,0.35)' }}>
                Next →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function BioMatch() {
  const [phase, setPhase] = useState('home'); // home | person (A/B) | loading | result
  const [currentPerson, setCurrentPerson] = useState('A');
  const [qIndex, setQIndex] = useState(0);
  const [formA, setFormA] = useState({ name: '' });
  const [formB, setFormB] = useState({ name: '' });
  const [nameInput, setNameInput] = useState('');
  const [nameError, setNameError] = useState('');
  const [sassyComment, setSassyComment] = useState('');
  const [result, setResult] = useState(null);

  const currentForm = currentPerson === 'A' ? formA : formB;
  const setCurrentForm = currentPerson === 'A' ? setFormA : setFormB;

  const handleStart = () => {
    if (!nameInput.trim()) { setNameError('Please enter a name!'); return; }
    setCurrentForm({ ...currentForm, name: nameInput.trim() });
    setNameError('');
    setPhase('questions');
    setQIndex(0);
  };

  const handleQNext = (updatedForm) => {
    setCurrentForm(updatedForm);
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      // Done with this person
      if (currentPerson === 'A') {
        setCurrentPerson('B');
        setNameInput('');
        setPhase('home');
        setQIndex(0);
      } else {
        // Both done — compute result
        setPhase('loading');
        const finalB = updatedForm;
        const finalA = formA;
        setTimeout(() => {
          const { score, flags } = calculateScore(finalA, finalB);
          setResult({ score, flags, verdict: getVerdict(score) });
          setPhase('result');
        }, 2200);
      }
    }
  };

  const handleBack = () => {
    if (qIndex === 0) {
      setPhase('home');
    } else {
      setQIndex(qIndex - 1);
    }
  };

  const restart = () => {
    setPhase('home');
    setCurrentPerson('A');
    setQIndex(0);
    setFormA({ name: '' });
    setFormB({ name: '' });
    setNameInput('');
    setResult(null);
  };

  if (phase === 'result' && result) {
    return <HeartCard score={result.score} verdict={result.verdict} flags={result.flags} p1={formA} p2={formB} onRestart={restart} />;
  }

  if (phase === 'loading') {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a0010, #3d0026)', gap: '24px' }}>
        <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
          <span style={{ fontSize: '5rem' }}>🧬</span>
        </motion.div>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.05em' }}>
          Analysing your biology...
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[0, 1, 2].map(i => (
            <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e91e8c' }} />
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'questions') {
    return (
      <QuestionStep
        question={QUESTIONS[qIndex]}
        form={currentForm}
        setForm={setCurrentForm}
        onNext={handleQNext}
        onBack={handleBack}
        currentPerson={currentPerson}
        totalQ={QUESTIONS.length}
        currentQ={qIndex + 1}
        sassyComment={sassyComment}
        setSassyComment={setSassyComment}
      />
    );
  }

  // Home / Name entry
  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(160deg, #fff5f7 0%, #ffe0ec 60%, #ffd6e7 100%)', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      {/* decorative blobs */}
      <div style={{ position: 'absolute', top: '-10%', right: '-15%', width: '50vw', height: '50vw', maxWidth: '400px', maxHeight: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,30,140,0.12), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '40vw', height: '40vw', maxWidth: '320px', maxHeight: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,107,0.1), transparent 70%)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 1 }}>

        {/* Big title card */}
        <div style={{ background: 'linear-gradient(135deg, #e91e8c, #ff4d6d)', borderRadius: '32px', padding: 'clamp(36px, 8vw, 60px) clamp(28px, 6vw, 48px)', textAlign: 'center', boxShadow: '0 24px 80px rgba(233,30,140,0.35), 0 8px 32px rgba(0,0,0,0.1)', position: 'relative', overflow: 'hidden' }}>
          {/* shimmer */}
          <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', pointerEvents: 'none' }} />

          <div style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', marginBottom: '8px' }}>❤️ 🧬</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.8rem, 11vw, 5rem)', fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-0.02em', textShadow: '0 4px 20px rgba(0,0,0,0.2)', lineHeight: 1 }}>
            BioMatch
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: '12px', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', letterSpacing: '0.05em' }}>
            {currentPerson === 'A' ? 'Compatibility starts with biology.' : `Person A done! Now enter Person B's info.`}
          </p>
        </div>

        {/* Name input card */}
        <div style={{ background: 'white', borderRadius: '24px', padding: 'clamp(24px, 5vw, 36px)', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          <p style={{ fontWeight: 800, color: '#1a0010', marginBottom: '14px', fontSize: 'clamp(1rem, 3vw, 1.15rem)' }}>
            Person {currentPerson === 'A' ? 'A' : 'B'} — What's your name?
          </p>
          <input
            value={nameInput}
            onChange={e => { setNameInput(e.target.value); setNameError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
            placeholder="Enter name..."
            style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', border: `2px solid ${nameError ? '#e91e8c' : 'rgba(0,0,0,0.1)'}`, fontSize: '1rem', fontWeight: 600, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', color: '#1a0010', background: '#fafafa' }}
          />
          {nameError && <p style={{ color: '#e91e8c', fontSize: '0.85rem', marginTop: '8px', fontWeight: 600 }}>{nameError}</p>}

          <motion.button onClick={handleStart} whileTap={{ scale: 0.97 }}
            style={{ marginTop: '16px', width: '100%', padding: '18px', borderRadius: '50px', background: 'linear-gradient(135deg, #e91e8c, #ff4d6d)', color: 'white', fontWeight: 800, fontSize: 'clamp(1rem, 3vw, 1.1rem)', border: 'none', cursor: 'pointer', boxShadow: '0 8px 30px rgba(233,30,140,0.35)', letterSpacing: '0.02em' }}>
            {currentPerson === 'A' ? "Start — Person A →" : "Continue — Person B →"}
          </motion.button>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(0,0,0,0.35)', fontSize: '0.78rem', fontWeight: 500 }}>
          {QUESTIONS.length} questions per person · Results are for fun & awareness only
        </p>
      </motion.div>

      {/* Google font import via style tag effect */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');`}</style>
    </div>
  );
}