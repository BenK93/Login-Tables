import React, {useContext} from 'react';
import Context from '../../store/context';
import { Form, Input, Button } from 'antd';
import { LockTwoTone, UserOutlined, LoadingOutlined } from '@ant-design/icons';

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
    
    
    const LoginPage = (props) => {
        const {globalState, globalDispatch} = useContext(Context);

        // using RE for validation
        const strongPass = (password) =>{    
            let hasUpperCase = password.match(/[A-Z]+/) ? true : false;
            let hasNum = password.match(/[0-9]+/) ? true : false;
            return hasUpperCase && hasNum;
        }
        // validating password
        const validatePassword = (values,pass) => {
            if(pass.length < 8 || !strongPass(pass)){
                return Promise.reject("Required: at least 8 characters, UpperCase and a Number");
            }else {
                return Promise.resolve();
            }
        }
        const redirect = (path)=>{
            props.history.push(path)
        }
        // handling login making sure password and email are correct
        const handleLogin = async (values) => {
            // this.setState({LoggedIn: true})
            globalDispatch({type: "LOGIN"})
            const result = await fetch("https://private-052d6-testapi4528.apiary-mock.com/authenticate", {
                method: 'post',
                body: JSON.stringify({ username: values.username, password: values.Password }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const body = await result.json();
            window.sessionStorage.setItem('token',body[0].token );
            window.sessionStorage.setItem('name',body[0].personalDetails.name );
            window.sessionStorage.setItem('team',body[0].personalDetails.Team );
            window.sessionStorage.setItem('joinedAt',body[0].personalDetails.joinedAt );
            window.sessionStorage.setItem('avatar',body[0].personalDetails.avatar );
            setTimeout(redirect('/info'), 2000);
        };

       
            return (            
                <div className="login-form">
                        <h1 className="login-header" style={{fontWeight: "800"}}>
                            Login Page                                   
                        </h1>
                        { 
                        globalState.isLoggedIn
                        ?  
                        <LoadingOutlined style={{ fontSize: '60px', color: '#08c' }}></LoadingOutlined>                           
                         : 
                        <Form
                            {...layout}
                            name="login"  
                            onFinish={handleLogin }
                            >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                            {
                                type:"email",
                                required: true,
                                message: 'Please Enter a Valid Email!',
                            },
                            ] }
                            hasFeedback>
                            <Input prefix={<UserOutlined type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter Email"/>
                        </Form.Item>


                        <Form.Item 
                        name="Password"
                        label="Password"                
                        rules={[{
                            required: true, message: 'Please input your Password!',
                            },{
                            validator: validatePassword,
                            }]} hasFeedback>
                            <Input.Password prefix={<LockTwoTone type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter Password"/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                            Login
                            </Button>
                        </Form.Item>
                        </Form>
                        }
                </div>
        )
    
}







export default LoginPage;