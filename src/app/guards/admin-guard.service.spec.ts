import { TestBed } from "@angular/core/testing";

import { AdminGuard } from "./admin-guard.service";

describe("AdminGuardService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AdminGuard = TestBed.get(AdminGuard);
    expect(service).toBeTruthy();
  });
});
