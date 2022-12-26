using System;
using System.Collections.Generic;

namespace Tiger.ConfigurationServices.UI.Models
{
    public partial class ConfigSetting
    {
        public ConfigSetting()
        {
            ConfigValue = new HashSet<ConfigValue>();
        }

        public short ConfigSettingKey { get; set; }
        public string ConfigSettingName { get; set; }
        public string Description { get; set; }

        public ICollection<ConfigValue> ConfigValue { get; set; }
    }
}
