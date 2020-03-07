import { ComponentClass } from 'react';
import { TreeProps } from 'antd/lib/tree/Tree.d';

interface IProps extends TreeProps{
  data: any;
  onChange: (data: any) => void;
}

declare module 'rc-visual-json-editor' {
  const rcVisualJSONEditor: ComponentClass<IProps>;
  export default rcVisualJSONEditor;
}
