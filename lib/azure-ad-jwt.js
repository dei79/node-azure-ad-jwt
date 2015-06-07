var exports = module.exports;

exports.AzureActiveDirectoryValidationManager = require('./azure-ad-validation-manager.js');

exports.verify = function(jwtString, options, callback) {

    var aadManager = new exports.AzureActiveDirectoryValidationManager();

    // get the tenant id from the token
    var tenantId = aadManager.getTenantId(jwtString);

    // download the open id config
    aadManager.requestOpenIdConfig(tenantId, function(err, openIdConfig) {

        // download the signing certificates from Microsoft for this specific tenant
        aadManager.requestSigningCertificates(openIdConfig.jwks_uri, function(err, certificates) {

            // verify against all certificates
            aadManager.verify(jwtString, certificates, options, callback);
        })
    });
}