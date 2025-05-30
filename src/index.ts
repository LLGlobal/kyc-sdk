import {
    InitOptions,
    LLGEnv,
    LLGOnboarding,
    initType
  } from '../types';

  export type { InitOptions, LLGOnboarding };

  declare global {
    interface Window {
      LLGOnboarding: LLGOnboarding;
    }
  }

  const SDK_VERSION = 'v5';

  const ENV_HOST = {
    staging: `eu-ewallet-share-bucket.lianlianglobal.com/sdk/onboarding/${SDK_VERSION}/staging`,
    ste: `eu-ewallet-share-bucket.lianlianglobal.com/sdk/onboarding/${SDK_VERSION}/ste`,
    prod: `eu-ewallet-share-bucket.lianlianglobal.com/sdk/onboarding/${SDK_VERSION}/prod`,
  };


  export const getGatewayUrl = (env: LLGEnv): string => `https://${ENV_HOST[env] || ENV_HOST.prod}/`;
  const STATIC_FILE_NAME = 'index.min.js';
  // test

  // 创建script标签，插入到head || body内
  const createScript = (gatewayUrl: string): HTMLScriptElement => {
    const script = document.createElement('script');
    script.src = `${gatewayUrl}${STATIC_FILE_NAME}`;

    const parentDom = document.head || document.body;

    if (!parentDom) {
      throw new Error('LLG Onboarding SDK scripts requires a <head> or <body> html element in order to be loaded.');
    }

    parentDom.appendChild(script);

    return script;
  };


  // 加载SDK资源
  export const loadScript = async ({ env }: { env?: LLGEnv }) => {
    if (typeof window === 'undefined') {
      return null;
    }

    if (window.LLGOnboarding) {
      return window.LLGOnboarding;
    }

    const MAX_RETRY_COUNT = 3;
    let RETRY_COUNT = 0;
    const sleep = () => new Promise((resolve) => window.setTimeout(resolve, 500));

    const tryToResolve = async (): Promise<LLGOnboarding> => {
      const scriptUrl = getGatewayUrl(env || 'prod');
      const script: HTMLScriptElement =
        document.querySelector(`script[src="${scriptUrl}"], script[src="${scriptUrl}/"]`) || createScript(scriptUrl);

      return new Promise((resolve, reject) => {
        script.addEventListener('load', () => {
          if (window.LLGOnboarding) {
            resolve(window.LLGOnboarding);
          } else {
            reject(new Error('Failed to load LLG Onboarding SDK on load event.'));
          }
        });

        script.addEventListener('error', () => {
          reject(new Error('Failed to load LLG Onboarding SDK scripts.'));
          script.remove && script.remove();
        });
      });
    };

    while (RETRY_COUNT < MAX_RETRY_COUNT) {
      try {
        return await tryToResolve();
      } catch (error) {
        RETRY_COUNT++;
        await sleep();
      }
    }

    return null;
  };

  // 初始化SDK
  export const init: typeof initType = async (options: InitOptions) => {
    await loadScript(options);

    if (!window.LLGOnboarding) {
      const errMsg = 'Failed when initialize LLG platform onboarding SDK';
      console.error(errMsg);
      return Promise.reject(new Error(errMsg));
    } else {
      return window.LLGOnboarding.init(options);
    }
  };


  // 销毁SDK
  export const destroy = () => {
    if (!window.LLGOnboarding) {
      const errMsg = 'Failed when initialize LLG platform onboarding SDK';
      console.error(errMsg);
      return Promise.reject(new Error(errMsg));
    } else {
      return window.LLGOnboarding.destroy();
    }
  };