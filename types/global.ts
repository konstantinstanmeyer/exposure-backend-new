export interface Category {
    name: String;
    imageUrl: String;
}

export interface SubCategory {
    name: String;
    imageUrl: String;
    obscurity: Number;
}

export interface CategorySubs {
    name: String;
    subs: Array<SubCategory>;
}