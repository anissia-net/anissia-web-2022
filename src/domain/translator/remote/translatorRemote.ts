import Result from "../../../common/Result";
import ajax from "../../../common/ajax";
import PageData from "../../../common/PageData";
import {TranslatorApply} from "../TranslatorApply";
import {TranslatorApplyPoll} from "../TranslatorApplyPoll";

class TranslatorRemote {
    public getApplyList(page: number, callback: (data: PageData<TranslatorApply>) => void): void {
        fetch(`/api/translator/apply/list/${page}`).then(e => e.json()).then(data => callback(PageData.cast(data, e => Object.assign(new TranslatorApply(), e))));
    }

    public getApply(applyNo: number, callback: (data: TranslatorApply) => void): void {
        fetch(`/api/translator/apply/${applyNo}`).then(e => e.json()).then(data => {
            const view = Object.assign(new TranslatorApply(), data);
            view.polls = data.polls.map((e: any) => Object.assign(new TranslatorApplyPoll(), e));
            callback(view);
        });
    }

    public addApply(website: string, callback: (data: Result<number>) => void): void {
        fetch(`/api/translator/apply`, { ...ajax.post, ...ajax.json, body: JSON.stringify({website}) })
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }

    public addApplyPoll(applyNo: number, point: string, comment: string, callback: (data: Result<any>) => void): void {
        fetch(`/api/translator/apply/${applyNo}/poll`, { ...ajax.post, ...ajax.json, body: JSON.stringify({point, comment}) })
            .then(e => e.json()).then(data => callback(data));
    }

    public getAdminTranslatorApplyCount(callback: (count: number) => void): void {
        fetch(`/api/admin/translator/apply/count`).then(e => e.json()).then(data => callback(data.count));
    }
}


export default new TranslatorRemote();