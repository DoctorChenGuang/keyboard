export class FontLoader {
  public static getMmahJsonFileAsync(filePath): Promise<any> {
    return new Promise(function (resolve, reject) {
      HanziLookup.init('mmah', location.origin + filePath, () => {
        const matcherMMAH = new HanziLookup.Matcher("mmah");

        matcherMMAH && resolve({ matcherMMAH: matcherMMAH });

        !matcherMMAH && reject({ errorMsg: `mmah.json loading failed` });
      });
    });
  }
};
