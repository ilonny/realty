export enum Colors {
    MAIN_BLACK = "#222222",
    MAIN_RED = "#CF1409",
}

export const API_URL =
    process.env.NODE_ENV === "production"
        ? "https://neverhaveiever.ru"
        : "https://neverhaveiever.ru";
