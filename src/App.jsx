import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  CuteBear,
  CuteBunny,
  CuteCouple,
} from "./components/CuteCharacters";

import {
  ArrowLeft,
  ArrowRight,
  Cake,
  Gift,
  Heart,
  LockKeyhole,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const TOTAL_PAGES = 8;

const photos = [
  "photo-01.jpg",
  "photo-02.jpg",
  "photo-03.jpg",
  "photo-04.jpg",
  "photo-05.jpg",
  "photo-06.jpg",
  "photo-07.jpg",
  "photo-08.jpg",
  "photo-09.jpg",
  "photo-10.jpg",
];

const reasons = [
  "Your laugh somehow makes everything better.",
  "The way you care about people.",
  "How you make ordinary moments special.",
  "Your beautifully weird little habits.",
  "How comfortable everything feels with you.",
  "Simply because you are you.",
];

const pageAnimation = {
  initial: direction => ({
    opacity: 0,
    x: direction > 0 ? 90 : -90,
    scale: 0.98,
    filter: "blur(8px)",
  }),

  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
  },

  exit: direction => ({
    opacity: 0,
    x: direction > 0 ? -70 : 70,
    scale: 0.98,
    filter: "blur(7px)",
  }),
};

function FloatingDecorations({ dark = false }) {
  const decorations = [
    "♡",
    "✦",
    "✿",
    "♡",
    "❀",
    "✧",
    "♡",
    "✦",
    "❀",
    "♡",
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {decorations.map((item, index) => (
        <motion.span
          key={index}
          className={
            dark
              ? "absolute text-white/30"
              : "absolute text-[#E29578]/35"
          }
          style={{
            left: `${5 + ((index * 17) % 90)}%`,
            top: `${8 + ((index * 23) % 80)}%`,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, index % 2 ? 7 : -7, 0],
            rotate: [0, 10, -5, 0],
            opacity: [0.25, 0.8, 0.25],
          }}
          transition={{
            duration: 4 + (index % 4),
            delay: index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item}
        </motion.span>
      ))}
    </div>
  );
}

function Characters({
  scene = "normal",
}) {
  return (
    <CuteCouple
      size={145}
      love={true}
      bearWave={
        scene === "welcome"
      }
    />
  );
}

function Scene({
  children,
  dark = false,
}) {
  return (
    <section
      className={`relative min-h-[100svh] overflow-hidden px-4 pb-24 pt-20 sm:px-8 ${
        dark
          ? "bg-gradient-to-br from-[#291f30] via-[#573849] to-[#855462] text-white"
          : "romantic-bg"
      }`}
    >
      <FloatingDecorations dark={dark} />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-11rem)] w-full max-w-6xl items-center justify-center">
        {children}
      </div>
    </section>
  );
}

