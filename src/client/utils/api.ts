import * as fetch from 'isomorphic-fetch';

export let Token: string = localStorage.getItem('token') || null;
export let User: any = {
    user: localStorage.getItem('userid') || null,
    role: localStorage.getItem('role') || null
};

export const json = async <T = any>(uri: string, method: string, body?: {}) => {

    let headers: any = {
        'Content-type': 'application/json'
    };

    if(Token) {
        headers['Authorization'] = `Bearer ${Token}`;
    }

    try {
        let result = await fetch(uri, {
            method,
            headers,
            body: JSON.stringify(body)
        });
        if (result.ok) {
            return <T>(await result.json());
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }

};



export const SetToken = (token: string, user: {} = { userid: undefined, role: 'guest'}) => {
    Token = token;
    User = user;
    
    localStorage.setItem('token', token);
    localStorage.setItem('userid', User.userid);
    localStorage.setItem('role', User.role);
};