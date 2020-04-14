import React, {useState} from 'react'
import styles from './index.less';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import api from '@/utils/api';

import Loading from '@/components/Loading';
import Menu from '@/components/Menu'

const {title} = api

const Index = props => {

  const {
    location,
    loading,
    dispatch,
    globalModel,
    route: { routes }
  } = props

  const menuProps = {
    menuData: routes,
    inlineCollapsed: false,
    location,
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className={styles.container}>
        <Loading visible={loading.global} />
        <div className={styles["menu-layout"]}>
          <Menu {...menuProps} />
        </div>
        <div className={styles["content-layout"]}>{props.children}</div>
      </div>
    </>
   
  );
}

export default connect(({globalModel, loading}) => ({globalModel, loading}))(Index);