function PrimaryButton({
  children,
  onClick,
  light = false,
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        y: -3,
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-xl ${
        light
          ? "bg-white text-[#70564C]"
          : "bg-[#70564C] text-white"
      }`}
    >
      {children}
    </motion.button>
  );
}

/* PAGE 1 */

function Entrance({ next }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [opening, setOpening] = useState(false);

  const correctPin = "3003";

  const handleSubmit = () => {
    if (opening) return;

    if (pin !== correctPin) {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 1200);

      return;
    }

    setError(false);
    setOpening(true);

    setTimeout(() => {
      next();
    }, 1000);
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setPin(value);
    setError(false);
  };

  return (
    <Scene>
      <div className="w-full text-center">

        <div className="mb-8 flex items-end justify-center gap-2 sm:gap-5">

          <div className="hidden sm:block">
  <CuteBear
    size={120}
    wave
  />
</div>

          <motion.div
            animate={
              opening
                ? {
                    rotate: [0, -8, 8, -5, 5, 0],
                    scale: [1, 1.05, 0.95, 1.2],
                  }
                : error
                ? {
                    x: [0, -10, 10, -8, 8, 0],
                  }
                : {
                    y: [0, -8, 0],
                    scale: [1, 1.04, 1],
                  }
            }
            transition={{
              duration: opening ? 0.8 : error ? 0.45 : 2.5,
              repeat: opening || error ? 0 : Infinity,
            }}
            className="relative grid h-36 w-36 place-items-center rounded-[42%] border border-white/80 bg-white/60 shadow-2xl backdrop-blur sm:h-44 sm:w-44"
          >
            {opening ? (
              <Heart
                size={60}
                className="fill-[#E29578] text-[#E29578]"
              />
            ) : (
              <LockKeyhole
                size={60}
                className="text-[#E29578]"
              />
            )}

            {opening &&
              Array.from({ length: 8 }).map((_, index) => (
                <motion.span
                  key={index}
                  className="absolute text-xl text-[#E29578]"
                  initial={{
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    x:
                      Math.cos((index / 8) * Math.PI * 2) *
                      120,

                    y:
                      Math.sin((index / 8) * Math.PI * 2) *
                      100,

                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                >
                  ♥
                </motion.span>
              ))}
          </motion.div>

          <div className="hidden sm:block">
  <CuteBunny
    size={120}
    mood="love"
  />
</div>

        </div>

        <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#E29578]">
          A little something is waiting
        </p>

        <h1 className="story-title mx-auto max-w-3xl text-4xl font-semibold leading-none sm:text-6xl lg:text-7xl">
          Unlock your birthday world
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm text-[#70564C]/60">
          Enter the secret 4-digit code
        </p>

        <div className="mx-auto mt-7 max-w-xs">

          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={pin}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            placeholder="••••"
            className={`w-full rounded-2xl border bg-white/70 px-5 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none backdrop-blur transition
              ${
                error
                  ? "border-red-300 bg-red-50/70"
                  : "border-white/80 focus:border-[#E29578]"
              }
            `}
          />

          <motion.button
            onClick={handleSubmit}
            whileHover={{
              y: -2,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="mt-4 w-full rounded-full bg-[#70564C] px-6 py-3 text-sm font-bold text-white shadow-lg"
          >
            Unlock ♥
          </motion.button>

          {error && (
            <motion.p
              initial={{
                opacity: 0,
                y: -5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-3 text-sm font-semibold text-[#C97575]"
            >
              Wrong code ♡
            </motion.p>
          )}

        </div>

      </div>
    </Scene>
  );
}

/* PAGE 2 */

// function Welcome({
//   next,
// }) {
//   return (
//     <Scene>
//       <div className="w-full text-center">
//         <Characters scene="welcome" />

//         <p className="mt-7 text-xs font-bold uppercase tracking-[0.35em] text-[#E29578]">
//           Chapter One
//         </p>

//         <motion.h1
//           initial={{
//             opacity: 0,
//             y: 20,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           className="story-title mt-2 text-5xl font-semibold sm:text-7xl"
//         >
//           From Me to You.
//         </motion.h1>

//         <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#70564C]/65 sm:text-base">
//           A tiny digital
//           world made with
//           love, memories and
//           a little bit of
//           magic.
//         </p>

//         <div className="my-7 text-[#E29578]">
//           ───── ✿ ♥ ✿ ─────
//         </div>

//         <PrimaryButton
//           onClick={next}
//         >
//           Begin Our Journey

//           <ArrowRight
//             size={17}
//           />
//         </PrimaryButton>
//       </div>
//     </Scene>
//   );
// }

function Welcome({ next }) {
  return (
    <Scene>
      <div className="w-full text-center">
        {/* Add your couple image here:
            public/images/couple-journey.jpg
        */}
        <div className="mx-auto mb-6 h-64 w-64 overflow-hidden rounded-[2rem] shadow-xl sm:h-80 sm:w-80">
          <img
            src="/images/couple-journey.jpg"
            alt="Our Journey"
            className="h-full w-full object-cover"
          />
        </div>

        <p className="mt-3 text-xs font-bold uppercase tracking-[0.35em] text-[#E29578]">
          Chapter One
        </p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="story-title mt-2 text-5xl font-semibold sm:text-7xl"
        >
          From Me to You.
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#70564C]/65 sm:text-base"
        >
          Just a little place where our memories, silly moments, and love come together.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 0.4,
          }}
          className="my-7 text-[#E29578]"
        >
          ───── ✿ ♥ ✿ ─────
        </motion.div>

        <PrimaryButton onClick={next}>
          Begin Our Journey
          <ArrowRight size={17} />
        </PrimaryButton>
      </div>
    </Scene>
  );
}




/* PAGE 3 */

// function Letter() {
//   const [
//     opened,
//     setOpened,
//   ] = useState(false);

//   return (
//     <Scene>
//       <div className="w-full max-w-3xl text-center">
//         <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E29578]">
//           A little note
//         </p>

//         <h2 className="story-title mt-2 text-4xl font-semibold sm:text-6xl">
//           Something I wanted
//           to say…
//         </h2>

//         <motion.button
//           onClick={() =>
//             setOpened(true)
//           }
//           whileHover={{
//             y: -5,
//           }}
//           className="paper mt-8 w-full rounded-[2rem] border border-white p-6 sm:p-12"
//         >
//           {!opened ? (
//             <div className="flex min-h-72 flex-col items-center justify-center">
//               <div className="text-7xl">
//                 💌
//               </div>

//               <p className="mt-5 font-bold">
//                 Tap the envelope
//                 to open
//               </p>

//               <p className="mt-2 text-xs opacity-50">
//                 There may be
//                 feelings inside.
//               </p>
//             </div>
//           ) : (
//             <motion.div
//               initial={{
//                 opacity: 0,
//                 y: 40,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//             >
//               <div className="mb-5 text-3xl text-[#E29578]">
//                 ❦
//               </div>

//               <p className="story-title text-3xl leading-tight sm:text-5xl">
//                 “In your

//                 <span className="text-[#E29578]">
//                   {" "}
//                   smile
//                 </span>

//                 , I found my
//                 peace.

//                 <br />

//                 In your

//                 <span className="text-[#E29578]">
//                   {" "}
//                   love
//                 </span>

//                 , I found my
//                 home.”
//               </p>

//               <p className="mx-auto mt-7 max-w-xl text-sm leading-7 opacity-65 sm:text-base">
//                 You have a way
//                 of making
//                 ordinary days
//                 softer, happier
//                 and worth
//                 remembering.
//                 This little
//                 story is only a
//                 tiny reminder
//                 of how special
//                 you are.
//               </p>

//               <p className="mt-7 font-semibold">
//                 — with love ♡
//               </p>
//             </motion.div>
//           )}
//         </motion.button>
//       </div>
//     </Scene>
//   );
// }


function Letter() {
  const [opened, setOpened] = useState(false);

  return (
    <Scene>
      <div className="w-full max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-[0.3em] text-[#E29578]"
        >
          A little note
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="story-title mt-2 text-4xl font-semibold sm:text-6xl"
        >
          Something I wanted
          <br />
          to say…
        </motion.h2>

        <motion.button
          onClick={() => setOpened(true)}
          whileHover={!opened ? { y: -8, scale: 1.02 } : {}}
          whileTap={!opened ? { scale: 0.98 } : {}}
          className="paper relative mt-8 w-full overflow-hidden rounded-[2rem] border border-white p-6 shadow-xl sm:p-12"
        >
          {!opened ? (
            <div className="flex min-h-72 flex-col items-center justify-center">
              {/* Floating hearts */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [-3, 3, -3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-2 text-7xl"
              >
                💌
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute right-[25%] top-[25%] text-xl"
              >
                ♡
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 0.5,
                }}
                className="absolute left-[25%] top-[35%] text-lg"
              >
                ✦
              </motion.div>

              <motion.p
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="mt-5 font-bold"
              >
                Tap the envelope to open
              </motion.p>

              <p className="mt-2 text-xs opacity-50">
                There may be feelings inside…
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* Romantic floating hearts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -100,
                  x: -30,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.3,
                }}
                className="pointer-events-none absolute left-[20%] top-10 text-2xl text-[#E29578]"
              >
                ♡
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -120,
                  x: 30,
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 0.8,
                }}
                className="pointer-events-none absolute right-[20%] top-10 text-xl text-[#E29578]"
              >
                ♥
              </motion.div>

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.35,
                  duration: 0.6,
                  type: "spring",
                }}
                className="mb-5 text-4xl text-[#E29578]"
              >
                ❦
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="story-title text-3xl leading-tight sm:text-5xl"
              >
                “In your{" "}
                <span className="text-[#E29578]">
                  smile
                </span>
                , I found my peace.
                <br />
                In your{" "}
                <span className="text-[#E29578]">
                  love
                </span>
                , I found my home.”
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="mx-auto mt-7 max-w-xl text-sm leading-7 opacity-65 sm:text-base"
              >
                You have a way of making ordinary days
                softer, happier and worth remembering.
                This little story is only a tiny reminder
                of how special you are.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-7 font-semibold"
              >
                — with love ♡
              </motion.p>

              {/* Bottom heart pulse */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  delay: 1.5,
                  duration: 1.2,
                  repeat: Infinity,
                }}
                className="mt-6 text-xl text-[#E29578]"
              >
                ♥
              </motion.div>
            </motion.div>
          )}
        </motion.button>
      </div>
    </Scene>
  );
}

/* PAGE 4 */

function Timeline() {
 const memories = [
  {
    emoji: "🏡",
    title: "Where We Met",
    text: "The beginning of a story I never knew I needed.",
    image: "/images/timeline-01.jpg",
  },
  {
    emoji: "☕",
    title: "Our First Date",
    text: "Nervous smiles and a memory I decided to keep.",
    image: "/images/timeline-02.jpg",
  },
  {
    emoji: "📸",
    title: "Favorite Memory",
    text: "An ordinary moment that became special because of you.",
    image: "/images/timeline-03.jpg",
  },
  {
    emoji: "✨",
    title: "Today",
    text: "Another chapter with my favorite person.",
    image: "/images/timeline-04.jpg",
  },
];

  const [
    active,
    setActive,
  ] = useState(0);

  return (
    <Scene>
      <div className="w-full">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E29578]">
            Our tiny history
          </p>

          <h2 className="story-title mt-2 text-4xl font-semibold sm:text-6xl">
            How We Got Here ♥
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div>
            {memories.map(
              (
                memory,
                index
              ) => (
                <motion.button
                  key={
                    memory.title
                  }
                  onClick={() =>
                    setActive(
                      index
                    )
                  }
                  whileHover={{
                    x: 5,
                  }}
                  className={`mb-3 flex w-full items-center gap-4 rounded-3xl p-4 text-left ${
                    active ===
                    index
                      ? "bg-white/70 shadow"
                      : ""
                  }`}
                >
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-2xl shadow">
                    {
                      memory.emoji
                    }
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-40">
                      Moment{" "}
                      {index +
                        1}
                    </p>

                    <h3 className="font-bold">
                      {
                        memory.title
                      }
                    </h3>
                  </div>
                </motion.button>
              )
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -20,
              }}
              className="paper rounded-[2rem] p-7 sm:p-10"
            >
              <div className="text-5xl">
                {
                  memories[
                    active
                  ].emoji
                }
              </div>

              <h3 className="story-title mt-5 text-4xl font-semibold">
                {
                  memories[
                    active
                  ].title
                }
              </h3>

              <p className="mt-4 leading-7 opacity-65">
                {
                  memories[
                    active
                  ].text
                }
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl bg-white/50 shadow-md">
  <motion.img
    key={memories[active].image}
    src={memories[active].image}
    alt={memories[active].title}
    className="aspect-video w-full object-cover"
    initial={{
      opacity: 0,
      scale: 1.06,
    }}
    animate={{
      opacity: 1,
      scale: 1,
    }}
    transition={{
      duration: 0.55,
    }}
  />
</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Scene>
  );
}

/* PAGE 5 */

function Gallery() {
  const [
    active,
    setActive,
  ] = useState(null);

  const rotations = [
    -5,
    3,
    -2,
    5,
    -4,
    2,
    -6,
    4,
    -3,
    6,
  ];

  return (
    <Scene>
      <div className="w-full">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E29578]">
            Memory wall
          </p>

          <h2 className="story-title mt-2 text-4xl font-semibold sm:text-6xl">
            Little Moments I
            Never Want to
            Forget
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
          {photos.map(
            (
              photo,
              index
            ) => (
              <motion.button
                key={photo}
                onClick={() =>
                  setActive(
                    active ===
                      index
                      ? null
                      : index
                  )
                }
                className={`polaroid relative p-2 pb-9 transition ${
                  active !==
                    null &&
                  active !==
                    index
                    ? "opacity-50"
                    : ""
                }`}
                style={{
                  rotate:
                    active ===
                    index
                      ? 0
                      : rotations[
                          index
                        ],
                }}
                animate={{
                  scale:
                    active ===
                    index
                      ? 1.08
                      : 1,

                  y:
                    active ===
                    index
                      ? -8
                      : 0,

                  zIndex:
                    active ===
                    index
                      ? 20
                      : 1,
                }}
                whileHover={{
                  rotate: 0,
                  scale: 1.08,
                  y: -8,
                  zIndex: 20,
                }}
              >
                <img
                  src={`/images/${photo}`}
                  alt={`Memory ${
                    index + 1
                  }`}
                  className="aspect-[4/5] w-full object-cover"
                  onError={e => {
                    e.currentTarget.src =
                      `https://placehold.co/600x750/FFE8DF/70564C?text=Memory+${
                        index +
                        1
                      }`;
                  }}
                />

                <p className="absolute bottom-2 left-2 right-2 truncate text-center text-[10px] italic opacity-60 sm:text-xs">
                  one of my
                  favorite
                  memories ♡
                </p>
              </motion.button>
            )
          )}
        </div>
      </div>
    </Scene>
  );
}

/* PAGE 6 */

// function Reasons() {
//   const [
//     opened,
//     setOpened,
//   ] = useState([]);

//   const openReason =
//     index => {
//       if (
//         !opened.includes(
//           index
//         )
//       ) {
//         setOpened([
//           ...opened,
//           index,
//         ]);
//       }
//     };

//   return (
//     <Scene>
//       <div className="w-full max-w-5xl text-center">
//         <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E29578]">
//           Tiny surprises
//         </p>

//         <h2 className="story-title mt-2 text-4xl font-semibold sm:text-6xl">
//           A Few Reasons… Out
//           of Millions ♥
//         </h2>

//         <p className="mt-3 text-xs opacity-50">
//           {opened.length}{" "}
//           little surprises
//           opened
//         </p>

//         <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
//           {reasons.map(
//             (
//               reason,
//               index
//             ) => {
//               const isOpen =
//                 opened.includes(
//                   index
//                 );

//               return (
//                 <motion.button
//                   key={
//                     reason
//                   }
//                   onClick={() =>
//                     openReason(
//                       index
//                     )
//                   }
//                   whileHover={{
//                     y: -5,
//                     rotate:
//                       index %
//                       2
//                         ? 1
//                         : -1,
//                   }}
//                   whileTap={{
//                     scale: 0.95,
//                   }}
//                   className={`min-h-40 rounded-[2rem] border p-5 sm:min-h-48 ${
//                     isOpen
//                       ? "border-white bg-white/70"
//                       : "border-white/70 bg-[#FFDDD2]/60"
//                   }`}
//                 >
//                   {!isOpen ? (
//                     <>
//                       <Gift
//                         size={
//                           36
//                         }
//                         className="mx-auto text-[#E29578]"
//                       />

//                       <p className="mt-4 text-xs font-bold uppercase tracking-widest">
//                         Open me
//                       </p>
//                     </>
//                   ) : (
//                     <motion.div
//                       initial={{
//                         opacity: 0,
//                         scale: 0.8,
//                       }}
//                       animate={{
//                         opacity: 1,
//                         scale: 1,
//                       }}
//                     >
//                       <Sparkles className="mx-auto text-[#E29578]" />

//                       <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#E29578]">
//                         Reason #
//                         {index +
//                           1}
//                       </p>

//                       <p className="mt-3 text-sm font-semibold leading-6">
//                         {
//                           reason
//                         }
//                       </p>
//                     </motion.div>
//                   )}
//                 </motion.button>
//               );
//             }
//           )}
//         </div>
//       </div>
//     </Scene>
//   );
// }


function Reasons() {
  const [opened, setOpened] = useState([]);

  const openReason = (index) => {
    if (!opened.includes(index)) {
      setOpened([...opened, index]);
    }
  };

  const emojis = ["💌", "🌸", "✨", "🫶", "🌙", "💗"];

  return (
    <Scene>
      <div className="w-full max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-bold uppercase tracking-[0.3em] text-[#E29578]"
        >
          Little things I love
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="story-title mt-2 text-4xl font-semibold sm:text-6xl"
        >
          There are so many
          <br />
          reasons I love you ♥
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-xs opacity-50"
        >
          Open each little memory
        </motion.p>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-8">
          {reasons.map((reason, index) => {
            const isOpen = opened.includes(index);

            const rotations = [
              "-rotate-2",
              "rotate-2",
              "-rotate-1",
              "rotate-3",
              "-rotate-3",
              "rotate-1",
            ];

            return (
              <motion.button
                key={reason}
                onClick={() => openReason(index)}
                whileHover={{
                  y: -10,
                  rotate: 0,
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className={`relative min-h-48 overflow-hidden rounded-[1.5rem] border p-5 shadow-lg transition-all duration-500 sm:min-h-56 sm:p-6 ${
                  rotations[index % rotations.length]
                } ${
                  isOpen
                    ? "border-white bg-white shadow-2xl"
                    : "border-white/70 bg-[#FFF4EF]"
                }`}
              >
                {!isOpen ? (
                  <>
                    {/* Tape */}
                    <div className="absolute left-1/2 top-0 h-8 w-20 -translate-x-1/2 -translate-y-3 rotate-[-3deg] bg-[#E29578]/25" />

                    <motion.div
                      animate={{
                        y: [0, -6, 0],
                        rotate: [-3, 3, -3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.15,
                      }}
                      className="mt-5 text-5xl"
                    >
                      {emojis[index % emojis.length]}
                    </motion.div>

                    <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E29578]">
                      Memory #{index + 1}
                    </p>

                    <motion.p
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="mt-2 text-xs"
                    >
                      Tap to discover
                    </motion.p>

                    <motion.span
                      animate={{
                        rotate: [0, 20, 0],
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                      className="absolute right-4 top-5 text-lg text-[#E29578]"
                    >
                      ✦
                    </motion.span>
                  </>
                ) : (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.5,
                      rotate: -8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      type: "spring",
                      stiffness: 180,
                    }}
                    className="flex h-full min-h-40 flex-col items-center justify-center sm:min-h-44"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [0, 1.25, 1],
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                      className="text-3xl"
                    >
                      ♥
                    </motion.div>

                    <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E29578]">
                      One little reason
                    </p>

                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.2,
                      }}
                      className="mt-3 text-sm font-semibold leading-6"
                    >
                      {reason}
                    </motion.p>

                    <motion.span
                      animate={{
                        y: [0, -12, 0],
                        opacity: [0.2, 1, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute left-4 top-5 text-[#E29578]"
                    >
                      ✦
                    </motion.span>

                    <motion.span
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.2, 1, 0.2],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                      className="absolute bottom-5 right-5 text-[#E29578]"
                    >
                      ♡
                    </motion.span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mx-auto mt-8 max-w-xs"
        >
          <div className="mb-2 flex justify-between text-[10px] uppercase tracking-widest opacity-50">
            <span>Our little memories</span>

            <span>
              {opened.length}/{reasons.length}
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-[#E29578]/15">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(opened.length / reasons.length) * 100}%`,
              }}
              transition={{
                duration: 0.5,
              }}
              className="h-full rounded-full bg-[#E29578]"
            />
          </div>

          {opened.length === reasons.length && (
            <motion.p
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mt-4 text-sm font-semibold text-[#E29578]"
            >
              You found them all… but I could never list them all. ♥
            </motion.p>
          )}
        </motion.div>
      </div>
    </Scene>
  );
}

/* PAGE 7 */

// function Garden() {
//   const [
//     particles,
//     setParticles,
//   ] = useState([]);

//   const [
//     count,
//     setCount,
//   ] = useState(0);

//   const items = [
//     "♥",
//     "✿",
//     "✦",
//     "❀",
//     "♡",
//   ];

//   const spawn = event => {
//     const rect =
//       event.currentTarget.getBoundingClientRect();

//     const particle = {
//       id:
//         Date.now() +
//         Math.random(),

//       x:
//         event.clientX -
//         rect.left,

//       y:
//         event.clientY -
//         rect.top,

//       icon:
//         items[
//           Math.floor(
//             Math.random() *
//               items.length
//           )
//         ],
//     };

//     setParticles(previous => [
//       ...previous.slice(
//         -20
//       ),

//       particle,
//     ]);

//     setCount(
//       previous =>
//         previous + 1
//     );

//     setTimeout(() => {
//       setParticles(previous =>
//         previous.filter(
//           item =>
//             item.id !==
//             particle.id
//         )
//       );
//     }, 2500);
//   };

//   return (
//     <Scene>
//       <div
//         onPointerDown={
//           spawn
//         }
//         className="absolute inset-0 z-10 cursor-crosshair"
//       >
//         {particles.map(
//           particle => (
//             <motion.span
//               key={
//                 particle.id
//               }
//               style={{
//                 left:
//                   particle.x,
//                 top:
//                   particle.y,
//               }}
//               className="pointer-events-none absolute text-2xl text-[#E29578]"
//               initial={{
//                 opacity: 0,
//                 scale: 0.2,
//               }}
//               animate={{
//                 opacity: [
//                   0,
//                   1,
//                   1,
//                   0,
//                 ],

//                 scale: [
//                   0.2,
//                   1.2,
//                   1,
//                 ],

//                 y: -120,

//                 rotate: 35,
//               }}
//               transition={{
//                 duration: 2.4,
//               }}
//             >
//               {
//                 particle.icon
//               }
//             </motion.span>
//           )
//         )}
//       </div>

//       <div className="pointer-events-none relative z-20 w-full max-w-3xl text-center">
//        <Characters scene="welcome" />

//         <div className="paper mt-6 rounded-[2rem] p-6 sm:p-10">
//           <h2 className="story-title text-4xl font-semibold sm:text-6xl">
//             If I Could Give
//             You One Thing…
//           </h2>

//           <p className="mx-auto mt-5 max-w-xl text-sm leading-7 opacity-65 sm:text-base">
//             I would give you
//             the ability to
//             see yourself
//             through my eyes,
//             so you could see
//             just how special
//             you really are.
//           </p>

//           <p className="mt-5 text-xs font-bold text-[#E29578]">
//             Tap anywhere to
//             make the garden
//             bloom ✿
//           </p>

//           {count >=
//             10 && (
//             <motion.p
//               initial={{
//                 opacity: 0,
//                 y: 10,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               className="mt-4 font-bold"
//             >
//               Look what you
//               do to my world
//               ♥
//             </motion.p>
//           )}
//         </div>
//       </div>
//     </Scene>
//   );
// }


function Garden() {
  const [particles, setParticles] = useState([]);
  const [count, setCount] = useState(0);
  const [isBursting, setIsBursting] = useState(false);

  const items = ["♥", "✿", "✦", "❀", "♡"];

  const spawn = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const newParticles = Array.from({ length: 3 }, (_, index) => ({
      id: Date.now() + Math.random() + index,
      x:
        event.clientX -
        rect.left +
        (Math.random() - 0.5) * 35,
      y:
        event.clientY -
        rect.top +
        (Math.random() - 0.5) * 35,
      icon: items[Math.floor(Math.random() * items.length)],
      size: Math.random() * 12 + 20,
      rotation: Math.random() * 60 - 30,
      drift: Math.random() * 80 - 40,
    }));

    setParticles((previous) => [
      ...previous.slice(-35),
      ...newParticles,
    ]);

    setCount((previous) => previous + 1);

    setIsBursting(true);

    setTimeout(() => {
      setIsBursting(false);
    }, 450);

    newParticles.forEach((particle) => {
      setTimeout(() => {
        setParticles((previous) =>
          previous.filter((item) => item.id !== particle.id)
        );
      }, 2800);
    });
  };

  return (
    <Scene>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-pink-200/20 blur-3xl"
          animate={{
            x: [0, 50, -20, 0],
            y: [0, -30, 40, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-[5%] top-[35%] h-80 w-80 rounded-full bg-orange-200/20 blur-3xl"
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 30, -25, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {Array.from({ length: 18 }).map((_, index) => (
          <motion.span
            key={index}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#E29578] shadow-[0_0_12px_rgba(226,149,120,0.8)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.2, 0.7, 0.1],
              scale: [0.6, 1.4, 0.8, 1.2, 0.6],
              x: [
                0,
                Math.random() * 30 - 15,
                Math.random() * 40 - 20,
              ],
              y: [
                0,
                Math.random() * -40,
                Math.random() * 30,
              ],
            }}
            transition={{
              duration: 4 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div
        onPointerDown={spawn}
        className="absolute inset-0 z-10 cursor-crosshair"
      >
        {isBursting && (
          <motion.div
            className="pointer-events-none absolute h-16 w-16 rounded-full border border-[#E29578]/50"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            initial={{
              scale: 0.2,
              opacity: 0.8,
            }}
            animate={{
              scale: 2.5,
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          />
        )}

        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="pointer-events-none absolute z-30"
            style={{
              left: particle.x,
              top: particle.y,
              fontSize: particle.size,
              color: "#E29578",
              textShadow:
                "0 0 10px rgba(226,149,120,0.35)",
            }}
            initial={{
              opacity: 0,
              scale: 0.2,
              rotate: particle.rotation,
              y: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.2, 1.35, 1, 0.75],
              y: [-5, -70, -140, -190],
              x: [
                0,
                particle.drift * 0.3,
                particle.drift,
              ],
              rotate: [
                particle.rotation,
                particle.rotation + 25,
                particle.rotation - 20,
                particle.rotation + 45,
              ],
            }}
            transition={{
              duration: 2.8,
              ease: "easeOut",
            }}
          >
            {particle.icon}
          </motion.span>
        ))}
      </div>

      <div className="pointer-events-none relative z-20 flex w-full max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.94,
          }}
          animate={{
            opacity: 1,
            y: [0, -6, 0],
            scale: 1,
          }}
          transition={{
            opacity: {
              duration: 1,
            },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 1,
            },
          }}
        >
          <Characters scene="welcome" />
        </motion.div>

        <motion.div
          className="paper mt-6 rounded-[2rem] p-6 sm:p-10"
          initial={{
            opacity: 0,
            y: 45,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.1,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className="mb-4 text-2xl text-[#E29578]"
            animate={{
              rotate: [0, 8, -8, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✿
          </motion.div>

          <motion.h2
            className="story-title text-4xl font-semibold sm:text-6xl"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.7,
            }}
          >
            If I Could Give
            <br />
            You One Thing…
          </motion.h2>

          <motion.p
            className="mx-auto mt-5 max-w-xl text-sm leading-7 opacity-65 sm:text-base"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.65,
            }}
            transition={{
              duration: 1,
              delay: 1,
            }}
          >
            I would give you
            the ability to
            see yourself
            through my eyes,
            so you could see
            just how special
            you really are.
          </motion.p>

          <motion.p
            className="mt-5 text-xs font-bold text-[#E29578]"
            animate={{
              opacity: [0.55, 1, 0.55],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Tap anywhere to
            make the garden
            bloom ✿
          </motion.p>

          {count >= 10 && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
                y: 15,
              }}
              animate={{
                opacity: 1,
                scale: [0.7, 1.08, 1],
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.p
                className="mt-4 font-bold"
                animate={{
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Look what you
                do to my world{" "}
                <motion.span
                  className="inline-block text-[#E29578]"
                  animate={{
                    scale: [1, 1.35, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                >
                  ♥
                </motion.span>
              </motion.p>

              <motion.div
                className="mt-3 text-lg tracking-[0.5rem] text-[#E29578]"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0.6, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                ✿ ✦ ❀ ✦ ✿
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Scene>
  );
}

/* PAGE 8 */

// function Finale({
//   restart,
// }) {
//   const [
//     wished,
//     setWished,
//   ] = useState(false);

//   const [
//     kisses,
//     setKisses,
//   ] = useState(0);

//   return (
//     <Scene dark>
//       <div className="w-full max-w-4xl text-center">
//         <Characters />

//         <p className="mt-7 text-xs font-bold uppercase tracking-[0.3em] text-[#FFD7C9]">
//           The birthday
//           chapter
//         </p>

//         <motion.h1
//           initial={{
//             opacity: 0,
//             y: 30,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           className="story-title mt-2 text-5xl font-semibold leading-none sm:text-7xl lg:text-8xl"
//         >
//           Happy Birthday,

//           <br />

//           My Love ♥
//         </motion.h1>

//         <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60">
//           Thank you for
//           being the most
//           beautiful part of
//           my little world.
//         </p>

//         <motion.div
//           animate={{
//             y: [
//               0,
//               -6,
//               0,
//             ],
//           }}
//           transition={{
//             duration: 3,
//             repeat: Infinity,
//           }}
//           className="mx-auto mt-7 flex w-fit items-center gap-3 rounded-3xl bg-white/10 px-5 py-4 backdrop-blur"
//         >
//           <Cake className="text-[#FFD7C9]" />

//           <span className="text-sm font-bold">
//             {wished
//               ? "Wish sent to the stars ✨"
//               : "The candles are waiting…"}
//           </span>
//         </motion.div>

//         {!wished ? (
//           <div className="mt-6">
//             <PrimaryButton
//               light
//               onClick={() =>
//                 setWished(
//                   true
//                 )
//               }
//             >
//               Make a Wish ✨
//             </PrimaryButton>
//           </div>
//         ) : (
//           <motion.p
//             initial={{
//               opacity: 0,
//               y: 15,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             className="story-title mx-auto mt-7 max-w-xl text-2xl text-[#FFE7DE] sm:text-3xl"
//           >
//             Whatever you
//             wished for… I
//             hope life gives
//             you even more.
//           </motion.p>
//         )}

//         <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
//           <button
//             onClick={
//               restart
//             }
//             className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-white/10 px-6 text-sm font-bold backdrop-blur"
//           >
//             <RotateCcw
//               size={17}
//             />

//             Replay Our Story
//           </button>

//           <motion.button
//             whileTap={{
//               scale: 0.82,
//             }}
//             onClick={() =>
//               setKisses(
//                 kisses +
//                   1
//               )
//             }
//             className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#E29578] px-6 text-sm font-bold text-white"
//           >
//             <Heart
//               size={17}
//               className="fill-white"
//             />

//             Send Me a Kiss
//           </motion.button>
//         </div>

//         {kisses >
//           0 && (
//           <motion.p
//             key={
//               kisses
//             }
//             initial={{
//               opacity: 0,
//               scale: 0.6,
//             }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//             }}
//             className="mt-4 font-bold text-[#FFD7C9]"
//           >
//             Kiss received ♥
//           </motion.p>
//         )}
//       </div>
//     </Scene>
//   );
// }

function Finale({ restart }) {
  const [wished, setWished] = useState(false);
  const [blowing, setBlowing] = useState(false);
  const [kisses, setKisses] = useState(0);

  const makeWish = () => {
    if (wished || blowing) return;

    setBlowing(true);

    // Hidden 4 second countdown
    setTimeout(() => {
      setBlowing(false);
      setWished(true);
    }, 4000);
  };

  return (
    <Scene dark>
      <div className="relative w-full max-w-5xl overflow-hidden px-4 py-8 text-center">
        {/* Background Hearts */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {["♥", "♡", "✦", "♥", "♡", "✧"].map((item, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                y: 80,
                x: `${10 + index * 15}%`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [-20, -180],
                rotate: [0, 20, -15, 0],
              }}
              transition={{
                duration: 5 + index * 0.4,
                repeat: Infinity,
                delay: index * 0.6,
              }}
              className="absolute bottom-0 text-xl text-[#FFD7C9]"
            >
              {item}
            </motion.span>
          ))}
        </div>

        <div className="relative z-10">
          {/* Characters */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <Characters />
          </motion.div>

          {/* Heading */}
          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
            }}
            className="mt-7 text-xs font-bold uppercase tracking-[0.3em] text-[#FFD7C9]"
          >
            The birthday chapter
          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="story-title mt-3 text-5xl font-semibold leading-none sm:text-7xl lg:text-8xl"
          >
            Happy Birthday,
            <br />
            <span className="text-[#FFD7C9]">My Love ♥</span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.8,
            }}
            className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/60"
          >
            Thank you for being the most beautiful part of my little world.
            <br />
            And this is only one chapter of our story...
          </motion.p>

         
          {/* Birthday Cake */}
          
<motion.div
  initial={{
    opacity: 0,
    y: 30,
    scale: 0.9,
  }}
  animate={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  transition={{
    delay: 1,
  }}
  className="mx-auto mt-8 max-w-md rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 shadow-2xl backdrop-blur-xl"
>
  {/* Cake with candles */}
  <motion.div
    animate={
      blowing
        ? {
            x: [-3, 3, -3, 3, 0],
            rotate: [-1, 1, -1, 1, 0],
          }
        : {
            y: [0, -5, 0],
          }
    }
    transition={
      blowing
        ? {
            duration: 0.25,
            repeat: 5,
          }
        : {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }
    }
    className="relative mx-auto w-fit text-8xl"
  >
    🎂

    {/* Blow air */}
    {blowing && (
      <motion.div
        initial={{
          opacity: 0,
          x: -10,
        }}
        animate={{
          opacity: [0, 0.8, 0],
          x: [-5, 25],
        }}
        transition={{
          duration: 0.5,
          repeat: 3,
        }}
        className="absolute left-[-25px] top-5 text-2xl text-white/50"
      >
        ~~~
      </motion.div>
    )}

    {/* Candle flame effect over cake */}
    {!wished && (
      <motion.div
        animate={
          blowing
            ? {
                opacity: [1, 0.8, 0],
                scale: [1, 1.3, 0],
                y: [0, -10, -20],
              }
            : {
                opacity: [0.7, 1, 0.7],
                scale: [0.9, 1.1, 0.9],
                y: [0, -2, 0],
              }
        }
        transition={
          blowing
            ? {
                duration: 0.6,
              }
            : {
                duration: 0.8,
                repeat: Infinity,
              }
        }
        className="pointer-events-none absolute left-1/2 top-[-2px] -translate-x-1/2 text-xl"
      >
        🔥
      </motion.div>
    )}
  </motion.div>

  <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-[#FFD7C9]">
    {wished
      ? "Your wish is on its way ✨"
      : blowing
      ? "Make your wish... ✨"
      : "Make a wish"}
  </p>

  {!wished && !blowing && (
    <p className="mt-2 text-sm text-white/50">
      Close your eyes and make a secret wish...
    </p>
  )}

  {/* Hidden 2 second timer */}
  {blowing && (
    <motion.p
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="mt-4 text-xs text-white/40"
    >
      Make your wish...
    </motion.p>
  )}

  {/* Make Wish Button */}
  {!wished && !blowing && (
    <motion.button
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={() => {
        setBlowing(true);

        setTimeout(() => {
          setBlowing(false);
          setWished(true);
        }, 2000);
      }}
      className="mt-5 rounded-full bg-[#E29578] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-[#E29578]/20"
    >
      Make a Wish ✨
    </motion.button>
  )}

  {/* Wish completed */}
  {wished && (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.7,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
      }}
      className="mt-5"
    >
      <div className="flex justify-center gap-2 text-2xl">
        ✨ 🌙 ✨
      </div>

      <p className="story-title mt-3 text-xl text-[#FFE7DE]">
        Wish sent to the stars ♥
      </p>

      <p className="mt-2 text-xs leading-6 text-white/50">
        I hope every little dream of yours
        <br />
        finds its way to you.
      </p>
    </motion.div>
  )}
</motion.div>

          {/* Final Message */}
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.4,
            }}
            className="mx-auto mt-9 max-w-2xl"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              One last thing...
            </p>

            <p className="story-title mt-3 text-2xl leading-relaxed text-[#FFE7DE] sm:text-3xl">
              If I had to choose my favorite place in this world,
              <br />
              I would choose
              <span className="text-[#FFD7C9]"> next to you. ♥</span>
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.7,
            }}
            className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <motion.button
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={restart}
              className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 text-sm font-bold backdrop-blur"
            >
              ↻ Replay Our Story
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.88,
              }}
              onClick={() => setKisses(kisses + 1)}
              className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#E29578] px-7 text-sm font-bold text-white shadow-lg shadow-[#E29578]/20"
            >
              ♥ Send Me a Kiss
            </motion.button>
          </motion.div>

          {/* Kiss animation */}
          {kisses > 0 && (
            <motion.div
              key={kisses}
              initial={{
                opacity: 0,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="mt-5"
            >
              <div className="flex justify-center gap-1 text-2xl">
                {Array.from({
                  length: Math.min(kisses, 7),
                }).map((_, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: -5,
                    }}
                  >
                    💋
                  </motion.span>
                ))}
              </div>

              <p className="mt-2 text-sm font-bold text-[#FFD7C9]">
                Kiss received ♥
                {kisses > 1 ? ` × ${kisses}` : ""}
              </p>
            </motion.div>
          )}

          {/* Ending */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 2.2,
            }}
            className="mt-12"
          >
            <div className="mx-auto h-px w-20 bg-white/10" />

            <p className="mt-5 text-[10px] uppercase tracking-[0.35em] text-white/25">
              This isn't the end
            </p>

            <p className="story-title mt-2 text-lg text-white/50">
              It's just another beautiful memory. ♥
            </p>
          </motion.div>
        </div>
      </div>
    </Scene>
  );
}

/* MAIN APP */

export default function App() {
  const [
    page,
    setPage,
  ] = useState(0);

  const [
    direction,
    setDirection,
  ] = useState(1);

  const [
    playing,
    setPlaying,
  ] = useState(false);

  const audioRef =
    useRef(null);

  const touchStart =
    useRef(null);

  useEffect(() => {
    audioRef.current =
      new Audio(
        "/audio/background-music.mp3"
      );

    audioRef.current.loop =
      true;

    audioRef.current.volume =
      0.22;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const goTo =
    target => {
      const safe =
        Math.max(
          0,
          Math.min(
            TOTAL_PAGES -
              1,
            target
          )
        );

      setDirection(
        safe > page
          ? 1
          : -1
      );

      setPage(
        safe
      );
    };

  const next = () =>
    goTo(
      page + 1
    );

  const previous = () =>
    goTo(
      page - 1
    );

  const toggleMusic =
    async () => {
      if (
        !audioRef.current
      )
        return;

      if (playing) {
        audioRef.current.pause();

        setPlaying(
          false
        );
      } else {
        try {
          await audioRef.current.play();

          setPlaying(
            true
          );
        } catch {
          setPlaying(
            false
          );
        }
      }
    };

  useEffect(() => {
    const listener =
      event => {
        if (
          page === 0
        )
          return;

        if (
          event.key ===
          "ArrowRight"
        ) {
          next();
        }

        if (
          event.key ===
          "ArrowLeft"
        ) {
          previous();
        }
      };

    window.addEventListener(
      "keydown",
      listener
    );

    return () =>
      window.removeEventListener(
        "keydown",
        listener
      );
  });

  const handleTouchStart =
    event => {
      touchStart.current =
        event.changedTouches[0].clientX;
    };

  const handleTouchEnd =
    event => {
      if (
        touchStart.current ===
          null ||
        page === 0
      )
        return;

      const end =
        event.changedTouches[0].clientX;

      const distance =
        end -
        touchStart.current;

      if (
        Math.abs(
          distance
        ) > 65
      ) {
        if (
          distance <
          0
        ) {
          next();
        } else {
          previous();
        }
      }

      touchStart.current =
        null;
    };

  const screens = [
    <Entrance
      next={() =>
        goTo(1)
      }
    />,

    <Welcome
      next={next}
    />,

    <Letter />,

    <Timeline />,

    <Gallery />,

    <Reasons />,

    <Garden />,

    <Finale
      restart={() =>
        goTo(0)
      }
    />,
  ];

  return (
    <main
      onTouchStart={
        handleTouchStart
      }
      onTouchEnd={
        handleTouchEnd
      }
      className="min-h-screen overflow-hidden"
    >
      {page >
        0 && (
        <>
          {/* progress */}

          <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/60 px-3 py-2 shadow backdrop-blur">
            {Array.from({
              length:
                TOTAL_PAGES,
            }).map(
              (
                _,
                index
              ) => (
                <motion.span
                  key={
                    index
                  }
                  animate={{
                    width:
                      index ===
                      page
                        ? 18
                        : 6,
                  }}
                  className={`h-1.5 rounded-full ${
                    index ===
                    page
                      ? "bg-[#E29578]"
                      : "bg-[#70564C]/20"
                  }`}
                />
              )
            )}
          </div>

          {/* music */}

          <button
            onClick={
              toggleMusic
            }
            className="fixed right-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-full bg-white/60 shadow backdrop-blur sm:right-6"
          >
            {playing ? (
              <Volume2
                size={18}
              />
            ) : (
              <VolumeX
                size={18}
              />
            )}
          </button>
        </>
      )}

      <AnimatePresence
        mode="wait"
        custom={
          direction
        }
      >
        <motion.div
          key={page}
          custom={
            direction
          }
          variants={
            pageAnimation
          }
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.75,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          {
            screens[
              page
            ]
          }
        </motion.div>
      </AnimatePresence>

      {page >
        0 && (
        <>
          {page >
            0 && (
            <button
              onClick={
                previous
              }
              className="fixed bottom-4 left-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-white/70 shadow-lg backdrop-blur sm:bottom-6 sm:left-6"
            >
              <ArrowLeft
                size={19}
              />
            </button>
          )}

          {page <
            TOTAL_PAGES -
              1 && (
            <button
              onClick={
                next
              }
              className="fixed bottom-4 right-4 z-50 flex h-12 items-center gap-2 rounded-full bg-[#70564C] px-5 text-sm font-bold text-white shadow-lg sm:bottom-6 sm:right-6"
            >
              Next

              <ArrowRight
                size={18}
              />
            </button>
          )}
        </>
      )}
    </main>
  );
}