export interface Video {
    _id?: string;
    matchDate: string;
    player1: string;
    char1: string;
    assist1: string;
    player2: string;
    char2: string;
    assist2: string;
    link: string;
    version: number; // DFC vs. DFCI
    createdData?: string;
    updatedAt?: string;
};

export interface VideoSearch {
    player1?: string;
    player2?: string;
    char1?: string;
    char2?: string;
    assist1?: string;
    assist2?: string;
    version?: number;
    sort?: string;
}

export const DefaultVideo = {
    matchDate: '',
    player1: '',
    char1: '',
    assist1: '',
    player2: '',
    char2: '',
    assist2: '',
    link: '',
    version: 2
}