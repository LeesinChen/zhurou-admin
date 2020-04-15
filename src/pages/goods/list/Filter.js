import {Input, Select, Form, DatePicker, Button, Row, Col, Icon} from 'antd';
import moment from 'moment';

const {Search} = Input

const View = (
  {
    onFilterChange,
    filter,
    onAdd,
    auth,
    form: {
      getFieldDecorator,
      getFieldsValue,
      setFieldsValue
    }
  }
) => {

  const handlePressEnter = () => {
    setTimeout(handleSubmit, 0)
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    for(let k in fields){
      if(!fields[k]){
        delete fields[k]
      }
      if (fields.times) {
        fields.startDate = moment(fields.times[0]).format('YYYY-MM-DD')
        fields.endDate = moment(fields.times[1]).format('YYYY-MM-DD')
        delete fields.times
      }
    }
    onFilterChange({
      ...fields,
    })
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    fields.times = undefined
    setFieldsValue(fields)
    handleSubmit()
  }

  return (
    <div className="filter" style={{marginBottom: 20}}>
      <Row gutter={24}>
        <Col span={5}>
          {getFieldDecorator('name', {
            initialValue: filter.name
          })(
            <Search
              style={{width: '100%'}}
              placeholder="请输入商品名称"
              onPressEnter={handlePressEnter}
            />
          )}
        </Col>
        <Col span={10}>
          <Button
            type="primary"
            style={{marginRight: 20}}
            onClick={handleSubmit}
          >
            <Icon type="search" />查询
          </Button>
          <Button onClick={handleReset}>清空</Button>
        </Col>
      </Row>
      <Row gutter={24} style={{marginTop: 20}}>
        <Col span={24}>
          <Button
            size="large"
            type="primary"
            onClick={onAdd}
          >
            <Icon type="plus" />添加商品
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Form.create()(View)
