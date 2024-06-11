import { fetchTemos } from "@/lib/temo";

import Image from "next/image";
import Link from "next/link";

export default async function Page({}) {
  const { publishedTemos } = await fetchTemos();

  return (
    <main className="max-w-[1600px] gap-8 p-8 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-center">
      {publishedTemos.map((temo: any) => (
        <Link href={`/${temo?.sessionId}`} key={temo?.id}>
          <div className="cursor-pointer group space-y-2">
            <TemoThumbnail
              thumbnail={temo?.thumbnailUrl}
              alt={temo.title || temo?.name}
            />
            <TemoDetails title={temo.title} />
          </div>
        </Link>
      ))}
    </main>
  );
}

const TemoThumbnail = ({
  thumbnail,
  alt,
}: {
  thumbnail: string;
  alt: string;
}) => {
  return (
    <div className="aspect-video bg-background rounded-lg overflow-hidden border border-gray-700 max-w-[480px]">
      <Image src={thumbnail} alt={alt} width={480} height={270} />
    </div>
  );
};

const TemoDetails = ({ title }: { title: string }) => {
  return (
    <p className="w-full truncate text-gray-400 font-bold text-md">{title}</p>
  );
};
