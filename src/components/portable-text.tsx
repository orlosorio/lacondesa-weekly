import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl font-semibold text-foreground mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-5 my-8 italic text-foreground">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
        {children}
      </p>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-primary no-underline hover:underline"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="text-foreground font-semibold">{children}</strong>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(900).quality(80).url();
      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || ""}
            width={900}
            height={500}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function ArticleBody({ body }: { body: unknown[] }) {
  return (
    <PortableText
      value={body as Parameters<typeof PortableText>[0]["value"]}
      components={portableTextComponents}
    />
  );
}
