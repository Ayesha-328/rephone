import React from "react";
import { useId } from "react";
import { motion } from "framer-motion"; // ← added this

export function Categories() {
  return (
    <div className="px-10 py-20 lg:py-40 bg-white">
      <h1 className="text-center font-[aperture] text-transparent bg-clip-text bg-gradient-to-b from-[#003366] via-[#165ba0] to-white">
        Explore Top Mobile Brands in Pakistan
      </h1>
      <h2 className="text-center text-[#003366] text-lg md:text-2xl font-light mt-4 mb-10">
        Discover reliable, high-quality smartphones from the most trusted names in the industry.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto items-center justify-center">
        {grid.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="cursor-pointer flex flex-col items-center relative bg-gradient-to-b from-[#cce3ff] to-[#e6f0ff] p-6 rounded-3xl overflow-hidden border border-[#003366]/20 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Grid size={20} className="items-center" />
            <img
              src={feature.image}
              alt={feature.title}
              className="w-30 h-30 object-contain mb-2"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const grid = [
  { title: "Samsung", image: "/brands/samsung.png" },
  { title: "Vivo", image: "/brands/vivo.png" },
  { title: "Oppo", image: "/brands/oppo.png" },
  { title: "Infinix", image: "/brands/infinix.png" },
  { title: "Tecno", image: "/brands/tecno.png" },
  { title: "Realme", image: "/brands/realme.png" },
  { title: "Xiaomi", image: "/brands/xiaomi.png" },
  { title: "Apple", image: "/brands/apple.png" },
];

export const Grid = ({ pattern, size }) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/10 to-[#6699cc]/10 opacity-80">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay fill-[#003366]/10 stroke-[#003366]/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
