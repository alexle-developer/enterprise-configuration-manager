import { client } from '../../api/HttpClient';
import { IConfigEdit } from '../../models/ConfigEditModel';
import { IConfigSettingEdit } from '../../models/ConfigSettingEditModel';
import { IConfigValueEdit } from '../../models/ConfigValueEditModel';

export class HistoryClient {
    // path must match with routes.cs
    public getConfigEditHistory = () => client.getJson<IConfigEdit[]>('history/configedit.json');
    public getConfigSettingEditHistory = () => client.getJson<IConfigSettingEdit[]>('history/configsettingedit.json');
    public getConfigValueEditHistory = () => client.getJson<IConfigValueEdit[]>('history/configvalueedit.json');
}
