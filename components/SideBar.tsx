import { Accordion } from "@/components/ui/accordion";
import { CollectionMenu } from "./CollectionMenu";
import Link from "next/link";

const Sidebar = async ({
  temos = [],
  publishedTemos = [],
  collections = [],
}: {
  temos: any[];
  publishedTemos: any[];
  collections: any[];
}) => {
  return (
    <nav className="h-full relative flex flex-col border-r border-gray-400/20 overflow-y-auto space-y-4 p-4">
      {temos?.length > 0 &&
        temos?.map((temo: any) => (
          <div className="hover:bg-primary/20 w-full rounded-md" key={temo?.id}>
            <Link href={`/${temo?.sessionId}`}>{temo?.title}</Link>
          </div>
        ))}
      <Accordion
        type="multiple"
        defaultValue={collections?.map((collection: any) => collection?.id)}
        className="w-full border-none"
      >
        <CollectionMenu
          collections={collections}
          publishedTemos={publishedTemos}
        />
      </Accordion>
    </nav>
  );
};

export default Sidebar;
