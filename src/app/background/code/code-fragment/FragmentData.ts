export interface Fragment {
    src: string,
    width: number,
    height: number
};

export interface FragmentComponent {
    xPos: number,
    yPos: number,
    scale: number,
    fragmentId: number,
    fragmentIndex: number,
    travelX: boolean
};

export const Fragments: Fragment[] = [
    {
        src: '',
        width: 464,
        height: 336
    },
    {
        src: '',
        width: 304,
        height: 336
    },
    {
        src: '',
        width: 464,
        height: 128
    }
];