import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { BaseViewerItemProps } from './ViewerItem';

export default function QueryViewerItem({ viewer }: BaseViewerItemProps) {
  return (
    <SyntaxHighlighter
      customStyle={{
        margin: 0,
      }}
      wrapLines
      wrapLongLines
      language="sql"
      style={dark}
    >
      {viewer.message}
    </SyntaxHighlighter>
  );
}
