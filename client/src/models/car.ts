import { CarTableActions } from '../components/car-actions.component';

export class Car {

    id?: number;
    brand!: string | null;
    make!: string | null;
    color!: string | null;
    ccs!: number | null;
    hp!: number | null;
    price!: number | null;
    electric!: string | null;

    // The constructor initializes the variables to null, as this is useful in some other functions.
    constructor() {
        this.brand = null;
        this.make = null;
        this.color = null;
        this.ccs = null;
        this.hp = null;
        this.price = null;
        this.electric = null;
    }

    /* 
        Column definitions need to be set for the ag-grid table. 
        Since they're a mirror of the model and this is a small project it makes sense to include them here.
        In projects with multiple tables I'd move them to their own files.
    */
    private carColumnDefinitions = [
        {
            headerName: "Brand",
            field: "brand",
            filter: "agTextColumnFilter",
            resizable: true,
            sortable: true
        },
        {
            headerName: "Make",
            field: "make",
            filter: "agTextColumnFilter",
            resizable: true,
            sortable: true
        },
        {
            headerName: "Color",
            field: "color",
            filter: "agTextColumnFilter",
            resizable: true,
            sortable: true
        },
        {
            headerName: "CCs",
            field: "ccs",
            filter: "agTextColumnFilter",
            resizable: true,
            sortable: true
        },
        {
            headerName: "Horsepower",
            field: "hp",
            filter: "agTextColumnFilter",
            resizable: true,
            sortable: true
        },
        {
            headerName: "Price",
            field: "price",
            filter: "agTextColumnFilter",
            resizable: true,
            sortable: true
        },
        {
            headerName: "Electric",
            field: "electric",
            filter: "agTextColumnFilter",
            resizable: true,
            sortable: true
        },
        {
            headerName: 'Actions',
            pinned: 'right',
            width: 125,
            suppressMovable: true,
            cellRendererFramework: CarTableActions
        }
    ];

    // Returns the column definitions.
    public getCarColumnDefinitions() {
        return this.carColumnDefinitions;
    }

}
