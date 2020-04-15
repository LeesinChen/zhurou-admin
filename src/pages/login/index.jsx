import {connect} from 'dva';
import {Input, Form, Button, Icon} from 'antd';
import md5 from 'md5';
import styles from './index.less'

const View = (
  {
    loginModel,
    dispatch,
    location,
    form: {
      getFieldDecorator,
      validateFieldsAndScroll,
      getFieldsValue
    }
  }) => {

  const onLogin = () => {
    validateFieldsAndScroll(error => {
      if (error) {
        return false;
      }
      let params = getFieldsValue()

      // 去掉左右首位空格
      params.email = params.email.replace(/^\s+|\s+$/g,"")
      params.password = params.password.replace(/^\s+|\s+$/g,"")

      dispatch({
        type: 'loginModel/login',
        payload: {
          email: params.email,
          password: md5(params.password)
        }
      })
    })
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.modal}>
        <div className={styles['right-wrapper']}>
          <div className={styles.title}>商城后台系统</div>
          <Form.Item>
            {getFieldDecorator('email', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入邮箱',
                }
              ]
            })(
              <Input
                size="large"
                style={{marginTop: 28}}
                addonBefore={<Icon type="mail" />}
                placeholder="邮箱"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('password', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                }
              ]
            })(
              <Input
                size="large"
                type="password"
                placeholder="密码"
                addonBefore={<Icon type="lock" />}
                onPressEnter={onLogin}
              />
            )}
          </Form.Item>

          <Button
            type="primary"
            size="large"
            onClick={onLogin}
            style={{
              width: '100%',
              borderRadius: 50
            }}
          >登录</Button>
        </div>
      </div>
    </div>
  )
}

export default connect(({ loginModel, loading }) => ({ loginModel, loading }))(Form.create()(View));
