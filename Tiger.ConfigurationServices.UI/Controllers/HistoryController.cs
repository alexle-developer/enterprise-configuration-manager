using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Tiger.ConfigurationServices.UI.Services;

namespace Tiger.ConfigurationServices.UI.Controllers
{
    public class HistoryController : Controller
    {
        private readonly HistoryService _historySvc;

        public HistoryController(HistoryService historySvc)
        {
            _historySvc = historySvc;
        }

        [HttpGet]
        [Route(Routes.History.ConfigEdit)]
        public async Task<IActionResult> GetConfigEditAsync()
        {
            var result = await _historySvc.GetConfigEditAsync().ConfigureAwait(false);

            return Json(result);
        }

        [HttpGet]
        [Route(Routes.History.ConfigSettingEdit)]
        public async Task<IActionResult> GetConfigSettingEditAsync()
        {
            var result = await _historySvc.GetConfigSettingEditAsync().ConfigureAwait(false);

            return Json(result);
        }

        [HttpGet]
        [Route(Routes.History.ConfigValueEdit)]
        public async Task<IActionResult> GetConfigValueditAsync()
        {
            var result = await _historySvc.GetConfigValueditAsync().ConfigureAwait(false);

            return Json(result);
        }
    }
}