export type Guitar = {
    id: number;
    name: string;
    image: string;
    description : string;
    price : number;
}

export type GuitarProps = {
    guitar: Guitar,
    addToCart: (type: Guitar) => void
}