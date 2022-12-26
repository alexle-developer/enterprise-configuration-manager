import { client } from '../../api/HttpClient';
import { IConfig } from '../../models/ConfigModel';
import { IConfigSetting } from '../../models/ConfigSettingModel';
import { IServers } from '../../models/ServersModel';

export class AdminClient {
    public getServers = () => client.getJson<IServers[]>('admin/editservers.json');
    public getConfigs = () => client.getJson<IConfig[]>('admin/editconfig.json');
    public getSettings = () => client.getJson<IConfigSetting[]>('admin/editsetting.json');
}
