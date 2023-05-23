# LianLian Global Platform Onboarding SDK

## Installation

##### Option 1: Use llg-test-sdk-onboarding

Install with NPM

```bash
npm install llg-sdk-onboarding
```

Or, with Yarn

```bash
yarn add llg-sdk-onboarding
```

#### Option 2: Import as a static resource

Staging:
```html
<script src="https://eu-ewallet-share-bucket.lianlianglobal.com/sdk/onboarding/v1/prod/index.min.js" />
```

Prod:
```html
<script src="https://eu-ewallet-share-bucket.lianlianglobal.com/sdk/onboarding/v1/prod/index.min.js" />
```

## Initialization

```ts
<div id="llg-kyc"></div>

import { init } from 'llg-sdk-onboarding';

const options = {
    el: '#llg-kyc',
    env: 'prod',
    langKey: 'en',
    token: 'Bearer US_3AT4IwessFmm8H1FYBmV04tHiKMCy',
    kycType: 'VN',
    mountedCb: () => {},
    successCb: () => {},
    failedCb: () => {},
}

await init(options);

// Or
await window.LLGOnboarding.init(options);
```


| Option         | Type     | Required? | Default value | Description                                                                                                                                                         |
| :------------- | :------- | :-------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `env`          | `string` | **NO**    | `prod`        | LianLian Global environment you want to integrate your application with. Options include: `staging`, `prod`                                                   |
| `langKey`      | `string` | **NO**    | `en`          | Language. Options include: `en`                                                                                                                             |
| `token`     | `string` | **YES**   | -             | |
| `kycType`     | `string` | **YES**   | -         |  KYC type. Options include: `VN     `                                       |
| `mountedCb` | `function` | **NO**   | -             |
| `successCb` | `function` | **NO**   | -             |
| `failedCb` | `function` | **NO**   | -             |



## Destroy Onboarding SDK
```ts
import { destroy } from 'llg-sdk-onboarding';

destroy();

// Or
window.LLGOnboarding.destroy();
```