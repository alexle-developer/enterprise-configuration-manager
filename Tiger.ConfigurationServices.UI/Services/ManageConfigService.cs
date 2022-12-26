using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tiger.ConfigurationServices.UI.Models;

namespace Tiger.ConfigurationServices.UI.Services
{
    public class ManageConfigService
    {
        private MaintContext dbContext = new MaintContext();

        /// <summary>
        ///  Config Table
        /// </summary>
        public async Task<IEnumerable<Config>> GetAllConfigAsync()
        {
            IEnumerable<Config> allConfigs = await dbContext.Config.ToListAsync().ConfigureAwait(false);

            return allConfigs.OrderBy(c => c.ConfigName).ToList();
        }

        /// <summary>
        ///  ConfigSetting Table
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<ConfigSetting>> GetAllConfigSettingAsync()
        {
            IEnumerable<ConfigSetting> allSettings = await dbContext.ConfigSetting.ToListAsync().ConfigureAwait(false);

            return allSettings.OrderBy(cs => cs.ConfigSettingName).ToList();
        }

        /// <summary>
        /// List of Config Names (e.g. 1, SRC_PROD)
        /// Data Source for Config Dropdown
        /// </summary>
        public async Task<IList<KeyValuePair<int, string>>> GetConfigNamesAsync()
        {
            var allConfigs = await GetAllConfigAsync();

            // sort alphabetical order
            IList<KeyValuePair<int, string>> kvConfigList = allConfigs
                .Select(x => new KeyValuePair<int, string>(x.ConfigKey, x.ConfigName))
                .OrderBy(o => o.Value).ToList();

            return kvConfigList;
        }

        /// <summary>
        /// List of Config Settings (e.g 101, CuroDBName)
        /// Data Source for Setting Dropdown
        /// </summary>
        public async Task<IList<KeyValuePair<int, string>>> GetConfigSettingsAsync()
        {
            var allConfigSetting = await GetAllConfigSettingAsync();

            // sort alphabetical order
            IList<KeyValuePair<int, string>> kvConfigSettingList = allConfigSetting
                .Select(x => new KeyValuePair<int, string>(x.ConfigSettingKey, x.ConfigSettingName))
                .OrderBy(o => o.Value).ToList();

            return kvConfigSettingList;
        }

        /// <summary>
        /// Get All Config Values (no filter)
        /// </summary>
        public async Task<IEnumerable<ConfigValueResult>> GetAllConfigValuesAsync()
        {
            var configValueResults = new List<ConfigValueResult>();

            using (var dbContext = new MaintContext())
            {
                var result = await (from cv in dbContext.ConfigValue
                                    join c in dbContext.Config on cv.ConfigKey equals c.ConfigKey
                                    join cs in dbContext.ConfigSetting on cv.ConfigSettingKey equals cs.ConfigSettingKey
                                    select new
                                    {
                                        cv.ConfigValueKey,
                                        cv.ConfigKey,
                                        cv.ConfigSettingKey,
                                        c.ConfigName,
                                        cs.ConfigSettingName,
                                        ConfigValue = cv.ConfigValue1
                                    }
                                    ).OrderBy(o => o.ConfigName)
                                    .ThenBy(a => a.ConfigSettingName)
                                    .ToListAsync();

                configValueResults = result.Select(x => new ConfigValueResult
                {
                    ConfigValueKey = x.ConfigValueKey,
                    ConfigKey = x.ConfigKey,
                    ConfigSettingKey = x.ConfigSettingKey,
                    ConfigName = x.ConfigName,
                    ConfigSettingName = x.ConfigSettingName,
                    ConfigValue = x.ConfigValue
                }).ToList();
            }

            return configValueResults.ToList();
        }

        /// <summary>
        /// Get Config Value Result by Config Key
        /// </summary>
        /// <param name="configKey">Selected Config Key</param>
        public async Task<IEnumerable<ConfigValueResult>> GetConfigValuesByConfigKeyAsync(int configKey)
        {
            var configValueResults = new List<ConfigValueResult>();

            using (var dbContext = new MaintContext())
            {
                var result = await (from cv in dbContext.ConfigValue
                                    join c in dbContext.Config on cv.ConfigKey equals c.ConfigKey
                                    join cs in dbContext.ConfigSetting on cv.ConfigSettingKey equals cs.ConfigSettingKey
                                    where cv.ConfigKey == configKey
                                    select new
                                    {
                                        cv.ConfigValueKey,
                                        cv.ConfigKey,
                                        cv.ConfigSettingKey,
                                        c.ConfigName,
                                        cs.ConfigSettingName,
                                        ConfigValue = cv.ConfigValue1
                                    }
                                    ).OrderBy(o => o.ConfigSettingName)
                                    .ToListAsync();

                configValueResults = result.Select(x => new ConfigValueResult
                {
                    ConfigValueKey = x.ConfigValueKey,
                    ConfigKey = x.ConfigKey,
                    ConfigSettingKey = x.ConfigSettingKey,
                    ConfigName = x.ConfigName,
                    ConfigSettingName = x.ConfigSettingName,
                    ConfigValue = x.ConfigValue
                }).ToList();
            }

            return configValueResults.ToList();
        }

        /// <summary>
        ///  Get Config Value Result by Config Setting Key
        /// </summary>
        /// <param name="configSettingKey"></param>
        /// <returns></returns>
        public async Task<IEnumerable<ConfigValueResult>> GetConfigValuesByConfigSettingKeyAsync(int configSettingKey)
        {
            var configValueResults = new List<ConfigValueResult>();

            using (var dbContext = new MaintContext())
            {
                var result = await (from cv in dbContext.ConfigValue
                                    join c in dbContext.Config on cv.ConfigKey equals c.ConfigKey
                                    join cs in dbContext.ConfigSetting on cv.ConfigSettingKey equals cs.ConfigSettingKey
                                    where cv.ConfigSettingKey == configSettingKey
                                    select new
                                    {
                                        cv.ConfigValueKey,
                                        cv.ConfigKey,
                                        cv.ConfigSettingKey,
                                        c.ConfigName,
                                        cs.ConfigSettingName,
                                        ConfigValue = cv.ConfigValue1
                                    }
                                    ).OrderBy(o => o.ConfigSettingName)
                                    .ThenBy(t => t.ConfigName)
                                    .ToListAsync();

                configValueResults = result.Select(x => new ConfigValueResult
                {
                    ConfigValueKey = x.ConfigValueKey,
                    ConfigKey = x.ConfigKey,
                    ConfigSettingKey = x.ConfigSettingKey,
                    ConfigName = x.ConfigName,
                    ConfigSettingName = x.ConfigSettingName,
                    ConfigValue = x.ConfigValue
                }).ToList();
            }

            return configValueResults.ToList();
        }
    } //class
} //namespace