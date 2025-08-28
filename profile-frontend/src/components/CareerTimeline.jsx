import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import { FaSpinner } from "react-icons/fa";

dayjs.extend(duration);
dayjs.extend(customParseFormat);

function calculateDuration(start, end) {
  const startDate = dayjs(start, ["MMM YYYY", "MMMM YYYY"]);
  const endDate =
    end && end.toLowerCase() !== "now"
      ? dayjs(end, ["MMM YYYY", "MMMM YYYY"])
      : dayjs();
  const diff = dayjs.duration(endDate.diff(startDate));
  const years = diff.years();
  const months = diff.months();
  return {
    text: `${years ? `${years} yr${years > 1 ? "s" : ""}` : ""} ${
      months ? `${months} m` : ""
    }`.trim(),
    months: years * 12 + months,
  };
}

export default function CareerTimeline() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/profile")
      .then((res) => {
        const exp = res.data.experiences || [];
        const timeline = [];

        for (let i = 0; i < exp.length; i++) {
          const current = exp[i];
          const next = exp[i + 1];
          const dur = calculateDuration(current.startDate, current.endDate);

          timeline.push({
            company: current.company,
            role: current.role,
            start: dayjs(current.startDate, ["MMM YYYY", "MMMM YYYY"]),
            end:
              current.endDate &&
              current.endDate.toLowerCase() !== "now"
                ? dayjs(current.endDate, ["MMM YYYY", "MMMM YYYY"])
                : null,
            duration: dur.text,
            months: dur.months,
          });

          if (next) {
            const gapMonths = dayjs(next.startDate, [
              "MMM YYYY",
              "MMMM YYYY",
            ]).diff(dayjs(current.endDate, ["MMM YYYY", "MMMM YYYY"]), "month");
            if (gapMonths > 1) {
              timeline.push({
                gap: true,
                duration: `${gapMonths} m`,
                months: gapMonths,
              });
            }
          }
        }
        setData(timeline);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching timeline:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-300">
        <FaSpinner className="animate-spin inline-block mr-2" /> Loading
        timeline...
      </div>
    );
  }

  const svgWidth = Math.max(data.length * 260, 1200);

  return (
    <div className="overflow-x-auto py-6 px-6">
      {/* Judul Career Timeline */}
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-6 relative inline-block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Career Timeline
        </span>
        <div className="absolute left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full mt-2"></div>
      </motion.h2>

      <svg
        className="h-[460px] mx-auto"
        width={svgWidth}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Garis utama */}
        <line
          x1="0"
          y1="380"
          x2={svgWidth}
          y2="380"
          stroke="#9ca3af"
          strokeWidth="2"
        />

        {data.map((item, idx) => {
          const width = 180;
          const x = idx * 240 + 50;
          const height = Math.min(item.months * 5, 200);
          const peak = 380 - height;

          if (item.gap) {
            return (
              <g key={idx}>
                <polygon
                  points={`${x},380 ${x + 15},360 ${x + 30},380`}
                  fill="red"
                />
                <text
                  x={x - 5}
                  y={350}
                  fontSize="14"
                  fill="gray"
                  fontStyle="italic"
                >
                  Gap {item.duration}
                </text>
              </g>
            );
          }

          return (
            <g key={idx}>
              <motion.path
                d={`M${x},380 Q${x + width / 2},${peak} ${x + width},380 Z`}
                fill="url(#gradMain)"
                stroke="#9333ea"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: idx * 0.2 }}
              />

              {/* Card Info */}
              <foreignObject x={x - 30} y={peak - 110} width="220" height="110">
                <div className="bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-lg p-4 text-sm transition-transform transform hover:scale-105">
                  <p className="font-bold text-gray-800 dark:text-white truncate">
                    {item.company}
                  </p>
                  <p className="italic text-gray-600 dark:text-gray-300">
                    {item.role}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {item.start.format("MMM YYYY")} -{" "}
                    {item.end ? item.end.format("MMM YYYY") : "Present"}
                  </p>
                </div>
              </foreignObject>

              {/* Durasi */}
              <text
                x={x + width / 2 - 25}
                y={400}
                fontSize="13"
                className="fill-purple-700 dark:fill-purple-400 font-semibold"
              >
                {item.duration}
              </text>
            </g>
          );
        })}

        <defs>
          <linearGradient id="gradMain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
