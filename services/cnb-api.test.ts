/// <reference types="jest" />
import { parseCNBData } from "./cnb-api";

describe("parseCNBData", () => {
  const validCNBData = `30 Oct 2025 #14
Country|Currency|Amount|Code|Rate
Australia|dollar|1|AUD|16.123
Brazil|real|1|BRL|4.856
Canada|dollar|1|CAD|18.987
China|renminbi|1|CNY|3.456
Denmark|krone|1|DKK|3.789`;

  it("should parse valid CNB data correctly", () => {
    const result = parseCNBData(validCNBData);

    expect(result.date).toBe("30 Oct 2025");
    expect(result.sequenceNumber).toBe(14);
    expect(result.rates).toHaveLength(5);

    expect(result.rates[0]).toEqual({
      country: "Australia",
      currency: "dollar",
      amount: 1,
      code: "AUD",
      rate: 16.123,
    });

    expect(result.rates[1]).toEqual({
      country: "Brazil",
      currency: "real",
      amount: 1,
      code: "BRL",
      rate: 4.856,
    });
  });

  it("should throw error for invalid format", () => {
    const insufficientData = `30 Oct 2025 #14`;

    expect(() => parseCNBData(insufficientData)).toThrow(
      "Invalid CNB data format: insufficient lines"
    );
  });
});
