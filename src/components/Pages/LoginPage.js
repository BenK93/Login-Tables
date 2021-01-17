
import React from 'react';
// import Context from '../../store/context';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/authAction';
import { Form, Input, Button } from 'antd';
import { LockTwoTone, UserOutlined, LoadingOutlined, LoginOutlined} from '@ant-design/icons';
// import { isElementOfType } from 'react-dom/test-utils';

    const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
    };
    const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
    };
    
    
    class LoginPage extends React.Component {
        
        // [form] = Form.useForm();
        state  = {
            validEmail: false,
            validPassword: false
        }
        // using RE for validation
        strongPass = (password) =>{    
            let hasUpperCase = password.match(/[A-Z]+/) ? true : false;
            let hasNum = password.match(/[0-9]+/) ? true : false;
            return hasUpperCase && hasNum;
        }
        // validating password
        validatePassword = (values,pass) => {
            if(pass.length < 8 || !this.strongPass(pass)){
                return Promise.reject("Required: at least 8 characters, UpperCase and a Number");
            }else {
                this.setState({validPassword: true});
                return Promise.resolve();
            }
        }

        validateEmail = (values,email) => {
            let isAnEmail = email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? true : false;
            if(!isAnEmail){
                return Promise.reject();
            }else{
                this.setState({validEmail: true});
                return Promise.resolve();
            }
        }
        
        redirect = (path)=>{
            this.props.history.push(path)
        }

        // handling login making sure password and email are correct
        handleLogin = async (values) => {
            this.props.login(values.username, values.password);
            if(!this.props.error){
                setTimeout(this.redirect('/info'), 2000);
            }
        };

        componentWillMount (){
            let nameExists = window.sessionStorage.getItem('name');
            if(nameExists && this.props.isLoggedIn){
                this.props.isAuth()
                this.redirect('/info')
            }
        }

        render(){
            let showBtn = !(this.state.validEmail && this.state.validPassword)
            return (            
                <div className="login-form">
                        <h1 className="login-header" style={{fontWeight: "800"}}>
                            Login Page                                   
                        </h1>
                        { 
                        this.props.loading
                        ?  
                        <LoadingOutlined style={{ fontSize: '60px', color: '#08c' }}></LoadingOutlined>                                                
                            : 
                        <Form
                            {...layout}
                            name="login"  
                            onFinish={this.handleLogin }
                            >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                            {
                                type:"email",
                                required: true,
                                message: 'Please Enter a Valid Email!',
                            },{
                                validator: this.validateEmail,
                            }] }
                            hasFeedback>
                            <Input prefix={<UserOutlined type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter Email"/>
                        </Form.Item>


                        <Form.Item 
                        name="Password"
                        label="Password"                
                        rules={[{
                            required: true
                            },{
                            validator: this.validatePassword,
                            }]} hasFeedback>
                            <Input.Password prefix={<LockTwoTone type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter Password"/>
                        </Form.Item>

                        <Form.Item {...tailLayout} shouldUpdate={true}>
                            {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<LoginOutlined />}
                                disabled={showBtn}
                                >
                                LOGIN
                            </Button>
                            )}
                        </Form.Item>
                        </Form>
                        }
                </div>
        )
        };
    
}
    
const mapStateToProps = (state) => {
    return{
        loading: state.loading,
        error: state.error,
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        login: (username, password) => dispatch(actions.login(username, password)),
        isAuth: () => dispatch(actions.isAuth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
