/**
 * temporary i18n mock, wait [@nuxtjs/i18n](https://v8.i18n.nuxtjs.org/) stable
 * @returns
 */
export function useI18n() {
  return {
    locale: ref(''),
    t: (key: string) => key,
  }
}
