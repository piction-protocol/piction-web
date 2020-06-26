function useLanguage() {
  let willRenderLanguage = navigator.language.search(/ko/);
  const koLanguage = navigator.language.search(/ko/);
  const enLanguage = navigator.language.search(/en/);
  const cnLanguage = navigator.language.search(/cn/);

  if (koLanguage === 0) {
    willRenderLanguage = 'ko';
  } else if (enLanguage === 0) {
    willRenderLanguage = 'en';
  } else if (cnLanguage === 0) {
    willRenderLanguage = 'cn';
  } else {
    willRenderLanguage = 'en';
  }
  return willRenderLanguage;
}

export default useLanguage;
