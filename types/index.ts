export type LLGEnv = 'staging' | 'prod' | 'ste';

export type KYC_TYPE = 'VN' | 'SG' | 'TH' | 'US' | 'GB' | 'CN' | 'BR';

export type OPTIONS_TYPE = {
    kycData: any;
    readonly: any;
}

/**
 * Global init option config for LLG javascript SDK
 */
export type InitOptions = {
    /**
     * el
     */
    el: string;
    /**
     * env
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
    * kycType
    */
    options: OPTIONS_TYPE;
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

