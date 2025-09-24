import { useICBoxPFStore } from "@/lib/store";
import { HelpTopics } from "@/lib/store/types";

export const useToggleButton = () => {
  const toggleHelpActive = useICBoxPFStore((state) => state.toggleHelpActive);
  const setHelpTopic = useICBoxPFStore((state) => state.setHelpTopic);

  const handleToggle = (contentId: HelpTopics | null) => {
    if (!contentId) throw new Error("Help Content ID must not be null");
    setHelpTopic(contentId);
    toggleHelpActive();
  };

  return { handleToggle } as const;
};
