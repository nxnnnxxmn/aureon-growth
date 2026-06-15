"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Bot,
  Zap,
  TrendingUp,
  Users,
  Mail,
  Target,
  ArrowUpRight,
  Cpu,
} from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";

const PALETTE = {
  bgWhite: "#FBF8F1",
  panel: "#FFFFFF",
  panelAlt: "#F5F1E8",
  text: "#1A1815",
  textMuted: "#6B655E",
  textSoft: "#9A938A",
  accent: "#E04E2C",
  accentSoft: "#F2D0C1",
  forest: "#2D5016",
  forestSoft: "#E3EAD8",
  hairline: "rgba(26,24,21,0.10)",
  hairlineSoft: "rgba(26,24,21,0.06)",
};

const liveAgents = [
  { name: "Agent Conversión", status: "Optimizando", icon: Target, last: "Hace 2s" },
  { name: "Agent Email AI", status: "Enviando", icon: Mail, last: "Hace 8s" },
  { name: "Agent Targeting", status: "Analizando", icon: Cpu, last: "Hace 14s" },
  { name: "Agent Contenido", status: "Generando", icon: Bot, last: "Hace 22s" },
];

const campaigns = [
  { name: "Q2 — Performance LATAM", roas: 8.4, progress: 87, channel: "Meta + Google" },
  { name: "Lifecycle Email Flow", roas: 12.1, progress: 64, channel: "Email" },
  { name: "Awareness Brand Push", roas: 5.7, progress: 92, channel: "LinkedIn" },
];

const chartData = [42, 58, 51, 68, 74, 81, 78, 88, 92, 87, 95, 100, 98, 105, 112];

