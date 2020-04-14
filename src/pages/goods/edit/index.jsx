import React from 'react';
import {connect} from 'dva';
import {Form, Select, Input, InputNumber, Modal, Button} from 'antd';
import router from 'umi/router';
import Panel from '@/components/Block';

const { confirm } = Modal;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 17 },
};

class View extends React.Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit = () => {
    const {
      form,
      dispatch,
      goodsEditModel
    } = this.props

    const {
      isEdit,
      item
    } = goodsEditModel

    const {
      validateFields,
      getFieldsValue,
      validateFieldsAndScroll
    } = form

    validateFields(errors => {
      if (errors) {
        return validateFieldsAndScroll()
      }
      let fields = getFieldsValue();

      fields.images = fields.images.split(',')

      dispatch({
        type: 'goodsEditModel/save',
        payload: fields,
      })
    });
  }

  handleCancel = () => {
    const {onCancel} = this.props
    if (onCancel) {
      onCancel()
    } else {
      confirm({
        title: '确认返回？',
        content: '当前处于编辑状态，返回无法保存当前已编辑内容',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          router.go(-1)
        },
        onCancel() {
        },
      });
    }
  }

  render() {
    const {
      goodsEditModel,
      form: {
        getFieldDecorator,
        getFieldValue,
        setFields
      },
      hideTitle,
    } = this.props

    const {item={}, isEdit} = goodsEditModel;

    const size = getFieldValue('size') || '斤';
    const price = getFieldValue('price') || 1;

    let priceDesc = `${price}元/${size}`;

    return (
      <div className="global-container">
        <Panel hideTitle={hideTitle} title={isEdit ? '编辑商品' : '新建商品'}>
          <Form {...formItemLayout} colon={false}>
            <Form.Item label="商品名称">
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                    message: '请输入商品名称',
                  }
                ]
              })(
                <Input style={{width: 300}} placeholder="请输入商品名称" />
              )}
            </Form.Item>

            <Form.Item label="商品数量">
              {getFieldDecorator('count', {
                initialValue: item.count || 1,
                rules: [
                  {
                    required: true,
                    message: '请填写商品数量',
                  }
                ]
              })(
                <InputNumber min={1} max={9999} style={{width: 300}}/>
              )}
            </Form.Item>

            <Form.Item label="单位/规格" extra="填写 斤、千克、条、块、只等等">
              {getFieldDecorator('size', {
                initialValue: item.size || '斤',
                rules: [
                  {
                    required: true,
                    message: '请填写单位/规格',
                  }
                ]
              })(
                <Input style={{width: 80}} />
              )}
            </Form.Item>

            <Form.Item label="价格">
              {getFieldDecorator('price', {
                initialValue: item.price || 1,
                rules: [
                  {
                    required: true,
                    message: '请填写价格',
                  }
                ]
              })(
                <Input style={{width: 150}} addonAfter={priceDesc} />
              )}
            </Form.Item>


            <Form.Item label="商品图">
              {getFieldDecorator('images', {
                initialValue: item.images,
                rules: [
                  {
                    required: true,
                    message: '请上传商品图',
                  }
                ]
              })(
                <Input style={{width: 300}}/>
              )}
            </Form.Item>


            <Form.Item wrapperCol={{offset: 4}}>
              <Button
                type="primary"
                style={{marginRight: 20}}
                onClick={this.handleSubmit}
              >保存</Button>
              <Button
                onClick={this.handleCancel}
              >返回</Button>
            </Form.Item>
          </Form>
        </Panel>
      </div>
    )
  }

}

export default connect(({ goodsEditModel, loading }) => ({ goodsEditModel, loading }))(
  Form.create()(View)
)

