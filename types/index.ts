export type LLGEnv = 'staging' | 'prod';

export type KYC_TYPE = 'VN' | 'SG' | 'TH' | 'US' | 'GB';

/**
 * Global init option config for LLG javascript SDK
 */
export type InitOptions = {
    /**
     * el
     */
    el: string;
    /**
     * Indicate which LLG integration env your merchant site would like to connect with
     * If not provide default will be prod which point to [LLG Checkout](https://checkout.LLG.com)
     */
    env?: LLGEnv;
    /**
     * i18n localization config, default is 'en'
     */
    langKey?: 'en';
    /**
     * token
     */
    token: string;
    /**
    * kycType
    */
    kycType: KYC_TYPE;
    /**
     * mountedCb
     */
    mountedCb(): void;
    /**
     * successCb
     */
    successCb(): void;
    /**
     * failedCb
     */
    failedCb(): void;
};

export declare const initType: (options: InitOptions) => void;


export type LLGOnboarding = {
    init(options: InitOptions): void;
    destroy(): void;
};

