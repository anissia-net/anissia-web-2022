import ajax from "../../../common/ajax";
import Result from "../../../common/Result";

class SessionRemote {

    public login(email: string, password: string, tokenLogin: number): Promise<Result<string>> {
        return fetch('/api/session', {...ajax.post, ...ajax.json, body: JSON.stringify({email, password, tokenLogin})})
            .then((e) => e.json());
    }

    public tokenLogin(): Promise<Result<string>> {
        const absoluteToken = localStorage.getItem('login-token');
        if (absoluteToken) {
            return fetch('/api/session/token', {...ajax.post, ...ajax.json, body: JSON.stringify({absoluteToken})})
                .then((e) => e.json());
        }
        return new Promise<Result<string>>(() => {});
    }

}

export default new SessionRemote();