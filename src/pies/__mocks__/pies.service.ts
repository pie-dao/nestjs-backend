import { PiesStub } from "../test/stubs/pies.stubs";

export const PiesService = jest.fn().mockReturnValue({
  getPies: jest.fn().mockResolvedValue(Promise.resolve(PiesStub))
});