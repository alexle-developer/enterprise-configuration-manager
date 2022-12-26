export interface IConfigEdit {
    configEditKey: number;
    configKey: number;
    configName: string;
    curoDbServerKey: number;
    applogDbServerKey: number;
    isProduction: boolean;
    description: string;
    actionType: string;
    tlr: string;
    dateEntered?: Date;
    tellerName: string;
}
