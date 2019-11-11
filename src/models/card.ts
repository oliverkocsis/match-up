export class Card {
    constructor(
        public src: string,
        public visible: boolean = false,
        public enabled: boolean = true,
        public match: boolean = false
    ) { }
}
