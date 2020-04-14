import { Icon, Button, Badge, Popconfirm, message, Table } from 'antd'
import {connect} from 'dva';
import router from 'umi/router';
import Filter from './Filter';

const View = (
{
  goodsListModel,
  globalModel,
  dispatch,
  location
}) => {
  const {list, pagination} = goodsListModel

  let columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '库存数量',
      dataIndex: 'count',
    },
    {
      title: '单价',
      dataIndex: 'price',
    },
    {
      title: '单位',
      dataIndex: 'size'
    },
    {
      title: '操作',
      dataIndex: '_id',
      width: 220,
      render(id, d) {
        return (
          <div>
            <Button
              size="small"
              type="primary"
              style={{marginRight: 10}}
              onClick={() => {
                router.push({
                  pathname: '/goods/edit',
                  query: {
                    id
                  }
                })
              }}
            >编辑</Button>
            <Button
              size="small"
              style={{marginRight: 10}}
            >下架</Button>
            <Popconfirm
              title="删除无法找回，确认删除?"
              onConfirm={() => {
                dispatch({
                  type: 'goodsListModel/delete',
                  payload: {
                    id
                  }
                })
              }}
              okText="确认"
              cancelText="取消"
            >
              <Button
                size="small"
                type="danger"
              >删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ];

  const filterProps = {
    filter: location.query,
    onFilterChange(filter) {
      router.replace({
        pathname: location.pathname,
        query: {
          page: 1,
          pageSize: 10,
          ...filter,
        }
      })
    },
    onAdd() {
      router.push('/goods/add')
    }
  }

  const page = {
    ...pagination,
    showTotal(total) {
      return `共${total}条`
    },
    onChange(page, pageSize) {
      router.replace({
        pathname: location.pathname,
        query: {
          ...location.query,
          page,
          pageSize
        }
      })
    }
  }

  const onEdit = (appId) => {
    router.push({
      pathname: '/tool/app/edit',
      query: {
        appId
      }
    })
  }

  return (
    <div className="global-container">
      <Filter {...filterProps} />
      <Table
        style={{background: '#fff'}}
        rowKey={d => d.id}
        columns={columns}
        dataSource={list}
        pagination={page}
      />
    </div>
  )
}

export default connect(({ goodsListModel, globalModel, loading }) => ({ goodsListModel, globalModel, loading }))(View);
