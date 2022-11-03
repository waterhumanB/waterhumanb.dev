import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  content: string;
}

const customCompoents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p(paragraph: any) {
    const { node } = paragraph;

    if (node.children[0].tagName === "img") {
      const image = node.children[0];

      return (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.properties.src} alt={image.alt} />
        </div>
      );
    }

    return <p>{paragraph.children}</p>;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a(anchor: any) {
    return (
      <a href={anchor.href} target='_blank' rel='noopener noreferrer'>
        {anchor.children}
      </a>
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code(code: any) {
    const { className, children, ...props } = code;
    const language = /language-(\w+)/.exec(className || ""); // language-tsx => tsx

    return language ? (
      <SyntaxHighlighter style={coy} language={language[1]} {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code>{children}</code>
    );
  },
};

function ContentHtml({ content }: Props) {
  return (
    <article>
      <ReactMarkdown components={customCompoents}>{content}</ReactMarkdown>
    </article>
  );
}

export default ContentHtml;
