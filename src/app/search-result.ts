import {Jeu} from "./jeu.interface";
import {Plateforme} from "./platform.interface";

export interface SearchResult<T> {
    items: T[];
    count: number;
    query: string;
}
