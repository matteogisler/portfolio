import { motion, AnimatePresence } from 'framer-motion';

interface ScreenTransitionProps {
  isTransitioning: boolean;
}

const ScreenTransition = ({ isTransitioning }: ScreenTransitionProps) => {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black z-50"
        />
      )}
    </AnimatePresence>
  );
};

export default ScreenTransition; 