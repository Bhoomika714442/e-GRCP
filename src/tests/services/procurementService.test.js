import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
} from "vitest";
import procurementService from "../../services/procurementService";
import requestsData from "../../mocks/requests.json";

const REQUESTS_KEY = "egrcp_requests";

describe("procurementService", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    localStorage.clear();

    localStorage.setItem(
      REQUESTS_KEY,
      JSON.stringify(requestsData.requests)
    );

    vi.spyOn(Date, "now").mockReturnValue(1000);

    vi.spyOn(
      Date.prototype,
      "toISOString"
    ).mockReturnValue(
      "2026-07-01T10:00:00.000Z"
    );
  });

  afterEach(async () => {
    await vi.runOnlyPendingTimersAsync();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("returns all procurement requests", async () => {
    const promise = procurementService.getAll();

    await vi.advanceTimersByTimeAsync(500);

    const requests = await promise;

    expect(requests).toEqual(
      requestsData.requests
    );
  });

  it("returns procurement request by id", async () => {
    const id = requestsData.requests[0].id;

    const promise =
      procurementService.getById(id);

    await vi.advanceTimersByTimeAsync(300);

    const request = await promise;

    expect(request.id).toBe(id);
  });

  it("throws when procurement request is not found", async () => {
    const expectation = expect(
      procurementService.getById(999999)
    ).rejects.toThrow(
      "Procurement request not found."
    );

    await vi.advanceTimersByTimeAsync(300);

    await expectation;
  });

  it("creates procurement request", async () => {
    const promise =
      procurementService.create({
        title: "Laptop Purchase",
        department: "IT",
      });

    await vi.advanceTimersByTimeAsync(500);

    const request = await promise;

    expect(request.id).toBe(1000);
    expect(request.requestNumber).toBe(
      "PR-1000"
    );
    expect(request.status).toBe("Pending");
    expect(request.createdAt).toBe(
      "2026-07-01T10:00:00.000Z"
    );

    const stored = JSON.parse(
      localStorage.getItem(
        REQUESTS_KEY
      )
    );

    expect(stored[0].title).toBe(
      "Laptop Purchase"
    );
  });

  it("updates procurement request", async () => {
    const id = requestsData.requests[0].id;

    const promise =
      procurementService.update(id, {
        department: "Finance",
      });

    await vi.advanceTimersByTimeAsync(500);

    const request = await promise;

    expect(request.department).toBe(
      "Finance"
    );
  });

  it("throws while updating unknown request", async () => {
    const expectation = expect(
      procurementService.update(99999, {
        department: "HR",
      })
    ).rejects.toThrow(
      "Procurement request not found."
    );

    await vi.advanceTimersByTimeAsync(500);

    await expectation;
  });

  it("approves procurement request", async () => {
    const id = requestsData.requests[0].id;

    const promise =
      procurementService.approve(
        id,
        "Manager"
      );

    await vi.advanceTimersByTimeAsync(400);

    const request = await promise;

    expect(request.status).toBe(
      "Approved"
    );
    expect(request.approvedBy).toBe(
      "Manager"
    );
    expect(request.approvedDate).toBe(
      "2026-07-01T10:00:00.000Z"
    );
  });

  it("throws while approving unknown request", async () => {
    const expectation = expect(
      procurementService.approve(
        99999,
        "Manager"
      )
    ).rejects.toThrow(
      "Procurement request not found."
    );

    await vi.advanceTimersByTimeAsync(400);

    await expectation;
  });

  it("rejects procurement request", async () => {
    const id = requestsData.requests[0].id;

    const promise =
      procurementService.reject(
        id,
        "Budget exceeded"
      );

    await vi.advanceTimersByTimeAsync(400);

    const request = await promise;

    expect(request.status).toBe(
      "Rejected"
    );
    expect(request.remarks).toBe(
      "Budget exceeded"
    );
  });

  it("throws while rejecting unknown request", async () => {
    const expectation = expect(
      procurementService.reject(
        99999,
        "Rejected"
      )
    ).rejects.toThrow(
      "Procurement request not found."
    );

    await vi.advanceTimersByTimeAsync(400);

    await expectation;
  });

  it("removes procurement request", async () => {
    const id = requestsData.requests[0].id;

    const promise =
      procurementService.remove(id);

    await vi.advanceTimersByTimeAsync(400);

    expect(await promise).toBe(true);

    const stored = JSON.parse(
      localStorage.getItem(
        REQUESTS_KEY
      )
    );

    expect(
      stored.some(
        (r) => r.id === id
      )
    ).toBe(false);
  });

  it("removing unknown request still succeeds", async () => {
    const promise =
      procurementService.remove(999999);

    await vi.advanceTimersByTimeAsync(400);

    expect(await promise).toBe(true);
  });

  it("supports string ids", async () => {
    const id = String(
      requestsData.requests[0].id
    );

    const promise =
      procurementService.getById(id);

    await vi.advanceTimersByTimeAsync(300);

    const request = await promise;

    expect(request.id).toBe(
      Number(id)
    );
  });
});