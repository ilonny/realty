export enum Colors {
    MAIN_BLACK = "#222222",
    MAIN_RED = "#CF1409",
}

export const API_URL =
    process.env.NODE_ENV === "production"
        ? "http://194-58-107-74.cloudvps.regruhosting.ru:802"
        : "http://localhost:3002";
