export class StateTemplateCreateDto {

    public name: string;
    public description: string;
    public uuidImage: string;

    constructor(name: string,
                description: string,
                uuidImage: string) {
        this.name = name;
        this.description = description;
        this.uuidImage = uuidImage;
    }
}
