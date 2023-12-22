import {Jeu} from "./jeu.interface";

export interface SearchResult {
    jeux: Jeu[];
    count: number;
    query: string;
}
