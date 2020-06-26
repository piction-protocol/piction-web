function useLanguage() {
  let willRenderLanguage = navigator.language.search(/ko/);
  const koLanguage = navigator.language.search(/ko/);
  const enLanguage = navigator.language.search(/en/);

  if (koLanguage === 0) {
    willRenderLanguage = 'ko';
  } else if (enLanguage === 0) {
    willRenderLanguage = 'en';
  } else {
    willRenderLanguage = 'cn';
  }
  return willRenderLanguage;
}

export default useLanguage;
