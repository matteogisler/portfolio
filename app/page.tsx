'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Mascot from '@/components/Mascot';
import ScreenTransition from '@/components/ScreenTransition';
import villageMobile from '../app/assets/village-mobile.png';
import villageDesktop from '../app/assets/village-desktop.png';

type Direction = 'left' | 'up' | 'right';
type MascotVisualDirection = 'front' | 'left' | 'right' | 'back';
const hotspots: {
  name: string;
  path: string;
  entry: Direction;
  leftPct: number;
  topPct: number;
  widthPct: number;
  heightPct: number;
}[] = [
  {
    name: 'projects',
    path: '/projects',
    entry: 'left',
    leftPct: 2,
    topPct: 25,
    widthPct: 28,
    heightPct: 28,
  },
  {
    name: 'about',
    path: '/about',
    entry: 'up',
    leftPct: 32,
    topPct: 25,
    widthPct: 28,
    heightPct: 28,
  },
  {
    name: 'contact',
    path: '/contact',
    entry: 'right',
    leftPct: 60,
    topPct: 25,
    widthPct: 28,
    heightPct: 28,
  },
];

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isWalking, setIsWalking] = useState(false);
  // Fine-tuned mascot start position (center of crossroad)
  const [mascotPos, setMascotPos] = useState({ xPct: 50, yPct: 47 });
  const [stage, setStage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mascotDirection, setMascotDirection] = useState<MascotVisualDirection>('front');

  // On pageload entry from query
  useEffect(() => {
    const entry = searchParams.get('entry') as Direction | null;
    if (entry && containerRef.current) {
      // For now, always start at center crossroad (50, 65)
      setMascotPos({ xPct: 50, yPct: 65 });
      setMascotDirection('front');
    }
  }, []);

  // Initial idle → speak
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  function navigateTo(path: string, entry: Direction) {
    if (isWalking || !containerRef.current) return;
    setIsWalking(true);

    // Set mascot direction based on entry
    if (entry === 'left') setMascotDirection('left');
    else if (entry === 'right') setMascotDirection('right');
    else if (entry === 'up') setMascotDirection('back');

    // Fine-tuned door waypoints (center of each house door)
    let doorWaypoints = {
      left: { xPct: 15, yPct: 41 },    // Projects
      up: { xPct: 43, yPct: 41 },     // About
      right: { xPct: 77, yPct: 41 },  // Contact
    };

    const startPos = mascotPos; // Current position (crossroad)
    const endPos = doorWaypoints[entry];
    const animationDuration = 800; // Milliseconds per segment

    let intermediateWaypoint: { xPct: number; yPct: number; };
    let firstMoveDirection: MascotVisualDirection;
    let secondMoveDirection: MascotVisualDirection;

    if (entry === 'left') {
      // Move horizontally first, then vertically
      intermediateWaypoint = { xPct: endPos.xPct, yPct: startPos.yPct };
      firstMoveDirection = 'left';
      secondMoveDirection = 'back'; // Moving up towards the house
    } else if (entry === 'right') {
      // Move horizontally first, then vertically
      intermediateWaypoint = { xPct: endPos.xPct, yPct: startPos.yPct };
      firstMoveDirection = 'right';
      secondMoveDirection = 'back'; // Moving up towards the house
    } else { // entry === 'up' for About
      // Move vertically first, then horizontally
      intermediateWaypoint = { xPct: startPos.xPct, yPct: endPos.yPct };
      firstMoveDirection = 'back'; // Moving up towards the house
      secondMoveDirection = 'front'; // No left/right movement, just facing forward at door
    }

    // First segment of walk
    setMascotDirection(firstMoveDirection);
    setMascotPos(intermediateWaypoint);

    setTimeout(() => {
      // Second segment of walk
      setMascotDirection(secondMoveDirection);
      setMascotPos(endPos);

      setTimeout(() => {
        // After reaching the door, transition to subpage
        setIsTransitioning(true);
        setTimeout(() => {
          router.push(`${path}?entry=${entry}`);
        }, 400); // Screen transition duration
      }, animationDuration); // Wait for second segment to complete
    }, animationDuration); // Wait for first segment to complete
  }

  // choose appropriate background and aspect ratio
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const bgUrl = isMobile ? villageMobile.src : villageDesktop.src;
  const aspectRatio = isMobile ? (2 / 3) : (3 / 2);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black h-screen">
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: isMobile ? '2/3' : '3/2',
          imageRendering: 'pixelated',
          height: '100%',
        }}
        className="flex-shrink-0" // overflow-hidden for padding trick, flex-shrink-0 for parent flex
      >
        {/* Inner container for all game elements, to fill the padded space */}
        <div className="absolute inset-0">
          {/* Background Image - now fills the absolute inner container */}
          <img
            src={bgUrl}
            alt="Village Background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ imageRendering: 'pixelated' }}
          />

        <ScreenTransition isTransitioning={isTransitioning} />

        {/* Mascot */}
        <AnimatePresence>
          {stage >= 1 && (
            <Mascot
              pose={isWalking ? 'walk' : stage === 1 ? 'walk' : 'speak'}
              message={
                stage >= 2 && !isWalking ? 'Click a house to explore!' : undefined
              }
              direction={isWalking ? mascotDirection : 'front'}
              xPct={mascotPos.xPct}
              yPct={mascotPos.yPct}
              mascotSizePct={5.5}
            />
          )}
        </AnimatePresence>

        {/* Hotspot buttons */}
        {hotspots.map(h => (
          <button
            key={h.name}
            aria-label={`Go to ${h.name}`}
            onClick={() => navigateTo(h.path, h.entry)}
            className="absolute"
            style={{
              left: `${h.leftPct}%`,
              top: `${h.topPct}%`,
              width: `${h.widthPct}%`,
              height: `${h.heightPct}%`,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ))}
        </div> {/* End of inner absolute div */}
      </div> {/* End of containerRef div */}
    </div>
  );
}
