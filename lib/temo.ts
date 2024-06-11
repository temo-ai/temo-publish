import { list } from "@vercel/blob";

export const fetchTemos = async (): Promise<any> => {
  try {
    const { blobs } = await list({ prefix: "temos/", mode: "folded" });
    const temoDetails = blobs
      ?.sort((a: any, b: any) => b?.uploadedAt - a?.uploadedAt)
      ?.find((blob: any) => blob.pathname.endsWith("temos.json"));
    const brandFile = blobs
      ?.sort((a: any, b: any) => b?.uploadedAt - a?.uploadedAt)
      ?.find((blob: any) => blob.pathname.endsWith("brand.json"));

    const brandDetails = brandFile?.url ? await getTemos(brandFile?.url) : null;

    if (!temoDetails?.url) {
      return {
        collections: [],
        temos: [],
        publishedTemos: [],
        brandDetails: null,
      };
    } else {
      const allTemos = await getTemos(temoDetails?.url);

      const publishedTemos =
        allTemos?.filter((temo: any) => temo?.isPublished) || [];

      let collections: {
        id: string;
        name: string;
      }[] = [];

      let temos: any[] = [];

      publishedTemos?.forEach((temo: any) => {
        if (
          temo?.folderId &&
          !collections.find(
            (collection: any) => collection?.id === temo?.folderId
          )
        ) {
          collections.push({ id: temo?.folderId, name: temo?.folderName });
        }
        if (!temo?.folderId) {
          temos.push(temo);
        }
      });
      console.log({ collections, temos, publishedTemos, brandDetails });
      return { collections, temos, publishedTemos, brandDetails };
    }
  } catch (error) {
    console.error(error);
    return {
      collections: [],
      temos: [],
      publishedTemos: [],
      brandDetails: null,
    };
  }
};

async function getTemos(url: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const fetchBrand = async (brandId: string): Promise<any> => {
  try {
    const { blobs } = await list({ prefix: "temos/", mode: "folded" });
    const temoDetails = blobs
      ?.sort((a: any, b: any) => b?.uploadedAt - a?.uploadedAt)
      ?.find((temo: any) => temo?.brandId === brandId);
    return temoDetails;
  } catch (error) {
    console.error(error);
    return null;
  }
};
