import { motion, AnimatePresence } from "framer-motion";

interface TypingIndicatorProps {
  typingUsers: string[];
  maxDisplay?: number;
}

export default function TypingIndicator({ 
  typingUsers, 
  maxDisplay = 2 
}: TypingIndicatorProps) {
  if (typingUsers.length === 0) return null;

  const displayUsers = typingUsers.slice(0, maxDisplay);
  const remainingCount = typingUsers.length - maxDisplay;

  let message = "";
  if (typingUsers.length === 1) {
    message = `${displayUsers[0]} is typing...`;
  } else if (typingUsers.length === 2) {
    message = `${displayUsers.join(" and ")} are typing...`;
  } else {
    message = `${displayUsers.join(", ")} and ${remainingCount} more are typing...`;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground"
      >
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s] mx-0.5" />
            <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" />
          </div>
          <span className="ml-2 text-sm">{message}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}