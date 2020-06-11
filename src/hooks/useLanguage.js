function useLanguage() {
  const language = navigator.language.split('-')[0];

  return language;
}

export default useLanguage;
