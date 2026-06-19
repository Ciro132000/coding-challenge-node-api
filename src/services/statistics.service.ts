
import type { MatrixStatistics, StatisticsRequest, StatisticsResponse } from "../dtos/statistics.dto.js";
import {
  flattenMatrix,
  isDiagonal,
} from "../utils/matrix.utils.js";

class StatisticsService {
  private calculateMatrixStatistics(
    matrix: number[][]
  ): MatrixStatistics {

    const values = flattenMatrix(matrix);

    const sum = values.reduce(
      (acc, current) => acc + current,
      0
    );

    return {
      max: Math.max(...values),
      min: Math.min(...values),
      average: sum / values.length,
      sum,
      isDiagonal: isDiagonal(matrix),
    };
  }

  public calculate(
    payload: StatisticsRequest
  ): StatisticsResponse {

    const response: StatisticsResponse = {};

    if (payload.rotatedMatrix?.length) {
      response.rotatedMatrix =
        this.calculateMatrixStatistics(
          payload.rotatedMatrix
        );
    }

    if (payload.q?.length) {
      response.q =
        this.calculateMatrixStatistics(
          payload.q
        );
    }

    if (payload.r?.length) {
      response.r =
        this.calculateMatrixStatistics(
          payload.r
        );
    }

    return response;
  }
}

export default new StatisticsService();