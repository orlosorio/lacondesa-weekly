"use client";

import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { EmailSignup } from "@/components/email-signup";

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

interface ArticleBodyProps {
  body: unknown[];
  insertCtaAfterBlock?: number;
}

export function ArticleBody({
  body,
  insertCtaAfterBlock = 3,
}: ArticleBodyProps) {
  const blocks = body as Array<{ _key?: string; _type: string }>;
  const normalBlocks = blocks.filter(
    (b) => b._type === "block" || b._type === "image"
  );

  let paragraphCount = 0;
  let ctaInserted = false;
  const enrichedBlocks: Array<unknown> = [];

  for (const block of normalBlocks) {
    enrichedBlocks.push(block);

    if (block._type === "block" && !ctaInserted) {
      paragraphCount++;
      if (paragraphCount === insertCtaAfterBlock) {
        ctaInserted = true;
        enrichedBlocks.push({ _type: "__cta__", _key: "inline-cta" });
      }
    }
  }

  const renderedParts: React.ReactNode[] = [];
  let currentBlocks: unknown[] = [];
  let partIndex = 0;

  for (const block of enrichedBlocks) {
    const b = block as { _type: string };
    if (b._type === "__cta__") {
      if (currentBlocks.length > 0) {
        renderedParts.push(
          <PortableText
            key={`pt-${partIndex}`}
            value={currentBlocks as Parameters<typeof PortableText>[0]["value"]}
            components={portableTextComponents}
          />
        );
        currentBlocks = [];
        partIndex++;
      }
      renderedParts.push(
        <div key="inline-cta" className="my-10">
          <EmailSignup variant="inline" />
        </div>
      );
    } else {
      currentBlocks.push(block);
    }
  }

  if (currentBlocks.length > 0) {
    renderedParts.push(
      <PortableText
        key={`pt-${partIndex}`}
        value={currentBlocks as Parameters<typeof PortableText>[0]["value"]}
        components={portableTextComponents}
      />
    );
  }

  return <>{renderedParts}</>;
}
