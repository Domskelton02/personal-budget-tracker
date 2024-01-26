import { describe, expect, it } from "vitest";
import { formatPhoneNumber } from "./transformations";

describe("format phone number", () => {
    it("should format my phone number", () => {
        expect(formatPhoneNumber('1234567890')).toBe("123-456-7890")
    })
})