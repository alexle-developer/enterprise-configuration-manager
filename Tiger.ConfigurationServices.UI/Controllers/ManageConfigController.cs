using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tiger.ConfigurationServices.UI.Services;

namespace Tiger.ConfigurationServices.UI.Controllers
{
    public class ManageConfigController : Controller

    {
        private readonly ManageConfigService _manageConfigService;

        public ManageConfigController(ManageConfigService manageConfigService)
        {
            _manageConfigService = manageConfigService ?? throw new ArgumentNullException(nameof(manageConfigService)); ;
        }

        /// <summary>
        /// Config Dropdown
        /// </summary>
        [HttpGet]
        [Route(Routes.ManageConfig.ConfigNames)]
        public async Task<IList<KeyValuePair<int, string>>> GetConfigNames()
        {
            // x.ConfigKey - x.ConfigName (e.g. [5 - SRC_DEV], [113 - CAN_PRE])
            var configNames = await _manageConfigService.GetConfigNamesAsync();
            return configNames;
        }

        /// <summary>
        /// Setting Dropdown
        /// </summary>
        [HttpGet]
        [Route(Routes.ManageConfig.ConfigSettings)]
        public async Task<IList<KeyValuePair<int, string>>> GetConfigSettings()
        {
            // x.ConfigSettingKey - x.ConfigSettingName (e.g. [288 - AchSendPath], [289 - AchRecvPath)
            var configSettings = await _manageConfigService.GetConfigSettingsAsync();
            return configSettings;
        }

        [HttpGet]
        [Route(Routes.ManageConfig.ConfigValueByConfigKey)]
        public async Task<IActionResult> GetConfigValuesByConfigKey(int configKey)
        {
            var result = await _manageConfigService.GetConfigValuesByConfigKeyAsync(configKey).ConfigureAwait(false);
            return Json(result);
        }

        [HttpGet]
        [Route(Routes.ManageConfig.ConfigValueByConfigSettingKey)]
        public async Task<IActionResult> GetConfigValueByConfiSettingKey(int configSettingKey)
        {
            var result = await _manageConfigService.GetConfigValuesByConfigSettingKeyAsync(configSettingKey).ConfigureAwait(false);
            return Json(result);
        }
    } //class
} //namespace