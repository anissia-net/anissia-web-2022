import PageData from "../../../common/PageData";
import ajax from "../../../common/ajax";
import Result from "../../../common/Result";
import ActivePanelListItem from "../ActivePanelListItem";

class ActivePanelRemote {
    public getList(page: number, mode: string, callback: (data: PageData<ActivePanelListItem>) => void): void {
        fetch(`/api/active-panel/list/${page}?mode=${mode}`).then(e => e.json()).then(data => {
            callback(PageData.cast(data, e => Object.assign(new ActivePanelListItem(), e)))
        });
    }

    public addNotice(query: string, callback: (result: Result<void>) => void): void {
        fetch(`/api/active-panel/notice`, {...ajax.json, ...ajax.post, body: JSON.stringify({query: query.trim()})})
            .then(e => e.json()).then(data => callback(Result.assign(data)));
    }
}

export default new ActivePanelRemote()