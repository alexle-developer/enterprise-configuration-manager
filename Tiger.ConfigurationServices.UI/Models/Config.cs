using System;
using System.Collections.Generic;

namespace Tiger.ConfigurationServices.UI.Models
{
    public partial class Config
    {
        public Config()
        {
            ConfigValue = new HashSet<ConfigValue>();
        }

        public byte ConfigKey { get; set; }
        public string ConfigName { get; set; }
        public byte CuroDbServerKey { get; set; }
        public byte ApplogDbServerKey { get; set; }
        public bool IsProduction { get; set; }
        public string Description { get; set; }

        public Servers ApplogDbServerKeyNavigation { get; set; }
        public Servers CuroDbServerKeyNavigation { get; set; }
        public ICollection<ConfigValue> ConfigValue { get; set; }
    }
}
