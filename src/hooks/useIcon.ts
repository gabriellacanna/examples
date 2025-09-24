import AverageProfile from "@/assets/icons/average-profile.png";
import BestProfile from "@/assets/icons/best-profile.png";
import EvaluateProfile from "@/assets/icons/evaluate.png";
import GoodProfile from "@/assets/icons/good-profile.png";
import HighRiskProfile from "@/assets/icons/high-risk-profile.png";
import RiskProfile from "@/assets/icons/risk-profile.png";
import UnvaliableIcon from "@/assets/icons/unavaliable.png";
import { cn } from "@/lib/utils";

type IconDecisionCodes = "0" | "1" | "2" | "3" | "4" | "5";

export const useIcon = () => {
  const getBackgroundClasses = (code: string, version: string) => {
    if (version === "aprova") {
      return cn(
        "flex items-center justify-center rounded-full w-16 h-16 show-in-pdf",
        {
          "bg-unavaliable-foreground/10": code === "0",
          "bg-best-profile-foreground/10": code === "1",
          "bg-good-profile-foreground/10": code === "2",
          "bg-average-profile-foreground/10": code === "3",
          "bg-risk-profile-foreground/10": code === "4",
          "bg-high-risk-profile-foreground/10": code === "5",
        }
      );
    }

    if (version === "pre-qualificacao") {
      return cn(
        "flex items-center justify-center rounded-full w-16 h-16 show-in-pdf",
        {
          "bg-unavaliable-foreground/10": code === "0",
          "bg-average-profile-foreground/10": code === "1",
          "bg-high-risk-profile-foreground/10": code === "2",
        }
      );
    }

    return ""; // Default if version doesn't match expected values
  };

  const getIcon = (code: IconDecisionCodes, version: string) => {
    const iconMap: Record<IconDecisionCodes, string> = {
      "0": UnvaliableIcon,
      "1":
        version === "aprova"
          ? BestProfile
          : version === "pre-qualificacao"
          ? EvaluateProfile
          : "",
      "2":
        version === "aprova"
          ? GoodProfile
          : version === "pre-qualificacao"
          ? HighRiskProfile
          : "",
      "3": AverageProfile,
      "4": RiskProfile,
      "5": HighRiskProfile,
    };

    return iconMap[code]; // Now TypeScript knows code is a valid key
  };

  return { getIcon, getBackgroundClasses };
};
