export const randomSampleFromArray = <T>(
  array: T[],
  sampleSize: number,
): T[] => {
  // Copy the array to avoid mutating the original with sort
  const cpy = [...array];
  return cpy.sort(() => 0.5 - Math.random()).slice(0, sampleSize);
};
