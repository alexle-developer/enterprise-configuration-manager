using System.Collections.Generic;

namespace Tiger.ConfigurationServices.UI.Models
{
    public partial class Servers
    {
        public Servers()
        {
            ConfigApplogDbServerKeyNavigation = new HashSet<Config>();
            ConfigCuroDbServerKeyNavigation = new HashSet<Config>();
        }

        public byte ServersKey { get; set; }
        public string ServerName { get; set; }
        public string ServerType { get; set; }
        public bool IsActive { get; set; }

        public ICollection<Config> ConfigApplogDbServerKeyNavigation { get; set; }
        public ICollection<Config> ConfigCuroDbServerKeyNavigation { get; set; }
    }
}