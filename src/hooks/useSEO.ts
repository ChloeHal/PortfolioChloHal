import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
}

const BASE_TITLE = "Chloé Halloin";

function setMetaTag(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSEO({ title, description }: SEOProps) {
  useEffect(() => {
    document.title = title.includes(BASE_TITLE) ? title : `${title} — ${BASE_TITLE}`;

    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
  }, [title, description]);
}
