import AnimeCaption from "../AnimeCaption";
import PageData from "../../../common/PageData";
import AnimeAutocorrect from "../AnimeAutocorrect";
import Anime from "../Anime";
import ajax from "../../../common/ajax";
import Result from "../../../common/Result";
import {AnimeRankItem} from "../../rank/AnimeRankItem";

class AnimeRemote {
    private cacheAutocorrect: any = {};
    private genres: string[] = [];

    public getScheduleAnimeList(week: number|string): Promise<Anime[]> {
        return fetch(`/api/anime/schedule/${week}`)
            .then(e => e.json())
            .then(list => list.map((e: any) => Object.assign(new Anime(), e)));
    }

    public getAnimeCaptionList(animeNo: string|number): Promise<AnimeCaption[]> {
        return fetch(`/api/anime/caption/animeNo/${animeNo}`)
            .then(e => e.json())
            .then(list => list.map((e: any) => Object.assign(new AnimeCaption(), e)));
    }

    public getAnimeList(page: number, query: string): Promise<PageData<Anime>> {
        return fetch(`/api/anime/list/${page}?q=${encodeURIComponent(query)}`)
            .then(e => e.json())
            .then(data => PageData.cast(data, (e: any) => Object.assign(new Anime(), e)));
    }

    public getAnime(animeNo: number): Promise<Anime> {
        return fetch(`/api/anime/animeNo/${animeNo}`).then(e => e.json()).then(anime => {
            const node = Object.assign(new Anime(), anime);
            node.captions = anime.captions.map((caption: any) => Object.assign(new AnimeCaption(), caption));
            return node;
        });
    }

    public getAnimeListAutocorrect(query: string): Promise<AnimeAutocorrect[]> {
        if (query.trim() != '') {
            const cache = this.cacheAutocorrect[query];
            if (cache) {
                return Promise.resolve(cache);
            } else {
                return fetch(`/api/anime/autocorrect?q=${encodeURIComponent(query)}`)
                    .then(e => e.json())
                    .then(list => {
                        const rv: AnimeAutocorrect[] = list.map((e: string) => new AnimeAutocorrect(query, e));
                        rv.sort((a, b) => a.lo.localeCompare(b.lo));
                        return rv;
                    });
            }
        } else {
            return Promise.resolve([]);
        }
    }

    public getAdminScheduleAnimeList(week: number): Promise<Anime[]> {
        return fetch(`/api/admin/schedule/${week}`).then(e => e.json())
            .then(list => list.map((e: any) => Object.assign(new Anime(), e)));
    }

    public getAdminCaptionList(state: number, page: number): Promise<PageData<any>> {
        return fetch(`/api/admin/caption/list/${state}/${page}`)
            .then(e => e.json()).then(data => PageData.cast(data, e => Object.assign(new AnimeCaption(), e)));
    }

    public deleteAdminCaption(animeNo: number): Promise<Result<any>> {
        return fetch(`/api/admin/caption/${animeNo}`, { ...ajax.delete, ...ajax.json })
            .then(e => e.json()).then(data => Result.assign(data));
    }

    public updateAdminCaption(caption: AnimeCaption): Promise<Result<any>> {
        return fetch(`/api/admin/caption/${caption.animeNo}`, { ...ajax.put, ...ajax.json, body: JSON.stringify(caption) })
            .then(e => e.json()).then(data => Result.assign(data));
    }

    public getAdminAnimeList(query: string, page: number): Promise<PageData<Anime>> {
        return fetch(`/api/admin/anime/list/${page}?q=${encodeURIComponent(query)}`).then(e => e.json()).then(data => PageData.cast(data, (e: any) => Object.assign(new Anime(), e)));
    }

    public getAdminAnimeDelist(): Promise<PageData<Anime>> {
        return fetch(`/api/admin/anime/delist`).then(e => e.json()).then(data => PageData.cast(data, (e: any) => Object.assign(new Anime(), e)));
    }

    public addAdminCaption(animeNo: number): Promise<Result<any>> {
        return fetch(`/api/admin/caption/${animeNo}`, { ...ajax.post, ...ajax.json })
            .then(e => e.json()).then(data => Result.assign(data));
    }

    public addAdminAnime(anime: Anime): Promise<Result<any>> {
        return fetch(`/api/admin/anime`, { ...ajax.post, ...ajax.json, body: JSON.stringify(anime) })
            .then(e => e.json()).then(data => Result.assign(data));
    }

    public updateAdminAnime(anime: Anime): Promise<Result<any>> {
        return fetch(`/api/admin/anime/${anime.animeNo}`, { ...ajax.put, ...ajax.json, body: JSON.stringify(anime) })
            .then(e => e.json()).then(data => Result.assign(data));
    }

    public deleteAdminAnime(animeNo: number): Promise<Result<any>> {
        return fetch(`/api/admin/anime/${animeNo}`, { ...ajax.delete, ...ajax.json })
            .then(e => e.json()).then(data => Result.assign(data));
    }

    public recoverAdminAnime(agendaNo: number): Promise<Result<any>> {
        return fetch(`/api/admin/anime/recover/${agendaNo}`, { ...ajax.post, ...ajax.json })
            .then(e => e.json()).then(data => Result.assign(data));
    }

    public getCaptionRecent(): Promise<AnimeCaption[]> {
        return fetch(`/api/anime/caption/recent`).then(e => e.json()).then(list => list.map((e: any) => Object.assign(new AnimeCaption(), e)));
    }

    public getCaptionRecentPage(page: number): Promise<PageData<AnimeCaption>> {
        return fetch(`/api/anime/caption/recent/${page}`).then(e => e.json()).then(list => PageData.cast(list, e => Object.assign(new AnimeCaption(), e)));
    }

    public getGenres(): Promise<string[]> {
        if (this.genres.length) {
            return Promise.resolve(this.genres);
        } else {
            return fetch(`/api/anime/genres`).then(e => e.json()).then(genres => (this.genres = genres));
        }
    }

    public getRank(type: string): Promise<AnimeRankItem[]> {
        return fetch(`/api/anime/rank/${type}`).then(e => e.json()).then(list => {
            for (let i = list.length - 1 ; i >= 1 ; i--) {
                if (list[i - 1].rank === list[i].rank) {
                    list[i].rank = '-';
                }
            }
            if (list.length < 30) {
                list = list.concat([...new Array(30).keys()].map(e => ({animeNo: 0, rank: e+1})).slice(list.length));
            }
            return list.map((e: any) => Object.assign(new AnimeRankItem(), e));
        });
    }
}

export default new AnimeRemote()