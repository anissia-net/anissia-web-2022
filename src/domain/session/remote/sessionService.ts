import { sessionStore } from "../sessionStore";
import Session from "../Session";
import sessionRemote from "./sessionRemote";
import ajax from "../../../common/ajax";
import {Router} from "vue-router";
import {Locate} from "../../../common/Locate";

class SessionService {

    public login(email: string, password: string, tokenLogin: number, loginSuccess: () => void): void {

        if (tokenLogin === 1 && !confirm('정말로 자동로그인을 사용하시겠습니까?\n- 로그인정보가 현 기기에 저장됩니다.\n- 공공장소에서는 절대 사용하지 마십시오.')) {
            return;
        }

        sessionRemote.login(email, password, tokenLogin, (success, message, data) => {
            if (success) {
                sessionStore().setUser(Session.assign(data));
                message !== '' && localStorage.setItem('login-token', message);
                loginSuccess();
            } else {
                alert(message || '로그인에 실패하였습니다.');
            }
        });
    }

    public tokenLogin(loginSuccess: () => void) {
        sessionRemote.tokenLogin((success, message, data) => {
            if (success) {
                sessionStore().setUser(Session.assign(data));
                message !== '' && localStorage.setItem('login-token', message);
                loginSuccess();
            } else {
                localStorage.removeItem('login-token');
            }
        });
    }

    /**
     * sync user session info
     * @param result
     */
    public sync(result?: (isLogin: boolean) => void) {
        fetch(`/api/session`, {...ajax.get, ...ajax.json})
            .then((e) => e.json()).then((data) => {
                const user = Session.assign(data);
                sessionStore().setUser(user);
            result && result(user.isLogin);
        });
    }

    /**
     * logout
     * @param success
     */
    public logout(success?: () => void) {
        fetch(`/api/session`, {...ajax.delete, ...ajax.json})
            .then((e) => e.json()).then((data) => {
            if (data.st === 'OK') {
                sessionStore().setUser(Session.assign(null));
                localStorage.removeItem('login-token');
                success && success();
            } else {
                throw Error();
            }
        }).catch((e) => alert('로그아웃에 실패하였습니다.\n다시 시도해주세요.'));
    }


    public amendPathBySession(path: string, router: Router, next: Function = () => {}) {
        const user = sessionStore().user;
        const isLogin = user.isLogin;
        const isAdmin = user.isAdmin;

        if (isLogin) {
            if (path.startsWith('/login') || path.startsWith('/register') || path.startsWith('/recover')) {
                const path = new Locate().getParameter('path', '');
                router.push(path && path.startsWith('/') ? path : '/');
            } else if ((path.startsWith('/admin')) && !isAdmin) {
                router.push(`/`);
            } else {
                next();
            }
        } else {
            if (path.startsWith('/account') || path.startsWith('/admin')) {
                router.push(`/login?path=${encodeURIComponent(path)}`);
            } else {
                next();
            }
        }
    }

}

export default new SessionService();