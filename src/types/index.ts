export type Guitar = {
    id: number;
    name: string;
    image: string;
    description : string;
    price : number;
}

export type CarItem = Guitar &{
    quantity: number;
}

//seleccionamos algunos datos unicamente

export type CarItem = Pick<Guitar, 'id' | 'name' | 'price' > &{
    quantity : number;
}

//Metodo con interface
// export interface CarItem extends Guitar {
//     quantity: number;
// }

export type GuitarProps = {
    guitar: Guitar,
    addToCart: (type: Guitar) => void
}