import { stateAcronyms } from "./state-acronyms";

export function isEmailValid(emailAddress: string) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !!emailAddress.match(regex);
}

export const isStateValid = (state: string) => {
    return stateAcronyms.includes(state.toUpperCase())
}

export const isZipCodeValid = (zipCode: string): boolean => {
    return /^\d{5}(-\d{4})?$/.test(zipCode);
};