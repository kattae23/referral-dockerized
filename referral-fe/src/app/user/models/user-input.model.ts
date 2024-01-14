export class UserInput {
    constructor(
        public username: string, 
        public email: string, 
        public password: string, 
        public date_of_birth: Date, 
        public how_did_you_hear: string,
        public referrer_username: null | string,
        ) {}
}