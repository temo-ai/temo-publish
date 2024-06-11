"use client";
import { useEffect } from "react";
import { Command } from "cmdk";
import { useAtom } from "jotai";
import {
  commandMenuOpenAtom,
  allTemosAtom,
  allCollectionsAtom,
} from "@/lib/atoms";
import "../app/raycast.css";
import { useRouter } from "next/navigation";

const CommandMenu = ({
  publishedTemos,
  collections,
}: {
  publishedTemos: any[];
  collections: any[];
}) => {
  const router = useRouter();
  const [open, setOpen] = useAtom(commandMenuOpenAtom);
  const [, setAllTemos] = useAtom(allTemosAtom);
  const [, setAllCollections] = useAtom(allCollectionsAtom);

  useEffect(() => {
    setAllTemos(publishedTemos);
    setAllCollections(collections);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishedTemos, collections]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
    >
      <Command.Input />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Temos">
          {publishedTemos?.map((temo: any) => (
            <Command.Item
              key={`T-${temo?.id}`}
              onSelect={() => {
                router.push(`/${temo?.sessionId}`);
                setOpen(false);
              }}
            >
              {temo?.title}
            </Command.Item>
          ))}
        </Command.Group>
        {/* <Command.Group heading="Collections">
          {collections?.length > 0 &&
            collections?.map((collection: any) => (
              <Command.Item key={`C-${collection?.id}`}>
                {collection?.name}
              </Command.Item>
            ))}
        </Command.Group> */}
      </Command.List>
    </Command.Dialog>
  );
};

export default CommandMenu;
