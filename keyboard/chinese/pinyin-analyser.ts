export class PinyinAnalyser {
  public static getChinesePharseAsync(data: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!IME.loaded) {
        reject(`IME files loaded failed`);
      }

      let pharse = IME.convert(data);

      resolve(pharse);
    });
  }

  public static getAutomatedWords(data: string): any {
    let pharse = IME.automate(data);

    return pharse;
  }
};
