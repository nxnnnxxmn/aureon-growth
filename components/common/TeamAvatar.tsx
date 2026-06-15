"use client";

import Image from "next/image";
import { getMemberInitials, type TeamMember } from "@/lib/team";

/**
 * Team member avatar — uses real photo if provided, falls back to
 * elegant gradient with initials. Both look intentional and premium.
 *
 * Sizes:
 *  - sm: 56px (inline listings)
 *  - md: 96px (team cards)
 *  - lg: 160px (leadership cards)
 *  - xl: 280px (founder hero)
 */
type Size = "sm" | "md" | "lg" | "xl";

const SIZE_MAP: Record<Size, { px: number; text: string; ring: string }> = {
  sm: { px: 56, text: "text-base", ring: "ring-1" },
  md: { px: 96, text: "text-xl", ring: "ring-1" },
  lg: { px: 160, text: "text-3xl", ring: "ring-1" },
  xl: { px: 280, text: "text-5xl", ring: "ring-2" },
};

interface Props {
  member: TeamMember;
  size?: Size;
  className?: string;
  /** Optional priority loading (for above-the-fold) */
  priority?: boolean;
}

export default function TeamAvatar({
  member,
  size = "md",
  className = "",
  priority = false,
}: Props) {
  const dim = SIZE_MAP[size];
  const initials = getMemberInitials(member.name);

  return (
    <div
      className={`relative rounded-3xl overflow-hidden ${dim.ring} ring-gold-soft ${className}`}
      style={{ width: dim.px, height: dim.px }}
    >
      {/* Soft inner gold tint frame */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-3xl"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4), inset 0 0 0 1px rgba(201,169,97,0.10)",
        }}
      />

      {member.photo ? (
        <Image
          src={member.photo}
          alt={`${member.name} — ${member.role}`}
          width={dim.px * 2}
          height={dim.px * 2}
          priority={priority}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className={`w-full h-full bg-gradient-to-br ${member.fallbackGradient} flex items-center justify-center relative`}
        >
          {/* Subtle pattern texture */}
          <div className="absolute inset-0 opacity-30 pattern-dots" />
          {/* Initials */}
          <span
            className={`relative font-display font-black text-white ${dim.text} tracking-tight z-10`}
            style={{ letterSpacing: "-0.02em" }}
          >
            {initials}
          </span>
          {/* Bottom gold accent */}
          <div
            className="absolute bottom-0 inset-x-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(201,169,97,0.5) 50%, transparent 100%)",
            }}
          />
        </div>
      )}
    </div>
  );
}
