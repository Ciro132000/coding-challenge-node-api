import { flattenMatrix, isDiagonal } from "./matrix.utils.js";

describe("Matrix Utils", () => {
  describe("flattenMatrix", () => {
    it("Debería pasar de una matriz a un arreglo", () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      const result = flattenMatrix(matrix);
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("Debería manejar matrices vacías", () => {
      expect(flattenMatrix([])).toEqual([]);
      expect(flattenMatrix([[], []])).toEqual([]);
    });
  });

  describe("isDiagonal", () => {
    it("Debería devolver true para una matriz diagonal válida", () => {
      const matrix = [
        [1, 0, 0],
        [0, 5, 0],
        [0, 0, 9],
      ];
      expect(isDiagonal(matrix)).toBe(true);
    });

    it("Debería devolver false para una matriz no diagonal", () => {
      const matrix = [
        [1, 2, 0],
        [0, 5, 0],
        [0, 0, 9],
      ];
      expect(isDiagonal(matrix)).toBe(false);
    });

    it("Debería devolver false para una matriz no cuadrada", () => {
      const matrix = [
        [1, 0],
        [0, 5],
        [0, 0],
      ];
      expect(isDiagonal(matrix)).toBe(false);
    });

    it("Debería devolver true para una matriz de 1x1", () => {
      const matrix = [[5]];
      expect(isDiagonal(matrix)).toBe(true);
    });
  });
});
