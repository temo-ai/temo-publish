import Link from "next/link";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export function CollectionMenu({ collections, publishedTemos }: any) {
  return collections?.map((collection: any, index: any) => (
    <AccordionItem
      value={collection?.id}
      key={collection?.id}
      className="border-none"
    >
      <AccordionTrigger className="w-full text-left font-semibold text-lg">
        {collection?.name}
      </AccordionTrigger>
      <AccordionContent>
        <nav className="space-y-4 w-full">
          {publishedTemos
            ?.filter((temo: any) => {
              return temo?.folderId == collection?.id;
            })
            ?.map((temo: any) => (
              <div
                className="hover:bg-primary/20 w-full rounded-md"
                key={temo?.id}
              >
                <Link href={`/${temo?.sessionId}`} key={temo?.id}>
                  {temo?.title}
                </Link>
              </div>
            ))}
        </nav>
      </AccordionContent>
    </AccordionItem>
  ));
}
