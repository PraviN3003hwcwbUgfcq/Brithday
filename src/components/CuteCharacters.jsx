import { motion } from "framer-motion";

const softSpring = {
  type: "spring",
  stiffness: 120,
  damping: 12,
};

export function CuteBear({
  size = 150,
  mood = "happy",
  wave = false,
  blush = true,
  className = "",
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -3, 0],
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: softSpring,
        y: {
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {/* left ear */}
      <motion.g
        animate={{
          rotate: [0, -4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "58px 54px",
        }}
      >
        <circle
          cx="58"
          cy="53"
          r="28"
          fill="#A96F50"
        />

        <circle
          cx="58"
          cy="53"
          r="16"
          fill="#E8B39B"
        />
      </motion.g>

      {/* right ear */}
      <motion.g
        animate={{
          rotate: [0, 4, 0],
        }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "162px 54px",
        }}
      >
        <circle
          cx="162"
          cy="53"
          r="28"
          fill="#A96F50"
        />

        <circle
          cx="162"
          cy="53"
          r="16"
          fill="#E8B39B"
        />
      </motion.g>

      {/* body */}
      <motion.ellipse
        cx="110"
        cy="160"
        rx="63"
        ry="52"
        fill="#B97D5A"
        animate={{
          ry: [52, 50, 52],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* head */}
      <ellipse
        cx="110"
        cy="103"
        rx="73"
        ry="68"
        fill="#B97D5A"
      />

      {/* muzzle */}
      <ellipse
        cx="110"
        cy="124"
        rx="38"
        ry="29"
        fill="#EBC6AE"
      />

      {/* eyes */}
      <motion.ellipse
        cx="82"
        cy="100"
        rx="6"
        ry="8"
        fill="#4B342C"
        animate={{
          scaleY: [1, 1, 0.1, 1, 1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          times: [0, 0.44, 0.47, 0.5, 1],
        }}
        style={{
          transformOrigin: "82px 100px",
        }}
      />

      <motion.ellipse
        cx="138"
        cy="100"
        rx="6"
        ry="8"
        fill="#4B342C"
        animate={{
          scaleY: [1, 1, 0.1, 1, 1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          times: [0, 0.44, 0.47, 0.5, 1],
        }}
        style={{
          transformOrigin: "138px 100px",
        }}
      />

      {/* eye highlights */}
      <circle
        cx="80"
        cy="97"
        r="2"
        fill="white"
      />

      <circle
        cx="136"
        cy="97"
        r="2"
        fill="white"
      />

      {/* nose */}
      <ellipse
        cx="110"
        cy="116"
        rx="8"
        ry="6"
        fill="#4B342C"
      />

      {/* mouth */}
      <path
        d="M110 122 C110 132 98 133 96 126"
        stroke="#4B342C"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M110 122 C110 132 122 133 124 126"
        stroke="#4B342C"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* blush */}
      {blush && (
        <>
          <motion.ellipse
            cx="68"
            cy="122"
            rx="14"
            ry="7"
            fill="#E99B91"
            animate={{
              opacity: [0.4, 0.75, 0.4],
            }}
            transition={{
              duration: 2.7,
              repeat: Infinity,
            }}
          />

          <motion.ellipse
            cx="152"
            cy="122"
            rx="14"
            ry="7"
            fill="#E99B91"
            animate={{
              opacity: [0.4, 0.75, 0.4],
            }}
            transition={{
              duration: 2.7,
              repeat: Infinity,
            }}
          />
        </>
      )}

      {/* left arm */}
      <motion.ellipse
        cx="58"
        cy="161"
        rx="18"
        ry="38"
        fill="#B97D5A"
        transform="rotate(22 58 161)"
      />

      {/* waving arm */}
      <motion.g
        animate={
          wave
            ? {
                rotate: [0, -18, 12, -16, 10, 0],
              }
            : {
                rotate: [0, 3, 0],
              }
        }
        transition={
          wave
            ? {
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1.5,
              }
            : {
                duration: 3,
                repeat: Infinity,
              }
        }
        style={{
          transformOrigin: "164px 153px",
        }}
      >
        <ellipse
          cx="165"
          cy="155"
          rx="18"
          ry="40"
          fill="#B97D5A"
          transform="rotate(-25 165 155)"
        />
      </motion.g>

      {/* belly */}
      <ellipse
        cx="110"
        cy="169"
        rx="34"
        ry="29"
        fill="#DCA98A"
        opacity="0.7"
      />

      {/* little heart */}
      {mood === "love" && (
        <motion.g
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: [0, 1, 1],
            scale: [0, 1.2, 1],
            y: [10, -4, 0],
          }}
        >
          <path
            d="M180 58 C170 46 151 54 151 70 C151 87 180 102 180 102 C180 102 209 87 209 70 C209 54 190 46 180 58Z"
            fill="#E29578"
          />
        </motion.g>
      )}
    </motion.svg>
  );
}

