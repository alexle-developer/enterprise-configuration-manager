using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tiger.ConfigurationServices.UI.Models;

namespace Tiger.ConfigurationServices.UI.Services
{
    public class HistoryService
    {
        private MaintContext dbContext = new MaintContext();

        public async Task<IEnumerable<ConfigEdit>> GetConfigEditAsync()
        {
            // all properties from the db
            IEnumerable<ConfigEdit> allConfigEdit = await dbContext.ConfigEdit.ToListAsync().ConfigureAwait(false);

            return allConfigEdit.OrderByDescending(c => c.DateEntered).ToList();
        }

        public async Task<IEnumerable<ConfigSettingEdit>> GetConfigSettingEditAsync()
        {
            // all properties from the db
            IEnumerable<ConfigSettingEdit> allConfigSettingEdit = await dbContext.ConfigSettingEdit.ToListAsync().ConfigureAwait(false);

            return allConfigSettingEdit.OrderByDescending(cs => cs.DateEntered).ToList();
        }

        public async Task<IEnumerable<ConfigValueEdit>> GetConfigValueditAsync()
        {
            // all properties from the db
            IEnumerable<ConfigValueEdit> allConfigValueEdit = await dbContext.ConfigValueEdit.ToListAsync().ConfigureAwait(false);

            return allConfigValueEdit.OrderByDescending(cve => cve.DateEntered).ToList();
        }
    }
}