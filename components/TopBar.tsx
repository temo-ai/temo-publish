"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useAtom } from "jotai";
import { commandMenuOpenAtom } from "@/lib/atoms";
import Image from "next/image";

const TopBar = ({
  brandDetails,
}: {
  brandDetails: {
    brandName: string;
    brandImage: string;
  };
}) => {
  const [open, setOpen] = useAtom(commandMenuOpenAtom);

  return (
    <div className="z-30 flex top-0 left-0 right-0 items-center justify-between border-b border-gray-400/20 h-16  px-4 sm:px-6 lg:px-8 ">
      <Link href="/">
        {brandDetails.brandImage ? (
          <Image
            src={brandDetails.brandImage}
            alt={brandDetails.brandName}
            width={120}
            height={40}
          />
        ) : (
          <div>{brandDetails.brandName}</div>
        )}
      </Link>

      <div
        className="flex items-center border border-gray-400/20 rounded-lg"
        onClick={() => setOpen(!open)}
      >
        <Search className="w-4 h-4 ml-4" />
        <input
          type="text"
          placeholder="Search or ask..."
          className="flex-1 px-4 py-2 text-sm leading-none bg-transparent outline-none border-none focus:outline-none focus:ring-0 focus:border-none"
        />
        <span className="px-4 py-2 text-sm">⌘K</span>
      </div>
      <div>
        <Button>EN</Button>
      </div>
    </div>
  );
};

export default TopBar;
