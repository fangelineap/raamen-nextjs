import User from "./User";

type Raamen = {
    id: number;
    name: string;
    description: string;
    broth: string;
    price: number;
    user_id: number;
    User: User;
}

export default Raamen;