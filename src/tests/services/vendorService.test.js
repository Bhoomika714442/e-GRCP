import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
} from "vitest";
import vendorService from "../../services/vendorService";
import vendorsData from "../../mocks/vendors.json";

const VENDORS_KEY = "egrcp_vendors";

describe("vendorService", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    localStorage.clear();

    localStorage.setItem(
      VENDORS_KEY,
      JSON.stringify(vendorsData.vendors)
    );

    vi.spyOn(Date, "now").mockReturnValue(1000);

    vi.spyOn(
      Date.prototype,
      "toISOString"
    ).mockReturnValue(
      "2026-01-01T00:00:00.000Z"
    );
  });

  afterEach(async () => {
    await vi.runOnlyPendingTimersAsync();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("returns all vendors", async () => {
    const promise = vendorService.getAll();

    await vi.advanceTimersByTimeAsync(500);

    const vendors = await promise;

    expect(vendors).toEqual(
      vendorsData.vendors
    );
  });

  it("returns vendor by id", async () => {
    const id = vendorsData.vendors[0].id;

    const promise =
      vendorService.getById(id);

    await vi.advanceTimersByTimeAsync(300);

    const vendor = await promise;

    expect(vendor.id).toBe(id);
  });

  it("throws when vendor is not found", async () => {
    const expectation = expect(
      vendorService.getById(999999)
    ).rejects.toThrow(
      "Vendor not found."
    );

    await vi.advanceTimersByTimeAsync(300);

    await expectation;
  });

  it("creates vendor", async () => {
    const promise =
      vendorService.create({
        name: "ABC Pvt Ltd",
        email: "abc@test.com",
      });

    await vi.advanceTimersByTimeAsync(500);

    const vendor = await promise;

    expect(vendor.id).toBe(1000);

    expect(vendor.createdAt).toBe(
      "2026-01-01T00:00:00.000Z"
    );

    const vendors = JSON.parse(
      localStorage.getItem(
        VENDORS_KEY
      )
    );

    expect(vendors[0].name).toBe(
      "ABC Pvt Ltd"
    );
  });

  it("updates vendor", async () => {
    const id = vendorsData.vendors[0].id;

    const promise =
      vendorService.update(id, {
        name: "Updated Vendor",
      });

    await vi.advanceTimersByTimeAsync(500);

    const vendor = await promise;

    expect(vendor.name).toBe(
      "Updated Vendor"
    );

    const vendors = JSON.parse(
      localStorage.getItem(
        VENDORS_KEY
      )
    );

    expect(vendors[0].name).toBe(
      "Updated Vendor"
    );
  });

  it("throws when updating missing vendor", async () => {
    const expectation = expect(
      vendorService.update(99999, {
        name: "ABC",
      })
    ).rejects.toThrow(
      "Vendor not found."
    );

    await vi.advanceTimersByTimeAsync(500);

    await expectation;
  });

  it("deletes vendor", async () => {
    const id = vendorsData.vendors[0].id;

    const promise =
      vendorService.delete(id);

    await vi.advanceTimersByTimeAsync(400);

    expect(await promise).toBe(true);

    const vendors = JSON.parse(
      localStorage.getItem(
        VENDORS_KEY
      )
    );

    expect(
      vendors.some(
        (v) => v.id === id
      )
    ).toBe(false);
  });

  it("delete unknown vendor still returns true", async () => {
    const promise =
      vendorService.delete(999999);

    await vi.advanceTimersByTimeAsync(400);

    expect(await promise).toBe(true);
  });

  it("supports string id lookup", async () => {
    const id = String(
      vendorsData.vendors[0].id
    );

    const promise =
      vendorService.getById(id);

    await vi.advanceTimersByTimeAsync(300);

    const vendor = await promise;

    expect(vendor.id).toBe(
      Number(id)
    );
  });

  it("supports string id update", async () => {
    const id = String(
      vendorsData.vendors[0].id
    );

    const promise =
      vendorService.update(id, {
        status: "Inactive",
      });

    await vi.advanceTimersByTimeAsync(500);

    const vendor = await promise;

    expect(vendor.status).toBe(
      "Inactive"
    );
  });
});