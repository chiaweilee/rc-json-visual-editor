import React from 'react';
import reduce from 'lodash/reduce';
import keysIn from 'lodash/keysIn';
import { Input, InputNumber, Switch, Tag, Tree } from 'antd';
import { TreeProps } from 'antd/lib/tree/Tree.d';
import util from './util';
import './styles.less';
import 'antd/lib/icon/style/css.js';
import 'antd/lib/input/style/css.js';
import 'antd/lib/input-number/style/css.js';
import 'antd/lib/switch/style/css.js';
import 'antd/lib/tree/style/css.js';
import 'antd/lib/tag/style/css.js';

const { TreeNode } = Tree;
const { TextArea } = Input;
const keygen = '.';

interface IProps extends TreeProps {
  data: any;
  onChange: (data: any) => void;
}

const defaultProps = {
  showLine: true,
  showIcon: false,
  defaultExpandAll: true,
};

export default class extends React.PureComponent<IProps> {
  render() {
    const { data, onChange: _, className, ...restProps } = this.props;
    const treeProps = Object.assign(defaultProps, {
      className: ['json-tree', ...[className]].join(' '),
      ...restProps,
    });

    return (
      <Tree key={keysIn(data).join(',')} {...treeProps}>
        {this.mapper(data)}
      </Tree>
    );
  }

  callback = (d: any) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(d);
    }
  };

  setter = (keys: string[]) => value => {
    const { data } = this.props;
    const end = keys.length;
    reduce(
      keys,
      (d, key, index) => {
        if (index + 1 === end) {
          d[key] = value;
          this.callback(data);
        }
        return d[key];
      },
      data,
    );
  };

  eventSetter = (keys: string[]) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    this.setter(keys)(e.target.value);
  };

  type = (
    value: any,
    keys?: string[],
  ): { title?: any; children?: any } | Array<{ title?: any; children?: any }> | null => {
    if (value === null) {
      // null
      return { title: <Tag>null</Tag> };
    } else if (typeof value === 'string') {
      if (value.length > 255) {
        // long string
        return {
          title: (
            <TextArea defaultValue={value} placeholder={value} onChange={this.eventSetter(keys)} />
          ),
        };
      } else {
        // string
        return {
          title: (
            <Input defaultValue={value} placeholder={value} onChange={this.eventSetter(keys)} />
          ),
        };
      }
    } else if (typeof value === 'number') {
      // number
      return {
        title: <InputNumber defaultValue={value} onChange={this.setter(keys)} />,
      };
    } else if (typeof value === 'boolean') {
      // boolean
      return {
        title: (
          <Switch
            checked={value}
            checkedChildren="true"
            unCheckedChildren="false"
            onChange={this.setter(keys)}
          />
        ),
      };
    } else if (typeof value === 'object') {
      // array or plain-object
      return { children: this.mapper(value, keys) };
    }
    return null;
  };

  mapper = (d: any, parentKey = [] as string[]) =>
    util.keys(d).map(currentKey => {
      const keys = parentKey.concat(currentKey);
      return <TreeNode key={keys.join(keygen)} {...this.nodeRender(keys)} />;
    });

  nodeRender = (keys: string[]) => {
    const { data } = this.props;
    const value = util.deep(data, keys);
    const types = util.assert(value, this.type(value, keys));
    if (types === null) {
      return null;
    }
    return {
      title: (
        <div className={'json-tree-item'}>
          <div className={'json-tree-item-label'}>{util.last(keys)}</div>
          <div className={'json-tree-item-content'}>{types.title}</div>
        </div>
      ),
      children: types.children,
    };
  };
}
