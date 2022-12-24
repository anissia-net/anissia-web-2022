import ajax from "../../../common/ajax";
import Result from "../../../common/Result";
import {Account} from "../Account";


class AccountRemote {

    public sendRecoverAuthMail(email: string, name: string): Promise<Result<any>> {
        return fetch('/api/account/recover', {
            ...ajax.post, ...ajax.json, body: JSON.stringify({email, name}),
        }).then((e) => e.json()).then((data) => Result.assign(data));
    }

    public validationRecoverAuthMail(absoluteToken: string): Promise<Result<any>> {
        return fetch('/api/account/recover', {
            ...ajax.put, ...ajax.json, body: JSON.stringify({absoluteToken}),
        }).then((e) => e.json()).then((data) => Result.assign(data));
    }

    public recoverPassword(absoluteToken: string, password: string, passwordConfirm: string): Promise<Result<any>> {
        if (password !== passwordConfirm) {
            return new Promise<Result<any>>((r) => r(new Result('FAIL', '암호가 서로 일치하지 않습니다.')));
        }
        return fetch('/api/account/recover/password', {
            ...ajax.put, ...ajax.json, body: JSON.stringify({absoluteToken, password}),
        }).then((e) => e.json()).then((data) => Result.assign(data));
    }

    public recoverEmail(name: string): Promise<Result<any>> {
        if (name == '') {
            return new Promise<Result<any>>((r) => r(new Result('FAIL', '닉네임을 입력해주세요.')));
        }
        return fetch(`/api/account/recover/email/${name}`)
            .then((e) => e.json()).then((data) => Result.assign(data));
    }

    public sendRegisterAuthMail(email: string, password: string, passwordConfirm: string, name: string): Promise<Result<any>> {
        if (password !== passwordConfirm) {
            return new Promise<Result<any>>((r) => r(new Result('FAIL', '암호가 서로 일치하지 않습니다.')));
        }
        return fetch('/api/account/register', {
            ...ajax.post, ...ajax.json, body: JSON.stringify({email, password, name}),
        }).then((e) => e.json()).then((data) => Result.assign(data));
    }

    public validationRegister(absoluteToken: string): Promise<Result<any>> {
        return fetch('/api/account/register', {
            ...ajax.put, ...ajax.json, body: JSON.stringify({absoluteToken}),
        }).then((e) => e.json()).then((data) => Result.assign(data));
    }

    public getAccount(): Promise<Account> {
        return fetch('/api/account/user').then(e => e.json()).then(e => Object.assign(new Account(), e));
    }

    public updateUserPassword(oldPassword: string, newPassword: string, newPasswordConfirm: string): Promise<Result<any>> {
        if (newPassword !== newPasswordConfirm) {
            return new Promise<Result<any>>((r) => r(new Result('FAIL', '새 암호가 서로 일치하지 않습니다.')));
        }
        return fetch('/api/account/user/password', {
            ...ajax.put, ...ajax.json, body: JSON.stringify({oldPassword, newPassword}),
        }).then((e) => e.json()).then((data) => Result.assign(data));
    }

    public updateUserName(name: string, password: string): Promise<Result<any>> {
        return fetch('/api/account/user/name', {
            ...ajax.put, ...ajax.json, body: JSON.stringify({name, password}),
        }).then((e) => e.json()).then((data) => Result.assign(data));
    }
}

export default new AccountRemote()