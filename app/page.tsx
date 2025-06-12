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

interface Hotspot {
  name: string;
  path: string;
  entry: Direction;
  leftPct: number;
  topPct: number;
  widthPct: number;
  heightPct: number;
}

const desktopHotspots: Hotspot[] = [
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

const mobileHotspots: Hotspot[] = [
  {
    name: 'about',
    path: '/about',
    entry: 'up',
    leftPct: 35,
    topPct: 12,
    widthPct: 30,
    heightPct: 30,
  },
  {
    name: 'projects',
    path: '/projects',
    entry: 'left',
    leftPct: 7,
    topPct: 50,
    widthPct: 30,
    heightPct: 30,
  },
  {
    name: 'contact',
    path: '/contact',
    entry: 'right',
    leftPct: 62,
    topPct: 55,
    widthPct: 30,
    heightPct: 30,
  },
];

const desktopDoorWaypoints = {
  left: { xPct: 15, yPct: 41 },    // Projects
  up: { xPct: 43, yPct: 41 },     // About
  right: { xPct: 67, yPct: 41 },  // Contact
};

const mobileDoorWaypoints = {
  up: { xPct: 50, yPct: 35 }, // About
  left: { xPct: 25, yPct: 65 }, // Projects
  right: { xPct: 75, yPct: 65 }, // Contact
};

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isWalking, setIsWalking] = useState(false);
  const [mascotPos, setMascotPos] = useState({ xPct: 50, yPct: 47 });
  const [stage, setStage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mascotDirection, setMascotDirection] = useState<MascotVisualDirection>('front');

  // choose appropriate background and aspect ratio
  const [isMobile, setIsMobile] = useState(false);
  const bgUrl = isMobile ? villageMobile.src : villageDesktop.src;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set initial mascot position based on mobile status
  useEffect(() => {
    setMascotPos({ xPct: 50, yPct: isMobile ? 50 : 47 });
  }, [isMobile]);

  // On pageload entry from query
  useEffect(() => {
    const entry = searchParams.get('entry') as Direction | null;
    if (entry && containerRef.current) {
      // For now, always start at center crossroad
      setMascotPos({ xPct: 50, yPct: isMobile ? 50 : 65 });
      setMascotDirection('front');
    }
  }, [searchParams, isMobile]);

  // Initial idle → speak
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  function navigateTo(path: string, entry: Direction) {
    if (isWalking || !containerRef.current) return;
    setIsWalking(true);

    const doorWaypoints = isMobile ? mobileDoorWaypoints : desktopDoorWaypoints;

    const startPos = mascotPos; 
    const endPos = doorWaypoints[entry];

    // Define speed factor (milliseconds per percentage point of movement)
    const speedFactor = 50;

    let intermediateWaypoint: { xPct: number; yPct: number; };
    let firstMoveDirection: MascotVisualDirection;
    let secondMoveDirection: MascotVisualDirection;
    let firstSegmentDuration: number;
    let secondSegmentDuration: number;

    // All paths now move horizontally first, then vertically
    intermediateWaypoint = { xPct: endPos.xPct, yPct: startPos.yPct };

    if (entry === 'left') {
      firstMoveDirection = 'left';
    } else if (entry === 'right') {
      firstMoveDirection = 'right';
    } else { // entry === 'up' for About
      firstMoveDirection = 'left';
    }
    secondMoveDirection = 'back';

    firstSegmentDuration = Math.abs(intermediateWaypoint.xPct - startPos.xPct) * speedFactor;
    secondSegmentDuration = Math.abs(endPos.yPct - intermediateWaypoint.yPct) * speedFactor;

    // Ensure minimum duration to avoid zero duration for very short movements or weird behavior
    const minDuration = 200;
    firstSegmentDuration = Math.max(firstSegmentDuration, minDuration);
    secondSegmentDuration = Math.max(secondSegmentDuration, minDuration);

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
        }, 400);
      }, secondSegmentDuration); 
    }, firstSegmentDuration); 
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black h-screen overflow-hidden">
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: isMobile ? '2/3' : '3/2',
          imageRendering: 'pixelated',
          height: '100%',
        }}
        className="flex-shrink-0"
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
        {(isMobile ? mobileHotspots : desktopHotspots).map(h => (
          <button
            key={h.name}
            onClick={() => navigateTo(h.path, h.entry)}
            style={{
              position: 'absolute',
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
        </div>
      </div> 
    </div>
  );
}
