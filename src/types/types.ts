type Guitar = {
    id: number;
    name: string;
    image: string;
    description : string;
    price : number;
}

type GuitarProps = {
    guitar: Guitar,
    addToCart: (type: Guitar) => void
}