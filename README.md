My name is NIWENIRINGIYE Christian.

# CNPortfolio

| | |
|---|---|
| **Registration number** | 25/27889 |
| **App name** | CNPortfolio |
| **Verification code** | MOB-A2-7889 |
| **GitHub** | [cxnisme](https://github.com/cxnisme) · repository `MOB_A2_2527889` |
| **Android package** | `rw.ac.ines.ug2527889.cnportfolio` |
| **Version** | 1.0.0 |

## Purpose

CNPortfolio is a personal portfolio app for recruiter meetings. It runs as a standalone Android app (no Expo Go), works fully offline, and shows who I am, what I can do and what I have built.

## Features

- **Home**: the exact identity sentence, profile photo or avatar, headline, short introduction, availability, primary skill and verification code, plus a featured project.
- **Skills**: five skills with level bars and tags, plus an education and training timeline built from reusable components.
- **Projects**: four projects, each with a separate detail screen (problem, my contribution, technology used).
- **Profile**: controlled fields for headline and short biography, choice chips for primary skill and availability, with field-level validation (required, length limits 8 to 80 and 20 to 240, one choice per group).
- **Profile photo**: take a photo or choose one from the gallery, preview it, replace it or remove it. Permission denial and cancellation show clear messages.
- **Persistence**: profile text and the local image reference are saved with AsyncStorage and restored after a restart.
- **Offline**: everything works in Airplane Mode. The only online feature, the GitHub link, is labelled "(needs internet)".
- **About**: app name, my name, registration number, verification code, version and a data-use statement. Opened from the Profile tab.
- **Navigation**: four bottom tabs (Home, Skills, Projects, Profile) with a stack inside Projects for Project Details, and a root stack route for About. Going back keeps the current session.

## Design

Light "paper and forest" theme: off-white background (`#F3F1EC`), white cards, forest-green accent (`#1F5F4A`) and a floating tab bar. The app uses the phone's system fonts so it works fully offline.

## Tech stack

React Native, Expo (SDK 54), TypeScript, React Navigation (bottom tabs + native stack), Expo ImagePicker, Expo FileSystem, `@react-native-async-storage/async-storage`, EAS Build.

## Setup and run

```bash
npm ci
npx expo install --check     # confirms package versions match the Expo SDK
npm run typecheck            # tsc --noEmit
npx expo start               # development only; the submitted build is the APK
```

## Build the APK (EAS)

```bash
npm install -g eas-cli
eas login
eas build:configure          # first time only
eas build -p android --profile preview
```

The `preview` profile in `eas.json` produces an installable `.apk`. Download it, rename it to `MOB_A2_2527889.apk`, install it on the phone and launch it without Expo Go.

## Tested device and Android version

> **Not yet device-tested.** Record the device model, Android version and Airplane Mode result here after installing and testing the APK.

## Final commit hash

The current repository checkout is on commit `a26af258d78f3b4c41a4fd3326a758d5b8bcfd0f`. The Android APK was generated from the earlier source commit `b26cf9fd5a676a3711a1b72892f8dac2d34b40bb` used for the latest build.

## Release

- GitHub release (v1.0.0): not published yet. The assignment's phone-test record and demo video still need to be completed before the final release.
- Installable preview APK: [download from the EAS build](https://expo.dev/artifacts/eas/oKCLX0Per4-VXtlWTBWHqpBSqnVTT12l5iXvbgPTjoY.apk). The build was created from commit `b26cf9fd5a676a3711a1b72892f8dac2d34b40bb` and is listed at [EAS build details](https://expo.dev/accounts/ckristian/projects/cnportfolio/builds/3ebabeca-4cd4-4dcf-aee4-a6af0baab82b).

## Known limitations

- Android only. There is no iOS or web build.
- Data lives only on the phone. Uninstalling the app or clearing its storage deletes it, and there is no backup or sync.
- The profile photo is copied into app storage when it is chosen. If the file is removed outside the app, the avatar with initials is shown again.
- Skills, projects and the education timeline are fixed in the app code (`src/data/portfolio.ts`). Only the headline, biography, primary skill, availability and photo are editable in the app.
- Keyboard behaviour on the Profile screen was written for Android edge-to-edge layout and must be checked on the real device.
- The GitHub link needs internet.

## Acknowledgements

Libraries are listed in `package.json`. Supporting declaration files, including the AI-use declaration, are stored in the `evidence` folder.
