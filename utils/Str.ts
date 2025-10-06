export default class Str {
    protected value: string;

    public constructor() {
        this.value = "";
    }

    public setValue(value: string): Str {
        this.value = value;

        return this;
    }

    public toPascalCase(): string {
        return this.value.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
            .join("");
    }
}