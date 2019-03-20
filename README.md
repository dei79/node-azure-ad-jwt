# azure-ad-jwt
This component makes it super simple to validate a JWT token issued by the Azure Active Directory. Currently the version 
is not usinge caching this means the certificates will be downloaded from Mirosoft with every verification request. 
If you are using Azure AAD tokens in every request against your API additional caching would make sense. 

## Usage

```javascript
var aad = require('azure-ad-jwt');

var jwtToken = '<<yourtoken>>';

aad.verify(jwtToken, null, function(err, result) {
    if (result) {
        console.log("JWT is valid");
    } else {
        console.log("JWT is invalid: " + err);
    }
});
```

## JsonWebToken 
The library is a wrapper around the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) module so the options field can be used as described in this project. The following example checks if it is a valid graph API token: 

```javascript
aad.verify(jwtToken, { audience: 'https://graph.windows.net'}, function(err, result) ...
```


## Options
Additional options specific to this library

| Option                       | Format | Description                                                                                                                                                                                                                                                                                | Default                                                                   |
|------------------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| `aadOpenIdConfigUrlTemplate` | String | optional string template in the format `https://login.windows.net/{tenantId}/.well-known/openid-configuration`. Allows for config retrieval from various locations. All occurrences of `{tenantId}` in the string will be replaced with the tenant ID (`tid`) in the supplied token claims | `"https://login.windows.net/{tenantId}/.well-known/openid-configuration"` |
| `aadIssuerUrlTemplate`       | String | optional string template in the format `https://sts.windows.net/{tenantId}/`.  Allows for specific issuer configuration.  All occurrences of `{tenantId}` in the string will be replaced with the tenant ID (`tid`) in the supplied token claims                                           | `"https://login.windows.net/{tenantId}/"`                                 |
|                              |        |                                                                                                                                                                                                                                                                                            |                                                                           |