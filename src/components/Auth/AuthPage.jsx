import React, {useCallback, useState} from "react"
import { Input ,Button, DatePicker, Flex } from 'antd';
import {KeyOutlined, CommentOutlined} from '@ant-design/icons';
import './AuthPage.css'
import {useAuth} from "../../hooks/useAuth.jsx";
import bcrypt from 'bcryptjs'

export default function AuthPage() {

    const [forgetPass, setForgetPass] = useState(false)
    const resetForget = useCallback(() => {
        setForgetPass(false)
    }, [setForgetPass])

    const clickForget = () => {
        setForgetPass(true)
    }

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const handleLogin = async (e) => {
        e.preventDefault();
        // const hashedPass = bcrypt.hash(password)
        // console.log(hashedPass)

        const hashPass = '$2a$10$0xItN8rv2yCqDfdbofAo5O0wFz78VeKNiFe9k.K3w9t.7Xap.nxoC'
        if (username === "user" && (bcrypt.compareSync(password, hashPass))===true) {
            // Replace with actual authentication logic
            await login({ username })
        } else {
            alert("Неправильный логин или пароль");
        }
    };


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') { //Press Enter
            handleLogin;
        }
    }

    return (
        <>
            <div className="pageAuth" >
                <div className="logoAuth"> <img src="./logoApp.png" alt="logo"/> </div>
                {forgetPass===false ?
                    <>
                <div className="text"> Вход в учетную запись</div>
                <form onSubmit={handleLogin} >
                    <div className='input-container'>
                        <div className='margin'>
                            <Input size="large" type="text" placeholder="  Логин" prefix={<CommentOutlined />} value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <Input size="large" type="password" placeholder=" Пароль" prefix={<KeyOutlined />} value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className='margin'>
                    <div className='forget_password' onClick={clickForget}> Забыли свой пароль?</div>
                    </div>
                    <Flex>
                        <button color="primary" variant="solid" className='enter-button' onClick={handleLogin} onKeyPress={handleKeyPress} tabIndex="0">
                            Войти
                        </button>
                    </Flex>
                </form>
                </> : <>
                        <div className="text"> Забыли пароль</div>

                            <div className='margin'>
                            <div className='instruction'>
                                Для восстановления доступа к ресурсу рекомендуется обратиться к системному администратору организации
                            </div>

                            </div>
                        <div className='margin'>
                            Вспомнили?
                            <div className="forget_password" onClick={resetForget}>  Войти </div>

                        </div>

                    </>

                }
            </div>
        </>
    )
}