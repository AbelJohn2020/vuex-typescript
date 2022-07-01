export type user = {
    id: number,
    fieldName: {
        name: string,
        validName: string,
    },
    fieldLastname: {
        lastname: string,
        validLastname: string,
    },
    fieldNationality: {
        nationality: string,
        validNationality: string,
    },
    fieldIdentification: {
        identification: string,
        validIdentification: string,
    },
    fieldDocument: {
        document: string,
        validDocument: string,
    },
};

export type state = {
    user: user,
    letters: boolean,
    continue: string,
    language: string,
    users: user[] | [],
    regNumbers: RegExp,
    regex: RegExp,
    regNationality: RegExp,
    maxTickets: number[],
    tickets: number,
    validMultiForm: boolean[] | [],
}