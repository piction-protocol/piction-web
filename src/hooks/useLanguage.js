function useLanguage() {
  let willRenderLanguage = navigator.language.search(/ko/);
  const koLanguage = navigator.language.search(/ko/);
  const enLanguage = navigator.language.search(/en/);
  const zhLanguage = navigator.language.search(/zh/);

  if (koLanguage === 0) {
    willRenderLanguage = 'ko';
  } else if (enLanguage === 0) {
    willRenderLanguage = 'en';
  } else if (zhLanguage === 0) {
    willRenderLanguage = 'zh';
  } else {
    willRenderLanguage = 'en';
  }
  return willRenderLanguage;
}

export default useLanguage;
