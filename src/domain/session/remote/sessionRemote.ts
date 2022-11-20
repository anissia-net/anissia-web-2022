import ajax from "../../../common/ajax";

class SessionRemote {

    public login(email: string, password: string, tokenLogin: number, callback: (success: boolean, message: string, data: any) => void): void {
        fetch('/api/session', {...ajax.post, ...ajax.json, body: JSON.stringify({email, password, tokenLogin})})
            .then((e) => e.json()).then((res) => callback(res.st == 'OK', res.msg, res.data));
    }

    public tokenLogin(callback: (success: boolean, message: string, data: any) => void) {
        const absoluteToken = localStorage.getItem('login-token');
        if (absoluteToken) {
            fetch('/api/session/token', {...ajax.post, ...ajax.json, body: JSON.stringify({absoluteToken})})
                .then((e) => e.json()).then((res) => callback(res.st === 'OK', res.msg, res.data));
        }
    }

}

export default new SessionRemote();