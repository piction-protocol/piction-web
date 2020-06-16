function useLanguage() {
  let willRenderLanguage = navigator.language.search(/ko/);
  if (willRenderLanguage === 0) {
    willRenderLanguage = 'ko';
  } else {
    willRenderLanguage = 'en';
  }
  return willRenderLanguage;
}

export default useLanguage;
