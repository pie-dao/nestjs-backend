import { PiesStub, PieStub } from "../test/stubs/pies.stubs";
import { PieHistoryStub } from "../test/stubs/pies-history.stubs";

export const PiesService = jest.fn().mockReturnValue({
  getPies: jest.fn().mockResolvedValue(PiesStub()),
  getPieByAddress: jest.fn().mockResolvedValue(PieStub()),
  getPieByName: jest.fn().mockResolvedValue(PieStub()),
  getPieHistory: jest.fn().mockResolvedValue(PieHistoryStub()),
});