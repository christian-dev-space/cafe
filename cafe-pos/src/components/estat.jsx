import { COLORS } from "../data/colors";
import { FONT } from "../data/fonts";

export default function Stat({ label, value }) {
  return (
    <div
      style={{ background: COLORS.espresso }}
      className="rounded-xl p-3"
    >
      <div
        style={{
          color: COLORS.brassLight,
          fontFamily: FONT.mono,
        }}
        className="text-lg font-bold leading-tight"
      >
        {value}
      </div>

      <div
        style={{
          color: COLORS.paper,
          opacity: 0.7,
        }}
        className="text-xs mt-0.5"
      >
        {label}
      </div>
    </div>
  );
}