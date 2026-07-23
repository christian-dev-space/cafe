import { Loader2 } from "lucide-react";
import { COLORS } from "../../data/colors";
import { FONT } from "../../data/fonts";

export default function LoadingScreen() {
  return (
    <div
      style={{
        background: COLORS.crema,
        minHeight: "480px",
        fontFamily: FONT.body,
      }}
      className="flex items-center justify-center p-10"
    >
      <div
        className="flex flex-col items-center gap-3"
        style={{ color: COLORS.espresso }}
      >
        <Loader2 className="animate-spin" size={28} />
        <span className="text-sm">
          Brewing your café…
        </span>
      </div>
    </div>
  );
}