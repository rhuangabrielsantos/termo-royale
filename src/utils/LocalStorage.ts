export class LocalStorage {
  private static readonly KEY_LANGUAGE = 'language';

  public static getLanguage(): string {
    return localStorage.getItem(LocalStorage.KEY_LANGUAGE) || 'ptBR';
  }

  public static setLanguage(language: string): void {
    localStorage.setItem(LocalStorage.KEY_LANGUAGE, language);
  }
}
