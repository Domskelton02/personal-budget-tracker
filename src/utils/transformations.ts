export const formatPhoneNumber = (phoneNumber: string) =>
    `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 9)}`;

export const capitalize = (input: string) =>
    input
        .split("")
        .map((char, index) =>
            index === 0 ? char.toUpperCase() : char.toLowerCase()
        )
        .join("");