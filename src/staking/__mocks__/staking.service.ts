import { StakersStub } from "../test/stubs/stakers.stubs";
import { NotFoundException } from "@nestjs/common";

export const StakingService = jest.fn().mockReturnValue({
  getStakers: jest.fn().mockImplementation((ids) => { 
    return new Promise((resolve, reject) => {
      let stakers = StakersStub();
      let filteredStakers = [];

      if(ids == undefined) {
        resolve(stakers);
      } else {
        stakers.forEach(staker => {
          if(ids.contains(staker.id)) {
            filteredStakers.push(staker);
          }
        });

        if(filteredStakers.length > 0) {
          resolve(filteredStakers);
        } else {
          reject(new NotFoundException());
        }
      }
    });
  })
});