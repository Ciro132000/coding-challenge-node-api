import statisticsService from "./statistics.service.js";
import type { StatisticsRequest } from "../domain/index.js";

describe("StatisticsService", () => {
  it("Debería calcular estadísticas para una solicitud de matriz dada", () => {
    const payload = {
      rotatedMatrix: [
        [1, 2],
        [3, 4],
      ],
      q: [
        [1, 0],
        [0, 1],
      ],
      // pruebas sin 'r'
    } as StatisticsRequest;

    const result = statisticsService.calculate(payload);

    expect(result.rotatedMatrix).toBeDefined();
    expect(result.rotatedMatrix?.max).toBe(4);
    expect(result.rotatedMatrix?.min).toBe(1);
    expect(result.rotatedMatrix?.sum).toBe(10);
    expect(result.rotatedMatrix?.average).toBe(2.5);
    expect(result.rotatedMatrix?.isDiagonal).toBe(false);

    expect(result.q).toBeDefined();
    expect(result.q?.max).toBe(1);
    expect(result.q?.min).toBe(0);
    expect(result.q?.sum).toBe(2);
    expect(result.q?.average).toBe(0.5);
    expect(result.q?.isDiagonal).toBe(true);

    expect(result.r).toBeUndefined();
  });

  it("Debería devolver una respuesta vacía si no se proporcionan matrices", () => {
    const payload = {} as StatisticsRequest;
    const result = statisticsService.calculate(payload);

    expect(result).toEqual({});
  });
});
