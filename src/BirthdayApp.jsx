import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Cake, Camera, Heart, RotateCcw, Sparkles, Flower2, Gift, Music2, Volume2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { sound } from "./audio";

// ✨ PERSONALIZE YOUR WEBSITE HERE
const CONFIG = {
  friendName: "Bestie", // Change this to your friend's name
  yourName: "Your Best Friend", // Change this to your name
  birthdayMessage: [
    "Happy Birthday, Bestie! 🎂",
    "I’m so grateful to have you in my life. Thank you for all the laughs, the little memories, and the moments that make ordinary days feel special.",
    "I hope this new chapter brings you so much happiness, new adventures, kind people, and every beautiful thing your heart is wishing for.",
    "No matter how busy life gets, I’ll always be cheering you on. Keep shining in your own way, keep being wonderfully you, and never forget how loved you are.",
    "Here’s to more memories, more laughter, and more friendship. You deserve the sweetest birthday ever! 🌷💗",
    "kom ngor ss cren pek mak!"
  ],
  // 📸 PHOTO ALBUM: Exactly 10 photos.
  // To replace any photo with your own, simply update the "src" URL below!
  // You can also customize captions, tags, dates, and orientation ("portrait" or "landscape").
  photos: [
    // 🌸 Photo 1 (Portrait) - Your custom photo link:
    {
      src: "https://scontent.fpnh5-5.fna.fbcdn.net/v/t39.30808-6/790590856_1644090763930197_5911633119429066116_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1439&ctp=s1080x1439&_nc_cat=111&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEsGZc-0cIiTtS-6SXWbeC3QVKKWJ8N2_1BUopYnw3b_S3xflcAYBYKrY9clYNvk2VZcmBTgHyYFFScCIZPZStx&_nc_ohc=g5koJD7uMkgQ7kNvwFfSjQk&_nc_oc=AdqCvEsWWxPVZoEhn0LN-xhBSnsW9u57z5Gv-AK64H-f0Dar1JzfhJfg89AcH1DHM6Q&_nc_zt=23&_nc_ht=scontent.fpnh5-5.fna&_nc_gid=aMlSmBw4e1r9VD48b9h2kQ&_nc_ss=7b2a8&oh=00_AQP9Zwo4klLOFs30U2gby2ctsiCxV8P_shH3-poztfSEgQ&oe=6AD62B93",
      caption: "Little moments, big memories",
      orientation: "portrait",
      tag: "🌷 Bestie glow",
      date: "A favorite moment",
      tape: "pink",
      rotation: -1.5
    },
    // 🌊 Photo 2 (Landscape):
    {
      src: "/2.jpeg",
      caption: "Coffee meeting after member break up and good with recovery",
      orientation: "landscape",
      tag: "☕ Coffee meeting",
      date: "Summer adventure",
      tape: "stripes",
      rotation: 1.2
    },
    // ✨ Photo 3 (Landscape):
    {
      src: "/3.jpeg",
      caption: "Meeting in RUPP after a long time",
      orientation: "landscape",
      tag: "✨ Golden hour",
      date: "Pnhom penh",
      tape: "gold",
      rotation: -1.8
    },
    // 🥂 Photo 4 (Portrait):
    {
      src: "https://scontent.fpnh18-3.fna.fbcdn.net/v/t39.30808-6/790528885_1644090770596863_1590220740185247970_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1440&ctp=s1080x1440&_nc_cat=101&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHCnRhXZdHgpKnSL53StQhSxmcieJLXisfGZyJ4kteKx1HJ6s0KkFRYidEE7QZbCBlCkCE6O_rnsYQtsgz3jQqJ&_nc_ohc=XePyE7jJcWAQ7kNvwHvu0i7&_nc_oc=AdpNLq5Su12fdvnz85p7wUXMfC7w1Y1L4kuErFuqoZpJyPo7qIVdV4AS8H8KPZX7lhw&_nc_zt=23&_nc_ht=scontent.fpnh18-3.fna&_nc_gid=F9vDstSi_g_TGs1qLhhukA&_nc_ss=7b2a8&oh=00_AQP4HRq9Fhwph_MIUWHnXbvnz15qCatgB3Hbn3nD57RLAA&oe=6AD64AAE",
      caption: "Korean Style ",
      orientation: "portrait",
      tag: "Cheers to us",
      date: "Kon korea",
      tape: "mint",
      rotation: 2
    },
    // ⛰️ Photo 5 (Landscape):
    {
      src: "/5.jpeg",
      caption: "Always better when we are together",
      orientation: "landscape",
      tag: "In first year at universty",
      date: "First year at RUPP",
      tape: "peach",
      rotation: -1.2
    },
    // ☕ Photo 6 (Portrait):
    {
      src: "https://scontent.fpnh5-2.fna.fbcdn.net/v/t39.30808-6/793028081_1644090773930196_9104018315959044760_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1439&ctp=s1080x1439&_nc_cat=104&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGDsxxf4B7hYoo7TyLOJ5CZ9ijafu6q4VT2KNp-7qrhVDOEm2jRMu442Gn5Q5Kaz5yv0kiqSB7lw_dUi9qPTbjn&_nc_ohc=izvx-FQyK7AQ7kNvwHK4il7&_nc_oc=AdrKZk_iJtnykgZK4kDPrBfDp5z8FQ2JxlXy8SXHMoKEmrhvnghdyI4NgDOQ1VGAoTk&_nc_zt=23&_nc_ht=scontent.fpnh5-2.fna&_nc_gid=Pv-u5sbhqFz1fQc6PonVQw&_nc_ss=7b2a8&oh=00_AQMUdybtCzfVpK7UiZye2UaU2Nci2bRU_J4re9eJinRtJA&oe=6AD645BB",
      caption: "Grow up but still be cute",
      orientation: "portrait",
      tag: "Photo booth",
      date: "So cute",
      tape: "stripes",
      rotation: 1.6
    },
    // 🌸 Photo 7 (Portrait):
    {
      src: "/6.jpeg",
      caption: "That infectious smile that lights up any room",
      orientation: "portrait",
      tag: "🌸 Pure sunshine",
      date: "Unstoppable joy",
      tape: "pink",
      rotation: -2.1
    },
    // 🎂 Photo 8 (Landscape):
    {
      src: "/8.jpg",
      caption: "Hospital calling and the fist time.",
      orientation: "landscape",
      tag: "🏥 Hospital ",
      date: "Birthday dessert",
      tape: "mint",
      rotation: 1.4
    },
    // 🚲 Photo 9 (Landscape):
    {
      src: "/9.jpeg",
      caption: "End highschool party",
      orientation: "landscape",
      tag: "🚲 New journeys",
      date: "Sunny afternoon",
      tape: "gold",
      rotation: -1.4
    },
    // 🍵 Photo 10 (Portrait):
    {
      src: "https://scontent.fpnh18-5.fna.fbcdn.net/v/t39.30808-6/795767170_1644090747263532_925038495259517327_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1440&ctp=s1080x1440&_nc_cat=101&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFv0pwu8QnKJqMJHMtP_ZqjyHoNW3IBLZTIeg1bcgEtlMtcPfLpWiJ37mve_Cj1VMO2gZS4cXXbKpCb8KHzSN__&_nc_ohc=OUvHXIkoLjEQ7kNvwFLoaFt&_nc_oc=Adq8eZHsouDvg3yxKPihki__uucFqeYmTFtK_b2eCqCC8OmmtMNMVd4SjIv2XDBItdU&_nc_zt=23&_nc_ht=scontent.fpnh18-5.fna&_nc_gid=LoirpWPBS8DOxHCueY_uaA&_nc_ss=7b2a8&oh=00_AQM9a2UTJ6q_JaxJ06RpS2wDAYEfK3stUyQKHRoVPsPftA&oe=6AD63250",
      caption: "Our classic coffee dates and heartfelt talks",
      orientation: "portrait",
      tag: "🍵 Café catchup",
      date: "Everyday magic",
      tape: "peach",
      rotation: 1.8
    }
  ]
};

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3 } }
};

