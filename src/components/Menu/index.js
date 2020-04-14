import React from 'react';
import styles from './index.less';
import { Menu, Icon } from 'antd';
import Link from 'umi/link';
const { SubMenu } = Menu;

class View extends React.Component {

  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props
    const selected = this.getSelectedMenuKeys(pathname)
    this.state = {
      openKeys: selected,
      selectedKeys: selected
    }
  }

  onOpenChange = openKeys => {
    this.setState({
      openKeys: openKeys
    });
  };

  onSelect = ({ selectedKeys }) => {
    this.setState({
      selectedKeys
    })
  }

  getNavMenuItems = menuData => menuData.map(item => this.getSubMenuOrItem(item)).filter(item => item)

  getSubMenuOrItem = item => {
    if (item.routes && item.routes.length > 0) {
      return (
        <SubMenu
          key={`${item.id}`}
          title={
            item.icon ? (
              <span>
                <Icon type={item.icon}/>
                <span>{item.name}</span>
              </span>
            ) : item.name
          }
        >
          {this.getNavMenuItems(item.routes)}
        </SubMenu>
      )
    }
    if (item.name) {
      return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
    }
  }

  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  getMenuItemPath = item => {
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {item.icon && <Icon type={item.icon}/>}
          <span>{name}</span>
        </a>
      );
    }
    const { location } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
      >
        {item.icon && <Icon type={item.icon}/>}
        <span>{name}</span>
      </Link>
    );
  };

  flatMenuKeys = data => data.reduce((acc, cur) => {
    acc.push(cur.path)
    if (cur.routes) {
      acc = acc.concat(this.flatMenuKeys(cur.routes))
    }
    return acc
  }, [])

  getSelectedMenuKeys = pathname => {
    const { menuData } = this.props;
    const flatMenuKeys = this.flatMenuKeys(menuData)
    return flatMenuKeys.filter(item => pathname.indexOf(item) > -1);
  };

  componentDidUpdate(prevProps, prevState, snapshot){
    const { location: { pathname }, } = this.props
    if ( prevProps.location.pathname !== pathname ) {
      const selected = this.getSelectedMenuKeys(pathname)
      this.setState({
        selectedKeys: selected
      })
    }
  }

  render() {
    const {
      menuData=[],
      extra,
    } = this.props
    const { selectedKeys } = this.state

    const openKeys = menuData.map(d => `${d.id}`).filter(d => d)

    return (
      <div style={{height: '100%'}}>
        <Menu
          theme="dark"
          mode="inline"
          // 默认展开全部的菜单
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={this.onOpenChange}
          style={{borderRight: 0, height: '100%'}}
          inlineCollapsed={false}
          onSelect={this.onSelect}
        >
          <div className={styles.logo}>商城管理系统</div>
          {this.getNavMenuItems(menuData)}
        </Menu>
      </div>
    );
  }
}

export default View;
