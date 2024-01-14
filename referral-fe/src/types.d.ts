export interface ReferredUser {
    id:           string;
    createdAt:    string;
    updatedAt:    string;
    refereeUsers: User;
    referredUser: User;
}

interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    points: number;
    dateOfBirth: string;
    whoRefferEnum: string;
    createdAt: string;
    updatedAt: string;
    referredUser: ReferredUser[];
    refereeUsers: ReferredUser[];
}

export interface UserReferrals {
    user:     User;
    referees: User[];
    total:    number;
}
