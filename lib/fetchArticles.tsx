import { list } from "@vercel/blob";

export const fetchArticle = async (url: string) => {
  if (!url) {
    return "";
  }
  const response = await fetch(url);

  const text = await response.text();
  return text;
};
export const fetchFilePaths = async (url: string) => {
  const { blobs } = await list({
    prefix: `temos/${decodeURIComponent(url)}`,
  });
  let temo: any = {
    id: url,
    eventsFileUrl: null,
    articles: [],
  };
  blobs
    ?.sort((a: any, b: any) => a.uploadedAt - b.uploadedAt)
    .forEach((blob: any) => {
      if (blob.pathname.endsWith("events.json")) {
        temo.eventsFileUrl = blob.url;
      }

      if (blob.pathname.endsWith(".md")) {
        let lang = blob.pathname.split("/").pop()?.split(".")[0];
        temo.articles.push({
          lang,
          url: blob.url,
        });
      }
    });
  return temo;
};
