import PageData from "../../../common/PageData";
import ajax from "../../../common/ajax";
import Result from "../../../common/Result";
import {Topic} from "../Topic";
import {BoardInfo} from "../BoardInfo";
import {RecentBoardData} from "../RecentBoardData";

class BoardRemote {
    public getTicker(ticker: string): Promise<BoardInfo> {
        return fetch(`/api/board/ticker/${ticker}`).then(e => e.json()).then(data => Object.assign(new BoardInfo(), data));
    }

    public getTopic(ticker: string, topicNo: number): Promise<Topic> {
        return fetch(`/api/board/topic/${ticker}/${topicNo}`).then(e => e.json()).then(topic => Topic.assign(topic));
    }

    public getList(ticker: string, page: number): Promise<PageData<Topic>> {
        return fetch(`/api/board/list/${ticker}/${page}`).then(e => e.json()).then(list => PageData.cast(list, e => Topic.assign(e)));
    }

    public getRecentHome(): Promise<RecentBoardData> {
        return fetch(`/api/board/recent/home`).then(e => e.json()).then(data => RecentBoardData.assign(data));
    }

    public createTopic(ticker: string, topic: string, content: string): Promise<Result<number|null>> {
        return fetch(`/api/board/topic/${ticker}`, { ...ajax.json, ...ajax.post, body: JSON.stringify({ topic, content }) })
            .then(e => e.json()).then(data => Result.assign(data));
    }

    public updateTopic(topicNo: number, topic: string, content: string): Promise<Result<any>> {
        return fetch(`/api/board/topic/${topicNo}`, { ...ajax.json, ...ajax.put, body: JSON.stringify({ topic, content }) })
            .then(e => e.json()).then(data => Result.assign(data));
    }

    public deleteTopic(topicNo: number): Promise<Result<any>> {
        return fetch(`/api/board/topic/${topicNo}`, { ...ajax.json, ...ajax.delete })
            .then(e => e.json()).then(data => Result.assign(data));
    }

    public createPost(topicNo: number, content: string): Promise<Result<any>> {
        return fetch(`/api/board/post/${topicNo}`, { ...ajax.json, ...ajax.post, body: JSON.stringify({ content }) })
            .then(e => e.json()).then(data => Result.assign(data));
    }

    public updatePost(postNo: number, content: string): Promise<Result<any>> {
        return fetch(`/api/board/post/${postNo}`, { ...ajax.json, ...ajax.put, body: JSON.stringify({ content }) })
            .then(e => e.json()).then(data => Result.assign(data));
    }

    public deletePost(postNo: number): Promise<Result<any>> {
        return fetch(`/api/board/post/${postNo}`, { ...ajax.json, ...ajax.delete })
            .then(e => e.json()).then(data => Result.assign(data));
    }
}

export default new BoardRemote()