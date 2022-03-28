/**
 * Example: getNumberArray({ size: 10, startAt: 1 }) => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
export default function getNumberArray({
  size,
  startAt = 0
}: {
  size: number
  startAt?: number
}) {
  return Array.from({ length: size }, (_, i) => i + startAt)
}
