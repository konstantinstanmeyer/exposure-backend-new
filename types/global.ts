export interface Creator {
    username: String,
    imageUrl: string
}

export interface Post {
    _id: String,
    title: String,
    category: String,
    subCategory: String,
    description: String,
    creator: Creator,
    imageUrl: string,
    sizing: Number,
    date: Date | string,
}

export interface Category {
    name: String;
    imageUrl: String;
}