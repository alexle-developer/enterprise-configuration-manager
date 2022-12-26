using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Threading.Tasks;
using Tiger.ConfigurationServices.UI.Services;

namespace Tiger.ConfigurationServices.UnitTest
{
    [TestClass]
    public class APIControllerTest
    {
        [TestMethod]
        public async Task GetConfigNames_Dropdown_Test()
        {
            // config dropdown
            ManageConfigService mcSvc = new ManageConfigService();
            var results = await mcSvc.GetConfigNamesAsync();

            foreach (var item in results)
            {
                Console.WriteLine($"{item.Key} - {item.Value}");
            }
        }

        [TestMethod]
        public async Task GetConfigSettings_Dropdown_Test()
        {
            // setting dropdown
            ManageConfigService mcSvc = new ManageConfigService();
            var results = await mcSvc.GetConfigSettingsAsync();

            foreach (var item in results)
            {
                Console.WriteLine($"{item.Key} - {item.Value}");
            }
        }

        [TestMethod]
        public async Task GetConfigValuesByConfigKeyAsync_Test()
        {
            int configKeyParameter = 170; //USAC_DEV2
            ManageConfigService mcSvc = new ManageConfigService();
            var results = await mcSvc.GetConfigValuesByConfigKeyAsync(configKeyParameter);

            foreach (var item in results)
            {
                Console.WriteLine($"Setting Key: {item.ConfigSettingKey} [{item.ConfigSettingName} - {item.ConfigValue}]");
            }
        }

        [TestMethod]
        public async Task GetConfigValuesByConfigSettingKeyAsync_Test()
        {
            int configSettingKey = 101; // CuroDbName
            ManageConfigService mcSvc = new ManageConfigService();
            var results = await mcSvc.GetConfigValuesByConfigSettingKeyAsync(configSettingKey);

            foreach (var item in results)
            {
                Console.WriteLine($"Config Key: {item.ConfigKey} [{item.ConfigSettingName} - {item.ConfigValue}]");
            }
        }

        [TestMethod]
        public async Task GetServersAsync_Test()
        {
            AdminService adminSvc = new AdminService();
            var results = await adminSvc.GetServersAsync();

            foreach (var item in results)
            {
                Console.WriteLine($"{item.ServersKey} [{item.ServerName}] | {item.ServerType} {item.IsActive}");
            }
        }

        [TestMethod]
        public async Task GetAllConfigAsync_Test()
        {
            AdminService adminSvc = new AdminService();
            var results = await adminSvc.GetAllConfigAsync();

            foreach (var item in results)
            {
                Console.WriteLine($"{item.ConfigKey} [{item.ConfigName}] ");
            }
        }

        [TestMethod]
        public async Task GetAllConfigSettingAsync_Test()
        {
            AdminService adminSvc = new AdminService();
            var results = await adminSvc.GetAllConfigSettingAsync();

            foreach (var item in results)
            {
                Console.WriteLine($"{item.ConfigSettingKey} [{item.ConfigSettingName} - {item.Description}] ");
            }
        }
    }
}