// ✨ Interactive cursor sparkle & tap particle trail
function SparkleTrail() {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    let lastTime = 0;
    const symbols = ["✨", "✦", "🌸", "♡", "⭐", "🌷"];
    const colors = ["#ff9ebb", "#ffd199", "#d4b5ff", "#fca5a5", "#a7f3d0"];

    const handlePointerMove = (e) => {
      const now = performance.now();
      if (now - lastTime < 45) return;
      lastTime = now;

      const newSpark = {
        id: Math.random() + now,
        x: e.clientX,
        y: e.clientY,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.floor(Math.random() * 8) + 12,
        vx: (Math.random() - 0.5) * 36,
        vy: -Math.random() * 30 - 12
      };

      setSparks((prev) => [...prev.slice(-14), newSpark]);
    };

    const handleClick = (e) => {
      const burst = Array.from({ length: 6 }, (_, i) => {
        const angle = (i * (360 / 6) * Math.PI) / 180;
        const speed = 25 + Math.random() * 20;
        return {
          id: Math.random() + performance.now() + i,
          x: e.clientX,
          y: e.clientY,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 14 + Math.floor(Math.random() * 6),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed
        };
      });
      setSparks((prev) => [...prev.slice(-10), ...burst]);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handleClick);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handleClick);
    };
  }, []);

  return (
    <div className="sparkle-trail" aria-hidden="true">
      {sparks.map((s) => (
        <span
          key={s.id}
          className="sparkle-particle"
          style={{
            left: s.x,
            top: s.y,
            fontSize: `${s.size}px`,
            color: s.color,
            "--vx": `${s.vx}px`,
            "--vy": `${s.vy}px`
          }}
        >
          {s.symbol}
        </span>
      ))}
    </div>
  );
}

