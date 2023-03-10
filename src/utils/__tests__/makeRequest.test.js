import makeRequest from "../makeRequest";
describe("makeRequest", () => {
    it("should make request", async () => {
        const result = await makeRequest({ url: "url", method: "method" });
        expect(result).toEqual("result");
    });
    it("should throw error", async () => {
        expect(makeRequest({ url: "url", method: "method" })).rejects.toThrow(
        "error"
        );
    });
    });