import ajax from "../../../common/ajax";
import Result from "../../../common/Result";

class SessionRemote {

    public login(email: string, password: string, tokenLogin: number): Promise<Result<string>> {
        return fetch('/api/session', {...ajax.post, ...ajax.json, body: JSON.stringify({email, password, tokenLogin})})
            .then((e) => e.json()).then(e => Result.assign(e));
    }

    public tokenLogin(): Promise<Result<string>> {
        return new Promise((resolve, reject) => {
            const absoluteToken = localStorage.getItem('login-token');
            if (absoluteToken) {
                fetch('/api/session/token', {...ajax.post, ...ajax.json, body: JSON.stringify({absoluteToken})})
                    .then((e) => e.json()).then(e => Result.assign<string>(e)).then(resolve);
            }
        });
    }

}

export default new SessionRemote();