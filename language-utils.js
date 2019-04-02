var russianAlphabet = 'АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя'

module.exports = {
    /**
     * @param { String } letter Checks if given characted is a letter. Only works with Latin and Cyrillic - based
     * alphabets
     */
    isLetter: ( letter ) => { 
        return typeof( letter ) === 'string' 
            && letter.length == 1 
            && letter.toLowerCase() != letter.toUpperCase() 
    },

    /**
     * This is a method to do a simple Russian language detection. Verifies that the first letter
     * in a given text is a Russian letter
     * @param { String } text text to analyze
     */
    isRussian: ( text ) => {
        if( text != undefined && typeof( text ) === 'string' ) {
            var textAsArray = Array.from( text );

            if( textAsArray.length > 0 ) {
                var firstLetter = 
                    textAsArray.find( letter => module.exports.isLetter( letter ) );
    
                return russianAlphabet.includes( firstLetter );
            }
        }
        
        return false
    },
    
    /**
     * Wrapper around language detection
     */
    shouldTranslateMessage: ( text ) => {
        return module.exports.isRussian( text )
    }
  }