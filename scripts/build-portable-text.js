/**
 * Builds Sanity Portable Text blocks from markdown-like content.
 * Supports: ## heading, **bold**, [text](url), normal paragraphs.
 */
function buildPortableTextBody(content) {
  const blocks = [];
  let keyCount = 0;
  const nextKey = () => `key-${keyCount++}`;

  const segments = content.split(/\n\n+/);
  for (const seg of segments) {
    const trimmed = seg.trim();
    if (!trimmed || trimmed === "---") continue;

    let style = "normal";
    let text = trimmed;
    if (trimmed.startsWith("## ")) {
      style = "h2";
      text = trimmed.slice(3);
    }

    const { children, markDefs } = parseInline(text);
    blocks.push({
      _type: "block",
      _key: nextKey(),
      style,
      children,
      ...(markDefs.length > 0 && { markDefs }),
    });
  }
  return blocks;
}

function parseInline(text) {
  const children = [];
  const markDefs = [];
  let keyCount = 0;
  const key = () => `span-${keyCount++}`;
  const linkKey = () => `link-${keyCount++}`;

  // Split by **bold** or [text](url) while keeping delimiters
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIndex) {
      const plain = text.slice(lastIndex, m.index);
      if (plain) children.push({ _type: "span", _key: key(), text: plain, marks: [] });
    }
    if (m[0].startsWith("**")) {
      const boldText = m[0].slice(2, -2);
      children.push({ _type: "span", _key: key(), text: boldText, marks: ["strong"] });
    } else {
      const linkMatch = m[0].match(/^\[(.+)\]\((.+)\)$/);
      if (linkMatch) {
        const lk = linkKey();
        markDefs.push({ _type: "link", _key: lk, href: linkMatch[2] });
        children.push({ _type: "span", _key: key(), text: linkMatch[1], marks: [lk] });
      }
    }
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < text.length) {
    const plain = text.slice(lastIndex);
    if (plain) children.push({ _type: "span", _key: key(), text: plain, marks: [] });
  }
  if (children.length === 0) {
    children.push({ _type: "span", _key: key(), text, marks: [] });
  }
  return { children, markDefs };
}

module.exports = { buildPortableTextBody };
