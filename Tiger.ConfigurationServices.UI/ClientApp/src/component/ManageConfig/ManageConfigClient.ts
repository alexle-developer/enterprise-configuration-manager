import { client } from '../../api/HttpClient';
import { KeyValuePair } from '../Common/KeyValuePair';
import { IConfigValueResult } from '../../models/ConfigValueResultModel';

export class ManageConfigClient {
    public populateConfigDropdown = () => client.getJson<KeyValuePair<number, string>[]>('manageconfig/confignames.json');
    public populateSettingDropdown = () => client.getJson<KeyValuePair<number, string>[]>('manageconfig/configsettings.json');
    public getConfigValuesByConfigKey = (configKey: number) => client.getJson<IConfigValueResult[]>(`manageconfig/result/${configKey}`);
    public getConfigValuesByConfigSettingKey = (configSettingKey: number) =>
        client.getJson<IConfigValueResult[]>(`manageconfig/result/setting/${configSettingKey}`);
}