// 🎈 Interactive floating balloons in the background (can be clicked to pop!)
function FloatingBalloons() {
  const [balloons, setBalloons] = useState([
    { id: 1, left: "7%", delay: "0s", duration: "16s", color: "#fbb6ce", icon: "🎈" },
    { id: 2, left: "20%", delay: "6s", duration: "19s", color: "#ddd6fe", icon: "🌸" },
    { id: 3, left: "80%", delay: "3s", duration: "17s", color: "#fed7aa", icon: "✨" },
    { id: 4, left: "93%", delay: "9s", duration: "20s", color: "#fbcfe8", icon: "🎈" }
  ]);

  const popBalloon = (id, e) => {
    e.stopPropagation();
    sound.playPop();
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setTimeout(() => {
      setBalloons((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: `${10 + Math.random() * 80}%`,
          delay: "0s",
          duration: `${15 + Math.random() * 7}s`,
          color: ["#fbb6ce", "#ddd6fe", "#fed7aa", "#fbcfe8"][Math.floor(Math.random() * 4)],
          icon: Math.random() > 0.5 ? "🎈" : "🌸"
        }
      ]);
    }, 4500);
  };

  return (
    <div className="balloons-container" aria-hidden="true">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="floating-balloon"
          style={{
            left: b.left,
            animationDelay: b.delay,
            animationDuration: b.duration
          }}
          onClick={(e) => popBalloon(b.id, e)}
          title="Click to pop!"
        >
          <span className="balloon-icon">{b.icon}</span>
          <span className="balloon-string" />
        </div>
      ))}
    </div>
  );
}

