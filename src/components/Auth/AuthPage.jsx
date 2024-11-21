import React from "react"
import { Input ,Button, DatePicker, Flex } from 'antd';
import {KeyOutlined, CommentOutlined} from '@ant-design/icons';
import './AuthPage.css'
export default function AuthPage() {
    return (
        <>
            <div className="pageAuth">
            <div className="logoAuth"> <img src="./logoApp.png" alt="logo"/> </div>
            <div className="text"> Вход в учетную запись</div>
            {/*<form><input type="text"/></form>*/}
            {/*<form><input type="text"/></form>*/}
            <div className='input-container'>
            <div className='margin'>
                <Input size="large" placeholder=" Электронная почта" prefix={<CommentOutlined />} />
            </div>
                <Input size="large" placeholder=" Пароль" prefix={<KeyOutlined />} />
            </div>
            <div className='forget_password'> Забыли свой пароль?</div>
            <Flex>
            <Button color="primary" variant="solid" className='enter-button'>
                Войти
            </Button>
            </Flex>
            </div>
        </>

    )
}