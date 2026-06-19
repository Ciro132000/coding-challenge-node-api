export interface StatisticsRequest {
  rotatedMatrix?: number[][];
  q: number[][];
  r: number[][];
}

export interface MatrixStatistics {
  max: number;
  min: number;
  average: number;
  sum: number;
  isDiagonal: boolean;
}

export interface StatisticsResponse {
  rotatedMatrix?: MatrixStatistics;
  q?: MatrixStatistics;
  r?: MatrixStatistics;
}