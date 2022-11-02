import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  content: string;
}

const codeHighLighter = {
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
      <ReactMarkdown components={codeHighLighter}>{content}</ReactMarkdown>
    </article>
  );
}

export default ContentHtml;
