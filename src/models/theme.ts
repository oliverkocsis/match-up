export class Theme {
    public price: string;
    public priceAsDecimal: number;
    public currency: string;
    public purchased: boolean;
    public title: string;
    constructor(public name: string, public free: boolean) { }
}