export function CuteBunny({
  size = 150,
  mood = "happy",
  blush = true,
  className = "",
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 220 240"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -4, 0],
      }}
      transition={{
        opacity: {
          duration: 0.5,
        },

        scale: softSpring,

        y: {
          duration: 4.1,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {/* left ear */}
      <motion.g
        animate={{
          rotate: [0, -4, 2, 0],
        }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "82px 74px",
        }}
      >
        <ellipse
          cx="78"
          cy="49"
          rx="20"
          ry="55"
          fill="#FFF5EE"
          transform="rotate(-8 78 49)"
        />

        <ellipse
          cx="78"
          cy="51"
          rx="10"
          ry="40"
          fill="#F6C8C7"
          transform="rotate(-8 78 51)"
        />
      </motion.g>

      {/* right ear */}
      <motion.g
        animate={{
          rotate: [0, 5, -2, 0],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformOrigin: "138px 74px",
        }}
      >
        <ellipse
          cx="142"
          cy="49"
          rx="20"
          ry="55"
          fill="#FFF5EE"
          transform="rotate(8 142 49)"
        />

        <ellipse
          cx="142"
          cy="51"
          rx="10"
          ry="40"
          fill="#F6C8C7"
          transform="rotate(8 142 51)"
        />
      </motion.g>

      {/* body */}
      <motion.ellipse
        cx="110"
        cy="180"
        rx="58"
        ry="49"
        fill="#FFF5EE"
        animate={{
          ry: [49, 47, 49],
        }}
        transition={{
          duration: 3.7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* head */}
      <ellipse
        cx="110"
        cy="119"
        rx="67"
        ry="63"
        fill="#FFF5EE"
      />

      {/* face patch */}
      <ellipse
        cx="110"
        cy="137"
        rx="37"
        ry="28"
        fill="#FFF0EA"
      />

      {/* eyes */}
      <motion.ellipse
        cx="84"
        cy="117"
        rx="5.5"
        ry="7.5"
        fill="#4B342C"
        animate={{
          scaleY: [1, 1, 0.1, 1, 1],
        }}
        transition={{
          duration: 5.1,
          repeat: Infinity,
          times: [0, 0.5, 0.53, 0.56, 1],
        }}
        style={{
          transformOrigin: "84px 117px",
        }}
      />

      <motion.ellipse
        cx="136"
        cy="117"
        rx="5.5"
        ry="7.5"
        fill="#4B342C"
        animate={{
          scaleY: [1, 1, 0.1, 1, 1],
        }}
        transition={{
          duration: 5.1,
          repeat: Infinity,
          times: [0, 0.5, 0.53, 0.56, 1],
        }}
        style={{
          transformOrigin: "136px 117px",
        }}
      />

      <circle
        cx="82"
        cy="114"
        r="2"
        fill="white"
      />

      <circle
        cx="134"
        cy="114"
        r="2"
        fill="white"
      />

      {/* nose */}
      <path
        d="M103 134 Q110 128 117 134 Q110 142 103 134Z"
        fill="#E29578"
      />

      {/* smile */}
      <path
        d="M110 140 C108 148 99 149 96 143"
        stroke="#70564C"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      <path
        d="M110 140 C112 148 121 149 124 143"
        stroke="#70564C"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* blush */}
      {blush && (
        <>
          <motion.ellipse
            cx="70"
            cy="139"
            rx="13"
            ry="7"
            fill="#F2AAA3"
            animate={{
              opacity: [0.35, 0.75, 0.35],
            }}
            transition={{
              duration: 2.9,
              repeat: Infinity,
            }}
          />

          <motion.ellipse
            cx="150"
            cy="139"
            rx="13"
            ry="7"
            fill="#F2AAA3"
            animate={{
              opacity: [0.35, 0.75, 0.35],
            }}
            transition={{
              duration: 2.9,
              repeat: Infinity,
            }}
          />
        </>
      )}

      {/* arms */}
      <motion.ellipse
        cx="63"
        cy="182"
        rx="16"
        ry="35"
        fill="#FFF5EE"
        transform="rotate(25 63 182)"
        animate={{
          rotate: [25, 20, 25],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
        }}
      />

      <motion.ellipse
        cx="157"
        cy="182"
        rx="16"
        ry="35"
        fill="#FFF5EE"
        transform="rotate(-25 157 182)"
      />

      {/* belly */}
      <ellipse
        cx="110"
        cy="188"
        rx="31"
        ry="27"
        fill="#FFF0EA"
      />

      {/* heart reaction */}
      {mood === "love" && (
        <motion.g
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: [0, 1.25, 1],
            y: [10, -5, 0],
          }}
        >
          <path
            d="M178 69 C168 57 150 65 150 80 C150 96 178 111 178 111 C178 111 206 96 206 80 C206 65 188 57 178 69Z"
            fill="#E29578"
          />
        </motion.g>
      )}
    </motion.svg>
  );
}

export function CuteCouple({
  size = 150,
  love = true,
  bearWave = false,
}) {
  return (
    <div className="relative flex items-end justify-center">
      <motion.div
        className="relative z-10 translate-x-3 sm:translate-x-5"
        whileHover={{
          rotate: -2,
        }}
      >
        <CuteBear
          size={size}
          wave={bearWave}
          mood={
            love
              ? "love"
              : "happy"
          }
        />
      </motion.div>

      <motion.div
        className="relative z-20 -translate-x-3 sm:-translate-x-5"
        whileHover={{
          rotate: 2,
        }}
      >
        <CuteBunny
          size={size}
          mood={
            love
              ? "love"
              : "happy"
          }
        />
      </motion.div>

      {love && (
        <motion.div
          className="absolute left-1/2 top-[14%] z-30 -translate-x-1/2 text-2xl text-[#E29578]"
          animate={{
            y: [0, -9, 0],
            scale: [
              0.85,
              1.2,
              0.85,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          ♥
        </motion.div>
      )}
    </div>
  );
}