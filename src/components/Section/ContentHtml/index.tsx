import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  content: string;
}

const customCompoents = {
  p(paragraph: any) {
    const { node } = paragraph;
    if (node.children[0].tagName === "img") {
      const image = node.children[0];
      return (
        <div>
          <img src={image.properties.src} alt={image.alt} />
        </div>
      );
    }
    return <p>{paragraph.children}</p>;
  },
  a(anchor: any) {
    return (
      <a href={anchor.href} target='_blank' rel='noopener noreferrer'>
        {anchor.children}
      </a>
    );
  },
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
