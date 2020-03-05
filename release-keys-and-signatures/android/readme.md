# Commands and information for producing and signing production build APK

**Key Name:**
iwbms-mobile-release-key.keystore

**Alias:**
iwbms-mobile

**Keystore Password:**
`Je4t294$v7xu6CBDyDOvasMMaFn*cy7Rj3dWsWMS5iLUtnJrWINsumU$inBI867wTH^kI4BVg3kAv#OF4Ex^Oc%rdwQ$yw6IO17*`

**Keystore Info:**
CN=Prateek Kedia, OU=Development, O=IDCLE, L=Mumbai, ST=Maharashtra, C=IN

**Command used to generate production build**
`ionic cordova build android --prod --release`

**Command used to generate keystore file:**
`keytool -genkey -v -keystore iwbms-mobile-release-key.keystore -alias iwbms-mobile -keyalg RSA -keysize 2048 -validity 10000`

**Command used to sign the production build**
`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore iwbms-mobile-release-key.keystore app-release-unsigned.apk iwbms-mobile`

**Command used to zipalign the signed production build**
`$ANDROID_SDK_ROOT/build-tools/29.0.3/zipalign -v 4 app-release-unsigned.apk iwbms-mobile.apk`
