import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

export const extractHeadings = (markdown: string) => {
  const tree = unified().use(remarkParse).parse(markdown);
  const headings: { text: string; id: string }[] = [];

  visit(tree, "heading", (node: any) => {
    const text = node.children.map((child: any) => child.value).join("");
    const id = text.toLowerCase().replace(/\s+/g, "-");
    headings.push({ text, id });
  });

  return headings;
};
