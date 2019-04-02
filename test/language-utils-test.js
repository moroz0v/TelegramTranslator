var languageUtils = require('../language-utils');
var expect = require('chai').expect;

describe('isLetter()', function () {
    it('Should determine if Latin and Cyrillic character is a letter', function () {
      expect( languageUtils.isLetter( ) ).to.be.equal( false );

      expect( languageUtils.isLetter( '25' ) ).to.be.equal( false );

      expect( languageUtils.isLetter( 25 ) ).to.be.equal( false );

      expect( languageUtils.isLetter( '' ) ).to.be.equal( false );

      expect( languageUtils.isLetter( '-' ) ).to.be.equal( false );

      expect( languageUtils.isLetter( ' ' ) ).to.be.equal( false );

      expect( languageUtils.isLetter( 'a' ) ).to.be.equal( true );

      expect( languageUtils.isLetter( 'Ё' ) ).to.be.equal( true );
    });
  });

  describe('isRussian()', function () {
    it('Should determine if text starts w/ a Russian letter', function () {
        expect( languageUtils.isRussian( ) ).to.be.equal( false );

        expect( languageUtils.isRussian( 234 ) ).to.be.equal( false );

        expect( languageUtils.isRussian( '' ) ).to.be.equal( false );

        expect( languageUtils.isRussian( '-a' ) ).to.be.equal( false );

        expect( languageUtils.isRussian( '-ВвГгДдЕеЁё' ) ).to.be.equal( true );

        expect( languageUtils.isRussian( '-(*&%)(#*^&%#$ВвГгДдЕеЁё' ) ).to.be.equal( true );

        expect( languageUtils.isRussian( '-(*&%)(#*^&%#$' ) ).to.be.equal( false );

        expect( languageUtils.isRussian( '-/:;ну вот' ) ).to.be.equal( true );
    });
  });



