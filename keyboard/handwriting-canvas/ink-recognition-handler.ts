export class InkRecognitionHandler {
  public static webAsync(analyzedChar: any, analyzedCharCount: number, matcherMMAH: any): Promise<string[]> {
    return new Promise((resolve, reject) => {
      if (matcherMMAH === undefined) {
        reject(`mmah.json loading failed`);
      }

      let matchResult: Array<string> = [];

      matcherMMAH.match(analyzedChar, analyzedCharCount, matches => {
        matches.forEach(item => {
          matchResult.push(item.character);
        });

        resolve(matchResult);
      });
    });
  }

  public static async nativeAsync(analyzedChar: any): Promise<string[]> {
    let pointList: Array<any> = [];

    analyzedChar.analyzedStrokes.forEach((item, index) => {
      analyzedChar.analyzedStrokes[index].points.forEach(point => {
        pointList.push({
          X: point[0],
          Y: point[1]
        });
      });
    });
    let matchResult: Array<string> = await this._inkTranslatorAsync(pointList);

    return matchResult;
  }

  private static _inkTranslatorAsync(points: Array<any>): Promise<string[]> {
    return new Promise((resolve, reject) => {
      cordova.exec(
        success => {
          resolve(success);
        },
        fail => {
          reject(fail);
        },
        'InkTranslator', 'TranslateToChinese', [points]);
    });
  }

  public static async getMatchResult(inkRecognitionHandlerType: string, analyzedChar: any, analyzedCharCount: number, matcherMMA: any): Promise<string[]> {
    let matchResult: Array<string> = [];

    switch (inkRecognitionHandlerType) {
      case 'web':
        matchResult = await this.webAsync(analyzedChar, analyzedCharCount, matcherMMA);
        break;

      case 'native':
        matchResult = await this.nativeAsync(analyzedChar);
        break;

      default:
        matchResult = await this.webAsync(analyzedChar, analyzedCharCount, matcherMMA);
        break;
    }

    return matchResult;
  }
};
