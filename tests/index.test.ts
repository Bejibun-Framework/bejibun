/**
 * This test suite is written using Bun's native testing framework.
 *
 * For detailed guidance on available testing APIs, assertion utilities,
 * asynchronous test execution, setup and teardown hooks, mocking,
 * snapshots, coverage reporting, and framework-specific best practices,
 * please refer to the official Bun documentation.
 *
 * Documentation:
 * https://bun.com/docs/test
 */
import {expect, test, describe} from "bun:test";

describe("Arithmetic", () => {
    test("2 + 2", () => {
        expect(2 + 2).toBe(4);
    });

    test("2 * 2", () => {
        expect(2 * 2).toBe(4);
    });
});

describe("Async Arithmetic", () => {
    test("2 * 2", async () => {
        const result = await Promise.resolve(2 * 2);
        expect(result).toEqual(4);
    });

    test("2 * 2", done => {
        Promise.resolve(2 * 2).then(result => {
            expect(result).toEqual(4);
            done();
        });
    });
});