import { cn } from "@/lib/utils";

export const useCardDecision = () => {
  const getTextClasses = (code: string, version: string) => {
    if (version === "aprova") {
      return cn("text-xl font-bold print:text-sm", {
        "text-unavaliable-foreground font-normal": code === "0",
        "text-best-profile-foreground": code === "1",
        "text-good-profile-foreground": code === "2",
        "text-average-profile-foreground": code === "3",
        "text-risk-profile-foreground": code === "4",
        "text-high-risk-profile-foreground": code === "5",
      });
    }

    if (version === "pre-qualificacao") {
      return cn("text-xl font-bold print:text-sm", {
        "text-unavaliable-foreground font-normal": code === "0",
        "text-average-profile-foreground": code === "1",
        "text-high-risk-profile-foreground": code === "2",
      });
    }

    return ""; // Default if version doesn't match expected values
  };

  return { getTextClasses };
};
