import {Jeu} from "./jeu.interface";
import {Plateforme} from "./platform.interface";

export interface SearchResult {
    items: Jeu[] | Plateforme[];
    count: number;
    query: string;
}