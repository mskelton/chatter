#!/usr/bin/env sh

KEY_CHAIN=build.keychain
MACOS_CERT_P12_FILE=certificate.p12

# Recreate the certificate from the secure environment variable
echo $MACOS_CERT_P12 | base64 --decode >$MACOS_CERT_P12_FILE

#create a keychain
security create-keychain -p actions $KEY_CHAIN

# Make the keychain the default so identities are found
security default-keychain -s $KEY_CHAIN

# Unlock the keychain
security unlock-keychain -p actions $KEY_CHAIN

# Worldwide Developer Relations Certificate Authority (Expiring 02/20/2030)
security import ./assets/certs/AppleWWDRCAG3.cer -k $KEY_CHAIN -T /usr/bin/codesign

# Worldwide Developer Relations - G4 (Expiring 12/10/2030)
security import ./assets/certs/AppleWWDRCAG4.cer -k $KEY_CHAIN -T /usr/bin/codesign

# Developer ID - G2 (Expiring 09/17/2031)
security import ./assets/certs/DeveloperIDG2CA.cer -k $KEY_CHAIN -T /usr/bin/codesign

# Developer cert
security import $MACOS_CERT_P12_FILE -k $KEY_CHAIN -P $MACOS_CERT_PASSWORD -T /usr/bin/codesign

# Set the partition list (sort of like an access control list)
security set-key-partition-list -S apple-tool:,apple: -s -k actions $KEY_CHAIN

# remove certs
rm -fr *.p12

# Echo the identity, just so that we know it worked.
# This won't display anything secret.
security find-identity -v -p codesigning $KEY_CHAIN
