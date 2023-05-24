# Set the filename
export CERTIFICATE_P12=cert.p12

# Let's invent a new keychain
export KEYCHAIN=build.keychain

# Decode the environment variable into our file
echo $MACOS_CERT_P12 | base64 --decode >$CERTIFICATE_P12

# Create the keychain with a password
security create-keychain -p actions $KEYCHAIN

# Make the custom keychain default, so xcodebuild will use it for signing
security default-keychain -s $KEYCHAIN

# Unlock the keychain
security unlock-keychain -p actions $KEYCHAIN

# Add certificates to keychain and allow codesign to access them

# 1) Apple Worldwide Developer Relations Certification Authority
security import ./assets/certs/apple.cer -k ~/Library/Keychains/$KEYCHAIN -T /usr/bin/codesign
# 2) Developer Authentication Certification Authority
security import ./assets/certs/dac.cer -k ~/Library/Keychains/$KEYCHAIN -T /usr/bin/codesign
# 3) Developer ID (That's you!)
security import $CERTIFICATE_P12 -k $KEYCHAIN -P $MACOS_CERT_PASSWORD -T /usr/bin/codesign 2>&1 >/dev/null

# Let's delete the file, we no longer need it
rm $CERTIFICATE_P12

# Set the partition list (sort of like an access control list)
security set-key-partition-list -S apple-tool:,apple: -s -k actions $KEYCHAIN

# Echo the identity, just so that we know it worked.
# This won't display anything secret.
security find-identity -v -p codesigning
