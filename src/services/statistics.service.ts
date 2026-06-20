import type { MatrixStatistics, StatisticsRequest, StatisticsResponse } from "../domain/index.js";
import {
  flattenMatrix,
  isDiagonal,
} from "../utils/matrix.utils.js";

/**
 * Servicio encargado de calcular las estadísticas matemáticas de matrices.
 * Contiene la lógica de negocio para procesar las matrices (encontrar máximos, mínimos, promedios, etc).
 */
class StatisticsService {
  
  /**
   * Calcula las estadísticas básicas de una matriz bidimensional dada.
   * @param matrix - Matriz de números a evaluar.
   * @returns Un objeto con las estadísticas calculadas (max, min, promedio, suma, esDiagonal).
   */
  private calculateMatrixStatistics(
    matrix: number[][]
  ): MatrixStatistics {

    // Aplana la matriz bidimensional a un arreglo unidimensional para facilitar el cálculo
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

  /**
   * Procesa un payload con múltiples matrices y calcula las estadísticas para cada una de ellas si están presentes.
   * @param payload - Objeto que contiene las diferentes matrices a procesar (rotatedMatrix, q, r).
   * @returns Un objeto de respuesta con las estadísticas de cada matriz proveída.
   */
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