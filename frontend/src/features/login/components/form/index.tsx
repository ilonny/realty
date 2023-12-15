import {useCallback, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {useLogin} from "../../hooks/useLogin";
import {FormWrapper, SubmitBtn, FormIcon, FormInputsBlock, Input, Error} from "./styles";

export const LoginForm = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const [data, loading, request, errors] = useLogin();

    const navigate = useNavigate();

    const onSubmit = useCallback(
        async (): Promise<void> => {
            await request({login, password});
            navigate("/");
        }, [login, password]);

    if (data?.access_token) {
        return <Navigate replace to="/"/>;
    }

    return <FormWrapper>
        <FormIcon>
            <LockOpenIcon/>
        </FormIcon>
        <FormInputsBlock>
            <Input label="Имя пользователя" variant="standard" value={login}
                   onChange={(e) => setLogin(e.target.value)}/>
            <Input label="Пароль" variant="standard" type='password' value={password}
                   onChange={(e) => setPassword(e.target.value)}/>
            {errors && <Error>{errors}</Error>}
            <SubmitBtn
                variant={'contained'}
                onClick={onSubmit}
                disabled={!login || !password}
            >
                {loading ? <CircularProgress size={'24px'}/> : 'Войти'}
            </SubmitBtn>
        </FormInputsBlock>
    </FormWrapper>
}
