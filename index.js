var axios = require( 'axios' )
var jsonBody = require( 'body/json' )
var googleTranslate = require( 'google-translate' )( process.env.GOOGLE_TRANSLATE_API_KEY )
var shouldTranslateMessage = require('./language-utils.js').shouldTranslateMessage
var tranlsateTo = 'en'
var botUrl = `https://api.telegram.org/bot${ process.env.TELEGRAM_BOT_ID }/sendMessage`

export default ( req, res ) => {
  jsonBody( req, res, function ( err, body ) {
    if ( err ) {
      res.end( 'Error :' + err )

      return
    }
    // {"message_id":518,"from":{"id":someid,"is_bot":false,"first_name":"Sergey","last_name":"Morozov","language_code":"en"},"chat":{"id":-someid,"title":"test","type":"group","all_members_are_administrators":false},"date":1552579490,"text":"Привет"}
    const { message } = body

    if ( !shouldTranslateMessage( message.text ) ) {
      console.log( `not translating this: "${ message.text }"` )

      res.end( "Looks like this text doensn't need to be translated" )

      return
    }

    console.log( `goint to try to translate ${ message.text }` )

    googleTranslate.translate( message.text, tranlsateTo, function( err, translation ) {
      if ( err ) {
        res.end( 'Could not translate. Got error :' + err )
  
        return
      }

      console.log( translation );

      axios.post(
            botUrl,
            {
              chat_id: message.chat.id,
              text: 
`${ message.from.first_name } said:
"${ message.text }" 

In Russian, it means
"${ translation.translatedText }"`
            }
        ).then( response => {
          console.log( 'Success' )

          res.end( 'ok' )
        } ).catch( err => {
          console.log( 'Error :', err )

          res.end( 'Error :' + err )
        } )
    } );
  } )
}
