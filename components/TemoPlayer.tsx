"use client";
import { useRef, useEffect } from "react";
import "rrweb-player/dist/style.css";
import rrwebPlayer from "rrweb-player";

export default function TemoPlayer({
  eventsPath,
}: {
  eventsPath: string;
}): JSX.Element {
  const playerRef = useRef<rrwebPlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const fetchEvents = async (eventsPath: string) => {
    if (eventsPath) {
      const response = await fetch(eventsPath);
      let events = await response.json();
      console.log(events);
      replayEvents(events);
    } else {
      console.log("No events path provided");
    }
  };

  const replayEvents = async (eventsArray: any[]) => {
    const playerElement = playerContainerRef.current;
    if (playerElement) {
      if (playerRef.current) {
        playerRef.current.pause();
        playerElement.innerHTML = "";
        playerRef.current = null;
      }

      if (eventsArray.length > 2) {
        const rect = playerElement.getBoundingClientRect();
        let customWidth = rect.width;
        let customHeight = rect.height;

        playerRef.current = new rrwebPlayer({
          target: playerElement,
          props: {
            events: eventsArray,
            width: customWidth,
            height: customHeight,
            showController: false,
            showDebug: false,
            autoPlay: true,
          },
        });
      }
    }
  };

  useEffect(() => {
    fetchEvents(eventsPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsPath]);

  return <div ref={playerContainerRef} className="w-full h-[70vh]" />;
}