// 🌸 Ambient drifting flower petals
function PetalField() {
  const petals = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${(i * 31 + 5) % 100}%`,
    delay: `${(i % 8) * -1.6}s`,
    duration: `${9 + (i % 6) * 2}s`,
    size: 10 + (i % 4) * 5
  }));

  return (
    <div className="petal-field" aria-hidden="true">
      {petals.map((petal) => (
        <span
          className="petal"
          key={petal.id}
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: petal.size,
            height: petal.size * 1.35
          }}
        />
      ))}
    </div>
  );
}

// 🎵 Music toggle button in topbar
function MusicToggle() {
  const [playing, setPlaying] = useState(false);

  const handleToggle = () => {
    sound.toggleBgm((state) => setPlaying(state));
  };

  return (
    <button
      type="button"
      className={`music-toggle-btn ${playing ? "is-playing" : ""}`}
      onClick={handleToggle}
      title={playing ? "Pause birthday music box" : "Play sweet birthday music box"}
      aria-label="Toggle birthday music"
    >
      {playing ? (
        <>
          <Volume2 size={15} />
          <span className="music-label">Music</span>
          <span className="sound-bars">
            <span />
            <span />
            <span />
          </span>
        </>
      ) : (
        <>
          <Music2 size={15} />
          <span className="music-label">Play Music</span>
        </>
      )}
    </button>
  );
}

function PrimaryButton({ children, onClick, icon: Icon = ArrowRight, secondary = false }) {
  return (
    <motion.button
      className={`primary-button ${secondary ? "secondary-button" : ""}`}
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
      <Icon size={18} strokeWidth={2} />
    </motion.button>
  );
}

// 🌷 PAGE 1: Welcome
function Welcome({ next }) {
  const [blossoms, setBlossoms] = useState([]);

  const handleBouquetClick = () => {
    sound.playSparkle();
    const icons = ["🌸", "🌷", "🌼", "♡", "✨", "💖", "🌷", "🌸"];
    const newBlossoms = Array.from({ length: 12 }, (_, i) => ({
      id: Math.random() + i,
      icon: icons[i % icons.length],
      angle: (i * (360 / 12) * Math.PI) / 180,
      distance: 65 + Math.random() * 55
    }));
    setBlossoms(newBlossoms);
    setTimeout(() => setBlossoms([]), 1200);
  };

  return (
    <motion.section className="page welcome-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="decor decor-top-left"><Flower2 /></div>
      <div className="decor decor-top-right"><Sparkles /></div>
      <div className="decor decor-bottom-left"><Heart /></div>
      <div className="decor decor-bottom-right"><Flower2 /></div>
      <div className="welcome-content">
        <motion.div
          className="tiny-label"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Sparkles size={15} /> A LITTLE SOMETHING FOR YOU <Sparkles size={15} />
        </motion.div>

        {/* Interactive bouncing bouquet */}
        <div className="bouquet-interactive-wrapper">
          <motion.div
            className="flower-bouquet"
            initial={{ scale: 0.6, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.2 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBouquetClick}
            title="Tap the flowers for a surprise!"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleBouquetClick(); }}
          >
            <motion.span className="single-flower fl-1" animate={{ y: [0, -5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>🌷</motion.span>
            <motion.span className="single-flower fl-2" animate={{ y: [0, -8, 0] }} transition={{ duration: 2.7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>🌼</motion.span>
            <motion.span className="single-flower fl-3" animate={{ y: [0, -6, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>🌸</motion.span>
          </motion.div>

          <AnimatePresence>
            {blossoms.map((b) => (
              <motion.span
                key={b.id}
                className="burst-blossom"
                initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1.35,
                  x: Math.cos(b.angle) * b.distance,
                  y: Math.sin(b.angle) * b.distance,
                  rotate: Math.random() * 180 - 90
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.95, ease: "easeOut" }}
              >
                {b.icon}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        <p className="tap-flowers-hint">✨ tap flowers for magic ✨</p>

        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          For my favorite human
        </motion.p>
        <motion.h1
          className="shimmer-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Hey, <em>{CONFIG.friendName}</em>!
        </motion.h1>
        <motion.p className="welcome-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          I made a tiny corner of the internet just for you.
          <br />Ready for your birthday surprise?
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <PrimaryButton onClick={() => { sound.playSparkle(); next(); }} icon={Heart}>Start the Surprise</PrimaryButton>
        </motion.div>
        <p className="little-note">made with love, just for you ♡</p>
      </div>
    </motion.section>
  );
}

// 📸 PAGE 2: Memories with Masonry Scrapbook, Landscape Support & Lightbox Album (10 Curated Photos)
function Memories({ next, back }) {
  const [likes, setLikes] = useState(() => CONFIG.photos.map(() => 15 + Math.floor(Math.random() * 10)));
  const [liked, setLiked] = useState(() => CONFIG.photos.map(() => false));
  const [activeIndex, setActiveIndex] = useState(null);
  const [flyingHearts, setFlyingHearts] = useState([]);

  const handleLike = (index, e) => {
    e.stopPropagation();
    sound.playPop();
    setLiked((prev) => {
      const nextArr = [...prev];
      nextArr[index] = !nextArr[index];
      return nextArr;
    });
    setLikes((prev) => {
      const nextArr = [...prev];
      nextArr[index] += liked[index] ? -1 : 1;
      return nextArr;
    });

    const rect = e.currentTarget.getBoundingClientRect();
    const newHearts = Array.from({ length: 5 }, (_, i) => ({
      id: Math.random() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 26,
      y: rect.top,
      size: 14 + Math.random() * 8
    }));
    setFlyingHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setFlyingHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
    }, 900);
  };

  const openLightbox = (index) => {
    sound.playSparkle();
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const nextPhoto = (e) => {
    if (e) e.stopPropagation();
    sound.playSparkle();
    setActiveIndex((prev) => (prev + 1) % CONFIG.photos.length);
  };

  const prevPhoto = (e) => {
    if (e) e.stopPropagation();
    sound.playSparkle();
    setActiveIndex((prev) => (prev - 1 + CONFIG.photos.length) % CONFIG.photos.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const activePhoto = activeIndex !== null ? CONFIG.photos[activeIndex] : null;

  return (
    <motion.section className="page memories-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="section-heading">
        <div className="tiny-label"><Camera size={15} /> OUR LITTLE SCRAPBOOK</div>
        <h2>Some moments, <em>forever.</em></h2>
        <p>Life is sweeter with a friend like you. Click any photo to expand into the album. 💗</p>
      </div>

      <div className="photo-grid">
        {CONFIG.photos.map((photo, index) => {
          const isLandscape = photo.orientation === "landscape";
          const tapeClass = `washi-tape washi-${photo.tape || (index % 2 === 0 ? "pink" : "stripes")}`;

          return (
            <motion.figure
              className={`photo-card ${isLandscape ? "photo-card-landscape" : "photo-card-portrait"}`}
              key={`${photo.src}-${index}`}
              initial={{ opacity: 0, y: 25, rotate: photo.rotation || (index % 2 === 0 ? -1.8 : 1.8), scale: 0.94 }}
              animate={{ opacity: 1, y: 0, rotate: photo.rotation || (index % 2 === 0 ? -1.8 : 1.8), scale: 1 }}
              transition={{ delay: 0.06 + (index % 6) * 0.06, duration: 0.45, type: "spring", stiffness: 110 }}
              whileHover={{ y: -9, rotate: 0, scale: 1.025, transition: { duration: 0.22 } }}
              onClick={() => openLightbox(index)}
            >
              {/* Cute Washi Tape */}
              <div className={tapeClass} aria-hidden="true" />

              <div className="photo-frame">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = "https://placehold.co/700x850/fff0f5/c66a91?text=Add+Your+Photo";
                  }}
                />

                {/* Memory sticker tag */}
                {photo.tag && (
                  <span className="photo-tag-pill">{photo.tag}</span>
                )}

                {/* Like button */}
                <button
                  type="button"
                  className={`photo-like-btn ${liked[index] ? "is-liked" : ""}`}
                  onClick={(e) => handleLike(index, e)}
                  title="Give some love"
                  aria-label="Like photo"
                >
                  <Heart size={14} fill={liked[index] ? "#e11d48" : "rgba(255,255,255,0.7)"} color={liked[index] ? "#e11d48" : "#fff"} />
                  <span className="like-count">{likes[index] || 15}</span>
                </button>
              </div>

              <figcaption>
                <div className="caption-text">{photo.caption}</div>
                <div className="card-sub-info">
                  <span className="photo-date-text">{photo.date || "A cherished memory"}</span>
                  <span className="tap-expand-hint">tap to enlarge 🔍</span>
                </div>
              </figcaption>
            </motion.figure>
          );
        })}
      </div>

      {/* Flying hearts on like */}
      <div className="flying-hearts-portal" aria-hidden="true">
        {flyingHearts.map((h) => (
          <span
            key={h.id}
            className="floating-heart-particle"
            style={{
              left: `${h.x}px`,
              top: `${h.y}px`,
              fontSize: `${h.size}px`
            }}
          >
            💖
          </span>
        ))}
      </div>

      {/* Enhanced Lightbox Modal with Next / Prev */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="photo-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Prev Button */}
            <button
              type="button"
              className="lightbox-nav-btn prev-btn"
              onClick={prevPhoto}
              title="Previous photo (Left arrow)"
              aria-label="Previous photo"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next Button */}
            <button
              type="button"
              className="lightbox-nav-btn next-btn"
              onClick={nextPhoto}
              title="Next photo (Right arrow)"
              aria-label="Next photo"
            >
              <ChevronRight size={28} />
            </button>

            <motion.div
              className={`polaroid-modal ${activePhoto.orientation === "landscape" ? "modal-landscape" : "modal-portrait"}`}
              key={activeIndex}
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="close-modal-btn" onClick={closeLightbox} aria-label="Close photo">
                <X size={18} />
              </button>

              <div className={`washi-tape washi-${activePhoto.tape || "pink"}`} />

              <div className="polaroid-modal-frame">
                <img src={activePhoto.src} alt={activePhoto.caption} />
              </div>

              <div className="polaroid-modal-details">
                <div className="polaroid-meta-bar">
                  <span className="modal-tag-pill">{activePhoto.tag || "✨ Memory"}</span>
                  <span className="modal-counter">{activeIndex + 1} / {photoList.length}</span>
                </div>
                <p className="polaroid-modal-caption">
                  <em>{activePhoto.caption}</em>
                </p>
                <p className="polaroid-modal-note">{activePhoto.date || "memories that will always stay in my heart 🌷"}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="page-actions">
        <button className="text-button" onClick={back}>← Back</button>
        <PrimaryButton onClick={() => { sound.playSparkle(); next(); }} icon={Gift}>Open Your Birthday Card</PrimaryButton>
      </div>
    </motion.section>
  );
}

// 💌 PAGE 3: Birthday Card
function BirthdayCard({ next, back }) {
  const [opened, setOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleOpen = () => {
    if (opened || isOpening) return;
    sound.playSparkle();
    if (reduceMotion) {
      setOpened(true);
      return;
    }
    setIsOpening(true);
    setTimeout(() => {
      setOpened(true);
      setIsOpening(false);
    }, 420);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    sound.playPop();
    setIsOpening(false);
    setOpened(false);
  };

  return (
    <motion.section className="page card-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="section-heading">
        <div className="tiny-label"><Heart size={15} /> A NOTE FROM THE HEART</div>
        <h2>A little letter, <em>just for you.</em></h2>
        <motion.p
          key={opened ? "opened-desc" : "closed-desc"}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {opened ? "Written with love, especially for your birthday. 🌷" : "Tap the envelope to open your birthday wish. 💌"}
        </motion.p>
      </div>

      <div className="card-experience">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="envelope-view"
              className="envelope-scene"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
            >
              <motion.div
                className={`envelope ${isOpening ? "is-opening" : ""}`}
                onClick={handleOpen}
                role="button"
                tabIndex={0}
                aria-label="Open your birthday card"
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") handleOpen();
                }}
                whileHover={!isOpening ? { y: -5, scale: 1.02 } : {}}
                whileTap={!isOpening ? { scale: 0.98 } : {}}
              >
                <div className="envelope-back" />
                <motion.div
                  className="letter-peek"
                  animate={isOpening ? { y: -55, opacity: 1 } : { y: 0, opacity: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="letter-peek-flower">🌸</span>
                </motion.div>
                <div className="envelope-pocket" />
                <motion.div
                  className="envelope-flap"
                  animate={isOpening ? { rotateX: 180 } : { rotateX: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                <motion.div
                  className="envelope-seal"
                  animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <Heart fill="currentColor" size={22} />
                </motion.div>
              </motion.div>
              {!isOpening && (
                <motion.p
                  className="tap-hint"
                  animate={{ y: [0, -4, 0], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  tap the envelope to open ♡
                </motion.p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="letter-view"
              className="letter-card-wrapper"
              initial={{ opacity: 0, y: 28, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="stationery-card">
                <div className="stationery-corner-decor tl">✿</div>
                <div className="stationery-corner-decor tr">✿</div>
                <div className="stationery-corner-decor bl">✿</div>
                <div className="stationery-corner-decor br">✿</div>

                <div className="card-header">
                  <div className="card-stamp">🌸</div>
                  <div className="card-ornament">
                    <span className="ornament-line" />
                    <span className="ornament-heart">♡</span>
                    <span className="ornament-line" />
                  </div>
                  <h3>Happy Birthday, {CONFIG.friendName}!</h3>
                </div>

                <div className="letter-body">
                  {CONFIG.birthdayMessage.slice(1).map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + index * 0.1, duration: 0.35 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                <div className="letter-signoff">
                  <p className="signoff-phrase">Big hugs and lots of love,</p>
                  <p className="signoff-author">{CONFIG.yourName} <span>♡</span></p>
                </div>

                <div className="card-footer-controls">
                  <button
                    type="button"
                    className="refold-button"
                    onClick={handleClose}
                    title="Fold letter back into envelope"
                  >
                    <RotateCcw size={13} /> Re-seal envelope
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="page-actions">
        <button className="text-button" onClick={back}>← Back to memories</button>
        <PrimaryButton onClick={() => { sound.playSparkle(); next(); }} icon={Sparkles}>One More Surprise</PrimaryButton>
      </div>
    </motion.section>
  );
}

// 🎆 Realistic Canvas Celebration Fireworks Display
function FireworksCanvas({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let isRunning = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const colors = [
      "#ff2a6d", "#05d9e8", "#ffec59", "#ff7ac6",
      "#a78bfa", "#34d399", "#fb923c", "#f43f5e",
      "#38bdf8", "#facc15", "#ffffff"
    ];

    class Particle {
      constructor(x, y, color, speed, angle) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.friction = 0.96;
        this.gravity = 0.12;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.012;
        this.trail = [{ x, y }];
        this.maxTrail = 4;
        this.size = Math.random() * 2.2 + 1.8;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) this.trail.shift();

        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        return this.alpha > 0;
      }

      draw(c) {
        c.save();
        c.globalAlpha = Math.max(0, this.alpha);
        c.strokeStyle = this.color;
        c.lineWidth = this.size;
        c.lineCap = "round";

        c.beginPath();
        if (this.trail.length > 1) {
          c.moveTo(this.trail[0].x, this.trail[0].y);
          for (let i = 1; i < this.trail.length; i++) {
            c.lineTo(this.trail[i].x, this.trail[i].y);
          }
        } else {
          c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        }
        c.stroke();

        c.fillStyle = "#ffffff";
        c.beginPath();
        c.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        c.fill();

        c.restore();
      }
    }

    class Rocket {
      constructor(targetX, targetY) {
        this.x = targetX + (Math.random() - 0.5) * 60;
        this.y = height;
        this.targetY = targetY;
        this.speed = Math.random() * 3 + 12;
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.28;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.trail = [];
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 5) this.trail.shift();

        this.vy += 0.16;
        this.x += this.vx;
        this.y += this.vy;

        return !(this.vy >= -1.5 || this.y <= this.targetY);
      }

      draw(c) {
        c.save();
        c.strokeStyle = "#fff394";
        c.lineWidth = 3;
        c.lineCap = "round";
        c.beginPath();
        if (this.trail.length > 1) {
          c.moveTo(this.trail[0].x, this.trail[0].y);
          for (let i = 1; i < this.trail.length; i++) {
            c.lineTo(this.trail[i].x, this.trail[i].y);
          }
        }
        c.stroke();
        c.restore();
      }
    }

    let rockets = [];
    let particles = [];

    const createBurst = (x, y, count = 75) => {
      sound.playFirework();
      const burstColor = colors[Math.floor(Math.random() * colors.length)];
      const secondaryColor = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
        const speed = Math.random() * 6.5 + 2.2;
        const color = Math.random() > 0.4 ? burstColor : secondaryColor;
        particles.push(new Particle(x, y, color, speed, angle));
      }
    };

    const launchRocket = (x, y) => {
      const targetX = x ?? (width * 0.15 + Math.random() * width * 0.7);
      const targetY = y ?? (height * 0.15 + Math.random() * height * 0.38);
      rockets.push(new Rocket(targetX, targetY));
    };

    // Opening grand barrage when candles are blown
    const timeouts = [
      setTimeout(() => launchRocket(width * 0.25, height * 0.28), 60),
      setTimeout(() => launchRocket(width * 0.5, height * 0.2), 220),
      setTimeout(() => launchRocket(width * 0.75, height * 0.28), 380),
      setTimeout(() => launchRocket(width * 0.35, height * 0.35), 650),
      setTimeout(() => launchRocket(width * 0.65, height * 0.35), 850)
    ];

    const launchTimer = setInterval(() => {
      if (!isRunning) return;
      launchRocket();
      if (Math.random() > 0.5) {
        setTimeout(() => launchRocket(), 180);
      }
    }, 700);

    // Interactive tap/click to spawn fireworks anywhere!
    const handleCanvasClick = (e) => {
      if (e.target && e.target.closest && e.target.closest("button, a, input, select")) return;
      createBurst(e.clientX, e.clientY, 85);
    };
    window.addEventListener("pointerdown", handleCanvasClick);

    const loop = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        if (!r.update()) {
          createBurst(r.x, r.y);
          rockets.splice(i, 1);
        } else {
          r.draw(ctx);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (!p.update()) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      isRunning = false;
      timeouts.forEach(clearTimeout);
      clearInterval(launchTimer);
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handleCanvasClick);
      if (ctx) ctx.clearRect(0, 0, width, height);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fireworks-canvas"
      aria-hidden="true"
    />
  );
}

// 🎂 PAGE 4: Interactive Celebration with Candle Blowing & Fireworks Show
function Celebration({ restart }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishGranted, setWishGranted] = useState(false);

  const confetti = Array.from({ length: 65 }, (_, i) => ({
    id: i,
    left: `${(i * 19 + 2) % 100}%`,
    delay: `${(i % 15) * 0.15}s`,
    duration: `${3 + (i % 7) * 0.45}s`,
    rotate: `${i * 47}deg`
  }));

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setWishGranted(true);
    sound.playBlowCandle();
  };

  const handleRelight = () => {
    sound.playSparkle();
    setCandlesLit(true);
    setWishGranted(false);
  };

  return (
    <motion.section className="page celebration-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* 🎆 Realistic Fireworks Display on Candle Blow */}
      <FireworksCanvas active={!candlesLit} />

      <div className="confetti-field" aria-hidden="true">
        {confetti.map((piece) => (
          <span
            key={piece.id}
            className={`confetti confetti-${piece.id % 5}`}
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              transform: `rotate(${piece.rotate})`
            }}
          />
        ))}
      </div>

      <motion.div className="celebration-content" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", duration: 0.8 }}>
        <div className="tiny-label"><Sparkles size={15} /> TODAY IS ALL ABOUT YOU <Sparkles size={15} /></div>

        {/* Interactive Birthday Cake with candles */}
        <div className="cake-stage">
          <div
            className="interactive-cake-container"
            onClick={handleBlowCandles}
            role="button"
            tabIndex={0}
            title={candlesLit ? "Click to blow out the candles!" : "Wish granted!"}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleBlowCandles(); }}
          >
            <div className="candles-row">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="cake-candle">
                  <div className="candle-stick" />
                  {candlesLit ? (
                    <motion.div
                      className="candle-flame"
                      animate={{
                        scale: [1, 1.2, 0.9, 1.15],
                        rotate: [-2, 3, -1, 2],
                        y: [0, -1, 1, 0]
                      }}
                      transition={{ duration: 0.45 + idx * 0.1, repeat: Infinity, ease: "easeInOut" }}
                    />
                  ) : (
                    <motion.div
                      className="smoke-puff"
                      initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
                      animate={{ opacity: 0, y: -30, scale: 1.8 }}
                      transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5 }}
                    >
                      💨
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
            <motion.div
              className="cake-emoji"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              🎂
            </motion.div>
          </div>

          {candlesLit ? (
            <motion.button
              type="button"
              className="blow-candles-btn"
              onClick={handleBlowCandles}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <Sparkles size={16} /> Make a Wish & Blow Candles! 🕯️
            </motion.button>
          ) : (
            <motion.div
              className="wish-granted-banner"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200
                , damping: 15 }}
            >
              <span className="sparkle-icon">🌟</span>
              <strong>WISH GRANTED!</strong>
              <span className="sparkle-icon">🌟</span>
              <p>May every single wish you make today come true!</p>
              <button type="button" className="relight-btn" onClick={handleRelight}>
                <RotateCcw size={12} /> Light Candles Again
              </button>
            </motion.div>
          )}
        </div>

        <h1>Happy Birthday,<br /><em>{CONFIG.friendName}!</em></h1>
        <p className="celebration-copy">
          May your day be full of sweet surprises, warm hugs, happy tears,
          and all the little things that make you smile. The world is better with you in it. 🌷
        </p>
        <div className="celebration-tags">
          <span>♡ friendship</span><span>✿ happiness</span><span>♡ memories</span><span>🎉 celebration</span>
        </div>
        <PrimaryButton onClick={() => { sound.playSparkle(); restart(); }} icon={RotateCcw} secondary>Replay the Surprise</PrimaryButton>
        <p className="little-note">you are loved more than words can say ♡</p>
      </motion.div>
    </motion.section>
  );
}

export default function BirthdayApp() {
  const [page, setPage] = useState(0);
  const reduceMotion = useReducedMotion();

  const next = () => setPage((current) => Math.min(current + 1, 3));
  const back = () => setPage((current) => Math.max(current - 1, 0));
  const restart = () => setPage(0);

  return (
    <main className={`app-shell ${reduceMotion ? "reduced-motion" : ""}`}>
      {/* Interactive cursor & tap trail */}
      <SparkleTrail />

      {/* Floating balloons in background */}
      <FloatingBalloons />

      {/* Ambient drifting petals */}
      <PetalField />

      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <div className="brand"><span className="brand-mark">✿</span> little birthday magic</div>
        <div className="topbar-right">
          <MusicToggle />
          <div className="step-count">{String(page + 1).padStart(2, "0")} <span>/ 04</span></div>
        </div>
      </header>

      <div className="progress-track" aria-label={`Step ${page + 1} of 4`}>
        <motion.div className="progress-fill" animate={{ width: `${((page + 1) / 4) * 100}%` }} transition={{ duration: 0.45 }} />
      </div>

      <AnimatePresence mode="wait">
        {page === 0 && <Welcome key="welcome" next={next} />}
        {page === 1 && <Memories key="memories" next={next} back={back} />}
        {page === 2 && <BirthdayCard key="card" next={next} back={back} />}
        {page === 3 && <Celebration key="celebration" restart={restart} />}
      </AnimatePresence>

      <footer className="site-footer"><span>made with</span> <Heart size={13} fill="currentColor" /> <span>for a very special friend</span></footer>
    </main>
  );
}