export default function AIDashboard() {
  const [pulse, setPulse] = useState(0);
  const [leadsCount, setLeadsCount] = useState(1247);
  const [convRate, setConvRate] = useState(4.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 4);
      setLeadsCount((c) => c + Math.floor(Math.random() * 3));
      setConvRate((r) => +(r + (Math.random() - 0.5) * 0.05).toFixed(2));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const cardStyle = {
    backgroundColor: PALETTE.panelAlt,
    boxShadow: "inset 0 0 0 1px rgba(26,24,21,0.06)",
  };

  return (
    <div className="relative w-full">
      <motion.div
        className="relative rounded-3xl p-5 lg:p-6"
        style={{
          backgroundColor: PALETTE.panel,
          boxShadow:
            "0 30px 80px -24px rgba(26,24,21,0.20), 0 0 0 1px rgba(26,24,21,0.06)",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{ backgroundColor: PALETTE.forest }}
            />
            <span
              className="text-xs font-display font-semibold uppercase tracking-widest"
              style={{ color: PALETTE.text }}
            >
              Growth Control Center
            </span>
            <span
              className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase"
              style={{ backgroundColor: PALETTE.forestSoft, color: PALETTE.forest }}
            >
              Live
            </span>
          </div>
          <div
            className="hidden sm:flex items-center gap-2 text-[10px] font-mono"
            style={{ color: PALETTE.textSoft }}
          >
            <Activity className="w-3 h-3" style={{ color: PALETTE.accent }} />
            <span>v2.1.0</span>
          </div>
        </div>

        {/* Top metrics */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <MetricCard icon={Users} label="Leads hoy" value={leadsCount} unit="" trend="+12.4%" />
          <MetricCard icon={TrendingUp} label="Conv. rate" value={convRate} unit="%" trend="+0.8%" decimals={2} />
          <MetricCard icon={Zap} label="Agentes activos" value={4} unit="" trend="100%" />
        </div>

        {/* Mini chart */}
        <div className="rounded-2xl p-4 mb-5" style={cardStyle}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div
                className="text-[10px] uppercase tracking-widest font-semibold"
                style={{ color: PALETTE.textSoft }}
              >
                Leads — últimas 24h
              </div>
              <div
                className="font-display font-bold text-lg"
                style={{ color: PALETTE.text }}
              >
                <AnimatedCounter end={1247} suffix=" capturados" />
              </div>
            </div>
            <div
              className="flex items-center gap-1.5 px-2 py-1 rounded-md"
              style={{ backgroundColor: PALETTE.forestSoft }}
            >
              <ArrowUpRight className="w-3 h-3" style={{ color: PALETTE.forest }} />
              <span className="text-xs font-semibold" style={{ color: PALETTE.forest }}>
                +24.6%
              </span>
            </div>
          </div>
          <div className="flex items-end gap-1 h-20">
            {chartData.map((v, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-md"
                style={{
                  height: `${(v / 112) * 100}%`,
                  transformOrigin: "bottom",
                  backgroundColor: i % 3 === 0 ? PALETTE.accent : PALETTE.accentSoft,
                }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
          <div
            className="flex justify-between mt-2 text-[9px] font-mono"
            style={{ color: PALETTE.textSoft }}
          >
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:59</span>
          </div>
        </div>

        {/* Agents + campaigns */}
        <div className="grid lg:grid-cols-2 gap-3">
          {/* Live agents */}
          <div className="rounded-2xl p-4" style={cardStyle}>
            <div className="flex items-center justify-between mb-3">
              <div
                className="text-[10px] uppercase tracking-widest font-semibold"
                style={{ color: PALETTE.textSoft }}
              >
                Agentes IA
              </div>
              <div className="text-[10px] font-mono" style={{ color: PALETTE.textSoft }}>
                4/4 online
              </div>
            </div>
            <div className="space-y-2.5">
              {liveAgents.map((a, i) => {
                const isPulsing = i === pulse;
                return (
                  <motion.div
                    key={a.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="relative w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: PALETTE.accentSoft }}
                    >
                      <a.icon className="w-3.5 h-3.5" style={{ color: PALETTE.accent }} />
                      {isPulsing && (
                        <motion.span
                          className="absolute -inset-0.5 rounded-lg border"
                          style={{ borderColor: PALETTE.accent }}
                          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-xs font-display font-semibold truncate"
                        style={{ color: PALETTE.text }}
                      >
                        {a.name}
                      </div>
                      <div className="text-[10px]" style={{ color: PALETTE.textSoft }}>
                        {a.last}
                      </div>
                    </div>
                    <div
                      className="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wide"
                      style={{ backgroundColor: PALETTE.accentSoft, color: PALETTE.accent }}
                    >
                      {a.status}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Active campaigns */}
          <div className="rounded-2xl p-4" style={cardStyle}>
            <div className="flex items-center justify-between mb-3">
              <div
                className="text-[10px] uppercase tracking-widest font-semibold"
                style={{ color: PALETTE.textSoft }}
              >
                Campañas activas
              </div>
              <div className="text-[10px] font-mono" style={{ color: PALETTE.accent }}>
                3 optimizadas
              </div>
            </div>
            <div className="space-y-3">
              {campaigns.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div
                      className="text-xs font-display font-medium truncate pr-2"
                      style={{ color: PALETTE.text }}
                    >
                      {c.name}
                    </div>
                    <div
                      className="text-xs font-display font-bold shrink-0"
                      style={{ color: PALETTE.accent }}
                    >
                      {c.roas}x ROAS
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex-1 h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: "rgba(26,24,21,0.08)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: PALETTE.accent }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span
                      className="text-[10px] font-mono w-8 text-right"
                      style={{ color: PALETTE.textSoft }}
                    >
                      {c.progress}%
                    </span>
                  </div>
                  <div className="text-[10px] mt-1" style={{ color: PALETTE.textSoft }}>
                    {c.channel}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  decimals = 0,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: number;
  unit: string;
  trend: string;
  decimals?: number;
}) {
  return (
    <div
      className="rounded-2xl p-3.5"
      style={{ backgroundColor: "#F5F1E8", boxShadow: "inset 0 0 0 1px rgba(26,24,21,0.06)" }}
    >
      <div className="flex items-center justify-between mb-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: "#F2D0C1" }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: "#E04E2C" }} />
        </div>
        <span className="text-[10px] font-semibold" style={{ color: "#2D5016" }}>
          {trend}
        </span>
      </div>
      <div className="font-display font-black text-xl leading-tight" style={{ color: "#1A1815" }}>
        <AnimatedCounter end={value} suffix={unit} decimals={decimals} />
      </div>
      <div
        className="text-[10px] mt-0.5 uppercase tracking-wider font-medium"
        style={{ color: "#9A938A" }}
      >
        {label}
      </div>
    </div>
  );
}
