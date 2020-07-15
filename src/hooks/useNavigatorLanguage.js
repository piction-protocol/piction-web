const languages = ['ko', 'zh', 'en'];

function useNavigatorLanguage() {
  const navigatorLanguage = navigator.language;

  return languages.find(language => navigatorLanguage.includes(language)) || 'en';
}

export default useNavigatorLanguage;
