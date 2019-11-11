del platforms\android\app\build\outputs\apk\release\app-release.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.jks -storepass af35a8fae8c4 platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk android@paoro.biz
zipalign -v 4 platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk platforms\android\app\build\outputs\apk\release\app-release.apk
apksigner.bat verify platforms\android\app\build\outputs\apk\release\app-release.apk
