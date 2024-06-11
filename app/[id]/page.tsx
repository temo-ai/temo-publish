import TemoPlayer from "@/components/TemoPlayer";
import ReactMarkdown from "react-markdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchFilePaths, fetchArticle } from "../../lib/fetchArticles";
import { extractHeadings } from "../../lib/extractHeadings";

export default async function Temo({
  params,
}: {
  params: { id: string };
}): Promise<JSX.Element> {
  let temosWithPaths = await fetchFilePaths(params.id);
  let article = await fetchArticle(temosWithPaths?.articles[0]?.url);
  const headings = extractHeadings(article);
  return (
    <Tabs
      orientation="vertical"
      defaultValue="article"
      className="w-full justify-center items-center pt-4 pr-4"
    >
      <TabsList className="">
        <TabsTrigger value="article">Article</TabsTrigger>
        <TabsTrigger value="player">Player</TabsTrigger>
      </TabsList>
      <TabsContent
        value="article"
        className="overflow-auto h-[calc(100vh-160px)]"
      >
        <ReactMarkdown className="w-full border border-gray-400/20 rounded-md p-8 shadow-sm mb-4 article ">
          {article}
        </ReactMarkdown>
      </TabsContent>
      <TabsContent value="player">
        <TemoPlayer
          key={temosWithPaths?.id}
          eventsPath={temosWithPaths?.eventsFileUrl}
        />
      </TabsContent>
    </Tabs>
  );
}
