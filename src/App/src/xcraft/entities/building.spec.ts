import { Building } from './building';
import { Cost } from './cost';

describe('Building', () => {
  describe('Brain', () => {
    const id = 54;
    const firstLevelCost = new Cost(1000, 2000, 2000);
    const multiplier = 6.25;
    const brain = new Building(id, firstLevelCost, multiplier, "Мозг");
    const secondLevelCost = new Cost(6250, 12500, 12500);
    const thirdLevelCost = new Cost(39062, 78125, 78125);
    const fourthLevelCost = new Cost(244140, 488281, 488281);
    const fifthLevelCost = new Cost(1525878, 3051757, 3051757);
    const sixthLevelCost = new Cost(9536743, 19073486, 19073486);
    const seventhLevelCost = new Cost(59604644, 119209289, 119209289);
    describe('LevelCost', () => {
      it('level 1', () => expect(brain.getLevelCost(1)).toEqual(firstLevelCost));
      it('level 2', () => expect(brain.getLevelCost(2)).toEqual(secondLevelCost));
      it('level 3', () => expect(brain.getLevelCost(3)).toEqual(thirdLevelCost));
      it('level 4', () => expect(brain.getLevelCost(4)).toEqual(fourthLevelCost));
      it('level 5', () => expect(brain.getLevelCost(5)).toEqual(fifthLevelCost));
      it('level 6', () => expect(brain.getLevelCost(6)).toEqual(sixthLevelCost));
      it('level 7', () => expect(brain.getLevelCost(7)).toEqual(seventhLevelCost));
    });
    const totalFirstLevelCost = firstLevelCost;
    const totalSecondLevelCost = totalFirstLevelCost.add(secondLevelCost);
    const totalThirdLevelCost = totalSecondLevelCost.add(thirdLevelCost);
    const totalFourthLevelCost = totalThirdLevelCost.add(fourthLevelCost);
    const totalFifthLevelCost = totalFourthLevelCost.add(fifthLevelCost);
    const totalSixthLevelCost = totalFifthLevelCost.add(sixthLevelCost);
    const totalSeventhLevelCost = totalSixthLevelCost.add(seventhLevelCost);
    describe('TotalLevelCost', () => {
      it('level 1', () => expect(brain.getTotalLevelCost(1)).toEqual(totalFirstLevelCost));
      it('level 2', () => expect(brain.getTotalLevelCost(2)).toEqual(totalSecondLevelCost));
      it('level 3', () => expect(brain.getTotalLevelCost(3)).toEqual(totalThirdLevelCost));
      it('level 4', () => expect(brain.getTotalLevelCost(4)).toEqual(totalFourthLevelCost));
      it('level 5', () => expect(brain.getTotalLevelCost(5)).toEqual(totalFifthLevelCost));
      it('level 6', () => expect(brain.getTotalLevelCost(6)).toEqual(totalSixthLevelCost));
      it('level 7', () => expect(brain.getTotalLevelCost(7)).toEqual(totalSeventhLevelCost));
    });
    describe('TotalCostBetweenLevels', () => {
      it('level 1-2', () => expect(brain.getTotalCostBetweenLevels(1, 2)).toEqual(secondLevelCost.add(totalFirstLevelCost)));
      it('level 2-3', () => expect(brain.getTotalCostBetweenLevels(2, 3)).toEqual(thirdLevelCost.add(secondLevelCost)));
      it('level 3-4', () => expect(brain.getTotalCostBetweenLevels(3, 4)).toEqual(fourthLevelCost.add(thirdLevelCost)));
      it('level 4-5', () => expect(brain.getTotalCostBetweenLevels(4, 5)).toEqual(fifthLevelCost.add(fourthLevelCost)));
      it('level 5-6', () => expect(brain.getTotalCostBetweenLevels(5, 6)).toEqual(sixthLevelCost.add(fifthLevelCost)));
      it('level 6-7', () => expect(brain.getTotalCostBetweenLevels(6, 7)).toEqual(seventhLevelCost.add(sixthLevelCost)));
      it('level 7-3', () => expect(brain.getTotalCostBetweenLevels(7, 3)).toEqual(totalSeventhLevelCost.sub(totalSecondLevelCost)));
    });
  });
});
