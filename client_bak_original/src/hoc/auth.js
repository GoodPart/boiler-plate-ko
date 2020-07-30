import React, { useEffect } from 'react';

import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null) {

    //** SpecificComponent
    //app.js에서 라우트에 컴포넌트를 auth(...)형태로 감싸준다. 이 부분이 SpecificComponent 파라미터 부분임.

    //** option
    //1. null - 아무나 출입 가능
    //2. true - 로그인한
    //3. false - 로그인한 유저는 출입 불가

    //** adminRoute
    //마지막 파라미터로 관리자만 들어갈 수 있는곳
    //여기서는 별도에 작성이 없다면 null로 안씀

    function AuthenticationCheck(props) {

        const dispatch = useDispatch()

        useEffect(()=> {

            dispatch(auth()).then(response => {
                //분기 처리를 하는곳
                
                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/login')
                    }
                }else {
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }else {
                        if(option === false) 
                        props.history.push('/')
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}