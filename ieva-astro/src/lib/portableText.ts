/**
 * Vienkāršs Sanity Portable Text → HTML konvertors.
 * Atbalsta: virsraksti (h2–h4), paragrāfi, bold, italic,
 * saraksti (bullet/number), saites, attēlus.
 */

interface PtSpan {
  _type: 'span';
  text: string;
  marks?: string[];
}

interface PtBlock {
  _type: 'block';
  style?: string;
  children?: PtSpan[];
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
  listItem?: 'bullet' | 'number';
  level?: number;
}

interface PtImage {
  _type: 'image';
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
}

type PtNode = PtBlock | PtImage | Record<string, unknown>;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderSpans(spans: PtSpan[], markDefs: PtBlock['markDefs'] = []): string {
  return (spans || []).map((span) => {
    if (span._type !== 'span') return '';
    let text = escapeHtml(span.text);
    const marks = span.marks || [];

    for (const mark of marks) {
      if (mark === 'strong') { text = `<strong>${text}</strong>`; continue; }
      if (mark === 'em')     { text = `<em>${text}</em>`; continue; }
      if (mark === 'code')   { text = `<code>${text}</code>`; continue; }
      if (mark === 'underline') { text = `<u>${text}</u>`; continue; }
      // Custom mark (e.g. link)
      const def = (markDefs || []).find((d) => d._key === mark);
      if (def?._type === 'link' && def.href) {
        const rel = def.href.startsWith('http') ? ' rel="noopener noreferrer" target="_blank"' : '';
        text = `<a href="${escapeHtml(def.href)}"${rel}>${text}</a>`;
      }
    }
    return text;
  }).join('');
}

export function portableTextToHtml(blocks: PtNode[]): string {
  if (!Array.isArray(blocks)) return '';

  const html: string[] = [];
  let listStack: Array<{ type: string; level: number }> = [];

  function closeLists(targetLevel: number) {
    while (listStack.length > 0 && listStack[listStack.length - 1].level > targetLevel) {
      const last = listStack.pop()!;
      html.push(last.type === 'bullet' ? '</ul>' : '</ol>');
    }
  }

  for (const block of blocks) {
    if (block._type === 'image') {
      closeLists(0);
      listStack = [];
      const img = block as PtImage;
      // Images from Sanity use asset reference — render as empty placeholder if no URL builder available
      if (img.asset?._ref) {
        const alt = img.alt ? escapeHtml(img.alt) : '';
        // urlFor would need the client; inline the reference for now
        html.push(`<figure class="article-image"><img src="" data-sanity-ref="${img.asset._ref}" alt="${alt}" loading="lazy" />${img.caption ? `<figcaption>${escapeHtml(img.caption)}</figcaption>` : ''}</figure>`);
      }
      continue;
    }

    if (block._type !== 'block') {
      // Unknown block type — skip
      continue;
    }

    const b = block as PtBlock;
    const style = b.style || 'normal';
    const inner = renderSpans(b.children || [], b.markDefs);

    // Handle list items
    if (b.listItem) {
      const level = b.level || 1;
      const listType = b.listItem === 'number' ? 'number' : 'bullet';

      // Open list if needed
      if (listStack.length === 0 || listStack[listStack.length - 1].level < level) {
        listStack.push({ type: listType, level });
        html.push(listType === 'number' ? '<ol>' : '<ul>');
      } else if (listStack[listStack.length - 1].level > level) {
        closeLists(level);
      }

      html.push(`<li>${inner}</li>`);
      continue;
    }

    // Close any open lists
    closeLists(0);
    listStack = [];

    switch (style) {
      case 'h2': html.push(`<h2>${inner}</h2>`); break;
      case 'h3': html.push(`<h3>${inner}</h3>`); break;
      case 'h4': html.push(`<h4>${inner}</h4>`); break;
      case 'blockquote': html.push(`<blockquote>${inner}</blockquote>`); break;
      case 'normal':
      default:
        if (inner.trim()) html.push(`<p>${inner}</p>`);
        break;
    }
  }

  // Close any remaining open lists
  closeLists(0);

  return html.join('\n');
}
