export function flattenMatrix(matrix: number[][]): number[] {
  return matrix.flat();
}

export function isDiagonal(matrix: number[][]): boolean {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;

  if (rows !== cols) {
    return false;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i !== j && matrix[i]![j] !== 0) {
        return false;
      }
    }
  }

  return true;
}