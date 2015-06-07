# azure-ad-jwt
This component makes it super simple to validate a JWT token issued by the Azure Active Directory. Currently the version 
is not usinge caching this means the certificates will be downloaded from Mirosoft with every verification request. 
If you are using Azure AAD tokens in every request against your API additional caching would make sense. 

## Sample

```javascript
var aad     = require('azure-ad-jwt');

var jwtToken = '<<yourtoken>>';

aad.verify(jwtToken, null, function(err, result) {
    if (result) {
        console.log("JWT is valid");
    } else {
        console.log("JWT is invalid: " + err);
    }
});
```








