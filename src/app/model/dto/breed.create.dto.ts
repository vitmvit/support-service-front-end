export class BreedCreateDto {

    public name: string;
    public typeId: number;

    constructor(name: string,
                typeId: number) {
        this.name = name;
        this.typeId = typeId;
    }
}
