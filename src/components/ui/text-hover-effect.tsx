"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "../../hooks/useDarkMode";

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const { theme } = useDarkMode();

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  // グラデーション色をモードで切り替え
  const gradientStops = theme === "dark"
    ? (
      <>
        <stop offset="0%" stopColor="#fff" />
        <stop offset="100%" stopColor="#d1d5db" />
      </>
    ) : (
      <>
        <stop offset="0%" stopColor="#a3a3a3" />
        <stop offset="100%" stopColor="#e5e7eb" />
      </>
    );

  // ホバーエフェクト用グラデーション（ビビッドな色）
  const hoverGradientStops = (
    <>
      <stop offset="0%" stopColor="#ff7300" />
      <stop offset="50%" stopColor="#0094ff" />
      <stop offset="100%" stopColor="#00e676" />
    </>
  );

  // 3倍サイズ
  const svgWidth = 2700;
  const svgHeight = 360;
  const fontSize = 240;

  return (
    <div className="w-full flex justify-center items-center" style={{ minHeight: svgHeight }}>
      <svg
        ref={svgRef}
        width="100%"
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className="select-none"
        style={{ maxWidth: `${svgWidth}px`, width: "100%", height: `${svgHeight}px`, display: "block" }}
      >
        <defs>
          {/* 通常グラデーション */}
          <linearGradient
            id="textGradient"
            gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2={svgWidth} y2="0"
          >
            {gradientStops}
          </linearGradient>
          {/* ホバー用グラデーション */}
          <linearGradient
            id="hoverGradient"
            gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2={svgWidth} y2="0"
          >
            {hoverGradientStops}
          </linearGradient>
          {/* マスク */}
          <motion.radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="20%"
            initial={{ cx: "50%", cy: "50%" }}
            animate={maskPosition}
            transition={{ duration: duration ?? 0, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </motion.radialGradient>
          <mask id="textMask">
            <rect
              x="0"
              y="0"
              width={svgWidth}
              height={svgHeight}
              fill="url(#revealMask)"
            />
          </mask>
        </defs>
        {/* 常時表示のグラデーションテキスト */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="url(#textGradient)"
          fontFamily="Inter, Helvetica, Arial, sans-serif"
          fontSize={fontSize}
          fontWeight="900"
          letterSpacing="2px"
        >
          {text}
        </text>
        {/* ホバー時のみエフェクトを重ねる */}
        {hovered && (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="url(#hoverGradient)"
            mask="url(#textMask)"
            fontFamily="Inter, Helvetica, Arial, sans-serif"
            fontSize={fontSize}
            fontWeight="900"
            letterSpacing="2px"
            style={{ mixBlendMode: "screen" }}
          >
            {text}
          </text>
        )}
      </svg>
    </div>
  );
}; 