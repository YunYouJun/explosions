/**
 * 格式化 JSON
 * @param json
 */
export function formatJSON(json: object) {
  return `${JSON.stringify(json, null, 2)}\n`
}
