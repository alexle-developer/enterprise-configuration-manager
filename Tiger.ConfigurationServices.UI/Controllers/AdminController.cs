using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tiger.ConfigurationServices.UI.Models;
using Tiger.ConfigurationServices.UI.Services;

namespace Tiger.ConfigurationServices.UI.Controllers
{
    public class AdminController : Controller
    {
        private readonly AdminService _adminSvc;

        public AdminController(AdminService adminService)
        {
            _adminSvc = adminService;
        }

        [HttpGet]
        [Route(Routes.Admin.EditServers)]
        public async Task<IActionResult> GetServersAsync()
        {
            var allServers = await _adminSvc.GetServersAsync();

            return Json(allServers);
        }

        [HttpGet]
        [Route(Routes.Admin.EditConfig)]
        public async Task<IActionResult> GetAllConfigAsync()
        {
            var allConfigs = await _adminSvc.GetAllConfigAsync();

            return Json(allConfigs);
        }

        [HttpGet]
        [Route(Routes.Admin.EditSetting)]
        public async Task<IEnumerable<ConfigSetting>> GetAllConfigSettingAsync()
        {
            var allSettings = await _adminSvc.GetAllConfigSettingAsync();

            return allSettings;
        }
    } // class
} // namespace