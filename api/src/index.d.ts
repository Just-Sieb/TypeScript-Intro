declare namespace Server {
    interface DataBody {
        id: number;
        name: string;
        numbers: number[];
    }
    interface DataResponse {
        status: string;
    }
}